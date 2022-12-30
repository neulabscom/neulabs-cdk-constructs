import { Duration, SecretValue } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as firehose from 'aws-cdk-lib/aws-kinesisfirehose';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from '../base';

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

export interface NewRelicStackProps extends BaseStackProps {
  readonly newRelicLicenseKey: string;
  readonly newRelicAccountId: string;
  readonly newRelicApiUrlMetrics: EndpointUrlMetrics;
  readonly newRelicApiUrlLogs: EndpointUrlLogs;
}

export class NewRelicStack extends BaseStack {
  newRelicSecret: secretsmanager.ISecret;
  newRelicBucket: s3.IBucket;
  newRelicRole: iam.IRole;
  newRelicFirehoseMetrics: any;
  newRelicFirehoseLogs: any;

  constructor(scope: Construct, id: string, props: NewRelicStackProps) {
    super(scope, id, props);

    // TODO:
    //  - create new relic integration https://docs.newrelic.com/docs/infrastructure/amazon-integrations/connect/connect-aws-new-relic-infrastructure-monitoring/
    //  - remove bucket if destroy stack

    this.newRelicSecret = this.createSecrets(props.newRelicAccountId, props.newRelicLicenseKey);
    this.newRelicBucket = this.createFirehoseBucket();
    this.newRelicRole = this.createFirehoseRole(this.newRelicBucket);

    if (props.newRelicApiUrlLogs) {
      this.newRelicFirehoseLogs = this.createFirehoseStream(
        EndpointType.LOGS,
        props.newRelicApiUrlLogs,
        props.newRelicLicenseKey,
      );
    } else {
      this.newRelicFirehoseLogs = null;
    }

    if (props.newRelicApiUrlMetrics) {
      this.newRelicFirehoseMetrics = this.createFirehoseStream(
        EndpointType.METRICS,
        props.newRelicApiUrlMetrics,
        props.newRelicLicenseKey,
      );
    } else {
      this.newRelicFirehoseMetrics = null;
    }
  }

  createFirehoseStream(endpointType: EndpointType, endpointUrl: string, newRelicLicenseLey: string):firehose.CfnDeliveryStream {
    if (this.stage == 'production') {
      // Minute in one day: 1440
      // Interval: 5min
      // Sends per day: 1440/5 = 288
      // Usage per day: 288*5mb = 1.5gb
      var bufferingHints: firehose.CfnDeliveryStream.BufferingHintsProperty = {
        intervalInSeconds: 300, // 5 minute
        sizeInMBs: 5,
      };
    } else {
      // Usage per day: 144*3mb = 0.432gb
      var bufferingHints: firehose.CfnDeliveryStream.BufferingHintsProperty = {
        intervalInSeconds: 600, // 10 minute
        sizeInMBs: 3,
      };
    }

    let httpEndpointMetrics: firehose.CfnDeliveryStream.HttpEndpointDestinationConfigurationProperty = {
      bufferingHints: bufferingHints,
      endpointConfiguration: {
        url: endpointUrl,
        accessKey: newRelicLicenseLey,
        name: endpointType,
      },
      s3Configuration: {
        bucketArn: this.newRelicBucket.bucketArn,
        roleArn: this.newRelicRole.roleArn,
      },
      requestConfiguration: {
        contentEncoding: 'GZIP',
      },
    };

    let firehoseStream = new firehose.CfnDeliveryStream(
      this,
      `monitoring-firehose-${endpointType}`,
      {
        deliveryStreamName: `NewRelic-stream-${endpointType}`,
        deliveryStreamType: 'DirectPut',
        httpEndpointDestinationConfiguration: httpEndpointMetrics,
      },
    );
    this.addBaseTag(firehoseStream);
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
    this.addBaseTag(secret);
    return secret;
  }

  createFirehoseBucket(): s3.IBucket {
    let bucket = new s3.Bucket(
      this,
      'newrelic-bucket',
      {
        bucketName: `neulabs-newrelic-${this.stage}-${(Math.random() + 1).toString(36).substring(6)}`,
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
      },
    );
    this.addBaseTag(bucket);
    return bucket;
  }

  createFirehoseRole(bucket: s3.IBucket): iam.IRole {
    let role = new iam.Role(
      this,
      'new-relic-firehose-role', {
        assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
      },
    );
    this.addBaseTag(role);


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
          `${bucket.bucketArn}`,
          `${bucket.bucketArn}/*`,
        ],
      }),
    );

    return role;
  }
}