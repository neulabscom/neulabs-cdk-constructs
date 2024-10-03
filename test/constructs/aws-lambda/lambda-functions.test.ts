import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { FunctionNode } from '../../../src/constructs/aws-lambda';
import { BaseStack } from '../../../src/stack';


describe('Lambda Functions', () => {
  test('create a function without base environment use env values if any', () => {
    const app = new cdk.App();
    const stack = new BaseStack(app, 'TestStack', { stage: 'test' });
    new FunctionNode(stack, 'FunctionNode', {
      stage: 'test',
      functionName: 'FunctionNode',
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, './handler.ts'),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
      Runtime: 'nodejs20.x',
    });

    template.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          ENVIRONMENT: 'test',
        },
      },
    });
  });

  test('create a function with base environment use props values', () => {
    const app = new cdk.App();
    const stack = new BaseStack(app, 'TestStack', { stage: 'test' });
    new FunctionNode(stack, 'FunctionNode', {
      stage: 'test',
      functionName: 'FunctionNode',
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, './handler.ts'),
      withBaseEnvironment: true,
      baseEnvironmentValues: {
        repositoryVersion: 'v1.0.0',
        repositoryName: 'neulabs-cdk-constructs-test',
        team: 'neulabsTest',
      },
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
      Runtime: 'nodejs20.x',
      Environment: {
        Variables: {
          ENVIRONMENT: 'test',
          REPOSITORY_VERSION: 'v1.0.0',
          REPOSITORY_NAME: 'neulabs-cdk-constructs-test',
          TEAM: 'neulabsTest',
        },
      },
    });
  });
});

