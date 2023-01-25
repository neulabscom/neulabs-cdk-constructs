import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { CDK_ACCOUNT_ID, CDK_REGION } from '../../common/env';
import * as env from '../../common/env';
import { addBaseTags } from '../../common/utils';

export const NEW_RELIC_LAYERS_ACCOUNT_ID = '451483290750'; // AWS account id of NewRelic where exposed layers https://layers.newrelic-external.com/

export interface FunctionProps extends lambda.FunctionProps {
  readonly stage: string;
}

export interface FunctionNewRelicProps extends FunctionProps {
  readonly newRelicLayerName: string;
  readonly newRelicLayerVersion: number;
  readonly newRelicAccountId: string;
  readonly newRelicwithExtensionSendLogs?: boolean;
}

function getConstructId(id: string, stage: string) {
  return id + '-construct-' + stage;
}

abstract class BaseFunction extends Construct {
  public readonly stage: string;
  public readonly function: lambda.Function;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, getConstructId(id, props.stage));
    this.stage = props.stage;
    this.function = this.createFunction(scope, id, props);

    this.addEnvironment({
      ENVIRONMENT: this.stage,
      TIMESTAMP_DEPLOY_CDK: env.TIMESTAMP_DEPLOY_CDK,
      BUSINESS_UNIT: env.BUSINESS_UNIT,
      DOMAIN: env.DOMAIN,
      REPOSITORY_NAME: env.REPOSITORY_NAME,
      REPOSITORY_VERSION: env.REPOSITORY_VERSION,
    });

    addBaseTags(this.function);
  }

  abstract createFunction(scope: Construct, id: string, props: FunctionProps): lambda.Function;

  addEnvironment(props: { [key: string]: string }) {
    let keys = Object.keys(props);
    for (let index = 0; index < keys.length; index++) {
      let key = keys[index];
      this.function.addEnvironment(key.toUpperCase(), props[key]);
    }
  }
}
export class Function extends BaseFunction {
  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id, props);
  }

  createFunction(scope: Construct, id: string, props: FunctionNewRelicProps) {
    return new lambda.Function(scope, id, props);
  }
}

export class FunctionNewRelic extends BaseFunction {
  constructor(scope: Construct, id: string, props: FunctionNewRelicProps) {
    super(scope, id, props);
  }

  createFunction(scope: Construct, id: string, props: FunctionNewRelicProps) {
    let handler = 'newrelic_lambda_wrapper.handler';
    let app_handler = props.handler;

    let lambdaFunction = new lambda.Function(scope, id, { ...props, handler });

    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: [`arn:aws:secretsmanager:eu-west-1:${CDK_ACCOUNT_ID}:secret:NEW_RELIC_LICENSE_KEY-??????`],
      }),
    );

    lambdaFunction.addEnvironment('NEW_RELIC_ACCOUNT_ID', props.newRelicAccountId);
    lambdaFunction.addEnvironment('NEW_RELIC_LAMBDA_HANDLER', app_handler);
    lambdaFunction.addEnvironment('NEW_RELIC_LAMBDA_EXTENSION_ENABLED', 'true');
    if (props.newRelicwithExtensionSendLogs) {
      lambdaFunction.addEnvironment('NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS', 'true');
    }

    lambdaFunction.addLayers(this.getNewRelicLayer(
      scope,
      lambdaFunction.functionName,
      props.newRelicLayerName,
      props.newRelicLayerVersion,
      CDK_REGION,
    ));

    return lambdaFunction;
  }

  getNewRelicLayer(scope: Construct, functionName:string, layerName: string, layerVersion: number, region: string) {
    return lambda.LayerVersion.fromLayerVersionArn(
      scope,
      `new-relic-layer-${functionName}`,
      `arn:aws:lambda:${region}:${NEW_RELIC_LAYERS_ACCOUNT_ID}:layer:${layerName}:${layerVersion}`,
    );
  }
}