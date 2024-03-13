import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Function, FunctionNode } from './lambda-functions';

//TODO: integrate https://github.com/aws-powertools/powertools-lambda-layer-cdk

export enum LambdaPowerToolsLayerAccountId {
  PYTHON = '017000801446',
  TYPESCRIPT = '094274105915'
}

export enum LambdaPowerToolsLayerName {
  PYTHON_ARM = 'AWSLambdaPowertoolsPythonV2-Arm64',
  PYTHON_X86 = 'AWSLambdaPowertoolsPythonV2',
  TYPESCRIPT_OLD = 'AWSLambdaPowertoolsTypeScript',
  TYPESCRIPT = 'AWSLambdaPowertoolsTypeScriptV2'
}

export interface ILambdaPowerToolsProps {
  readonly lambdaFunction: lambda.Function | lambdaNode.NodejsFunction | Function | FunctionNode;
  readonly lambdaPowerToolsLayerName: LambdaPowerToolsLayerName;
  readonly lambdaPowerToolsLayerAccountId: LambdaPowerToolsLayerAccountId;
  readonly lambdaPowerToolsLayerVersion: number;
  readonly setPowertoolsDev?: boolean;
  readonly setLogLevel?: string;
}

export function getLamdaPowerToolsLayer(
  scope: Construct,
  functionName: string,
  layerName: LambdaPowerToolsLayerName,
  layerVersion: number,
  layerAccountId: LambdaPowerToolsLayerAccountId,
  region: string,
): lambda.ILayerVersion {
  return lambda.LayerVersion.fromLayerVersionArn(
    scope,
    `lambda-power-tools-layer-${functionName}`,
    `arn:aws:lambda:${region}:${layerAccountId}:layer:${layerName}:${layerVersion}`,
  );
}

export function addLamdaPowerToolsLayer(
  scope: Construct,
  props: ILambdaPowerToolsProps,
) {
  const layer = getLamdaPowerToolsLayer(
    scope,
    props.lambdaFunction.functionName,
    props.lambdaPowerToolsLayerName,
    props.lambdaPowerToolsLayerVersion,
    props.lambdaPowerToolsLayerAccountId,
    process.env.CDK_DEFAULT_REGION!,
  );

  props.lambdaFunction.addEnvironment('POWERTOOLS_LOGGER_LOG_EVENT', 'true');

  props.lambdaFunction.addEnvironment(
    'POWERTOOLS_DEV',
    props.setPowertoolsDev ? 'true' : 'false',
  );

  props.lambdaFunction.addEnvironment(
    'LOG_LEVEL',
    props.setLogLevel ?? 'INFO',
  );

  props.lambdaFunction.addLayers(layer);
}
