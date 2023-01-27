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

**Examples**

Stack for integration between AWS and New Relic.

File `app.py`

```
import aws_cdk as cdk

from neulabs_cdk_constructs.stacks.monitoring.newrelic import EndpointUrlLogs
from neulabs_cdk_constructs.stacks.monitoring.newrelic import EndpointUrlMetrics
from neulabs_cdk_constructs.stacks.monitoring.newrelic import NewRelicStack

app = cdk.App()

environment = cdk.Environment(
    account=os.getenv('CDK_DEFAULT_ACCOUNT'),
    region=os.getenv('CDK_DEFAULT_REGION'),
)

stage = os.getenv('ENVIRONMENT', 'develop')
new_relic_account_id = os.getenv('NEW_RELIC_ACCOUNT_ID')
new_relic_license_key = os.getenv('NEW_RELIC_LICENSE_KEY')

new_relic_stack = NewRelicStack(
    app,
    'NewRelicStack',
    env=environment,
    stage=stage,
    new_relic_bucket_name=f'neulabs-newrelic-{stage}',
    new_relic_account_id=new_relic_account_id,
    new_relic_license_key=new_relic_license_key,
    new_relic_api_url_metrics=EndpointUrlMetrics.EU_METRICS,
    new_relic_api_url_logs=EndpointUrlLogs.EU_LOGS,
)
```


### Contributors

<a href="https://github.com/neulabscom/neulabs-cdk-constructs/graphs/contributors"> <img src="https://contrib.rocks/image?repo=neulabscom/neulabs-cdk-constructs" /> </a>

### License

See the `LICENSE` file for more information.