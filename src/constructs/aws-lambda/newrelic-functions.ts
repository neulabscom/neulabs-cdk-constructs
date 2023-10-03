import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Function, FunctionNode, FunctionProps, FunctionNodeProps } from './lambda-functions';
import { CDK_ACCOUNT_ID, CDK_REGION } from '../../common/env';

export const NEW_RELIC_LAYERS_ACCOUNT_ID = '451483290750'; // AWS account id of NewRelic where exposed layers https://layers.newrelic-external.com/

export interface FunctionNewRelicProps extends FunctionProps {
  readonly newRelicLayerName: string;
  readonly newRelicLayerVersion: number;
  readonly newRelicAccountId: string;
  readonly newRelicwithExtensionSendLogs?: boolean;
  readonly disableNewRelic?: boolean;
}

export interface FunctionNodeNewRelicProps extends FunctionNodeProps {
  readonly newRelicLayerName: string;
  readonly newRelicLayerVersion: number;
  readonly newRelicAccountId: string;
  readonly newRelicwithExtensionSendLogs?: boolean;
  readonly disableNewRelic?: boolean;
}

export interface NewRelicLayerProps {
  readonly handler: string;
  readonly newRelicLayerName: string;
  readonly newRelicLayerVersion: number;
  readonly newRelicAccountId: string;
  readonly newRelicwithExtensionSendLogs?: boolean;
}

export function getNewRelicLayer(scope: Construct, functionName:string, layerName: string, layerVersion: number, region: string) {
  return lambda.LayerVersion.fromLayerVersionArn(
    scope,
    `new-relic-layer-${functionName}`,
    `arn:aws:lambda:${region}:${NEW_RELIC_LAYERS_ACCOUNT_ID}:layer:${layerName}:${layerVersion}`,
  );
}

export function addNewRelicLayer(scope: Construct, lambdaFunction: lambda.Function, props: NewRelicLayerProps) {
  lambdaFunction.addToRolePolicy(
    new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [`arn:aws:secretsmanager:eu-west-1:${CDK_ACCOUNT_ID}:secret:NEW_RELIC_LICENSE_KEY-??????`],
    }),
  );

  lambdaFunction.addEnvironment('NEW_RELIC_ACCOUNT_ID', props.newRelicAccountId);
  lambdaFunction.addEnvironment('NEW_RELIC_LAMBDA_HANDLER', props.handler);
  lambdaFunction.addEnvironment('NEW_RELIC_LAMBDA_EXTENSION_ENABLED', 'true');
  if (props.newRelicwithExtensionSendLogs) {
    lambdaFunction.addEnvironment('NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS', 'true');
  }

  const layer = getNewRelicLayer(
    scope,
    lambdaFunction.functionName,
    props.newRelicLayerName,
    props.newRelicLayerVersion,
    CDK_REGION,
  );

  lambdaFunction.addLayers(layer);
}

export class NewRelicFunction extends Function {
  constructor(scope: Construct, id: string, props: FunctionNewRelicProps) {
    const app_handler = props.handler;
    const handler = 'newrelic_lambda_wrapper.handler';

    super(scope, id, { ...props, handler });

    if (props.disableNewRelic === false) {
      this.addNewRelicLayer(scope, {
        handler: app_handler,
        newRelicLayerName: props.newRelicLayerName,
        newRelicLayerVersion: props.newRelicLayerVersion,
        newRelicAccountId: props.newRelicAccountId,
        newRelicwithExtensionSendLogs: props.newRelicwithExtensionSendLogs ?? true,
      });
    }
  }

  addNewRelicLayer(scope: Construct, props: NewRelicLayerProps) {
    addNewRelicLayer(scope, this, props);
  }
}

export class NewRelicFunctionNode extends FunctionNode {
  constructor(scope: Construct, id: string, props: FunctionNodeNewRelicProps) {
    const app_handler = props.handler ?? 'index.handler';
    const handler = 'newrelic-lambda-wrapper.handler';

    super(scope, id, { ...props, handler });

    if (props.disableNewRelic !== false) {
      this.addNewRelicLayer(scope, {
        handler: app_handler,
        newRelicLayerName: props.newRelicLayerName,
        newRelicLayerVersion: props.newRelicLayerVersion,
        newRelicAccountId: props.newRelicAccountId,
        newRelicwithExtensionSendLogs: props.newRelicwithExtensionSendLogs ?? true,
      });
    }
  }

  addNewRelicLayer(scope: Construct, props: NewRelicLayerProps) {
    addNewRelicLayer(scope, this, props);
  }
}