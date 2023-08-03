import { Duration, SecretValue, RemovalPolicy, CfnOutput, IResolvable } from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as firehose from 'aws-cdk-lib/aws-kinesisfirehose';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { addBaseTags } from '../common/utils';
import { BaseStack, BaseStackProps } from '../stack';


export const NEW_RELIC_AWS_ACCOUNT_ID = '754728514883';

export enum EndpointType {
  METRICS = 'metrics',
  LOGS = 'logs'
}

export enum EndpointUrlLogs {
  EU_LOGS = 'https://aws-api.eu.newrelic.com/firehose/v1',
  US_LOGS = 'https://aws-api.newrelic.com/firehose/v1',
}

export enum EndpointUrlMetrics {
  EU_METRICS = 'https://aws-api.eu01.nr-data.net/cloudwatch-metrics/v1',
  US_METRICS = 'https://aws-api.newrelic.com/cloudwatch-metrics/v1',
}

export interface CfnMetricStreamProps {
  readonly includeFilters?: Array<IResolvable | cloudwatch.CfnMetricStream.MetricStreamFilterProperty> | IResolvable;
  readonly excludeFilters?: Array<IResolvable | cloudwatch.CfnMetricStream.MetricStreamFilterProperty> | IResolvable;
}

export interface NewRelicStackProps extends BaseStackProps {
  readonly newRelicLicenseKey: string;
  readonly newRelicAccountId: string;
  readonly newRelicBucketName: string;
  readonly newRelicApiUrlMetrics?: EndpointUrlMetrics;
  readonly newRelicApiUrlLogs?: EndpointUrlLogs;
  readonly cloudwatchMetricStreamProps?: CfnMetricStreamProps;
  readonly bufferyHints?: firehose.CfnDeliveryStream.BufferingHintsProperty;
}

export class NewRelicStack extends BaseStack {
  newRelicSecret: secretsmanager.ISecret;
  newRelicBucket: s3.IBucket;
  newRelicIntegrationRole: iam.IRole;
  newRelicFirehoseRole: iam.IRole;
  newRelicFirehoseMetrics?: firehose.CfnDeliveryStream;
  newRelicFirehoseLogs?: firehose.CfnDeliveryStream;
  newRelicCloudwatchLogsStreamRole?: iam.IRole;

  constructor(scope: Construct, id: string, props: NewRelicStackProps) {
    super(scope, id, props);

    this.newRelicIntegrationRole = this.createNewRelicRole(props.newRelicAccountId);

    this.newRelicSecret = this.createSecrets(props.newRelicAccountId, props.newRelicLicenseKey);
    this.newRelicBucket = this.createFirehoseBucket(props.newRelicBucketName);
    this.newRelicFirehoseRole = this.createFirehoseRole(this.newRelicBucket);

    if (props.newRelicApiUrlLogs) {
      this.newRelicFirehoseLogs = this.createFirehoseStream(
        this.newRelicBucket,
        this.newRelicFirehoseRole,
        EndpointType.LOGS,
        props.newRelicApiUrlLogs,
        props.newRelicLicenseKey,
      );
      this.newRelicCloudwatchLogsStreamRole = this.createCloudwatchLogsStreamRole();
    }

    if (props.newRelicApiUrlMetrics) {
      this.newRelicFirehoseMetrics = this.createFirehoseStream(
        this.newRelicBucket,
        this.newRelicFirehoseRole,
        EndpointType.METRICS,
        props.newRelicApiUrlMetrics,
        props.newRelicLicenseKey,
        props.bufferyHints,
      );
      this.createCloudwatchMetricStream(
        this.newRelicFirehoseMetrics.attrArn,
        props.cloudwatchMetricStreamProps,
      );
    }
  }

  createCloudwatchMetricStream(firehoseArn: string, props?: CfnMetricStreamProps) {
    let role = new iam.Role(
      this,
      'newrelic-cloudwatch-stream-role', {
        roleName: 'NewRelicInfrastructure-CloudwatchMetricsStream',
        assumedBy: new iam.ServicePrincipal('streams.metrics.cloudwatch.amazonaws.com'),
      },
    );
    addBaseTags(role);

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'firehose:PutRecord',
          'firehose:PutRecordBatch',
        ],
        resources: ['*'],
      }),
    );

    return new cloudwatch.CfnMetricStream(this, 'newrelic-cloudwatch-stream-metrics', {
      firehoseArn: firehoseArn,
      roleArn: role.roleArn,
      outputFormat: 'opentelemetry0.7',
      name: 'newelic-stream-metrics',
      ...props,
    });
  }

  createCloudwatchLogsStreamRole(): iam.IRole {
    let role = new iam.Role(
      this,
      'newrelic-logstream-role', {
        roleName: 'NewRelicInfrastructure-CloudwatchLogsStream',
        assumedBy: new iam.ServicePrincipal('logs.amazonaws.com'),
      },
    );

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'firehose:PutRecord',
          'firehose:PutRecordBatch',
          'kinesis:PutRecords',
          'kinesis:PutRecord',
        ],
        resources: ['*'],
      }),
    );

    addBaseTags(role);

    return role;
  }

  createNewRelicRole(newRelicAccountId: string): iam.IRole {
    let role = new iam.Role(
      this,
      'newrelic-role', {
        roleName: 'NewRelicInfrastructure-Integrations',
        assumedBy: new iam.AccountPrincipal(NEW_RELIC_AWS_ACCOUNT_ID),
        externalIds: [
          newRelicAccountId,
        ],
      },
    );

    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'),
    );

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'budgets:ViewBudget',
        ],
        resources: ['*'],
      }),
    );

    addBaseTags(role);

    new CfnOutput(this, 'newrelic-role-output', {
      value: role.roleArn,
      description: 'New Relic role arn',
      exportName: 'newRelicRole',
    });

    return role;
  }

  createFirehoseStream(
    newRelicBucket: s3.IBucket,
    role: iam.IRole,
    endpointType: EndpointType,
    endpointUrl: string,
    newRelicLicenseLey: string,
    bufferingHints?: firehose.CfnDeliveryStream.BufferingHintsProperty,
  ):firehose.CfnDeliveryStream {
    // Minute in one day: 1440
    // Interval: 15min
    // Sends per day: 1440/15 = 96
    // Max usage per day: 96*15mb = 1.5gb
    var bufferingHintsDefault: firehose.CfnDeliveryStream.BufferingHintsProperty = {
      intervalInSeconds: 900,
      sizeInMBs: 15,
    };

    let httpEndpointMetrics: firehose.CfnDeliveryStream.HttpEndpointDestinationConfigurationProperty = {
      bufferingHints: bufferingHints ?? bufferingHintsDefault,
      endpointConfiguration: {
        url: endpointUrl,
        accessKey: newRelicLicenseLey,
        name: endpointType,
      },
      s3Configuration: {
        bucketArn: newRelicBucket.bucketArn,
        roleArn: role.roleArn,
      },
      requestConfiguration: {
        contentEncoding: 'GZIP',
      },
      roleArn: role.roleArn,
    };

    let firehoseStream = new firehose.CfnDeliveryStream(
      this,
      `newrelic-firehose-${endpointType}`,
      {
        deliveryStreamName: `NewRelic-stream-${endpointType}`,
        deliveryStreamType: 'DirectPut',
        httpEndpointDestinationConfiguration: httpEndpointMetrics,
      },
    );
    addBaseTags(firehoseStream);
    return firehoseStream;
  }

  createSecrets(newRelicAccountId: string, newRelicLicenseLey: string) {
    let secret = new secretsmanager.Secret(
      this,
      'newrelic-secret',
      {
        secretName: 'NEW_RELIC_LICENSE_KEY',
        secretObjectValue: {
          NrAccountId: SecretValue.unsafePlainText(newRelicAccountId),
          LicenseKey: SecretValue.unsafePlainText(newRelicLicenseLey),
        },
      },
    );
    addBaseTags(secret);
    return secret;
  }

  createFirehoseBucket(newRelicBucketName: string): s3.IBucket {
    let bucket = new s3.Bucket(
      this,
      'newrelic-bucket',
      {
        bucketName: newRelicBucketName,
        versioned: true,
        lifecycleRules: [
          {
            id: 'raw-bucket-lifecycle-rule',
            enabled: true,
            noncurrentVersionExpiration: Duration.days(30),
            transitions: [
              {
                storageClass: s3.StorageClass.INFREQUENT_ACCESS,
                transitionAfter: Duration.days(30),
              },
            ],
          },
        ],
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      },
    );
    addBaseTags(bucket);
    return bucket;
  }

  createFirehoseRole(newRelicFirehoseBucket: s3.IBucket): iam.IRole {
    let role = new iam.Role(
      this,
      'newrelic-firehose-role', {
        assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
      },
    );
    addBaseTags(role);

    // TODO: create more restrictive policy
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          'glue:GetTable',
          'glue:GetTableVersion',
          'glue:GetTableVersions',
          'glue:GetSchemaByDefinition',
          'glue:GetSchemaVersion',

          'logs:PutLogEvents',

          'kinesis:DescribeStream',
          'kinesis:GetShardIterator',
          'kinesis:GetRecords',
          'kinesis:ListShards',

          'kms:Decrypt',
          'kms:GenerateDataKey',
          'kms:Decrypt',

          'kafka:GetBootstrapBrokers',
          'kafka:DescribeCluster',
          'kafka:DescribeClusterV2',
          'kafka-cluster:Connect',
          'kafka-cluster:DescribeTopic',
          'kafka-cluster:DescribeTopicDynamicConfiguration',
          'kafka-cluster:ReadData',
          'kafka-cluster:DescribeGroup',

          'lambda:InvokeFunction',
          'lambda:GetFunctionConfiguration',
        ],
        resources: ['*'],
      }),
    );

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          's3:AbortMultipartUpload',
          's3:GetBucketLocation',
          's3:GetObject',
          's3:ListBucket',
          's3:ListBucketMultipartUploads',
          's3:PutObject',
          'S3:PutObjectAcl',
        ],
        resources: [
          `${newRelicFirehoseBucket.bucketArn}`,
          `${newRelicFirehoseBucket.bucketArn}/*`,
        ],
      }),
    );

    return role;
  }
}