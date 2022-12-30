import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import * as resourcegroups from 'aws-cdk-lib/aws-resourcegroups';
import { Construct } from 'constructs';

export interface BaseStackProps extends StackProps {
  readonly stage: string;
  readonly businessUnit: string;
  readonly domain: string;
  readonly repository: string;
  readonly version: string;
}

export class BaseStack extends Stack {
  stage: string;
  businessUnit: string;
  domain: string;
  repository: string;
  version: string;
  date: string;

  constructor(scope: Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);

    this.stage = props.stage;
    this.businessUnit = props.businessUnit;
    this.domain = props.domain;
    this.repository = props.repository;
    this.version = props.version;

    let timestamp = new Date();
    this.date = `${timestamp.getFullYear().toString()}/${timestamp.getMonth().toString()}/${timestamp.getDay().toString()} H:${timestamp.getHours().toString()}`;
  }

  createResourcesGroup() {
    let cfnGroup = new resourcegroups.CfnGroup(
      this,
      `resources-group-${this.stackName}`,
      {
        name: this.stackName,
        resourceQuery: {
          query: {
            stackIdentifier: this.stackId,
          },
        },
      },
    );
    return cfnGroup;
  }

  addBaseTag(module: any) {
    Tags.of(module).add('Environment', this.stage);
    Tags.of(module).add('BusinessUnit', this.businessUnit);
    Tags.of(module).add('Domain', this.domain);
    Tags.of(module).add('Repository', this.repository);
    Tags.of(module).add('Date', this.date);
    Tags.of(module).add('Version', this.version);
  }
}