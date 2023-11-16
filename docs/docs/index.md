---
id: index
title: Getting Started
---

# Neulabs CDK Constructs

[![NPM](https://img.shields.io/npm/v/neulabs-cdk-constructs?color=blue&label=npm+cdk)](https://www.npmjs.com/package/neulabs-cdk-constructs)
[![PyPI](https://img.shields.io/pypi/v/neulabs-cdk-constructs?color=blue&label=pypi+cdk)](https://pypi.org/project/neulabs-cdk-constructs/)
[![PyPI](https://img.shields.io/github/last-commit/neulabscom/neulabs-cdk-constructs/main)](https://github.com/neulabscom/neulabs-cdk-constructs/commits/main)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/neulabscom/neulabs-cdk-constructs/blob/main/LICENSE)


The neulabs-cdk-constructs library contains CDK-based constructs and stacks to allow the creation of cloud infrastructure on AWS.

The purpose of the library is to expose modules that can facilitate the creation and maintenance of the infrastructure as code.

Inside you will find generic stacks that allow the creation of services by simply instantiating a class, or constructs that implement logic to facilitate the developer and many other aspects.

We decided to develop it in Typescript, using projen for repository management, and the JSII library to be able to compile the neulabs-cdk-constructs package into multiple languages.
## Usage

### Package Installation (npm)

```
yarn add neulabs-cdk-constructs
# or
npm install neulabs-cdk-constructs
```

### Package Installation (python)
```
pip install neulabs-cdk-constructs
```

### Construct APIs

[![View on Construct Hub](https://constructs.dev/badge?package=neulabs-cdk-constructs)](https://constructs.dev/packages/neulabs-cdk-constructs)

## Examples

### Lambda Function with New Relic

```
import {aws_lambda as neulabs_lambda} from 'neulabs-cdk-constructs';


    // Create the lambda function
    this.lambdaFn = new neulabs_lambda.NewRelicFunction(this, functionName, {
      stage: props.stage,
      functionName: functionName,
      runtime: Runtime.PYTHON_3_9,
      handler: 'app.handler',
      code: Code.fromAsset(path.join(__dirname, handler), {}),
      layers: [baseLayer, ...(layers || [])],
      environment: props.environment,
      memorySize: props.memorySize || 128,
      timeout: props.timeout || Duration.seconds(30),
      architecture: lambda.Architecture.X86_64,
      newRelicAccountId: '3540246',
      newRelicLayerName: 'NewRelicPython39',
      newRelicLayerVersion: 49,
      newRelicwithExtensionSendLogs: true,
      disableNewRelic: props.stage === 'production' ? false : true,
    });

    this.lambdaFn.addPowerToolsLayer(
      app,
      neulabs_lambda.LambdaPowerToolsLayerName.TYPESCRIPT,
      neulabs_lambda.LambdaPowerToolsLayerAccountId.TYPESCRIPT,
      20,
      props.stage === 'production' ? false : true,
      props.stage === 'production' ? 'WARGNING' : 'DEBUG'
    );
```

### Create Github OIDC

AWS (Amazon Web Services) supports the use of OpenID Connect (OIDC) for identity federation. OIDC allows you to use an identity provider (such as GitHub) to authenticate users and grant them temporary security credentials to access AWS resources. Here's a brief overview of using GitHub as an identity provider with AWS OIDC:

- **Identity Provider (GitHub)**: GitHub acts as the identity provider in this setup. Users authenticate with GitHub, and GitHub issues identity tokens following the OIDC standard.
- **AWS IAM Role**: In AWS, you create an IAM (Identity and Access Management) role that specifies the permissions users should have when authenticated. This role trusts the GitHub OIDC provider. 
- **GithubOIDCStack a neulabs construct**: create a new stack with three roles:
  - **github-oidc-workflow-role** user used for authentication 
  - **cdk-oidc-deploy-role** role used for cdk deploying
  - **cdk-oidc-bootsrap-role** role used for cdk bootstrap

1. Create GithubOIDCStack
```
environment = process.env.ENVIRONMENT! || 'staging';

new GithubOIDCStack(app, 'OidcStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stage: environment,
  githubUser: 'username',
  githubRepository: 'repositoryName', # You can also use '*'
  tokenAction: TokenActions.ALL,
  cdkDeployRoleAwsManagedPolicies: ['AdministratorAccess'],
});
```

2. Use oidc role to authenticate the Github workflow
```
...

permissions:
  id-token: write
  contents: read

jobs:
  ...
  deploy:
    name: OIDC Auth
    runs-on: ubuntu-20.04
    steps:
      - name: Configure aws credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: arn:aws:iam::{ACCOUNT ID}:role/github-oidc-workflow-role
          aws-region: {REGION}
          mask-aws-account-id: no
  ...
```


### Create NewRelic Connection

The NewRelicStack implements the infrastructure to send metrics and logs to Newrelic through Kinesis and Cloudwatch Stream.
Once deployed you can copy the ARN of the 'NewRelicInfrastructure-Integrations' role and use it to configure Newrelic.

```
  new NewRelicStack(app, 'NewrelicStack', {
    env: constants.env,
    stage: constants.environment,
    newRelicBucketName: `newrelic-${constants.awsAccountId}-${constants.environment}`,
    newRelicAccountId: newRelicAccountId,
    newRelicLicenseKey: newRelicLicenseKey,
    newRelicApiUrlMetrics: EndpointUrlMetrics.EU_METRICS,
    newRelicApiUrlLogs: EndpointUrlLogs.EU_LOGS,
  });
```


## Dev mode

### Requirements

- Node >= v16.14.0
- Yarn >= 1.22

### Setup env

```
yarn install

npx projen default

chmod +x .husky/pre-commit

cd docs yarn install
```

## Contributors

### Rules

Read the [`CONTRIBUTING.md`](https://github.com/neulabscom/neulabs-cdk-constructs/blob/main/CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](https://github.com/neulabscom/neulabs-cdk-constructs/blob/main/CODE_OF_CONDUCT.md) before create pull-request.

### Developers

<a href="https://github.com/neulabscom/neulabs-cdk-constructs/graphs/contributors"> <img src="https://contrib.rocks/image?repo=neulabscom/neulabs-cdk-constructs" /> </a>

## License

See the `LICENSE` file for more information.