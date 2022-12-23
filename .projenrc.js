const { cdk, javascript } = require('projen');

const cdkVersion = '2.50.0';

const project = new cdk.JsiiProject({
  author: 'Neulabs',
  authorAddress: 'tech@neulabs.com',
  defaultReleaseBranch: 'main',
  name: 'neulabs-cdk-constructs',
  repositoryUrl: 'git@github.com:neulabscom/neulabs-cdk-constructs.git',

  deps: [
    `@aws-cdk/aws-apigatewayv2-alpha@${cdkVersion}-alpha.0`,
    `@aws-cdk/aws-apigatewayv2-integrations-alpha@${cdkVersion}-alpha.0`,
    `aws-cdk-lib@${cdkVersion}`,
    'constructs',
  ],

  devDeps: ['ts-node', 'prettier', 'eslint-config-prettier', 'eslint-plugin-prettier', 'standard-version'],

  publishToPypi: {
    distName: 'neulabs-cdk-constructs',
    module: 'neulabs_cdk_constructs',
  },
});

project.synth();