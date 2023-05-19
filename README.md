# Neulabs CDK Constructs


[![NPM](https://img.shields.io/npm/v/neulabs-cdk-constructs?color=blue&label=npm+cdk)](https://www.npmjs.com/package/neulabs-cdk-constructs)
[![PyPI](https://img.shields.io/pypi/v/neulabs-cdk-constructs?color=blue&label=pypi+cdk)](https://pypi.org/project/neulabs-cdk-constructs/)
[![PyPI](https://img.shields.io/github/last-commit/neulabscom/neulabs-cdk-constructs/main)](https://github.com/neulabscom/neulabs-cdk-constructs/commits/main)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/neulabscom/neulabs-cdk-constructs/blob/main/LICENSE)
[![View on Construct Hub](https://constructs.dev/badge?package=neulabs-cdk-constructs)](https://constructs.dev/packages/neulabs-cdk-constructs)

The neulabs-cdk-constructs library contains CDK-based constructs and stacks to allow the creation of cloud infrastructure on AWS.

The purpose of the library is to expose modules that can facilitate the creation and maintenance of the infrastructure as code.

Inside you will find generic stacks that allow the creation of services by simply instantiating a class, or constructs that implement logic to facilitate the developer and many other aspects.

We decided to develop it in Typescript, using projen for repository management, and the JSII library to be able to compile the neulabs-cdk-constructs package into multiple languages.
## Usage

**Package Installation (npm)**:

```
yarn add neulabs-cdk-constructs
# or
npm install neulabs-cdk-constructs
```

**Package Installation (python)**:
```
pip install neulabs-cdk-constructs
```

**Create Github OIDC**

The creation of Github OIDC allows a role within workflows to be used to log in to aws.
In this stack, the:
- github-oidc-workflow-role user used for authentication 
- cdk-oidc-deploy-role role used for deploying
- cdk-oidc-bootsrap-role role used for bootstrap

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
  cdkDeployRoleManagedPolicies: ['AdministratorAccess'],
});
```

Github workflow

```
...

# permission can be added at job level or workflow level
permissions:
  id-token: write
  contents: read    # This is required for actions/checkout

jobs:
  ...

  oidc:
    name: Auth
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

**Create NewRelic Connection**

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

### Dev mode

Run in shell

```
npx projen default
```

### Contributors

<a href="https://github.com/neulabscom/neulabs-cdk-constructs/graphs/contributors"> <img src="https://contrib.rocks/image?repo=neulabscom/neulabs-cdk-constructs" /> </a>

### License

See the `LICENSE` file for more information.