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
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BaseStack <a name="BaseStack" id="neulabs-cdk-constructs.stack.BaseStack"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.stack.BaseStack.Initializer"></a>

```typescript
import { stack } from 'neulabs-cdk-constructs'

new stack.BaseStack(scope: Construct, id: string, props: BaseStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.stack.BaseStackProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.stack.BaseStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.stack.BaseStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.stack.BaseStack.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.stack.BaseStackProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.createResourcesGroup">createResourcesGroup</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.stack.BaseStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="neulabs-cdk-constructs.stack.BaseStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="neulabs-cdk-constructs.stack.BaseStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="neulabs-cdk-constructs.stack.BaseStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="neulabs-cdk-constructs.stack.BaseStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.stack.BaseStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.stack.BaseStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="neulabs-cdk-constructs.stack.BaseStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="neulabs-cdk-constructs.stack.BaseStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="neulabs-cdk-constructs.stack.BaseStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.stack.BaseStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.stack.BaseStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="neulabs-cdk-constructs.stack.BaseStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.stack.BaseStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.stack.BaseStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="neulabs-cdk-constructs.stack.BaseStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="neulabs-cdk-constructs.stack.BaseStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="neulabs-cdk-constructs.stack.BaseStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="neulabs-cdk-constructs.stack.BaseStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="neulabs-cdk-constructs.stack.BaseStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="neulabs-cdk-constructs.stack.BaseStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="neulabs-cdk-constructs.stack.BaseStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="neulabs-cdk-constructs.stack.BaseStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="neulabs-cdk-constructs.stack.BaseStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="neulabs-cdk-constructs.stack.BaseStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="neulabs-cdk-constructs.stack.BaseStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="neulabs-cdk-constructs.stack.BaseStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="neulabs-cdk-constructs.stack.BaseStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stack.BaseStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="neulabs-cdk-constructs.stack.BaseStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="neulabs-cdk-constructs.stack.BaseStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="neulabs-cdk-constructs.stack.BaseStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="neulabs-cdk-constructs.stack.BaseStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stack.BaseStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="neulabs-cdk-constructs.stack.BaseStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="neulabs-cdk-constructs.stack.BaseStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stack.BaseStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.stack.BaseStack.addBaseTags"></a>

```typescript
public addBaseTags(model: any, props?: BaseTagProps): void
```

###### `model`<sup>Required</sup> <a name="model" id="neulabs-cdk-constructs.stack.BaseStack.addBaseTags.parameter.model"></a>

- *Type:* any

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.stack.BaseStack.addBaseTags.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `createResourcesGroup` <a name="createResourcesGroup" id="neulabs-cdk-constructs.stack.BaseStack.createResourcesGroup"></a>

```typescript
public createResourcesGroup(): CfnGroup
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.stack.BaseStack.isConstruct"></a>

```typescript
import { stack } from 'neulabs-cdk-constructs'

stack.BaseStack.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.stack.BaseStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="neulabs-cdk-constructs.stack.BaseStack.isStack"></a>

```typescript
import { stack } from 'neulabs-cdk-constructs'

stack.BaseStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.stack.BaseStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="neulabs-cdk-constructs.stack.BaseStack.of"></a>

```typescript
import { stack } from 'neulabs-cdk-constructs'

stack.BaseStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.stack.BaseStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStack.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.stack.BaseStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="neulabs-cdk-constructs.stack.BaseStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="neulabs-cdk-constructs.stack.BaseStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="neulabs-cdk-constructs.stack.BaseStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="neulabs-cdk-constructs.stack.BaseStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="neulabs-cdk-constructs.stack.BaseStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="neulabs-cdk-constructs.stack.BaseStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="neulabs-cdk-constructs.stack.BaseStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="neulabs-cdk-constructs.stack.BaseStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="neulabs-cdk-constructs.stack.BaseStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="neulabs-cdk-constructs.stack.BaseStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="neulabs-cdk-constructs.stack.BaseStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="neulabs-cdk-constructs.stack.BaseStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="neulabs-cdk-constructs.stack.BaseStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="neulabs-cdk-constructs.stack.BaseStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="neulabs-cdk-constructs.stack.BaseStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="neulabs-cdk-constructs.stack.BaseStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="neulabs-cdk-constructs.stack.BaseStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="neulabs-cdk-constructs.stack.BaseStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="neulabs-cdk-constructs.stack.BaseStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.stack.BaseStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.stack.BaseStack.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---


### Function <a name="Function" id="neulabs-cdk-constructs.aws_lambda.Function"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.aws_lambda.Function.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

new aws_lambda.Function(scope: Construct, id: string, props: FunctionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.aws_lambda.FunctionProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.Function.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.Function.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.aws_lambda.FunctionProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addAlias">addAlias</a></code> | Defines an alias for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.invalidateVersionBasedOn">invalidateVersionBasedOn</a></code> | Mix additional information into the hash of the Version object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addBaseEnvironment">addBaseEnvironment</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.addBaseTags">addBaseTags</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.aws_lambda.Function.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="neulabs-cdk-constructs.aws_lambda.Function.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="neulabs-cdk-constructs.aws_lambda.Function.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="neulabs-cdk-constructs.aws_lambda.Function.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the aws-cdk-lib/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:
```
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="neulabs-cdk-constructs.aws_lambda.Function.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="neulabs-cdk-constructs.aws_lambda.Function.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.Function.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.Function.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="neulabs-cdk-constructs.aws_lambda.Function.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.Function.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="neulabs-cdk-constructs.aws_lambda.Function.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.Function.addPermission.parameter.id"></a>

- *Type:* string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="neulabs-cdk-constructs.aws_lambda.Function.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="neulabs-cdk-constructs.aws_lambda.Function.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="neulabs-cdk-constructs.aws_lambda.Function.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="neulabs-cdk-constructs.aws_lambda.Function.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.Function.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="neulabs-cdk-constructs.aws_lambda.Function.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.Function.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="neulabs-cdk-constructs.aws_lambda.Function.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="neulabs-cdk-constructs.aws_lambda.Function.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.Function.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="neulabs-cdk-constructs.aws_lambda.Function.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.Function.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="neulabs-cdk-constructs.aws_lambda.Function.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.Function.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="neulabs-cdk-constructs.aws_lambda.Function.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="neulabs-cdk-constructs.aws_lambda.Function.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="neulabs-cdk-constructs.aws_lambda.Function.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="neulabs-cdk-constructs.aws_lambda.Function.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="neulabs-cdk-constructs.aws_lambda.Function.addAlias"></a>

```typescript
public addAlias(aliasName: string, options?: AliasOptions): Alias
```

Defines an alias for this function.

The alias will automatically be updated to point to the latest version of
the function as it is being updated during a deployment.

```ts
declare const fn: lambda.Function;

fn.addAlias('Live');

// Is equivalent to

new lambda.Alias(this, 'AliasLive', {
  aliasName: 'Live',
  version: fn.currentVersion,
});
```

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="neulabs-cdk-constructs.aws_lambda.Function.addAlias.parameter.aliasName"></a>

- *Type:* string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.Function.addAlias.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="neulabs-cdk-constructs.aws_lambda.Function.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.aws_lambda.Function.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.aws_lambda.Function.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.Function.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="neulabs-cdk-constructs.aws_lambda.Function.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.Function.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

##### `invalidateVersionBasedOn` <a name="invalidateVersionBasedOn" id="neulabs-cdk-constructs.aws_lambda.Function.invalidateVersionBasedOn"></a>

```typescript
public invalidateVersionBasedOn(x: string): void
```

Mix additional information into the hash of the Version object.

The Lambda Function construct does its best to automatically create a new
Version when anything about the Function changes (its code, its layers,
any of the other properties).

However, you can sometimes source information from places that the CDK cannot
look into, like the deploy-time values of SSM parameters. In those cases,
the CDK would not force the creation of a new Version object when it actually
should.

This method can be used to invalidate the current Version object. Pass in
any string into this method, and make sure the string changes when you know
a new Version needs to be created.

This method may be called more than once.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.Function.invalidateVersionBasedOn.parameter.x"></a>

- *Type:* string

---

##### `addBaseEnvironment` <a name="addBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.Function.addBaseEnvironment"></a>

```typescript
public addBaseEnvironment(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.Function.addBaseEnvironment.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.aws_lambda.Function.addBaseTags"></a>

```typescript
public addBaseTags(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.Function.addBaseTags.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.classifyVersionProperty">classifyVersionProperty</a></code> | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.fromFunctionArn">fromFunctionArn</a></code> | Import a lambda function into the CDK using its ARN. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.fromFunctionAttributes">fromFunctionAttributes</a></code> | Creates a Lambda function object which represents a function not defined within this stack. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.fromFunctionName">fromFunctionName</a></code> | Import a lambda function into the CDK using its name. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAll">metricAll</a></code> | Return the given named metric for this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code> | Metric for the number of concurrent executions across all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAllDuration">metricAllDuration</a></code> | Metric for the Duration executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAllErrors">metricAllErrors</a></code> | Metric for the number of Errors executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAllInvocations">metricAllInvocations</a></code> | Metric for the number of invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAllThrottles">metricAllThrottles</a></code> | Metric for the number of throttled invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.aws_lambda.Function.isConstruct"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.Function.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="neulabs-cdk-constructs.aws_lambda.Function.isOwnedResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.Function.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="neulabs-cdk-constructs.aws_lambda.Function.isResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.Function.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="neulabs-cdk-constructs.aws_lambda.Function.classifyVersionProperty"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="neulabs-cdk-constructs.aws_lambda.Function.classifyVersionProperty.parameter.propertyName"></a>

- *Type:* string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="neulabs-cdk-constructs.aws_lambda.Function.classifyVersionProperty.parameter.locked"></a>

- *Type:* boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionArn"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionArn.parameter.id"></a>

- *Type:* string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionArn.parameter.functionArn"></a>

- *Type:* string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionAttributes"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionAttributes.parameter.id"></a>

- *Type:* string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionName"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionName.parameter.id"></a>

- *Type:* string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.Function.fromFunctionName.parameter.functionName"></a>

- *Type:* string

---

##### `metricAll` <a name="metricAll" id="neulabs-cdk-constructs.aws_lambda.Function.metricAll"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.Function.metricAll.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAll.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllDuration"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllErrors"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllInvocations"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllThrottles"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.Function.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.Function.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.functionArn">functionArn</a></code> | <code>string</code> | ARN of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.functionName">functionName</a></code> | <code>string</code> | Name of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.Function.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.aws_lambda.Function.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="neulabs-cdk-constructs.aws_lambda.Function.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="neulabs-cdk-constructs.aws_lambda.Function.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.Function.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="neulabs-cdk-constructs.aws_lambda.Function.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.Function.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.Function.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="neulabs-cdk-constructs.aws_lambda.Function.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="neulabs-cdk-constructs.aws_lambda.Function.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="neulabs-cdk-constructs.aws_lambda.Function.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="neulabs-cdk-constructs.aws_lambda.Function.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="neulabs-cdk-constructs.aws_lambda.Function.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.Function.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="neulabs-cdk-constructs.aws_lambda.Function.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="neulabs-cdk-constructs.aws_lambda.Function.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.Function.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.Function.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.Function.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.Function.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

The timeout configured for this lambda.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.Function.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---


### FunctionNode <a name="FunctionNode" id="neulabs-cdk-constructs.aws_lambda.FunctionNode"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

new aws_lambda.FunctionNode(scope: Construct, id: string, __2: FunctionNodeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer.parameter.__2">__2</a></code> | <code>neulabs-cdk-constructs.aws_lambda.FunctionNodeProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer.parameter.id"></a>

- *Type:* string

---

##### `__2`<sup>Required</sup> <a name="__2" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.Initializer.parameter.__2"></a>

- *Type:* neulabs-cdk-constructs.aws_lambda.FunctionNodeProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addAlias">addAlias</a></code> | Defines an alias for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.invalidateVersionBasedOn">invalidateVersionBasedOn</a></code> | Mix additional information into the hash of the Version object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addBaseEnvironment">addBaseEnvironment</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.addPowerToolsLayer">addPowerToolsLayer</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the aws-cdk-lib/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:
```
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addPermission.parameter.id"></a>

- *Type:* string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addAlias"></a>

```typescript
public addAlias(aliasName: string, options?: AliasOptions): Alias
```

Defines an alias for this function.

The alias will automatically be updated to point to the latest version of
the function as it is being updated during a deployment.

```ts
declare const fn: lambda.Function;

fn.addAlias('Live');

// Is equivalent to

new lambda.Alias(this, 'AliasLive', {
  aliasName: 'Live',
  version: fn.currentVersion,
});
```

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addAlias.parameter.aliasName"></a>

- *Type:* string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addAlias.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

##### `invalidateVersionBasedOn` <a name="invalidateVersionBasedOn" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.invalidateVersionBasedOn"></a>

```typescript
public invalidateVersionBasedOn(x: string): void
```

Mix additional information into the hash of the Version object.

The Lambda Function construct does its best to automatically create a new
Version when anything about the Function changes (its code, its layers,
any of the other properties).

However, you can sometimes source information from places that the CDK cannot
look into, like the deploy-time values of SSM parameters. In those cases,
the CDK would not force the creation of a new Version object when it actually
should.

This method can be used to invalidate the current Version object. Pass in
any string into this method, and make sure the string changes when you know
a new Version needs to be created.

This method may be called more than once.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.invalidateVersionBasedOn.parameter.x"></a>

- *Type:* string

---

##### `addBaseEnvironment` <a name="addBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addBaseEnvironment"></a>

```typescript
public addBaseEnvironment(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addBaseEnvironment.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addBaseTags"></a>

```typescript
public addBaseTags(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addBaseTags.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `addPowerToolsLayer` <a name="addPowerToolsLayer" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addPowerToolsLayer"></a>

```typescript
public addPowerToolsLayer(scope: Construct, props: ILambdaPowerToolsProps): void
```

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addPowerToolsLayer.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.addPowerToolsLayer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.classifyVersionProperty">classifyVersionProperty</a></code> | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionArn">fromFunctionArn</a></code> | Import a lambda function into the CDK using its ARN. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionAttributes">fromFunctionAttributes</a></code> | Creates a Lambda function object which represents a function not defined within this stack. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionName">fromFunctionName</a></code> | Import a lambda function into the CDK using its name. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAll">metricAll</a></code> | Return the given named metric for this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code> | Metric for the number of concurrent executions across all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllDuration">metricAllDuration</a></code> | Metric for the Duration executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllErrors">metricAllErrors</a></code> | Metric for the number of Errors executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllInvocations">metricAllInvocations</a></code> | Metric for the number of invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllThrottles">metricAllThrottles</a></code> | Metric for the number of throttled invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.isConstruct"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.isOwnedResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.isResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.classifyVersionProperty"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.classifyVersionProperty.parameter.propertyName"></a>

- *Type:* string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.classifyVersionProperty.parameter.locked"></a>

- *Type:* boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionArn"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionArn.parameter.id"></a>

- *Type:* string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionArn.parameter.functionArn"></a>

- *Type:* string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionAttributes"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionAttributes.parameter.id"></a>

- *Type:* string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionName"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionName.parameter.id"></a>

- *Type:* string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.fromFunctionName.parameter.functionName"></a>

- *Type:* string

---

##### `metricAll` <a name="metricAll" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAll"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAll.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAll.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllDuration"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllErrors"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllInvocations"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllThrottles"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.FunctionNode.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.functionArn">functionArn</a></code> | <code>string</code> | ARN of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.functionName">functionName</a></code> | <code>string</code> | Name of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNode.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

The timeout configured for this lambda.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.FunctionNode.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---


### GithubOIDCStack <a name="GithubOIDCStack" id="neulabs-cdk-constructs.oidc.GithubOIDCStack"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer"></a>

```typescript
import { oidc } from 'neulabs-cdk-constructs'

new oidc.GithubOIDCStack(scope: Construct, id: string, props: GithubOIDCStackStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.createResourcesGroup">createResourcesGroup</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkBootstrapRole">createCdkBootstrapRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkDeployRole">createCdkDeployRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.createOidcRole">createOidcRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.createTokenAction">createTokenAction</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addBaseTags"></a>

```typescript
public addBaseTags(model: any, props?: BaseTagProps): void
```

###### `model`<sup>Required</sup> <a name="model" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addBaseTags.parameter.model"></a>

- *Type:* any

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.addBaseTags.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `createResourcesGroup` <a name="createResourcesGroup" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createResourcesGroup"></a>

```typescript
public createResourcesGroup(): CfnGroup
```

##### `createCdkBootstrapRole` <a name="createCdkBootstrapRole" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkBootstrapRole"></a>

```typescript
public createCdkBootstrapRole(roleName?: string): IRole
```

###### `roleName`<sup>Optional</sup> <a name="roleName" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkBootstrapRole.parameter.roleName"></a>

- *Type:* string

---

##### `createCdkDeployRole` <a name="createCdkDeployRole" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkDeployRole"></a>

```typescript
public createCdkDeployRole(roleName?: string, managed_policies?: string[], aws_managed_policy?: string[], policy_statements?: PolicyStatement[]): IRole
```

###### `roleName`<sup>Optional</sup> <a name="roleName" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkDeployRole.parameter.roleName"></a>

- *Type:* string

---

###### `managed_policies`<sup>Optional</sup> <a name="managed_policies" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkDeployRole.parameter.managed_policies"></a>

- *Type:* string[]

---

###### `aws_managed_policy`<sup>Optional</sup> <a name="aws_managed_policy" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkDeployRole.parameter.aws_managed_policy"></a>

- *Type:* string[]

---

###### `policy_statements`<sup>Optional</sup> <a name="policy_statements" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createCdkDeployRole.parameter.policy_statements"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]

---

##### `createOidcRole` <a name="createOidcRole" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createOidcRole"></a>

```typescript
public createOidcRole(providerUrl: string, token: string, roleName?: string): IRole
```

###### `providerUrl`<sup>Required</sup> <a name="providerUrl" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createOidcRole.parameter.providerUrl"></a>

- *Type:* string

---

###### `token`<sup>Required</sup> <a name="token" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createOidcRole.parameter.token"></a>

- *Type:* string

---

###### `roleName`<sup>Optional</sup> <a name="roleName" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createOidcRole.parameter.roleName"></a>

- *Type:* string

---

##### `createTokenAction` <a name="createTokenAction" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createTokenAction"></a>

```typescript
public createTokenAction(tokenAction: TokenActions, githubUser: string, githubRepository: string, tokenActionCustom?: string): string
```

###### `tokenAction`<sup>Required</sup> <a name="tokenAction" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createTokenAction.parameter.tokenAction"></a>

- *Type:* neulabs-cdk-constructs.oidc.TokenActions

---

###### `githubUser`<sup>Required</sup> <a name="githubUser" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createTokenAction.parameter.githubUser"></a>

- *Type:* string

---

###### `githubRepository`<sup>Required</sup> <a name="githubRepository" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createTokenAction.parameter.githubRepository"></a>

- *Type:* string

---

###### `tokenActionCustom`<sup>Optional</sup> <a name="tokenActionCustom" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.createTokenAction.parameter.tokenActionCustom"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.isConstruct"></a>

```typescript
import { oidc } from 'neulabs-cdk-constructs'

oidc.GithubOIDCStack.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.isStack"></a>

```typescript
import { oidc } from 'neulabs-cdk-constructs'

oidc.GithubOIDCStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.of"></a>

```typescript
import { oidc } from 'neulabs-cdk-constructs'

oidc.GithubOIDCStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkBootstrapRole">cdkBootstrapRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRole">cdkDeployRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.githubRepository">githubRepository</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.githubUser">githubUser</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.oidcRole">oidcRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.tokenAction">tokenAction</a></code> | <code>neulabs-cdk-constructs.oidc.TokenActions</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRoleAwsManagedPolicies">cdkDeployRoleAwsManagedPolicies</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRoleManagedPolicies">cdkDeployRoleManagedPolicies</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRolePolicyStatements">cdkDeployRolePolicyStatements</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `cdkBootstrapRole`<sup>Required</sup> <a name="cdkBootstrapRole" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkBootstrapRole"></a>

```typescript
public readonly cdkBootstrapRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `cdkDeployRole`<sup>Required</sup> <a name="cdkDeployRole" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRole"></a>

```typescript
public readonly cdkDeployRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `githubRepository`<sup>Required</sup> <a name="githubRepository" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.githubRepository"></a>

```typescript
public readonly githubRepository: string;
```

- *Type:* string

---

##### `githubUser`<sup>Required</sup> <a name="githubUser" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.githubUser"></a>

```typescript
public readonly githubUser: string;
```

- *Type:* string

---

##### `oidcRole`<sup>Required</sup> <a name="oidcRole" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.oidcRole"></a>

```typescript
public readonly oidcRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `tokenAction`<sup>Required</sup> <a name="tokenAction" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.tokenAction"></a>

```typescript
public readonly tokenAction: TokenActions;
```

- *Type:* neulabs-cdk-constructs.oidc.TokenActions

---

##### `cdkDeployRoleAwsManagedPolicies`<sup>Optional</sup> <a name="cdkDeployRoleAwsManagedPolicies" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRoleAwsManagedPolicies"></a>

```typescript
public readonly cdkDeployRoleAwsManagedPolicies: string[];
```

- *Type:* string[]

---

##### `cdkDeployRoleManagedPolicies`<sup>Optional</sup> <a name="cdkDeployRoleManagedPolicies" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRoleManagedPolicies"></a>

```typescript
public readonly cdkDeployRoleManagedPolicies: string[];
```

- *Type:* string[]

---

##### `cdkDeployRolePolicyStatements`<sup>Optional</sup> <a name="cdkDeployRolePolicyStatements" id="neulabs-cdk-constructs.oidc.GithubOIDCStack.property.cdkDeployRolePolicyStatements"></a>

```typescript
public readonly cdkDeployRolePolicyStatements: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]

---


### NewRelicFunction <a name="NewRelicFunction" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

new aws_lambda.NewRelicFunction(scope: Construct, id: string, props: FunctionNewRelicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addAlias">addAlias</a></code> | Defines an alias for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.invalidateVersionBasedOn">invalidateVersionBasedOn</a></code> | Mix additional information into the hash of the Version object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addBaseEnvironment">addBaseEnvironment</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addBaseTags">addBaseTags</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the aws-cdk-lib/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:
```
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addPermission.parameter.id"></a>

- *Type:* string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addAlias"></a>

```typescript
public addAlias(aliasName: string, options?: AliasOptions): Alias
```

Defines an alias for this function.

The alias will automatically be updated to point to the latest version of
the function as it is being updated during a deployment.

```ts
declare const fn: lambda.Function;

fn.addAlias('Live');

// Is equivalent to

new lambda.Alias(this, 'AliasLive', {
  aliasName: 'Live',
  version: fn.currentVersion,
});
```

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addAlias.parameter.aliasName"></a>

- *Type:* string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addAlias.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

##### `invalidateVersionBasedOn` <a name="invalidateVersionBasedOn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.invalidateVersionBasedOn"></a>

```typescript
public invalidateVersionBasedOn(x: string): void
```

Mix additional information into the hash of the Version object.

The Lambda Function construct does its best to automatically create a new
Version when anything about the Function changes (its code, its layers,
any of the other properties).

However, you can sometimes source information from places that the CDK cannot
look into, like the deploy-time values of SSM parameters. In those cases,
the CDK would not force the creation of a new Version object when it actually
should.

This method can be used to invalidate the current Version object. Pass in
any string into this method, and make sure the string changes when you know
a new Version needs to be created.

This method may be called more than once.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.invalidateVersionBasedOn.parameter.x"></a>

- *Type:* string

---

##### `addBaseEnvironment` <a name="addBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addBaseEnvironment"></a>

```typescript
public addBaseEnvironment(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addBaseEnvironment.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addBaseTags"></a>

```typescript
public addBaseTags(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.addBaseTags.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.classifyVersionProperty">classifyVersionProperty</a></code> | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionArn">fromFunctionArn</a></code> | Import a lambda function into the CDK using its ARN. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionAttributes">fromFunctionAttributes</a></code> | Creates a Lambda function object which represents a function not defined within this stack. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionName">fromFunctionName</a></code> | Import a lambda function into the CDK using its name. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAll">metricAll</a></code> | Return the given named metric for this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code> | Metric for the number of concurrent executions across all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllDuration">metricAllDuration</a></code> | Metric for the Duration executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllErrors">metricAllErrors</a></code> | Metric for the number of Errors executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllInvocations">metricAllInvocations</a></code> | Metric for the number of invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllThrottles">metricAllThrottles</a></code> | Metric for the number of throttled invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isConstruct"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isOwnedResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.classifyVersionProperty"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.classifyVersionProperty.parameter.propertyName"></a>

- *Type:* string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.classifyVersionProperty.parameter.locked"></a>

- *Type:* boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionArn"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionArn.parameter.id"></a>

- *Type:* string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionArn.parameter.functionArn"></a>

- *Type:* string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionAttributes"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionAttributes.parameter.id"></a>

- *Type:* string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionName"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionName.parameter.id"></a>

- *Type:* string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.fromFunctionName.parameter.functionName"></a>

- *Type:* string

---

##### `metricAll` <a name="metricAll" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAll"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAll.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAll.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllDuration"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllErrors"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllInvocations"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllThrottles"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunction.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.functionArn">functionArn</a></code> | <code>string</code> | ARN of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.functionName">functionName</a></code> | <code>string</code> | Name of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

The timeout configured for this lambda.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunction.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---


### NewRelicFunctionNode <a name="NewRelicFunctionNode" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

new aws_lambda.NewRelicFunctionNode(scope: Construct, id: string, props: FunctionNodeNewRelicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSource">addEventSource</a></code> | Adds an event source to this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSourceMapping">addEventSourceMapping</a></code> | Adds an event source that maps to this AWS Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addFunctionUrl">addFunctionUrl</a></code> | Adds a url to this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPermission">addPermission</a></code> | Adds a permission to the Lambda resource policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addToRolePolicy">addToRolePolicy</a></code> | Adds a statement to the IAM role assumed by the instance. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.configureAsyncInvoke">configureAsyncInvoke</a></code> | Configures options for asynchronous invocation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.considerWarningOnInvokeFunctionPermissions">considerWarningOnInvokeFunctionPermissions</a></code> | A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.grantInvoke">grantInvoke</a></code> | Grant the given identity permissions to invoke this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.grantInvokeUrl">grantInvokeUrl</a></code> | Grant the given identity permissions to invoke this Lambda Function URL. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metric">metric</a></code> | Return the given named metric for this Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricDuration">metricDuration</a></code> | How long execution of this Lambda takes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricErrors">metricErrors</a></code> | How many invocations of this Lambda fail. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricInvocations">metricInvocations</a></code> | How often this Lambda is invoked. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricThrottles">metricThrottles</a></code> | How often this Lambda is throttled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addAlias">addAlias</a></code> | Defines an alias for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEnvironment">addEnvironment</a></code> | Adds an environment variable to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addLayers">addLayers</a></code> | Adds one or more Lambda Layers to this Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.invalidateVersionBasedOn">invalidateVersionBasedOn</a></code> | Mix additional information into the hash of the Version object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addBaseEnvironment">addBaseEnvironment</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPowerToolsLayer">addPowerToolsLayer</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addEventSource` <a name="addEventSource" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSource"></a>

```typescript
public addEventSource(source: IEventSource): void
```

Adds an event source to this function.

Event sources are implemented in the aws-cdk-lib/aws-lambda-event-sources module.

The following example adds an SQS Queue as an event source:
```
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
myFunction.addEventSource(new SqsEventSource(myQueue));
```

###### `source`<sup>Required</sup> <a name="source" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSource.parameter.source"></a>

- *Type:* aws-cdk-lib.aws_lambda.IEventSource

---

##### `addEventSourceMapping` <a name="addEventSourceMapping" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSourceMapping"></a>

```typescript
public addEventSourceMapping(id: string, options: EventSourceMappingOptions): EventSourceMapping
```

Adds an event source that maps to this AWS Lambda function.

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSourceMapping.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEventSourceMapping.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventSourceMappingOptions

---

##### `addFunctionUrl` <a name="addFunctionUrl" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addFunctionUrl"></a>

```typescript
public addFunctionUrl(options?: FunctionUrlOptions): FunctionUrl
```

Adds a url to this lambda function.

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addFunctionUrl.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

---

##### `addPermission` <a name="addPermission" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPermission"></a>

```typescript
public addPermission(id: string, permission: Permission): void
```

Adds a permission to the Lambda resource policy.

> [Permission for details.](Permission for details.)

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPermission.parameter.id"></a>

- *Type:* string

The id for the permission construct.

---

###### `permission`<sup>Required</sup> <a name="permission" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.Permission

The permission to grant to this Lambda function.

---

##### `addToRolePolicy` <a name="addToRolePolicy" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addToRolePolicy"></a>

```typescript
public addToRolePolicy(statement: PolicyStatement): void
```

Adds a statement to the IAM role assumed by the instance.

###### `statement`<sup>Required</sup> <a name="statement" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addToRolePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `configureAsyncInvoke` <a name="configureAsyncInvoke" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.configureAsyncInvoke"></a>

```typescript
public configureAsyncInvoke(options: EventInvokeConfigOptions): void
```

Configures options for asynchronous invocation.

###### `options`<sup>Required</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.configureAsyncInvoke.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EventInvokeConfigOptions

---

##### `considerWarningOnInvokeFunctionPermissions` <a name="considerWarningOnInvokeFunctionPermissions" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.considerWarningOnInvokeFunctionPermissions"></a>

```typescript
public considerWarningOnInvokeFunctionPermissions(scope: Construct, action: string): void
```

A warning will be added to functions under the following conditions: - permissions that include `lambda:InvokeFunction` are added to the unqualified function.

function.currentVersion is invoked before or after the permission is created.

This applies only to permissions on Lambda functions, not versions or aliases.
This function is overridden as a noOp for QualifiedFunctionBase.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.considerWarningOnInvokeFunctionPermissions.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `action`<sup>Required</sup> <a name="action" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.considerWarningOnInvokeFunctionPermissions.parameter.action"></a>

- *Type:* string

---

##### `grantInvoke` <a name="grantInvoke" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.grantInvoke"></a>

```typescript
public grantInvoke(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.grantInvoke.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `grantInvokeUrl` <a name="grantInvokeUrl" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.grantInvokeUrl"></a>

```typescript
public grantInvokeUrl(grantee: IGrantable): Grant
```

Grant the given identity permissions to invoke this Lambda Function URL.

###### `grantee`<sup>Required</sup> <a name="grantee" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.grantInvokeUrl.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Function.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricDuration` <a name="metricDuration" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricDuration"></a>

```typescript
public metricDuration(props?: MetricOptions): Metric
```

How long execution of this Lambda takes.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricErrors` <a name="metricErrors" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricErrors"></a>

```typescript
public metricErrors(props?: MetricOptions): Metric
```

How many invocations of this Lambda fail.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricInvocations` <a name="metricInvocations" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricInvocations"></a>

```typescript
public metricInvocations(props?: MetricOptions): Metric
```

How often this Lambda is invoked.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottles` <a name="metricThrottles" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricThrottles"></a>

```typescript
public metricThrottles(props?: MetricOptions): Metric
```

How often this Lambda is throttled.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `addAlias` <a name="addAlias" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addAlias"></a>

```typescript
public addAlias(aliasName: string, options?: AliasOptions): Alias
```

Defines an alias for this function.

The alias will automatically be updated to point to the latest version of
the function as it is being updated during a deployment.

```ts
declare const fn: lambda.Function;

fn.addAlias('Live');

// Is equivalent to

new lambda.Alias(this, 'AliasLive', {
  aliasName: 'Live',
  version: fn.currentVersion,
});
```

###### `aliasName`<sup>Required</sup> <a name="aliasName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addAlias.parameter.aliasName"></a>

- *Type:* string

The name of the alias.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addAlias.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.AliasOptions

Alias options.

---

##### `addEnvironment` <a name="addEnvironment" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEnvironment"></a>

```typescript
public addEnvironment(key: string, value: string, options?: EnvironmentOptions): Function
```

Adds an environment variable to this Lambda function.

If this is a ref to a Lambda function, this operation results in a no-op.

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEnvironment.parameter.key"></a>

- *Type:* string

The environment variable key.

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEnvironment.parameter.value"></a>

- *Type:* string

The environment variable's value.

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addEnvironment.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.EnvironmentOptions

Environment variable options.

---

##### `addLayers` <a name="addLayers" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addLayers"></a>

```typescript
public addLayers(layers: ILayerVersion): void
```

Adds one or more Lambda Layers to this Lambda function.

###### `layers`<sup>Required</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addLayers.parameter.layers"></a>

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

the layers to be added.

---

##### `invalidateVersionBasedOn` <a name="invalidateVersionBasedOn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.invalidateVersionBasedOn"></a>

```typescript
public invalidateVersionBasedOn(x: string): void
```

Mix additional information into the hash of the Version object.

The Lambda Function construct does its best to automatically create a new
Version when anything about the Function changes (its code, its layers,
any of the other properties).

However, you can sometimes source information from places that the CDK cannot
look into, like the deploy-time values of SSM parameters. In those cases,
the CDK would not force the creation of a new Version object when it actually
should.

This method can be used to invalidate the current Version object. Pass in
any string into this method, and make sure the string changes when you know
a new Version needs to be created.

This method may be called more than once.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.invalidateVersionBasedOn.parameter.x"></a>

- *Type:* string

---

##### `addBaseEnvironment` <a name="addBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addBaseEnvironment"></a>

```typescript
public addBaseEnvironment(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addBaseEnvironment.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addBaseTags"></a>

```typescript
public addBaseTags(values?: BaseTagProps): void
```

###### `values`<sup>Optional</sup> <a name="values" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addBaseTags.parameter.values"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `addPowerToolsLayer` <a name="addPowerToolsLayer" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPowerToolsLayer"></a>

```typescript
public addPowerToolsLayer(scope: Construct, props: ILambdaPowerToolsProps): void
```

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPowerToolsLayer.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.addPowerToolsLayer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.classifyVersionProperty">classifyVersionProperty</a></code> | Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionArn">fromFunctionArn</a></code> | Import a lambda function into the CDK using its ARN. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionAttributes">fromFunctionAttributes</a></code> | Creates a Lambda function object which represents a function not defined within this stack. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionName">fromFunctionName</a></code> | Import a lambda function into the CDK using its name. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAll">metricAll</a></code> | Return the given named metric for this Lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllConcurrentExecutions">metricAllConcurrentExecutions</a></code> | Metric for the number of concurrent executions across all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllDuration">metricAllDuration</a></code> | Metric for the Duration executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllErrors">metricAllErrors</a></code> | Metric for the number of Errors executing all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllInvocations">metricAllInvocations</a></code> | Metric for the number of invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllThrottles">metricAllThrottles</a></code> | Metric for the number of throttled invocations of all Lambdas. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllUnreservedConcurrentExecutions">metricAllUnreservedConcurrentExecutions</a></code> | Metric for the number of unreserved concurrent executions across all Lambdas. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isConstruct"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isOwnedResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isResource"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `classifyVersionProperty` <a name="classifyVersionProperty" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.classifyVersionProperty"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.classifyVersionProperty(propertyName: string, locked: boolean)
```

Record whether specific properties in the `AWS::Lambda::Function` resource should also be associated to the Version resource.

See 'currentVersion' section in the module README for more details.

###### `propertyName`<sup>Required</sup> <a name="propertyName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.classifyVersionProperty.parameter.propertyName"></a>

- *Type:* string

The property to classify.

---

###### `locked`<sup>Required</sup> <a name="locked" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.classifyVersionProperty.parameter.locked"></a>

- *Type:* boolean

whether the property should be associated to the version or not.

---

##### `fromFunctionArn` <a name="fromFunctionArn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionArn"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.fromFunctionArn(scope: Construct, id: string, functionArn: string)
```

Import a lambda function into the CDK using its ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionArn.parameter.id"></a>

- *Type:* string

---

###### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionArn.parameter.functionArn"></a>

- *Type:* string

---

##### `fromFunctionAttributes` <a name="fromFunctionAttributes" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionAttributes"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.fromFunctionAttributes(scope: Construct, id: string, attrs: FunctionAttributes)
```

Creates a Lambda function object which represents a function not defined within this stack.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionAttributes.parameter.id"></a>

- *Type:* string

The name of the lambda construct.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.FunctionAttributes

the attributes of the function to import.

---

##### `fromFunctionName` <a name="fromFunctionName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionName"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.fromFunctionName(scope: Construct, id: string, functionName: string)
```

Import a lambda function into the CDK using its name.

###### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionName.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionName.parameter.id"></a>

- *Type:* string

---

###### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.fromFunctionName.parameter.functionName"></a>

- *Type:* string

---

##### `metricAll` <a name="metricAll" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAll"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAll(metricName: string, props?: MetricOptions)
```

Return the given named metric for this Lambda.

###### `metricName`<sup>Required</sup> <a name="metricName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAll.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAll.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllConcurrentExecutions` <a name="metricAllConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAllConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllDuration` <a name="metricAllDuration" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllDuration"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAllDuration(props?: MetricOptions)
```

Metric for the Duration executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllDuration.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllErrors` <a name="metricAllErrors" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllErrors"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAllErrors(props?: MetricOptions)
```

Metric for the number of Errors executing all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllInvocations` <a name="metricAllInvocations" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllInvocations"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAllInvocations(props?: MetricOptions)
```

Metric for the number of invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllInvocations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllThrottles` <a name="metricAllThrottles" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllThrottles"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAllThrottles(props?: MetricOptions)
```

Metric for the number of throttled invocations of all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllThrottles.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricAllUnreservedConcurrentExecutions` <a name="metricAllUnreservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllUnreservedConcurrentExecutions"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

aws_lambda.NewRelicFunctionNode.metricAllUnreservedConcurrentExecutions(props?: MetricOptions)
```

Metric for the number of unreserved concurrent executions across all Lambdas.

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.metricAllUnreservedConcurrentExecutions.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.functionArn">functionArn</a></code> | <code>string</code> | ARN of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.functionName">functionName</a></code> | <code>string</code> | Name of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal this Lambda Function is running as. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.isBoundToVpc">isBoundToVpc</a></code> | <code>boolean</code> | Whether or not this Lambda function was bound to a VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.latestVersion">latestVersion</a></code> | <code>aws-cdk-lib.aws_lambda.IVersion</code> | The `$LATEST` version of this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.permissionsNode">permissionsNode</a></code> | <code>constructs.Node</code> | The construct node where permissions are attached. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.resourceArnsForGrantInvoke">resourceArnsForGrantInvoke</a></code> | <code>string[]</code> | The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke(). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.currentVersion">currentVersion</a></code> | <code>aws-cdk-lib.aws_lambda.Version</code> | Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.ILogGroup</code> | The LogGroup where the Lambda function's logs are made available. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The DLQ (as queue) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The DLQ (as topic) associated with this Lambda Function (this is an optional attribute). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout configured for this lambda. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `architecture`<sup>Required</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture of this Lambda Function (this is an optional attribute and defaults to X86_64).

---

##### `connections`<sup>Required</sup> <a name="connections" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Lambda Function

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

ARN of this function.

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

Name of this function.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal this Lambda Function is running as.

---

##### `isBoundToVpc`<sup>Required</sup> <a name="isBoundToVpc" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.isBoundToVpc"></a>

```typescript
public readonly isBoundToVpc: boolean;
```

- *Type:* boolean

Whether or not this Lambda function was bound to a VPC.

If this is is `false`, trying to access the `connections` object will fail.

---

##### `latestVersion`<sup>Required</sup> <a name="latestVersion" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.latestVersion"></a>

```typescript
public readonly latestVersion: IVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.IVersion

The `$LATEST` version of this function.

Note that this is reference to a non-specific AWS Lambda version, which
means the function this version refers to can return different results in
different invocations.

To obtain a reference to an explicit version which references the current
function configuration, use `lambdaFunction.currentVersion` instead.

---

##### `permissionsNode`<sup>Required</sup> <a name="permissionsNode" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.permissionsNode"></a>

```typescript
public readonly permissionsNode: Node;
```

- *Type:* constructs.Node

The construct node where permissions are attached.

---

##### `resourceArnsForGrantInvoke`<sup>Required</sup> <a name="resourceArnsForGrantInvoke" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.resourceArnsForGrantInvoke"></a>

```typescript
public readonly resourceArnsForGrantInvoke: string[];
```

- *Type:* string[]

The ARN(s) to put into the resource field of the generated IAM policy for grantInvoke().

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this function.

---

##### `currentVersion`<sup>Required</sup> <a name="currentVersion" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.currentVersion"></a>

```typescript
public readonly currentVersion: Version;
```

- *Type:* aws-cdk-lib.aws_lambda.Version

Returns a `lambda.Version` which represents the current version of this Lambda function. A new version will be created every time the function's configuration changes.

You can specify options for this version using the `currentVersionOptions`
prop when initializing the `lambda.Function`.

---

##### `logGroup`<sup>Required</sup> <a name="logGroup" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.logGroup"></a>

```typescript
public readonly logGroup: ILogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.ILogGroup

The LogGroup where the Lambda function's logs are made available.

If either `logRetention` is set or this property is called, a CloudFormation custom resource is added to the stack that
pre-creates the log group as part of the stack deployment, if it already doesn't exist, and sets the correct log retention
period (never expire, by default).

Further, if the log group already exists and the `logRetention` is not set, the custom resource will reset the log retention
to never expire even if it was configured with a different value.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime configured for this lambda.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue

The DLQ (as queue) associated with this Lambda Function (this is an optional attribute).

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The DLQ (as topic) associated with this Lambda Function (this is an optional attribute).

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration

The timeout configured for this lambda.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.NewRelicFunctionNode.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---


### NewRelicStack <a name="NewRelicStack" id="neulabs-cdk-constructs.newrelic.NewRelicStack"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer"></a>

```typescript
import { newrelic } from 'neulabs-cdk-constructs'

new newrelic.NewRelicStack(scope: Construct, id: string, props: NewRelicStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.newrelic.NewRelicStackProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.newrelic.NewRelicStack.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.newrelic.NewRelicStackProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createResourcesGroup">createResourcesGroup</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createCloudwatchLogsStreamRole">createCloudwatchLogsStreamRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createCloudwatchMetricStream">createCloudwatchMetricStream</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseBucket">createFirehoseBucket</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseRole">createFirehoseRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream">createFirehoseStream</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createNewRelicRole">createNewRelicRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.createSecrets">createSecrets</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.newrelic.NewRelicStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="neulabs-cdk-constructs.newrelic.NewRelicStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.newrelic.NewRelicStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.newrelic.NewRelicStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="neulabs-cdk-constructs.newrelic.NewRelicStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.newrelic.NewRelicStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.newrelic.NewRelicStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="neulabs-cdk-constructs.newrelic.NewRelicStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="neulabs-cdk-constructs.newrelic.NewRelicStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="neulabs-cdk-constructs.newrelic.NewRelicStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="neulabs-cdk-constructs.newrelic.NewRelicStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="neulabs-cdk-constructs.newrelic.NewRelicStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="neulabs-cdk-constructs.newrelic.NewRelicStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="neulabs-cdk-constructs.newrelic.NewRelicStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="neulabs-cdk-constructs.newrelic.NewRelicStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="neulabs-cdk-constructs.newrelic.NewRelicStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.newrelic.NewRelicStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="neulabs-cdk-constructs.newrelic.NewRelicStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="neulabs-cdk-constructs.newrelic.NewRelicStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="neulabs-cdk-constructs.newrelic.NewRelicStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="neulabs-cdk-constructs.newrelic.NewRelicStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.newrelic.NewRelicStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="neulabs-cdk-constructs.newrelic.NewRelicStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="neulabs-cdk-constructs.newrelic.NewRelicStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.newrelic.NewRelicStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addBaseTags"></a>

```typescript
public addBaseTags(model: any, props?: BaseTagProps): void
```

###### `model`<sup>Required</sup> <a name="model" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addBaseTags.parameter.model"></a>

- *Type:* any

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.newrelic.NewRelicStack.addBaseTags.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `createResourcesGroup` <a name="createResourcesGroup" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createResourcesGroup"></a>

```typescript
public createResourcesGroup(): CfnGroup
```

##### `createCloudwatchLogsStreamRole` <a name="createCloudwatchLogsStreamRole" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createCloudwatchLogsStreamRole"></a>

```typescript
public createCloudwatchLogsStreamRole(): IRole
```

##### `createCloudwatchMetricStream` <a name="createCloudwatchMetricStream" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createCloudwatchMetricStream"></a>

```typescript
public createCloudwatchMetricStream(firehoseArn: string, props?: CfnMetricStreamProps): CfnMetricStream
```

###### `firehoseArn`<sup>Required</sup> <a name="firehoseArn" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createCloudwatchMetricStream.parameter.firehoseArn"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createCloudwatchMetricStream.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.newrelic.CfnMetricStreamProps

---

##### `createFirehoseBucket` <a name="createFirehoseBucket" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseBucket"></a>

```typescript
public createFirehoseBucket(newRelicBucketName: string): IBucket
```

###### `newRelicBucketName`<sup>Required</sup> <a name="newRelicBucketName" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseBucket.parameter.newRelicBucketName"></a>

- *Type:* string

---

##### `createFirehoseRole` <a name="createFirehoseRole" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseRole"></a>

```typescript
public createFirehoseRole(newRelicFirehoseBucket: IBucket): IRole
```

###### `newRelicFirehoseBucket`<sup>Required</sup> <a name="newRelicFirehoseBucket" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseRole.parameter.newRelicFirehoseBucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `createFirehoseStream` <a name="createFirehoseStream" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream"></a>

```typescript
public createFirehoseStream(newRelicBucket: IBucket, role: IRole, endpointType: EndpointType, endpointUrl: string, newRelicLicenseLey: string, bufferingHints?: BufferingHintsProperty): CfnDeliveryStream
```

###### `newRelicBucket`<sup>Required</sup> <a name="newRelicBucket" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream.parameter.newRelicBucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

###### `role`<sup>Required</sup> <a name="role" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

###### `endpointType`<sup>Required</sup> <a name="endpointType" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream.parameter.endpointType"></a>

- *Type:* neulabs-cdk-constructs.newrelic.EndpointType

---

###### `endpointUrl`<sup>Required</sup> <a name="endpointUrl" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream.parameter.endpointUrl"></a>

- *Type:* string

---

###### `newRelicLicenseLey`<sup>Required</sup> <a name="newRelicLicenseLey" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream.parameter.newRelicLicenseLey"></a>

- *Type:* string

---

###### `bufferingHints`<sup>Optional</sup> <a name="bufferingHints" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createFirehoseStream.parameter.bufferingHints"></a>

- *Type:* aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream.BufferingHintsProperty

---

##### `createNewRelicRole` <a name="createNewRelicRole" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createNewRelicRole"></a>

```typescript
public createNewRelicRole(newRelicAccountId: string): IRole
```

###### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createNewRelicRole.parameter.newRelicAccountId"></a>

- *Type:* string

---

##### `createSecrets` <a name="createSecrets" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createSecrets"></a>

```typescript
public createSecrets(newRelicAccountId: string, newRelicLicenseLey: string): Secret
```

###### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createSecrets.parameter.newRelicAccountId"></a>

- *Type:* string

---

###### `newRelicLicenseLey`<sup>Required</sup> <a name="newRelicLicenseLey" id="neulabs-cdk-constructs.newrelic.NewRelicStack.createSecrets.parameter.newRelicLicenseLey"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.newrelic.NewRelicStack.isConstruct"></a>

```typescript
import { newrelic } from 'neulabs-cdk-constructs'

newrelic.NewRelicStack.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.newrelic.NewRelicStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="neulabs-cdk-constructs.newrelic.NewRelicStack.isStack"></a>

```typescript
import { newrelic } from 'neulabs-cdk-constructs'

newrelic.NewRelicStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.newrelic.NewRelicStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="neulabs-cdk-constructs.newrelic.NewRelicStack.of"></a>

```typescript
import { newrelic } from 'neulabs-cdk-constructs'

newrelic.NewRelicStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.newrelic.NewRelicStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicBucket">newRelicBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicFirehoseRole">newRelicFirehoseRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicIntegrationRole">newRelicIntegrationRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicSecret">newRelicSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicCloudwatchLogsStreamRole">newRelicCloudwatchLogsStreamRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicFirehoseLogs">newRelicFirehoseLogs</a></code> | <code>aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicFirehoseMetrics">newRelicFirehoseMetrics</a></code> | <code>aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `newRelicBucket`<sup>Required</sup> <a name="newRelicBucket" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicBucket"></a>

```typescript
public readonly newRelicBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `newRelicFirehoseRole`<sup>Required</sup> <a name="newRelicFirehoseRole" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicFirehoseRole"></a>

```typescript
public readonly newRelicFirehoseRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `newRelicIntegrationRole`<sup>Required</sup> <a name="newRelicIntegrationRole" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicIntegrationRole"></a>

```typescript
public readonly newRelicIntegrationRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `newRelicSecret`<sup>Required</sup> <a name="newRelicSecret" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicSecret"></a>

```typescript
public readonly newRelicSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `newRelicCloudwatchLogsStreamRole`<sup>Optional</sup> <a name="newRelicCloudwatchLogsStreamRole" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicCloudwatchLogsStreamRole"></a>

```typescript
public readonly newRelicCloudwatchLogsStreamRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `newRelicFirehoseLogs`<sup>Optional</sup> <a name="newRelicFirehoseLogs" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicFirehoseLogs"></a>

```typescript
public readonly newRelicFirehoseLogs: CfnDeliveryStream;
```

- *Type:* aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream

---

##### `newRelicFirehoseMetrics`<sup>Optional</sup> <a name="newRelicFirehoseMetrics" id="neulabs-cdk-constructs.newrelic.NewRelicStack.property.newRelicFirehoseMetrics"></a>

```typescript
public readonly newRelicFirehoseMetrics: CfnDeliveryStream;
```

- *Type:* aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream

---


## Structs <a name="Structs" id="Structs"></a>

### BaseStackProps <a name="BaseStackProps" id="neulabs-cdk-constructs.stack.BaseStackProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.stack.BaseStackProps.Initializer"></a>

```typescript
import { stack } from 'neulabs-cdk-constructs'

const baseStackProps: stack.BaseStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.suppressTemplateIndentation">suppressTemplateIndentation</a></code> | <code>boolean</code> | Enable this flag to suppress indentation in generated CloudFormation templates. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#neulabs-cdk-constructs.stack.BaseStackProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="neulabs-cdk-constructs.stack.BaseStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="neulabs-cdk-constructs.stack.BaseStackProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.stack.BaseStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="neulabs-cdk-constructs.stack.BaseStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="neulabs-cdk-constructs.stack.BaseStackProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="neulabs-cdk-constructs.stack.BaseStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `suppressTemplateIndentation`<sup>Optional</sup> <a name="suppressTemplateIndentation" id="neulabs-cdk-constructs.stack.BaseStackProps.property.suppressTemplateIndentation"></a>

```typescript
public readonly suppressTemplateIndentation: boolean;
```

- *Type:* boolean
- *Default:* the value of `@aws-cdk/core:suppressTemplateIndentation`, or `false` if that is not set.

Enable this flag to suppress indentation in generated CloudFormation templates.

If not specified, the value of the `@aws-cdk/core:suppressTemplateIndentation`
context key will be used. If that is not specified, then the
default value `false` will be used.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="neulabs-cdk-constructs.stack.BaseStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="neulabs-cdk-constructs.stack.BaseStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.stack.BaseStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.stack.BaseStackProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

### BaseTagProps <a name="BaseTagProps" id="neulabs-cdk-constructs.utils.BaseTagProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.utils.BaseTagProps.Initializer"></a>

```typescript
import { utils } from 'neulabs-cdk-constructs'

const baseTagProps: utils.BaseTagProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.repositoryName">repositoryName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.repositoryVersion">repositoryVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.team">team</a></code> | <code>string</code> | *No description.* |

---

##### `repositoryName`<sup>Optional</sup> <a name="repositoryName" id="neulabs-cdk-constructs.utils.BaseTagProps.property.repositoryName"></a>

```typescript
public readonly repositoryName: string;
```

- *Type:* string

---

##### `repositoryVersion`<sup>Optional</sup> <a name="repositoryVersion" id="neulabs-cdk-constructs.utils.BaseTagProps.property.repositoryVersion"></a>

```typescript
public readonly repositoryVersion: string;
```

- *Type:* string

---

##### `team`<sup>Optional</sup> <a name="team" id="neulabs-cdk-constructs.utils.BaseTagProps.property.team"></a>

```typescript
public readonly team: string;
```

- *Type:* string

---

### CfnMetricStreamProps <a name="CfnMetricStreamProps" id="neulabs-cdk-constructs.newrelic.CfnMetricStreamProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.newrelic.CfnMetricStreamProps.Initializer"></a>

```typescript
import { newrelic } from 'neulabs-cdk-constructs'

const cfnMetricStreamProps: newrelic.CfnMetricStreamProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.CfnMetricStreamProps.property.excludeFilters">excludeFilters</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_cloudwatch.CfnMetricStream.MetricStreamFilterProperty[]</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.CfnMetricStreamProps.property.includeFilters">includeFilters</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_cloudwatch.CfnMetricStream.MetricStreamFilterProperty[]</code> | *No description.* |

---

##### `excludeFilters`<sup>Optional</sup> <a name="excludeFilters" id="neulabs-cdk-constructs.newrelic.CfnMetricStreamProps.property.excludeFilters"></a>

```typescript
public readonly excludeFilters: IResolvable | IResolvable | MetricStreamFilterProperty[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_cloudwatch.CfnMetricStream.MetricStreamFilterProperty[]

---

##### `includeFilters`<sup>Optional</sup> <a name="includeFilters" id="neulabs-cdk-constructs.newrelic.CfnMetricStreamProps.property.includeFilters"></a>

```typescript
public readonly includeFilters: IResolvable | IResolvable | MetricStreamFilterProperty[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_cloudwatch.CfnMetricStream.MetricStreamFilterProperty[]

---

### FunctionNewRelicProps <a name="FunctionNewRelicProps" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

const functionNewRelicProps: aws_lambda.FunctionNewRelicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.adotInstrumentation">adotInstrumentation</a></code> | <code>aws-cdk-lib.aws_lambda.AdotInstrumentationConfig</code> | Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.paramsAndSecrets">paramsAndSecrets</a></code> | <code>aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion</code> | Specify the configuration of Parameters and Secrets Extension. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.runtimeManagementMode">runtimeManagementMode</a></code> | <code>aws-cdk-lib.aws_lambda.RuntimeManagementMode</code> | Sets the runtime management configuration for a function's version. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.snapStart">snapStart</a></code> | <code>aws-cdk-lib.aws_lambda.SnapStartConf</code> | Enable SnapStart for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.code">code</a></code> | <code>aws-cdk-lib.aws_lambda.Code</code> | The source code of your Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.handler">handler</a></code> | <code>string</code> | The name of the method within your code that Lambda calls to execute your function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment for the Lambda function that you are uploading. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.baseEnvironmentValues">baseEnvironmentValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.baseTagsValues">baseTagsValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.withBaseEnvironment">withBaseEnvironment</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.withBaseTags">withBaseTags</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicAccountId">newRelicAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicLayerName">newRelicLayerName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicLayerVersion">newRelicLayerVersion</a></code> | <code>number</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicwithExtensionSendLogs">newRelicwithExtensionSendLogs</a></code> | <code>boolean</code> | *No description.* |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `adotInstrumentation`<sup>Optional</sup> <a name="adotInstrumentation" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.adotInstrumentation"></a>

```typescript
public readonly adotInstrumentation: AdotInstrumentationConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.AdotInstrumentationConfig
- *Default:* No ADOT instrumentation

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

> [https://aws-otel.github.io/docs/getting-started/lambda](https://aws-otel.github.io/docs/getting-started/lambda)

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `paramsAndSecrets`<sup>Optional</sup> <a name="paramsAndSecrets" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.paramsAndSecrets"></a>

```typescript
public readonly paramsAndSecrets: ParamsAndSecretsLayerVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion
- *Default:* No Parameters and Secrets Extension

Specify the configuration of Parameters and Secrets Extension.

> [https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html)

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `runtimeManagementMode`<sup>Optional</sup> <a name="runtimeManagementMode" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.runtimeManagementMode"></a>

```typescript
public readonly runtimeManagementMode: RuntimeManagementMode;
```

- *Type:* aws-cdk-lib.aws_lambda.RuntimeManagementMode
- *Default:* Auto

Sets the runtime management configuration for a function's version.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `snapStart`<sup>Optional</sup> <a name="snapStart" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.snapStart"></a>

```typescript
public readonly snapStart: SnapStartConf;
```

- *Type:* aws-cdk-lib.aws_lambda.SnapStartConf
- *Default:* No snapstart

Enable SnapStart for Lambda Function.

SnapStart is currently supported only for Java 11, 17 runtime

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.
This is required when `vpcSubnets` is specified.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

This requires `vpc` to be specified in order for interfaces to actually be
placed in the subnets. If `vpc` is not specify, this will raise an error.

Note: Internet access for Lambda Functions requires a NAT Gateway, so picking
public subnets is not allowed (unless `allowPublicSubnet` is set to `true`).

---

##### `code`<sup>Required</sup> <a name="code" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* aws-cdk-lib.aws_lambda.Code

The source code of your Lambda function.

You can point to a file in an
Amazon Simple Storage Service (Amazon S3) bucket or specify your source
code as inline text.

---

##### `handler`<sup>Required</sup> <a name="handler" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string

The name of the method within your code that Lambda calls to execute your function.

The format includes the file name. It can also include
namespaces and other qualifiers, depending on the runtime.
For more information, see https://docs.aws.amazon.com/lambda/latest/dg/foundation-progmodel.html.

Use `Handler.FROM_IMAGE` when defining a function from a Docker image.

NOTE: If you specify your source code as inline text by specifying the
ZipFile property within the Code property, specify index.function_name as
the handler.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime environment for the Lambda function that you are uploading.

For valid values, see the Runtime property in the AWS Lambda Developer
Guide.

Use `Runtime.FROM_IMAGE` when defining a function from a Docker image.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `baseEnvironmentValues`<sup>Optional</sup> <a name="baseEnvironmentValues" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.baseEnvironmentValues"></a>

```typescript
public readonly baseEnvironmentValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `baseTagsValues`<sup>Optional</sup> <a name="baseTagsValues" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.baseTagsValues"></a>

```typescript
public readonly baseTagsValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `withBaseEnvironment`<sup>Optional</sup> <a name="withBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.withBaseEnvironment"></a>

```typescript
public readonly withBaseEnvironment: boolean;
```

- *Type:* boolean

---

##### `withBaseTags`<sup>Optional</sup> <a name="withBaseTags" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.withBaseTags"></a>

```typescript
public readonly withBaseTags: boolean;
```

- *Type:* boolean

---

##### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicAccountId"></a>

```typescript
public readonly newRelicAccountId: string;
```

- *Type:* string

---

##### `newRelicLayerName`<sup>Required</sup> <a name="newRelicLayerName" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicLayerName"></a>

```typescript
public readonly newRelicLayerName: string;
```

- *Type:* string

---

##### `newRelicLayerVersion`<sup>Required</sup> <a name="newRelicLayerVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicLayerVersion"></a>

```typescript
public readonly newRelicLayerVersion: number;
```

- *Type:* number

---

##### `newRelicwithExtensionSendLogs`<sup>Optional</sup> <a name="newRelicwithExtensionSendLogs" id="neulabs-cdk-constructs.aws_lambda.FunctionNewRelicProps.property.newRelicwithExtensionSendLogs"></a>

```typescript
public readonly newRelicwithExtensionSendLogs: boolean;
```

- *Type:* boolean

---

### FunctionNodeNewRelicProps <a name="FunctionNodeNewRelicProps" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

const functionNodeNewRelicProps: aws_lambda.FunctionNodeNewRelicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.adotInstrumentation">adotInstrumentation</a></code> | <code>aws-cdk-lib.aws_lambda.AdotInstrumentationConfig</code> | Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.paramsAndSecrets">paramsAndSecrets</a></code> | <code>aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion</code> | Specify the configuration of Parameters and Secrets Extension. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.runtimeManagementMode">runtimeManagementMode</a></code> | <code>aws-cdk-lib.aws_lambda.RuntimeManagementMode</code> | Sets the runtime management configuration for a function's version. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.snapStart">snapStart</a></code> | <code>aws-cdk-lib.aws_lambda.SnapStartConf</code> | Enable SnapStart for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.awsSdkConnectionReuse">awsSdkConnectionReuse</a></code> | <code>boolean</code> | Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.bundling">bundling</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.BundlingOptions</code> | Bundling options. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.depsLockFilePath">depsLockFilePath</a></code> | <code>string</code> | The path to the dependencies lock file (`yarn.lock`, `pnpm-lock.yaml` or `package-lock.json`). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.entry">entry</a></code> | <code>string</code> | Path to the entry file (JavaScript or TypeScript). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.handler">handler</a></code> | <code>string</code> | The name of the exported handler in the entry file. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.projectRoot">projectRoot</a></code> | <code>string</code> | The path to the directory containing project config files (`package.json` or `tsconfig.json`). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.baseEnvironmentValues">baseEnvironmentValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.baseTagsValues">baseTagsValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.withBaseEnvironment">withBaseEnvironment</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.withBaseTags">withBaseTags</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicAccountId">newRelicAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicLayerName">newRelicLayerName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicLayerVersion">newRelicLayerVersion</a></code> | <code>number</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicwithExtensionSendLogs">newRelicwithExtensionSendLogs</a></code> | <code>boolean</code> | *No description.* |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `adotInstrumentation`<sup>Optional</sup> <a name="adotInstrumentation" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.adotInstrumentation"></a>

```typescript
public readonly adotInstrumentation: AdotInstrumentationConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.AdotInstrumentationConfig
- *Default:* No ADOT instrumentation

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

> [https://aws-otel.github.io/docs/getting-started/lambda](https://aws-otel.github.io/docs/getting-started/lambda)

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `paramsAndSecrets`<sup>Optional</sup> <a name="paramsAndSecrets" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.paramsAndSecrets"></a>

```typescript
public readonly paramsAndSecrets: ParamsAndSecretsLayerVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion
- *Default:* No Parameters and Secrets Extension

Specify the configuration of Parameters and Secrets Extension.

> [https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html)

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `runtimeManagementMode`<sup>Optional</sup> <a name="runtimeManagementMode" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.runtimeManagementMode"></a>

```typescript
public readonly runtimeManagementMode: RuntimeManagementMode;
```

- *Type:* aws-cdk-lib.aws_lambda.RuntimeManagementMode
- *Default:* Auto

Sets the runtime management configuration for a function's version.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `snapStart`<sup>Optional</sup> <a name="snapStart" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.snapStart"></a>

```typescript
public readonly snapStart: SnapStartConf;
```

- *Type:* aws-cdk-lib.aws_lambda.SnapStartConf
- *Default:* No snapstart

Enable SnapStart for Lambda Function.

SnapStart is currently supported only for Java 11, 17 runtime

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.
This is required when `vpcSubnets` is specified.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

This requires `vpc` to be specified in order for interfaces to actually be
placed in the subnets. If `vpc` is not specify, this will raise an error.

Note: Internet access for Lambda Functions requires a NAT Gateway, so picking
public subnets is not allowed (unless `allowPublicSubnet` is set to `true`).

---

##### `awsSdkConnectionReuse`<sup>Optional</sup> <a name="awsSdkConnectionReuse" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.awsSdkConnectionReuse"></a>

```typescript
public readonly awsSdkConnectionReuse: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript.

This sets the `AWS_NODEJS_CONNECTION_REUSE_ENABLED` environment variable
to `1`.

> [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html)

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.BundlingOptions
- *Default:* use default bundling options: no minify, no sourcemap, all modules are bundled.

Bundling options.

---

##### `depsLockFilePath`<sup>Optional</sup> <a name="depsLockFilePath" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.depsLockFilePath"></a>

```typescript
public readonly depsLockFilePath: string;
```

- *Type:* string
- *Default:* the path is found by walking up parent directories searching for a `yarn.lock`, `pnpm-lock.yaml` or `package-lock.json` file

The path to the dependencies lock file (`yarn.lock`, `pnpm-lock.yaml` or `package-lock.json`).

This will be used as the source for the volume mounted in the Docker
container.

Modules specified in `nodeModules` will be installed using the right
installer (`yarn`, `pnpm` or `npm`) along with this lock file.

---

##### `entry`<sup>Optional</sup> <a name="entry" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string
- *Default:* Derived from the name of the defining file and the construct's id. If the `NodejsFunction` is defined in `stack.ts` with `my-handler` as id (`new NodejsFunction(this, 'my-handler')`), the construct will look at `stack.my-handler.ts` and `stack.my-handler.js`.

Path to the entry file (JavaScript or TypeScript).

---

##### `handler`<sup>Optional</sup> <a name="handler" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string
- *Default:* handler

The name of the exported handler in the entry file.

The handler is prefixed with `index.` unless the specified handler value contains a `.`,
in which case it is used as-is.

---

##### `projectRoot`<sup>Optional</sup> <a name="projectRoot" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.projectRoot"></a>

```typescript
public readonly projectRoot: string;
```

- *Type:* string
- *Default:* the directory containing the `depsLockFilePath`

The path to the directory containing project config files (`package.json` or `tsconfig.json`).

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* Runtime.NODEJS_18_X

The runtime environment.

Only runtimes of the Node.js family are
supported.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `baseEnvironmentValues`<sup>Optional</sup> <a name="baseEnvironmentValues" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.baseEnvironmentValues"></a>

```typescript
public readonly baseEnvironmentValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `baseTagsValues`<sup>Optional</sup> <a name="baseTagsValues" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.baseTagsValues"></a>

```typescript
public readonly baseTagsValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `withBaseEnvironment`<sup>Optional</sup> <a name="withBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.withBaseEnvironment"></a>

```typescript
public readonly withBaseEnvironment: boolean;
```

- *Type:* boolean

---

##### `withBaseTags`<sup>Optional</sup> <a name="withBaseTags" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.withBaseTags"></a>

```typescript
public readonly withBaseTags: boolean;
```

- *Type:* boolean

---

##### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicAccountId"></a>

```typescript
public readonly newRelicAccountId: string;
```

- *Type:* string

---

##### `newRelicLayerName`<sup>Required</sup> <a name="newRelicLayerName" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicLayerName"></a>

```typescript
public readonly newRelicLayerName: string;
```

- *Type:* string

---

##### `newRelicLayerVersion`<sup>Required</sup> <a name="newRelicLayerVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicLayerVersion"></a>

```typescript
public readonly newRelicLayerVersion: number;
```

- *Type:* number

---

##### `newRelicwithExtensionSendLogs`<sup>Optional</sup> <a name="newRelicwithExtensionSendLogs" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeNewRelicProps.property.newRelicwithExtensionSendLogs"></a>

```typescript
public readonly newRelicwithExtensionSendLogs: boolean;
```

- *Type:* boolean

---

### FunctionNodeProps <a name="FunctionNodeProps" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

const functionNodeProps: aws_lambda.FunctionNodeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.adotInstrumentation">adotInstrumentation</a></code> | <code>aws-cdk-lib.aws_lambda.AdotInstrumentationConfig</code> | Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.paramsAndSecrets">paramsAndSecrets</a></code> | <code>aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion</code> | Specify the configuration of Parameters and Secrets Extension. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.runtimeManagementMode">runtimeManagementMode</a></code> | <code>aws-cdk-lib.aws_lambda.RuntimeManagementMode</code> | Sets the runtime management configuration for a function's version. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.snapStart">snapStart</a></code> | <code>aws-cdk-lib.aws_lambda.SnapStartConf</code> | Enable SnapStart for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.awsSdkConnectionReuse">awsSdkConnectionReuse</a></code> | <code>boolean</code> | Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.bundling">bundling</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.BundlingOptions</code> | Bundling options. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.depsLockFilePath">depsLockFilePath</a></code> | <code>string</code> | The path to the dependencies lock file (`yarn.lock`, `pnpm-lock.yaml` or `package-lock.json`). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.entry">entry</a></code> | <code>string</code> | Path to the entry file (JavaScript or TypeScript). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.handler">handler</a></code> | <code>string</code> | The name of the exported handler in the entry file. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.projectRoot">projectRoot</a></code> | <code>string</code> | The path to the directory containing project config files (`package.json` or `tsconfig.json`). |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.baseEnvironmentValues">baseEnvironmentValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.baseTagsValues">baseTagsValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.withBaseEnvironment">withBaseEnvironment</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.withBaseTags">withBaseTags</a></code> | <code>boolean</code> | *No description.* |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `adotInstrumentation`<sup>Optional</sup> <a name="adotInstrumentation" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.adotInstrumentation"></a>

```typescript
public readonly adotInstrumentation: AdotInstrumentationConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.AdotInstrumentationConfig
- *Default:* No ADOT instrumentation

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

> [https://aws-otel.github.io/docs/getting-started/lambda](https://aws-otel.github.io/docs/getting-started/lambda)

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `paramsAndSecrets`<sup>Optional</sup> <a name="paramsAndSecrets" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.paramsAndSecrets"></a>

```typescript
public readonly paramsAndSecrets: ParamsAndSecretsLayerVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion
- *Default:* No Parameters and Secrets Extension

Specify the configuration of Parameters and Secrets Extension.

> [https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html)

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `runtimeManagementMode`<sup>Optional</sup> <a name="runtimeManagementMode" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.runtimeManagementMode"></a>

```typescript
public readonly runtimeManagementMode: RuntimeManagementMode;
```

- *Type:* aws-cdk-lib.aws_lambda.RuntimeManagementMode
- *Default:* Auto

Sets the runtime management configuration for a function's version.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `snapStart`<sup>Optional</sup> <a name="snapStart" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.snapStart"></a>

```typescript
public readonly snapStart: SnapStartConf;
```

- *Type:* aws-cdk-lib.aws_lambda.SnapStartConf
- *Default:* No snapstart

Enable SnapStart for Lambda Function.

SnapStart is currently supported only for Java 11, 17 runtime

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.
This is required when `vpcSubnets` is specified.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

This requires `vpc` to be specified in order for interfaces to actually be
placed in the subnets. If `vpc` is not specify, this will raise an error.

Note: Internet access for Lambda Functions requires a NAT Gateway, so picking
public subnets is not allowed (unless `allowPublicSubnet` is set to `true`).

---

##### `awsSdkConnectionReuse`<sup>Optional</sup> <a name="awsSdkConnectionReuse" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.awsSdkConnectionReuse"></a>

```typescript
public readonly awsSdkConnectionReuse: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to automatically reuse TCP connections when working with the AWS SDK for JavaScript.

This sets the `AWS_NODEJS_CONNECTION_REUSE_ENABLED` environment variable
to `1`.

> [https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html)

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.BundlingOptions
- *Default:* use default bundling options: no minify, no sourcemap, all modules are bundled.

Bundling options.

---

##### `depsLockFilePath`<sup>Optional</sup> <a name="depsLockFilePath" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.depsLockFilePath"></a>

```typescript
public readonly depsLockFilePath: string;
```

- *Type:* string
- *Default:* the path is found by walking up parent directories searching for a `yarn.lock`, `pnpm-lock.yaml` or `package-lock.json` file

The path to the dependencies lock file (`yarn.lock`, `pnpm-lock.yaml` or `package-lock.json`).

This will be used as the source for the volume mounted in the Docker
container.

Modules specified in `nodeModules` will be installed using the right
installer (`yarn`, `pnpm` or `npm`) along with this lock file.

---

##### `entry`<sup>Optional</sup> <a name="entry" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.entry"></a>

```typescript
public readonly entry: string;
```

- *Type:* string
- *Default:* Derived from the name of the defining file and the construct's id. If the `NodejsFunction` is defined in `stack.ts` with `my-handler` as id (`new NodejsFunction(this, 'my-handler')`), the construct will look at `stack.my-handler.ts` and `stack.my-handler.js`.

Path to the entry file (JavaScript or TypeScript).

---

##### `handler`<sup>Optional</sup> <a name="handler" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string
- *Default:* handler

The name of the exported handler in the entry file.

The handler is prefixed with `index.` unless the specified handler value contains a `.`,
in which case it is used as-is.

---

##### `projectRoot`<sup>Optional</sup> <a name="projectRoot" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.projectRoot"></a>

```typescript
public readonly projectRoot: string;
```

- *Type:* string
- *Default:* the directory containing the `depsLockFilePath`

The path to the directory containing project config files (`package.json` or `tsconfig.json`).

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* Runtime.NODEJS_18_X

The runtime environment.

Only runtimes of the Node.js family are
supported.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `baseEnvironmentValues`<sup>Optional</sup> <a name="baseEnvironmentValues" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.baseEnvironmentValues"></a>

```typescript
public readonly baseEnvironmentValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `baseTagsValues`<sup>Optional</sup> <a name="baseTagsValues" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.baseTagsValues"></a>

```typescript
public readonly baseTagsValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `withBaseEnvironment`<sup>Optional</sup> <a name="withBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.withBaseEnvironment"></a>

```typescript
public readonly withBaseEnvironment: boolean;
```

- *Type:* boolean

---

##### `withBaseTags`<sup>Optional</sup> <a name="withBaseTags" id="neulabs-cdk-constructs.aws_lambda.FunctionNodeProps.property.withBaseTags"></a>

```typescript
public readonly withBaseTags: boolean;
```

- *Type:* boolean

---

### FunctionProps <a name="FunctionProps" id="neulabs-cdk-constructs.aws_lambda.FunctionProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

const functionProps: aws_lambda.FunctionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.adotInstrumentation">adotInstrumentation</a></code> | <code>aws-cdk-lib.aws_lambda.AdotInstrumentationConfig</code> | Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.paramsAndSecrets">paramsAndSecrets</a></code> | <code>aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion</code> | Specify the configuration of Parameters and Secrets Extension. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.runtimeManagementMode">runtimeManagementMode</a></code> | <code>aws-cdk-lib.aws_lambda.RuntimeManagementMode</code> | Sets the runtime management configuration for a function's version. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.snapStart">snapStart</a></code> | <code>aws-cdk-lib.aws_lambda.SnapStartConf</code> | Enable SnapStart for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.code">code</a></code> | <code>aws-cdk-lib.aws_lambda.Code</code> | The source code of your Lambda function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.handler">handler</a></code> | <code>string</code> | The name of the method within your code that Lambda calls to execute your function. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime environment for the Lambda function that you are uploading. |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.baseEnvironmentValues">baseEnvironmentValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.baseTagsValues">baseTagsValues</a></code> | <code>neulabs-cdk-constructs.utils.BaseTagProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.withBaseEnvironment">withBaseEnvironment</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.FunctionProps.property.withBaseTags">withBaseTags</a></code> | <code>boolean</code> | *No description.* |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `adotInstrumentation`<sup>Optional</sup> <a name="adotInstrumentation" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.adotInstrumentation"></a>

```typescript
public readonly adotInstrumentation: AdotInstrumentationConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.AdotInstrumentationConfig
- *Default:* No ADOT instrumentation

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

> [https://aws-otel.github.io/docs/getting-started/lambda](https://aws-otel.github.io/docs/getting-started/lambda)

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `paramsAndSecrets`<sup>Optional</sup> <a name="paramsAndSecrets" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.paramsAndSecrets"></a>

```typescript
public readonly paramsAndSecrets: ParamsAndSecretsLayerVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.ParamsAndSecretsLayerVersion
- *Default:* No Parameters and Secrets Extension

Specify the configuration of Parameters and Secrets Extension.

> [https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/ps-integration-lambda-extensions.html)

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `runtimeManagementMode`<sup>Optional</sup> <a name="runtimeManagementMode" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.runtimeManagementMode"></a>

```typescript
public readonly runtimeManagementMode: RuntimeManagementMode;
```

- *Type:* aws-cdk-lib.aws_lambda.RuntimeManagementMode
- *Default:* Auto

Sets the runtime management configuration for a function's version.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `snapStart`<sup>Optional</sup> <a name="snapStart" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.snapStart"></a>

```typescript
public readonly snapStart: SnapStartConf;
```

- *Type:* aws-cdk-lib.aws_lambda.SnapStartConf
- *Default:* No snapstart

Enable SnapStart for Lambda Function.

SnapStart is currently supported only for Java 11, 17 runtime

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.
This is required when `vpcSubnets` is specified.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

This requires `vpc` to be specified in order for interfaces to actually be
placed in the subnets. If `vpc` is not specify, this will raise an error.

Note: Internet access for Lambda Functions requires a NAT Gateway, so picking
public subnets is not allowed (unless `allowPublicSubnet` is set to `true`).

---

##### `code`<sup>Required</sup> <a name="code" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* aws-cdk-lib.aws_lambda.Code

The source code of your Lambda function.

You can point to a file in an
Amazon Simple Storage Service (Amazon S3) bucket or specify your source
code as inline text.

---

##### `handler`<sup>Required</sup> <a name="handler" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string

The name of the method within your code that Lambda calls to execute your function.

The format includes the file name. It can also include
namespaces and other qualifiers, depending on the runtime.
For more information, see https://docs.aws.amazon.com/lambda/latest/dg/foundation-progmodel.html.

Use `Handler.FROM_IMAGE` when defining a function from a Docker image.

NOTE: If you specify your source code as inline text by specifying the
ZipFile property within the Code property, specify index.function_name as
the handler.

---

##### `runtime`<sup>Required</sup> <a name="runtime" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime

The runtime environment for the Lambda function that you are uploading.

For valid values, see the Runtime property in the AWS Lambda Developer
Guide.

Use `Runtime.FROM_IMAGE` when defining a function from a Docker image.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `baseEnvironmentValues`<sup>Optional</sup> <a name="baseEnvironmentValues" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.baseEnvironmentValues"></a>

```typescript
public readonly baseEnvironmentValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `baseTagsValues`<sup>Optional</sup> <a name="baseTagsValues" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.baseTagsValues"></a>

```typescript
public readonly baseTagsValues: BaseTagProps;
```

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `withBaseEnvironment`<sup>Optional</sup> <a name="withBaseEnvironment" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.withBaseEnvironment"></a>

```typescript
public readonly withBaseEnvironment: boolean;
```

- *Type:* boolean

---

##### `withBaseTags`<sup>Optional</sup> <a name="withBaseTags" id="neulabs-cdk-constructs.aws_lambda.FunctionProps.property.withBaseTags"></a>

```typescript
public readonly withBaseTags: boolean;
```

- *Type:* boolean

---

### GithubOIDCStackStackProps <a name="GithubOIDCStackStackProps" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.Initializer"></a>

```typescript
import { oidc } from 'neulabs-cdk-constructs'

const githubOIDCStackStackProps: oidc.GithubOIDCStackStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.suppressTemplateIndentation">suppressTemplateIndentation</a></code> | <code>boolean</code> | Enable this flag to suppress indentation in generated CloudFormation templates. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.githubRepository">githubRepository</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.githubUser">githubUser</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.tokenAction">tokenAction</a></code> | <code>neulabs-cdk-constructs.oidc.TokenActions</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkBootstrapRoleName">cdkBootstrapRoleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRoleAwsManagedPolicies">cdkDeployRoleAwsManagedPolicies</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRoleManagedPolicies">cdkDeployRoleManagedPolicies</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRoleName">cdkDeployRoleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRolePolicyStatements">cdkDeployRolePolicyStatements</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.oidcRoleName">oidcRoleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.tokenActionCustom">tokenActionCustom</a></code> | <code>string</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `suppressTemplateIndentation`<sup>Optional</sup> <a name="suppressTemplateIndentation" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.suppressTemplateIndentation"></a>

```typescript
public readonly suppressTemplateIndentation: boolean;
```

- *Type:* boolean
- *Default:* the value of `@aws-cdk/core:suppressTemplateIndentation`, or `false` if that is not set.

Enable this flag to suppress indentation in generated CloudFormation templates.

If not specified, the value of the `@aws-cdk/core:suppressTemplateIndentation`
context key will be used. If that is not specified, then the
default value `false` will be used.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `githubRepository`<sup>Required</sup> <a name="githubRepository" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.githubRepository"></a>

```typescript
public readonly githubRepository: string;
```

- *Type:* string

---

##### `githubUser`<sup>Required</sup> <a name="githubUser" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.githubUser"></a>

```typescript
public readonly githubUser: string;
```

- *Type:* string

---

##### `tokenAction`<sup>Required</sup> <a name="tokenAction" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.tokenAction"></a>

```typescript
public readonly tokenAction: TokenActions;
```

- *Type:* neulabs-cdk-constructs.oidc.TokenActions

---

##### `cdkBootstrapRoleName`<sup>Optional</sup> <a name="cdkBootstrapRoleName" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkBootstrapRoleName"></a>

```typescript
public readonly cdkBootstrapRoleName: string;
```

- *Type:* string

---

##### `cdkDeployRoleAwsManagedPolicies`<sup>Optional</sup> <a name="cdkDeployRoleAwsManagedPolicies" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRoleAwsManagedPolicies"></a>

```typescript
public readonly cdkDeployRoleAwsManagedPolicies: string[];
```

- *Type:* string[]

---

##### `cdkDeployRoleManagedPolicies`<sup>Optional</sup> <a name="cdkDeployRoleManagedPolicies" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRoleManagedPolicies"></a>

```typescript
public readonly cdkDeployRoleManagedPolicies: string[];
```

- *Type:* string[]

---

##### `cdkDeployRoleName`<sup>Optional</sup> <a name="cdkDeployRoleName" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRoleName"></a>

```typescript
public readonly cdkDeployRoleName: string;
```

- *Type:* string

---

##### `cdkDeployRolePolicyStatements`<sup>Optional</sup> <a name="cdkDeployRolePolicyStatements" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.cdkDeployRolePolicyStatements"></a>

```typescript
public readonly cdkDeployRolePolicyStatements: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]

---

##### `oidcRoleName`<sup>Optional</sup> <a name="oidcRoleName" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.oidcRoleName"></a>

```typescript
public readonly oidcRoleName: string;
```

- *Type:* string

---

##### `tokenActionCustom`<sup>Optional</sup> <a name="tokenActionCustom" id="neulabs-cdk-constructs.oidc.GithubOIDCStackStackProps.property.tokenActionCustom"></a>

```typescript
public readonly tokenActionCustom: string;
```

- *Type:* string

---

### NewRelicProps <a name="NewRelicProps" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps.Initializer"></a>

```typescript
import { aws_lambda } from 'neulabs-cdk-constructs'

const newRelicProps: aws_lambda.NewRelicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.handler">handler</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicAccountId">newRelicAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicLayerName">newRelicLayerName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicLayerVersion">newRelicLayerVersion</a></code> | <code>number</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicwithExtensionSendLogs">newRelicwithExtensionSendLogs</a></code> | <code>boolean</code> | *No description.* |

---

##### `handler`<sup>Required</sup> <a name="handler" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string

---

##### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicAccountId"></a>

```typescript
public readonly newRelicAccountId: string;
```

- *Type:* string

---

##### `newRelicLayerName`<sup>Required</sup> <a name="newRelicLayerName" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicLayerName"></a>

```typescript
public readonly newRelicLayerName: string;
```

- *Type:* string

---

##### `newRelicLayerVersion`<sup>Required</sup> <a name="newRelicLayerVersion" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicLayerVersion"></a>

```typescript
public readonly newRelicLayerVersion: number;
```

- *Type:* number

---

##### `newRelicwithExtensionSendLogs`<sup>Optional</sup> <a name="newRelicwithExtensionSendLogs" id="neulabs-cdk-constructs.aws_lambda.NewRelicProps.property.newRelicwithExtensionSendLogs"></a>

```typescript
public readonly newRelicwithExtensionSendLogs: boolean;
```

- *Type:* boolean

---

### NewRelicStackProps <a name="NewRelicStackProps" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.Initializer"></a>

```typescript
import { newrelic } from 'neulabs-cdk-constructs'

const newRelicStackProps: newrelic.NewRelicStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.PermissionsBoundary</code> | Options for applying a permissions boundary to all IAM Roles and Users created within this Stage. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.suppressTemplateIndentation">suppressTemplateIndentation</a></code> | <code>boolean</code> | Enable this flag to suppress indentation in generated CloudFormation templates. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicAccountId">newRelicAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicBucketName">newRelicBucketName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicLicenseKey">newRelicLicenseKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.bufferyHints">bufferyHints</a></code> | <code>aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream.BufferingHintsProperty</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.cloudwatchMetricStreamProps">cloudwatchMetricStreamProps</a></code> | <code>neulabs-cdk-constructs.newrelic.CfnMetricStreamProps</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicApiUrlLogs">newRelicApiUrlLogs</a></code> | <code>neulabs-cdk-constructs.newrelic.EndpointUrlLogs</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicApiUrlMetrics">newRelicApiUrlMetrics</a></code> | <code>neulabs-cdk-constructs.newrelic.EndpointUrlMetrics</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.crossRegionReferences"></a>

```typescript
public readonly crossRegionReferences: boolean;
```

- *Type:* boolean
- *Default:* false

Enable this flag to allow native cross region stack references.

Enabling this will create a CloudFormation custom resource
in both the producing stack and consuming stack in order to perform the export/import

This feature is currently experimental

---

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.env"></a>

```typescript
public readonly env: Environment;
```

- *Type:* aws-cdk-lib.Environment
- *Default:* The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

---

*Example*

```typescript
// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');
```


##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: PermissionsBoundary;
```

- *Type:* aws-cdk-lib.PermissionsBoundary
- *Default:* no permissions boundary is applied

Options for applying a permissions boundary to all IAM Roles and Users created within this Stage.

---

##### `stackName`<sup>Optional</sup> <a name="stackName" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `suppressTemplateIndentation`<sup>Optional</sup> <a name="suppressTemplateIndentation" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.suppressTemplateIndentation"></a>

```typescript
public readonly suppressTemplateIndentation: boolean;
```

- *Type:* boolean
- *Default:* the value of `@aws-cdk/core:suppressTemplateIndentation`, or `false` if that is not set.

Enable this flag to suppress indentation in generated CloudFormation templates.

If not specified, the value of the `@aws-cdk/core:suppressTemplateIndentation`
context key will be used. If that is not specified, then the
default value `false` will be used.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* The synthesizer specified on `App`, or `DefaultStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

The Stack Synthesizer controls aspects of synthesis and deployment,
like how assets are referenced and what IAM roles to use. For more
information, see the README of the main CDK package.

If not specified, the `defaultStackSynthesizer` from `App` will be used.
If that is not specified, `DefaultStackSynthesizer` is used if
`@aws-cdk/core:newStyleStackSynthesis` is set to `true` or the CDK major
version is v2. In CDK v1 `LegacyStackSynthesizer` is the default if no
other synthesizer is specified.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicAccountId"></a>

```typescript
public readonly newRelicAccountId: string;
```

- *Type:* string

---

##### `newRelicBucketName`<sup>Required</sup> <a name="newRelicBucketName" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicBucketName"></a>

```typescript
public readonly newRelicBucketName: string;
```

- *Type:* string

---

##### `newRelicLicenseKey`<sup>Required</sup> <a name="newRelicLicenseKey" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicLicenseKey"></a>

```typescript
public readonly newRelicLicenseKey: string;
```

- *Type:* string

---

##### `bufferyHints`<sup>Optional</sup> <a name="bufferyHints" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.bufferyHints"></a>

```typescript
public readonly bufferyHints: BufferingHintsProperty;
```

- *Type:* aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream.BufferingHintsProperty

---

##### `cloudwatchMetricStreamProps`<sup>Optional</sup> <a name="cloudwatchMetricStreamProps" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.cloudwatchMetricStreamProps"></a>

```typescript
public readonly cloudwatchMetricStreamProps: CfnMetricStreamProps;
```

- *Type:* neulabs-cdk-constructs.newrelic.CfnMetricStreamProps

---

##### `newRelicApiUrlLogs`<sup>Optional</sup> <a name="newRelicApiUrlLogs" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicApiUrlLogs"></a>

```typescript
public readonly newRelicApiUrlLogs: EndpointUrlLogs;
```

- *Type:* neulabs-cdk-constructs.newrelic.EndpointUrlLogs

---

##### `newRelicApiUrlMetrics`<sup>Optional</sup> <a name="newRelicApiUrlMetrics" id="neulabs-cdk-constructs.newrelic.NewRelicStackProps.property.newRelicApiUrlMetrics"></a>

```typescript
public readonly newRelicApiUrlMetrics: EndpointUrlMetrics;
```

- *Type:* neulabs-cdk-constructs.newrelic.EndpointUrlMetrics

---


## Protocols <a name="Protocols" id="Protocols"></a>

### ILambdaPowerToolsProps <a name="ILambdaPowerToolsProps" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps"></a>

- *Implemented By:* neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaPowerToolsLayerAccountId">lambdaPowerToolsLayerAccountId</a></code> | <code>neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaPowerToolsLayerName">lambdaPowerToolsLayerName</a></code> | <code>neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaPowerToolsLayerVersion">lambdaPowerToolsLayerVersion</a></code> | <code>number</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.setLogLevel">setLogLevel</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.setPowertoolsDev">setPowertoolsDev</a></code> | <code>boolean</code> | *No description.* |

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---

##### `lambdaPowerToolsLayerAccountId`<sup>Required</sup> <a name="lambdaPowerToolsLayerAccountId" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaPowerToolsLayerAccountId"></a>

```typescript
public readonly lambdaPowerToolsLayerAccountId: LambdaPowerToolsLayerAccountId;
```

- *Type:* neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId

---

##### `lambdaPowerToolsLayerName`<sup>Required</sup> <a name="lambdaPowerToolsLayerName" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaPowerToolsLayerName"></a>

```typescript
public readonly lambdaPowerToolsLayerName: LambdaPowerToolsLayerName;
```

- *Type:* neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName

---

##### `lambdaPowerToolsLayerVersion`<sup>Required</sup> <a name="lambdaPowerToolsLayerVersion" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.lambdaPowerToolsLayerVersion"></a>

```typescript
public readonly lambdaPowerToolsLayerVersion: number;
```

- *Type:* number

---

##### `setLogLevel`<sup>Optional</sup> <a name="setLogLevel" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.setLogLevel"></a>

```typescript
public readonly setLogLevel: string;
```

- *Type:* string

---

##### `setPowertoolsDev`<sup>Optional</sup> <a name="setPowertoolsDev" id="neulabs-cdk-constructs.aws_lambda.ILambdaPowerToolsProps.property.setPowertoolsDev"></a>

```typescript
public readonly setPowertoolsDev: boolean;
```

- *Type:* boolean

---

## Enums <a name="Enums" id="Enums"></a>

### EndpointType <a name="EndpointType" id="neulabs-cdk-constructs.newrelic.EndpointType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.EndpointType.METRICS">METRICS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.EndpointType.LOGS">LOGS</a></code> | *No description.* |

---

##### `METRICS` <a name="METRICS" id="neulabs-cdk-constructs.newrelic.EndpointType.METRICS"></a>

---


##### `LOGS` <a name="LOGS" id="neulabs-cdk-constructs.newrelic.EndpointType.LOGS"></a>

---


### EndpointUrlLogs <a name="EndpointUrlLogs" id="neulabs-cdk-constructs.newrelic.EndpointUrlLogs"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.EndpointUrlLogs.EU_LOGS">EU_LOGS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.EndpointUrlLogs.US_LOGS">US_LOGS</a></code> | *No description.* |

---

##### `EU_LOGS` <a name="EU_LOGS" id="neulabs-cdk-constructs.newrelic.EndpointUrlLogs.EU_LOGS"></a>

---


##### `US_LOGS` <a name="US_LOGS" id="neulabs-cdk-constructs.newrelic.EndpointUrlLogs.US_LOGS"></a>

---


### EndpointUrlMetrics <a name="EndpointUrlMetrics" id="neulabs-cdk-constructs.newrelic.EndpointUrlMetrics"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.newrelic.EndpointUrlMetrics.EU_METRICS">EU_METRICS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.newrelic.EndpointUrlMetrics.US_METRICS">US_METRICS</a></code> | *No description.* |

---

##### `EU_METRICS` <a name="EU_METRICS" id="neulabs-cdk-constructs.newrelic.EndpointUrlMetrics.EU_METRICS"></a>

---


##### `US_METRICS` <a name="US_METRICS" id="neulabs-cdk-constructs.newrelic.EndpointUrlMetrics.US_METRICS"></a>

---


### LambdaPowerToolsLayerAccountId <a name="LambdaPowerToolsLayerAccountId" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId.PYTHON">PYTHON</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId.TYPESCRIPT">TYPESCRIPT</a></code> | *No description.* |

---

##### `PYTHON` <a name="PYTHON" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId.PYTHON"></a>

---


##### `TYPESCRIPT` <a name="TYPESCRIPT" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerAccountId.TYPESCRIPT"></a>

---


### LambdaPowerToolsLayerName <a name="LambdaPowerToolsLayerName" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName.PYTHON_ARM">PYTHON_ARM</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName.PYTHON_X86">PYTHON_X86</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName.TYPESCRIPT">TYPESCRIPT</a></code> | *No description.* |

---

##### `PYTHON_ARM` <a name="PYTHON_ARM" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName.PYTHON_ARM"></a>

---


##### `PYTHON_X86` <a name="PYTHON_X86" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName.PYTHON_X86"></a>

---


##### `TYPESCRIPT` <a name="TYPESCRIPT" id="neulabs-cdk-constructs.aws_lambda.LambdaPowerToolsLayerName.TYPESCRIPT"></a>

---


### ProviderUrl <a name="ProviderUrl" id="neulabs-cdk-constructs.oidc.ProviderUrl"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.ProviderUrl.GITHUB">GITHUB</a></code> | *No description.* |

---

##### `GITHUB` <a name="GITHUB" id="neulabs-cdk-constructs.oidc.ProviderUrl.GITHUB"></a>

---


### TokenActions <a name="TokenActions" id="neulabs-cdk-constructs.oidc.TokenActions"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.oidc.TokenActions.ALL">ALL</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.TokenActions.ALL_BRANCH">ALL_BRANCH</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.TokenActions.ALL_TAGS">ALL_TAGS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.TokenActions.ONLY_MAIN">ONLY_MAIN</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.oidc.TokenActions.CUSTOM">CUSTOM</a></code> | *No description.* |

---

##### `ALL` <a name="ALL" id="neulabs-cdk-constructs.oidc.TokenActions.ALL"></a>

---


##### `ALL_BRANCH` <a name="ALL_BRANCH" id="neulabs-cdk-constructs.oidc.TokenActions.ALL_BRANCH"></a>

---


##### `ALL_TAGS` <a name="ALL_TAGS" id="neulabs-cdk-constructs.oidc.TokenActions.ALL_TAGS"></a>

---


##### `ONLY_MAIN` <a name="ONLY_MAIN" id="neulabs-cdk-constructs.oidc.TokenActions.ONLY_MAIN"></a>

---


##### `CUSTOM` <a name="CUSTOM" id="neulabs-cdk-constructs.oidc.TokenActions.CUSTOM"></a>

---

