import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface BaseStackProps extends StackProps {
  readonly stage: string;
  readonly businessUnit: string;
  readonly domain: string;
  readonly repository: string;
  readonly version: string;
}

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);

    // TODO: add aws tag functions
  }
}