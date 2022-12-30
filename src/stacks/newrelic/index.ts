import { Duration, SecretValue } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from '../base';

export interface NewRelicStackProps extends BaseStackProps {
  readonly newRelicLicenseKey: string;
  readonly newRelicAccountId: string;
  readonly newRelicApiUrlMetrics: boolean;
  readonly newRelicApiUrlLogs: boolean;
}

export class NewRelicStack extends BaseStack {
  newRelicSecret: secretsmanager.ISecret;
  newRelicBucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: NewRelicStackProps) {
    super(scope, id, props);

    this.newRelicSecret = this.createSecrets(props.newRelicAccountId, props.newRelicLicenseKey);
    this.newRelicBucket = this.createFirehoseBucket();
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

  createFirehoseBucket() {
    return new s3.Bucket(
      this,
      'newrelic-bucket',
      {
        bucketName: `neulabs-newrelic-${this.stage}-${(Math.random() + 1).toString(36).substring(7)}`,
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
  }
}