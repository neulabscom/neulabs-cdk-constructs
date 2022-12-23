// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from '../base';

export interface NewRelicStackProps extends BaseStackProps {
  readonly newRelicLicenseKey: string;
  readonly newRelicAccountId: string;
  readonly newRelicApiUrlMetrics: boolean;
  readonly newRelicApiUrlLogs: boolean;
}

export class NewRelicStack extends BaseStack {
  constructor(scope: Construct, id: string, props: NewRelicStackProps) {
    super(scope, id, props);

  }
}
