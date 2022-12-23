const { cdk } = require('projen');

const cdkVersion = '2.50.0';

const project = new cdk.JsiiProject({
  author: 'FabrizioCafolla',
  authorAddress: 'developer@fabriziocafolla.com',
  defaultReleaseBranch: 'main',
  name: 'v1',
  repositoryUrl: 'git@github.com:FabrizioCafolla/neulabs-cdk-constructs.git',

  deps: [
    `@aws-cdk/aws-apigatewayv2-alpha@${cdkVersion}-alpha.0`,
    `@aws-cdk/aws-apigatewayv2-integrations-alpha@${cdkVersion}-alpha.0`,
    `aws-cdk-lib@${cdkVersion}`,
    'constructs',
  ], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  publishToPypi: {
    distName: 'cdk-sample-lib',
    module: 'cdk_sample_lib',
  },
});
project.synth();