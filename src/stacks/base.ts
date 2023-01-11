import { Stack, StackProps } from 'aws-cdk-lib';
import * as resourcegroups from 'aws-cdk-lib/aws-resourcegroups';
import { Construct } from 'constructs';

export interface BaseStackProps extends StackProps {
  readonly stage: string;
}

export class BaseStack extends Stack {
  stage: string;

  constructor(scope: Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    this.stage = props.stage;
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
}