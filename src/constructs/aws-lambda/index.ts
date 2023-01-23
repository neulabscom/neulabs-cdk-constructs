import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { CDK_ACCOUNT_ID, CDK_REGION } from '../../common/env';
import { addBaseTags } from '../../common/utils';

export const NEW_RELIC_LAYERS_ACCOUNT_ID = '451483290750';

export interface FunctionProps extends lambda.FunctionProps {
  readonly stage: string;
}

export interface FunctionNewRelicProps extends FunctionProps {
  readonly newRelicLayerName: string;
  readonly newRelicLayerVersion: number;
  readonly newRelicAccountId: string;
  readonly newRelicwithExtensionSendLogs?: boolean;
}

function getFunctionId(id: string, stage: string) {
  return id + '-' + stage;
}

export class Function extends Construct {
  public readonly function: lambda.Function;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id);

    this.function = new lambda.Function(scope, getFunctionId(id, props.stage), { ...props });

    addBaseTags(this.function);
  }
}

export class FunctionNewRelic extends Construct {
  public readonly function: lambda.Function;

  constructor(scope: Construct, id: string, props: FunctionNewRelicProps) {
    super(scope, id);

    let handler = 'newrelic_lambda_wrapper.handler';
    let app_handler = props.handler;

    let lambdaFunction = new lambda.Function(scope, getFunctionId(id, props.stage), { ...props, handler });

    lambdaFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: [`arn:aws:secretsmanager:eu-west-1:${CDK_ACCOUNT_ID}:secret:NEW_RELIC_LICENSE_KEY-??????`],
      }),
    );

    lambdaFunction.addEnvironment('ENVIRONMENT', props.stage);
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

    this.function = lambdaFunction;

    addBaseTags(this.function);
  }

  getNewRelicLayer(scope: Construct, functionName:string, layerName: string, layerVersion: number, region: string) {
    return lambda.LayerVersion.fromLayerVersionArn(
      scope,
      `new-relic-layer-${functionName}`,
      `arn:aws:lambda:${region}:${NEW_RELIC_LAYERS_ACCOUNT_ID}:layer:${layerName}:${layerVersion}`,
    );
  }
}