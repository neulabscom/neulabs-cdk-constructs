import { Stack, StackProps } from 'aws-cdk-lib';
import * as resourcegroups from 'aws-cdk-lib/aws-resourcegroups';
import { Construct } from 'constructs';
import * as utils from '../common/utils';

export interface BaseStackProps extends StackProps {
  readonly stage: string;
}

export class BaseStack extends Stack {
  stage: string;

  constructor(scope: Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);
    this.stage = props.stage;
  }

  addBaseTags(model: any, props?: utils.BaseTagProps) {
    utils.addBaseTags(model, props);
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