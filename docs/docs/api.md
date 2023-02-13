# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BaseStack <a name="BaseStack" id="neulabs-cdk-constructs.stacks.BaseStack"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.stacks.BaseStack.Initializer"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

new stacks.BaseStack(scope: Construct, id: string, props: BaseStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.stacks.BaseStackProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.stacks.BaseStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.stacks.BaseStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.stacks.BaseStack.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.stacks.BaseStackProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a value. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.createResourcesGroup">createResourcesGroup</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.stacks.BaseStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="neulabs-cdk-constructs.stacks.BaseStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="neulabs-cdk-constructs.stacks.BaseStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="neulabs-cdk-constructs.stacks.BaseStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="neulabs-cdk-constructs.stacks.BaseStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.stacks.BaseStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.stacks.BaseStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="neulabs-cdk-constructs.stacks.BaseStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="neulabs-cdk-constructs.stacks.BaseStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportValue` <a name="exportValue" id="neulabs-cdk-constructs.stacks.BaseStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a value.

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.stacks.BaseStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.stacks.BaseStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="neulabs-cdk-constructs.stacks.BaseStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="neulabs-cdk-constructs.stacks.BaseStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="neulabs-cdk-constructs.stacks.BaseStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="neulabs-cdk-constructs.stacks.BaseStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="neulabs-cdk-constructs.stacks.BaseStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="neulabs-cdk-constructs.stacks.BaseStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="neulabs-cdk-constructs.stacks.BaseStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="neulabs-cdk-constructs.stacks.BaseStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="neulabs-cdk-constructs.stacks.BaseStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="neulabs-cdk-constructs.stacks.BaseStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="neulabs-cdk-constructs.stacks.BaseStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="neulabs-cdk-constructs.stacks.BaseStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="neulabs-cdk-constructs.stacks.BaseStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stacks.BaseStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="neulabs-cdk-constructs.stacks.BaseStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="neulabs-cdk-constructs.stacks.BaseStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="neulabs-cdk-constructs.stacks.BaseStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="neulabs-cdk-constructs.stacks.BaseStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stacks.BaseStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="neulabs-cdk-constructs.stacks.BaseStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.stacks.BaseStack.addBaseTags"></a>

```typescript
public addBaseTags(model: any, props?: BaseTagProps): void
```

###### `model`<sup>Required</sup> <a name="model" id="neulabs-cdk-constructs.stacks.BaseStack.addBaseTags.parameter.model"></a>

- *Type:* any

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.stacks.BaseStack.addBaseTags.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `createResourcesGroup` <a name="createResourcesGroup" id="neulabs-cdk-constructs.stacks.BaseStack.createResourcesGroup"></a>

```typescript
public createResourcesGroup(): CfnGroup
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.stacks.BaseStack.isConstruct"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

stacks.BaseStack.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.stacks.BaseStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="neulabs-cdk-constructs.stacks.BaseStack.isStack"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

stacks.BaseStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.stacks.BaseStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="neulabs-cdk-constructs.stacks.BaseStack.of"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

stacks.BaseStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.stacks.BaseStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStack.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.stacks.BaseStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="neulabs-cdk-constructs.stacks.BaseStack.property.account"></a>

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
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="neulabs-cdk-constructs.stacks.BaseStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="neulabs-cdk-constructs.stacks.BaseStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="neulabs-cdk-constructs.stacks.BaseStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="neulabs-cdk-constructs.stacks.BaseStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="neulabs-cdk-constructs.stacks.BaseStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="neulabs-cdk-constructs.stacks.BaseStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="neulabs-cdk-constructs.stacks.BaseStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="neulabs-cdk-constructs.stacks.BaseStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="neulabs-cdk-constructs.stacks.BaseStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
    either be a concerete region (e.g. `us-west-2`) or the `Aws.REGION`
    token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="neulabs-cdk-constructs.stacks.BaseStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="neulabs-cdk-constructs.stacks.BaseStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="neulabs-cdk-constructs.stacks.BaseStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="neulabs-cdk-constructs.stacks.BaseStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="neulabs-cdk-constructs.stacks.BaseStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="neulabs-cdk-constructs.stacks.BaseStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="neulabs-cdk-constructs.stacks.BaseStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="neulabs-cdk-constructs.stacks.BaseStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="neulabs-cdk-constructs.stacks.BaseStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.stacks.BaseStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.stacks.BaseStack.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---


### NewRelicStack <a name="NewRelicStack" id="neulabs-cdk-constructs.stacks.NewRelicStack"></a>

#### Initializers <a name="Initializers" id="neulabs-cdk-constructs.stacks.NewRelicStack.Initializer"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

new stacks.NewRelicStack(scope: Construct, id: string, props: NewRelicStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.Initializer.parameter.props">props</a></code> | <code>neulabs-cdk-constructs.stacks.NewRelicStackProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="neulabs-cdk-constructs.stacks.NewRelicStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="neulabs-cdk-constructs.stacks.NewRelicStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="neulabs-cdk-constructs.stacks.NewRelicStack.Initializer.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.stacks.NewRelicStackProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a value. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.addBaseTags">addBaseTags</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createResourcesGroup">createResourcesGroup</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createCloudwatchLogsStreamRole">createCloudwatchLogsStreamRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createCloudwatchMetricStream">createCloudwatchMetricStream</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseBucket">createFirehoseBucket</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseRole">createFirehoseRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream">createFirehoseStream</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createNewRelicRole">createNewRelicRole</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.createSecrets">createSecrets</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="neulabs-cdk-constructs.stacks.NewRelicStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="neulabs-cdk-constructs.stacks.NewRelicStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="neulabs-cdk-constructs.stacks.NewRelicStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="neulabs-cdk-constructs.stacks.NewRelicStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="neulabs-cdk-constructs.stacks.NewRelicStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="neulabs-cdk-constructs.stacks.NewRelicStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="neulabs-cdk-constructs.stacks.NewRelicStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="neulabs-cdk-constructs.stacks.NewRelicStack.addTransform"></a>

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


###### `transform`<sup>Required</sup> <a name="transform" id="neulabs-cdk-constructs.stacks.NewRelicStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportValue` <a name="exportValue" id="neulabs-cdk-constructs.stacks.NewRelicStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a value.

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

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="neulabs-cdk-constructs.stacks.NewRelicStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="neulabs-cdk-constructs.stacks.NewRelicStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="neulabs-cdk-constructs.stacks.NewRelicStack.formatArn"></a>

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

###### `components`<sup>Required</sup> <a name="components" id="neulabs-cdk-constructs.stacks.NewRelicStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="neulabs-cdk-constructs.stacks.NewRelicStack.getLogicalId"></a>

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

###### `element`<sup>Required</sup> <a name="element" id="neulabs-cdk-constructs.stacks.NewRelicStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="neulabs-cdk-constructs.stacks.NewRelicStack.regionalFact"></a>

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

###### `factName`<sup>Required</sup> <a name="factName" id="neulabs-cdk-constructs.stacks.NewRelicStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="neulabs-cdk-constructs.stacks.NewRelicStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="neulabs-cdk-constructs.stacks.NewRelicStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="neulabs-cdk-constructs.stacks.NewRelicStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="neulabs-cdk-constructs.stacks.NewRelicStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="neulabs-cdk-constructs.stacks.NewRelicStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="neulabs-cdk-constructs.stacks.NewRelicStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="neulabs-cdk-constructs.stacks.NewRelicStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stacks.NewRelicStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="neulabs-cdk-constructs.stacks.NewRelicStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="neulabs-cdk-constructs.stacks.NewRelicStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="neulabs-cdk-constructs.stacks.NewRelicStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="neulabs-cdk-constructs.stacks.NewRelicStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="neulabs-cdk-constructs.stacks.NewRelicStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="neulabs-cdk-constructs.stacks.NewRelicStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `addBaseTags` <a name="addBaseTags" id="neulabs-cdk-constructs.stacks.NewRelicStack.addBaseTags"></a>

```typescript
public addBaseTags(model: any, props?: BaseTagProps): void
```

###### `model`<sup>Required</sup> <a name="model" id="neulabs-cdk-constructs.stacks.NewRelicStack.addBaseTags.parameter.model"></a>

- *Type:* any

---

###### `props`<sup>Optional</sup> <a name="props" id="neulabs-cdk-constructs.stacks.NewRelicStack.addBaseTags.parameter.props"></a>

- *Type:* neulabs-cdk-constructs.utils.BaseTagProps

---

##### `createResourcesGroup` <a name="createResourcesGroup" id="neulabs-cdk-constructs.stacks.NewRelicStack.createResourcesGroup"></a>

```typescript
public createResourcesGroup(): CfnGroup
```

##### `createCloudwatchLogsStreamRole` <a name="createCloudwatchLogsStreamRole" id="neulabs-cdk-constructs.stacks.NewRelicStack.createCloudwatchLogsStreamRole"></a>

```typescript
public createCloudwatchLogsStreamRole(): IRole
```

##### `createCloudwatchMetricStream` <a name="createCloudwatchMetricStream" id="neulabs-cdk-constructs.stacks.NewRelicStack.createCloudwatchMetricStream"></a>

```typescript
public createCloudwatchMetricStream(roleArn: string, firehoseArn: string): CfnMetricStream
```

###### `roleArn`<sup>Required</sup> <a name="roleArn" id="neulabs-cdk-constructs.stacks.NewRelicStack.createCloudwatchMetricStream.parameter.roleArn"></a>

- *Type:* string

---

###### `firehoseArn`<sup>Required</sup> <a name="firehoseArn" id="neulabs-cdk-constructs.stacks.NewRelicStack.createCloudwatchMetricStream.parameter.firehoseArn"></a>

- *Type:* string

---

##### `createFirehoseBucket` <a name="createFirehoseBucket" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseBucket"></a>

```typescript
public createFirehoseBucket(newRelicBucketName: string): IBucket
```

###### `newRelicBucketName`<sup>Required</sup> <a name="newRelicBucketName" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseBucket.parameter.newRelicBucketName"></a>

- *Type:* string

---

##### `createFirehoseRole` <a name="createFirehoseRole" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseRole"></a>

```typescript
public createFirehoseRole(newRelicFirehoseBucket: IBucket): IRole
```

###### `newRelicFirehoseBucket`<sup>Required</sup> <a name="newRelicFirehoseBucket" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseRole.parameter.newRelicFirehoseBucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `createFirehoseStream` <a name="createFirehoseStream" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream"></a>

```typescript
public createFirehoseStream(newRelicBucket: IBucket, role: IRole, endpointType: EndpointType, endpointUrl: string, newRelicLicenseLey: string): CfnDeliveryStream
```

###### `newRelicBucket`<sup>Required</sup> <a name="newRelicBucket" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream.parameter.newRelicBucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

###### `role`<sup>Required</sup> <a name="role" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

###### `endpointType`<sup>Required</sup> <a name="endpointType" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream.parameter.endpointType"></a>

- *Type:* neulabs-cdk-constructs.stacks.EndpointType

---

###### `endpointUrl`<sup>Required</sup> <a name="endpointUrl" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream.parameter.endpointUrl"></a>

- *Type:* string

---

###### `newRelicLicenseLey`<sup>Required</sup> <a name="newRelicLicenseLey" id="neulabs-cdk-constructs.stacks.NewRelicStack.createFirehoseStream.parameter.newRelicLicenseLey"></a>

- *Type:* string

---

##### `createNewRelicRole` <a name="createNewRelicRole" id="neulabs-cdk-constructs.stacks.NewRelicStack.createNewRelicRole"></a>

```typescript
public createNewRelicRole(newRelicAccountId: string): IRole
```

###### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.stacks.NewRelicStack.createNewRelicRole.parameter.newRelicAccountId"></a>

- *Type:* string

---

##### `createSecrets` <a name="createSecrets" id="neulabs-cdk-constructs.stacks.NewRelicStack.createSecrets"></a>

```typescript
public createSecrets(newRelicAccountId: string, newRelicLicenseLey: string): Secret
```

###### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.stacks.NewRelicStack.createSecrets.parameter.newRelicAccountId"></a>

- *Type:* string

---

###### `newRelicLicenseLey`<sup>Required</sup> <a name="newRelicLicenseLey" id="neulabs-cdk-constructs.stacks.NewRelicStack.createSecrets.parameter.newRelicLicenseLey"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### `isConstruct` <a name="isConstruct" id="neulabs-cdk-constructs.stacks.NewRelicStack.isConstruct"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

stacks.NewRelicStack.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.stacks.NewRelicStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="neulabs-cdk-constructs.stacks.NewRelicStack.isStack"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

stacks.NewRelicStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="neulabs-cdk-constructs.stacks.NewRelicStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="neulabs-cdk-constructs.stacks.NewRelicStack.of"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

stacks.NewRelicStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="neulabs-cdk-constructs.stacks.NewRelicStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicBucket">newRelicBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicFirehoseRole">newRelicFirehoseRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicIntegrationRole">newRelicIntegrationRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicSecret">newRelicSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicCloudwatchLogsStreamRole">newRelicCloudwatchLogsStreamRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicFirehoseLogs">newRelicFirehoseLogs</a></code> | <code>aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicFirehoseMetrics">newRelicFirehoseMetrics</a></code> | <code>aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.account"></a>

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
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.availabilityZones"></a>

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

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.environment"></a>

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

##### `nested`<sup>Required</sup> <a name="nested" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
    either be a concerete region (e.g. `us-west-2`) or the `Aws.REGION`
    token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.stackId"></a>

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


##### `stackName`<sup>Required</sup> <a name="stackName" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.stackName"></a>

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

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `newRelicBucket`<sup>Required</sup> <a name="newRelicBucket" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicBucket"></a>

```typescript
public readonly newRelicBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `newRelicFirehoseRole`<sup>Required</sup> <a name="newRelicFirehoseRole" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicFirehoseRole"></a>

```typescript
public readonly newRelicFirehoseRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `newRelicIntegrationRole`<sup>Required</sup> <a name="newRelicIntegrationRole" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicIntegrationRole"></a>

```typescript
public readonly newRelicIntegrationRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `newRelicSecret`<sup>Required</sup> <a name="newRelicSecret" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicSecret"></a>

```typescript
public readonly newRelicSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `newRelicCloudwatchLogsStreamRole`<sup>Optional</sup> <a name="newRelicCloudwatchLogsStreamRole" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicCloudwatchLogsStreamRole"></a>

```typescript
public readonly newRelicCloudwatchLogsStreamRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `newRelicFirehoseLogs`<sup>Optional</sup> <a name="newRelicFirehoseLogs" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicFirehoseLogs"></a>

```typescript
public readonly newRelicFirehoseLogs: CfnDeliveryStream;
```

- *Type:* aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream

---

##### `newRelicFirehoseMetrics`<sup>Optional</sup> <a name="newRelicFirehoseMetrics" id="neulabs-cdk-constructs.stacks.NewRelicStack.property.newRelicFirehoseMetrics"></a>

```typescript
public readonly newRelicFirehoseMetrics: CfnDeliveryStream;
```

- *Type:* aws-cdk-lib.aws_kinesisfirehose.CfnDeliveryStream

---


## Structs <a name="Structs" id="Structs"></a>

### BaseStackProps <a name="BaseStackProps" id="neulabs-cdk-constructs.stacks.BaseStackProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.stacks.BaseStackProps.Initializer"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

const baseStackProps: stacks.BaseStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.BaseStackProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.crossRegionReferences"></a>

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

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.env"></a>

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


##### `stackName`<sup>Optional</sup> <a name="stackName" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.stacks.BaseStackProps.property.stage"></a>

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
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.businessUnit">businessUnit</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.domain">domain</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.repositoryName">repositoryName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.BaseTagProps.property.repositoryVersion">repositoryVersion</a></code> | <code>string</code> | *No description.* |

---

##### `businessUnit`<sup>Optional</sup> <a name="businessUnit" id="neulabs-cdk-constructs.utils.BaseTagProps.property.businessUnit"></a>

```typescript
public readonly businessUnit: string;
```

- *Type:* string

---

##### `domain`<sup>Optional</sup> <a name="domain" id="neulabs-cdk-constructs.utils.BaseTagProps.property.domain"></a>

```typescript
public readonly domain: string;
```

- *Type:* string

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

### NewRelicStackProps <a name="NewRelicStackProps" id="neulabs-cdk-constructs.stacks.NewRelicStackProps"></a>

#### Initializer <a name="Initializer" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.Initializer"></a>

```typescript
import { stacks } from 'neulabs-cdk-constructs'

const newRelicStackProps: stacks.NewRelicStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.analyticsReporting">analyticsReporting</a></code> | <code>boolean</code> | Include runtime versioning information in this Stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.crossRegionReferences">crossRegionReferences</a></code> | <code>boolean</code> | Enable this flag to allow native cross region stack references. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.env">env</a></code> | <code>aws-cdk-lib.Environment</code> | The AWS environment (account/region) where this stack will be deployed. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.stackName">stackName</a></code> | <code>string</code> | Name to deploy the stack with. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method to use while deploying this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Stack tags that will be applied to all the taggable resources and the stack itself. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether to enable termination protection for this stack. |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.stage">stage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicAccountId">newRelicAccountId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicApiUrlLogs">newRelicApiUrlLogs</a></code> | <code>neulabs-cdk-constructs.stacks.EndpointUrlLogs</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicApiUrlMetrics">newRelicApiUrlMetrics</a></code> | <code>neulabs-cdk-constructs.stacks.EndpointUrlMetrics</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicBucketName">newRelicBucketName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicLicenseKey">newRelicLicenseKey</a></code> | <code>string</code> | *No description.* |

---

##### `analyticsReporting`<sup>Optional</sup> <a name="analyticsReporting" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.analyticsReporting"></a>

```typescript
public readonly analyticsReporting: boolean;
```

- *Type:* boolean
- *Default:* `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key

Include runtime versioning information in this Stack.

---

##### `crossRegionReferences`<sup>Optional</sup> <a name="crossRegionReferences" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.crossRegionReferences"></a>

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

##### `description`<sup>Optional</sup> <a name="description" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `env`<sup>Optional</sup> <a name="env" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.env"></a>

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


##### `stackName`<sup>Optional</sup> <a name="stackName" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string
- *Default:* Derived from construct path.

Name to deploy the stack with.

---

##### `synthesizer`<sup>Optional</sup> <a name="synthesizer" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer
- *Default:* `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.

Synthesis method to use while deploying this stack.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Stack tags that will be applied to all the taggable resources and the stack itself.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to enable termination protection for this stack.

---

##### `stage`<sup>Required</sup> <a name="stage" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.stage"></a>

```typescript
public readonly stage: string;
```

- *Type:* string

---

##### `newRelicAccountId`<sup>Required</sup> <a name="newRelicAccountId" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicAccountId"></a>

```typescript
public readonly newRelicAccountId: string;
```

- *Type:* string

---

##### `newRelicApiUrlLogs`<sup>Required</sup> <a name="newRelicApiUrlLogs" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicApiUrlLogs"></a>

```typescript
public readonly newRelicApiUrlLogs: EndpointUrlLogs;
```

- *Type:* neulabs-cdk-constructs.stacks.EndpointUrlLogs

---

##### `newRelicApiUrlMetrics`<sup>Required</sup> <a name="newRelicApiUrlMetrics" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicApiUrlMetrics"></a>

```typescript
public readonly newRelicApiUrlMetrics: EndpointUrlMetrics;
```

- *Type:* neulabs-cdk-constructs.stacks.EndpointUrlMetrics

---

##### `newRelicBucketName`<sup>Required</sup> <a name="newRelicBucketName" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicBucketName"></a>

```typescript
public readonly newRelicBucketName: string;
```

- *Type:* string

---

##### `newRelicLicenseKey`<sup>Required</sup> <a name="newRelicLicenseKey" id="neulabs-cdk-constructs.stacks.NewRelicStackProps.property.newRelicLicenseKey"></a>

```typescript
public readonly newRelicLicenseKey: string;
```

- *Type:* string

---



## Enums <a name="Enums" id="Enums"></a>

### EndpointType <a name="EndpointType" id="neulabs-cdk-constructs.stacks.EndpointType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.EndpointType.METRICS">METRICS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.EndpointType.LOGS">LOGS</a></code> | *No description.* |

---

##### `METRICS` <a name="METRICS" id="neulabs-cdk-constructs.stacks.EndpointType.METRICS"></a>

---


##### `LOGS` <a name="LOGS" id="neulabs-cdk-constructs.stacks.EndpointType.LOGS"></a>

---


### EndpointUrlLogs <a name="EndpointUrlLogs" id="neulabs-cdk-constructs.stacks.EndpointUrlLogs"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.EndpointUrlLogs.EU_LOGS">EU_LOGS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.EndpointUrlLogs.US_LOGS">US_LOGS</a></code> | *No description.* |

---

##### `EU_LOGS` <a name="EU_LOGS" id="neulabs-cdk-constructs.stacks.EndpointUrlLogs.EU_LOGS"></a>

---


##### `US_LOGS` <a name="US_LOGS" id="neulabs-cdk-constructs.stacks.EndpointUrlLogs.US_LOGS"></a>

---


### EndpointUrlMetrics <a name="EndpointUrlMetrics" id="neulabs-cdk-constructs.stacks.EndpointUrlMetrics"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.stacks.EndpointUrlMetrics.EU_METRICS">EU_METRICS</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.stacks.EndpointUrlMetrics.US_METRICS">US_METRICS</a></code> | *No description.* |

---

##### `EU_METRICS` <a name="EU_METRICS" id="neulabs-cdk-constructs.stacks.EndpointUrlMetrics.EU_METRICS"></a>

---


##### `US_METRICS` <a name="US_METRICS" id="neulabs-cdk-constructs.stacks.EndpointUrlMetrics.US_METRICS"></a>

---


### TagsKey <a name="TagsKey" id="neulabs-cdk-constructs.utils.TagsKey"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#neulabs-cdk-constructs.utils.TagsKey.ENVIRONMENT">ENVIRONMENT</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.TagsKey.TIMESTAMP_DEPLOY_CDK">TIMESTAMP_DEPLOY_CDK</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.TagsKey.BUSINESS_UNIT">BUSINESS_UNIT</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.TagsKey.DOMAIN">DOMAIN</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.TagsKey.REPOSITORY_NAME">REPOSITORY_NAME</a></code> | *No description.* |
| <code><a href="#neulabs-cdk-constructs.utils.TagsKey.REPOSITORY_VERSION">REPOSITORY_VERSION</a></code> | *No description.* |

---

##### `ENVIRONMENT` <a name="ENVIRONMENT" id="neulabs-cdk-constructs.utils.TagsKey.ENVIRONMENT"></a>

---


##### `TIMESTAMP_DEPLOY_CDK` <a name="TIMESTAMP_DEPLOY_CDK" id="neulabs-cdk-constructs.utils.TagsKey.TIMESTAMP_DEPLOY_CDK"></a>

---


##### `BUSINESS_UNIT` <a name="BUSINESS_UNIT" id="neulabs-cdk-constructs.utils.TagsKey.BUSINESS_UNIT"></a>

---


##### `DOMAIN` <a name="DOMAIN" id="neulabs-cdk-constructs.utils.TagsKey.DOMAIN"></a>

---


##### `REPOSITORY_NAME` <a name="REPOSITORY_NAME" id="neulabs-cdk-constructs.utils.TagsKey.REPOSITORY_NAME"></a>

---


##### `REPOSITORY_VERSION` <a name="REPOSITORY_VERSION" id="neulabs-cdk-constructs.utils.TagsKey.REPOSITORY_VERSION"></a>

---
