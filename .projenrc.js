const { cdk, javascript, typescript } = require('projen');

const cdkVersion = '2.111.0';

const project = new cdk.JsiiProject({
  author: 'Neulabs',
  authorAddress: 'tech@neulabs.com',
  defaultReleaseBranch: 'main',
  name: 'neulabs-cdk-constructs',
  repositoryUrl: 'https://github.com/neulabscom/neulabs-cdk-constructs.git',
  authorOrganization: true,
  packageManager: javascript.NodePackageManager.YARN_CLASSIC,
  minNodeVersion: '18.16.0',
  peerDeps: [`aws-cdk-lib@${cdkVersion}`],
  deps: [
    `@aws-cdk/aws-apigatewayv2-alpha@${cdkVersion}-alpha.0`,
    `@aws-cdk/aws-apigatewayv2-integrations-alpha@${cdkVersion}-alpha.0`,
    `aws-cdk-lib@${cdkVersion}`,
    'constructs@^10.0.0',
  ],
  devDeps: [
    'ts-node',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'standard-version',
    'husky',
  ],
  publishToPypi: {
    distName: 'neulabs-cdk-constructs',
    module: 'neulabs_cdk_constructs',
  },
  scripts: {
    prepare: 'husky install',
  },
  jsiiVersion: '5.3.27',
  pullRequestTemplate: false,
});

project.github.actions.set('actions/checkout', 'actions/checkout@v4');
project.github.actions.set('actions/setup-node', 'actions/setup-node@v4');
project.github.actions.set(
  'actions/download-artifact',
  'actions/download-artifact@v4',
);
project.github.actions.set(
  'actions/upload-artifact',
  'actions/upload-artifact@v4',
);

project.synth();
