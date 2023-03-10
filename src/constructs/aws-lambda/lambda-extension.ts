import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { CDK_ACCOUNT_ID, CDK_REGION } from '../../common/env';
import * as env from '../../common/env';
import { addBaseTags } from '../../common/utils';

export const NEW_RELIC_LAYERS_ACCOUNT_ID = '451483290750'; // AWS account id of NewRelic where exposed layers https://layers.newrelic-external.com/

export interface FunctionProps extends lambda.FunctionProps {
  readonly stage: string;
  readonly withBaseEnvironment?: boolean;
  readonly withBaseTags?: boolean;
}

export interface FunctionNewRelicProps extends FunctionProps {
  readonly newRelicLayerName: string;
  readonly newRelicLayerVersion: number;
  readonly newRelicAccountId: string;
  readonly newRelicwithExtensionSendLogs?: boolean;
}

export interface NewRelicProps {
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

export function addNewRelicLayer(scope: Construct, lambdaFunction: lambda.Function, props: NewRelicProps) {
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

export class Function extends lambda.Function {
  public readonly stage: string;

  constructor(scope: Construct, id: string, props: FunctionProps) {
    super(scope, id, props);
    this.stage = props.stage;

    if (props.withBaseEnvironment) {
      this.addBaseEnvironment();
    }

    if (props.withBaseTags) {
      this.addBaseTags();
    }
  }

  addBaseTags() {
    addBaseTags(this);
  }

  addBaseEnvironment() {
    this.addEnvironment('ENVIRONMENT', this.stage);
    this.addEnvironment('TIMESTAMP_DEPLOY_CDK', env.TIMESTAMP_DEPLOY_CDK);

    if (env.BUSINESS_UNIT) {
      this.addEnvironment('BUSINESS_UNIT', env.BUSINESS_UNIT);
    }
    if (env.DOMAIN) {
      this.addEnvironment('DOMAIN', env.DOMAIN);
    }
    if (env.REPOSITORY_NAME) {
      this.addEnvironment('REPOSITORY_NAME', env.REPOSITORY_NAME);
    }
    if (env.REPOSITORY_VERSION) {
      this.addEnvironment('REPOSITORY_VERSION', env.REPOSITORY_VERSION);
    }
  }
}

export class NewRelicFunction extends Function {
  constructor(scope: Construct, id: string, props: FunctionNewRelicProps) {
    const app_handler = props.handler;
    const handler = 'newrelic_lambda_wrapper.handler';

    super(scope, id, { ...props, handler });

    addNewRelicLayer(scope, this, {
      handler: app_handler,
      newRelicLayerName: props.newRelicLayerName,
      newRelicLayerVersion: props.newRelicLayerVersion,
      newRelicAccountId: props.newRelicAccountId,
      newRelicwithExtensionSendLogs: props.newRelicwithExtensionSendLogs,
    });
  }
}
