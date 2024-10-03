import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { FunctionNode } from '../../../src/constructs/aws-lambda';
import { BaseStack } from '../../../src/stack';

const app = new cdk.App();

describe('Lambda Functions', () => {
  test('create a function', () => {
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
  });
});

