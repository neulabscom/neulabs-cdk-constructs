import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as env from '../../common/env';
import { addBaseTags, BaseTagProps } from '../../common/utils';

export const NEW_RELIC_LAYERS_ACCOUNT_ID = '451483290750'; // AWS account id of NewRelic where exposed layers https://layers.newrelic-external.com/

export interface FunctionProps extends lambda.FunctionProps {
  readonly stage: string;
  readonly withBaseEnvironment?: boolean;
  readonly withBaseTags?: boolean;
  readonly baseTagProps?: BaseTagProps;
}

export interface FunctionNodeProps extends lambdaNode.NodejsFunctionProps {
  readonly stage: string;
  readonly withBaseEnvironment?: boolean;
  readonly withBaseTags?: boolean;
  readonly baseTagProps?: BaseTagProps;
}

export function addBaseEnvironment(lambdaFunction: lambda.Function, stage: string, props?: BaseTagProps) {
  lambdaFunction.addEnvironment('ENVIRONMENT', stage);
  lambdaFunction.addEnvironment('TIMESTAMP_DEPLOY_CDK', env.TAG_TIMESTAMP_DEPLOY_CDK);

  let team = props?.team ?? env.TAG_TEAM;
  if (team) {
    lambdaFunction.addEnvironment('TEAM', team);
  }

  let repositoryName = props?.repositoryName ?? env.TAG_REPOSITORY_NAME;
  if (env.TAG_REPOSITORY_NAME) {
    lambdaFunction.addEnvironment('REPOSITORY_NAME', repositoryName);
  }

  let repositoryVersion = props?.repositoryVersion ?? env.TAG_REPOSITORY_VERSION;
  if (env.TAG_REPOSITORY_VERSION) {
    lambdaFunction.addEnvironment('REPOSITORY_VERSION', repositoryVersion);
  }
}

export class Function extends lambda.Function {
  public readonly stage: string;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id, props);
    this.stage = props.stage;

    if (props.withBaseEnvironment ?? true) {
      this.addBaseEnvironment();
    }

    if (props.withBaseTags ?? true) {
      this.addBaseTags(props.baseTagProps);
    }
  }

  addBaseTags(baseTagProps: BaseTagProps = {}) {
    addBaseTags(this, baseTagProps);
  }

  addBaseEnvironment() {
    addBaseEnvironment(this, this.stage);
  }
}

export class FunctionNode extends lambdaNode.NodejsFunction {
  public readonly stage: string;

  constructor(scope: Construct, id: string, { runtime, architecture, ...props }: FunctionNodeProps) {
    super(scope, id, {
      ...props,
      runtime: runtime ?? lambda.Runtime.NODEJS_18_X,
      architecture: architecture ?? lambda.Architecture.ARM_64,
    });

    this.stage = props.stage;

    if (props.withBaseEnvironment ?? true) {
      this.addBaseEnvironment();
    }

    if (props.withBaseTags ?? true) {
      this.addBaseTags();
    }
  }

  addBaseTags() {
    addBaseTags(this);
  }

  addBaseEnvironment() {
    addBaseEnvironment(this, this.stage);
  }
}
