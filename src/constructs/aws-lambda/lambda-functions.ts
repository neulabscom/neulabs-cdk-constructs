import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as lambda_powertools from './lambda-powertools';
import * as env from '../../common/env';
import { addBaseTags, BaseTagProps } from '../../common/utils';

export interface FunctionProps extends lambda.FunctionProps {
  readonly stage: string;
  readonly withBaseEnvironment?: boolean;
  readonly withBaseTags?: boolean;
  readonly baseTagsValues?: BaseTagProps;
  readonly baseEnvironmentValues?: BaseTagProps;
}

export interface FunctionNodeProps extends lambdaNode.NodejsFunctionProps {
  readonly stage: string;
  readonly withBaseEnvironment?: boolean;
  readonly withBaseTags?: boolean;
  readonly baseTagsValues?: BaseTagProps;
  readonly baseEnvironmentValues?: BaseTagProps;
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
      this.addBaseEnvironment(props.baseEnvironmentValues);
    }

    if (props.withBaseTags ?? true) {
      this.addBaseTags(props.baseTagsValues);
    }
  }

  addBaseTags(values: BaseTagProps = {}) {
    addBaseTags(this, values);
  }

  addBaseEnvironment(values: BaseTagProps = {}) {
    addBaseEnvironment(this, this.stage, values);
  }

  addPowerToolsLayer(scope: Construct, props: lambda_powertools.ILambdaPowerToolsProps) {
    lambda_powertools.addLamdaPowerToolsLayer(
      scope,
      {
        ...props,
        lambdaFunction: this,
      },
    );
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
      this.addBaseEnvironment(props.baseEnvironmentValues);
    }

    if (props.withBaseTags ?? true) {
      this.addBaseTags(props.baseTagsValues);
    }
  }

  addBaseTags(values: BaseTagProps = {}) {
    addBaseTags(this, values);
  }

  addBaseEnvironment(values: BaseTagProps = {}) {
    addBaseEnvironment(this, this.stage, values);
  }

  addPowerToolsLayer(scope: Construct, props: lambda_powertools.ILambdaPowerToolsProps) {
    lambda_powertools.addLamdaPowerToolsLayer(
      scope,
      {
        ...props,
        lambdaFunction: this,
      },
    );
  }
}
