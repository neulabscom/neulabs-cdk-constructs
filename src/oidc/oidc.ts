import { CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { addBaseTags } from '../common/utils';
import { BaseStack, BaseStackProps } from '../stack';

export enum ProviderUrl {
  GITHUB = 'https://token.actions.githubusercontent.com'
}

export enum TokenActions {
  ALL,
  ALL_BRANCH,
  ALL_TAGS,
  ONLY_MAIN,
  CUSTOM,
}

export interface GithubOIDCStackStackProps extends BaseStackProps {
  readonly githubUser: string;
  readonly githubRepository: string;
  readonly tokenAction: TokenActions;
  readonly cdkDeployRoleManagedPolicies?: string[];
  readonly cdkDeployRoleAwsManagedPolicies?: string[];
  readonly cdkDeployRolePolicyStatements?: iam.PolicyStatement[];
  readonly tokenActionCustom?: string;
  readonly oidcRoleName?: string;
  readonly cdkBootstrapRoleName?: string;
  readonly cdkDeployRoleName?: string;
}

export class GithubOIDCStack extends BaseStack {
  githubUser: string;
  githubRepository: string;
  tokenAction: TokenActions;
  oidcRole: iam.IRole;
  cdkBootstrapRole: iam.IRole;
  cdkDeployRole: iam.IRole;
  cdkDeployRoleManagedPolicies?: string[];
  cdkDeployRoleAwsManagedPolicies?: string[];
  cdkDeployRolePolicyStatements?: iam.PolicyStatement[];

  constructor(scope: Construct, id: string, props: GithubOIDCStackStackProps) {
    super(scope, id, props);

    this.githubUser = props.githubUser;
    this.githubRepository = props.githubRepository;
    this.tokenAction = props.tokenAction;

    let token = this.createTokenAction(props.tokenAction, props.githubUser, props.githubRepository, props.tokenActionCustom);

    this.oidcRole = this.createOidcRole(ProviderUrl.GITHUB, token, props.oidcRoleName);
    this.cdkBootstrapRole = this.createCdkBootstrapRole(props.cdkBootstrapRoleName);

    this.cdkDeployRoleManagedPolicies = props.cdkDeployRoleManagedPolicies;
    this.cdkDeployRoleAwsManagedPolicies = props.cdkDeployRoleAwsManagedPolicies;
    this.cdkDeployRolePolicyStatements = props.cdkDeployRolePolicyStatements;
    this.cdkDeployRole = this.createCdkDeployRole(
      props.cdkDeployRoleName,
      this.cdkDeployRoleManagedPolicies,
      this.cdkDeployRoleAwsManagedPolicies,
      this.cdkDeployRolePolicyStatements,
    );
  }

  createTokenAction(tokenAction: TokenActions, githubUser: string, githubRepository: string, tokenActionCustom?: string): string {
    if (tokenAction === TokenActions.ALL) {
      return `repo:${githubUser}/*`;
    }

    if (tokenAction === TokenActions.ALL_BRANCH) {
      return `repo:${githubUser}/${githubRepository}:ref:refs/heads/*`;
    }

    if (tokenAction === TokenActions.ALL_TAGS) {
      return `repo:${githubUser}/${githubRepository}:ref:refs/tags/*`;
    }

    if (tokenAction === TokenActions.ONLY_MAIN) {
      return `repo:${githubUser}/${githubRepository}:ref:refs/heads/main`;
    }

    if (tokenAction === TokenActions.CUSTOM) {
      return `repo:${githubUser}/${githubRepository}:ref:refs/${tokenActionCustom}`;
    }

    throw new Error('tokenAction not found');
  }


  createCdkDeployRole(
    roleName?: string,
    managed_policies?: string[],
    aws_managed_policy?: string[],
    policy_statements?: iam.PolicyStatement[],
  ): iam.IRole {
    let basePolicy = new iam.PolicyDocument(
      {
        statements: [
          new iam.PolicyStatement({
            resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
            actions: [
              'sts:AssumeRole',
            ],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: [
              'iam:PassRole',
              'iam:CreateRole',
              'iam:DeleteRole',
              'iam:UpdateRole',
              'iam:*RolePolicy*',
              'ssm:GetParameters',
            ],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: [
              'cloudformation:DescribeStacks',
              'cloudformation:ListStackResources',
              'resource-groups:*',
              'tag:GetResources',
              'tag:TagResources',
              'tag:UntagResources',
              'tag:getTagKeys',
              'tag:getTagValues',
              'resource-explorer:*',
            ],
            effect: iam.Effect.ALLOW,
          }),
        ],
      },
    );
    let role = new iam.Role(
      this,
      'cdk-oidc-deploy-role', {
        roleName: roleName ?? 'cdk-oidc-deploy-role',
        assumedBy: new iam.ServicePrincipal('cloudformation.amazonaws.com'),
        inlinePolicies: {
          CDKDeployBasePolicy: basePolicy,
        },
      },
    );

    if (policy_statements) {
      for (let index = 0; index < policy_statements.length; index++) {
        role.addToPolicy(policy_statements[index]);
      }
    }

    if (managed_policies) {
      for (let index = 0; index < managed_policies.length; index++) {
        role.addManagedPolicy(iam.ManagedPolicy.fromManagedPolicyName(this, `${managed_policies[index]}`, managed_policies[index]));
      }
    }

    if (aws_managed_policy) {
      for (let index = 0; index < aws_managed_policy.length; index++) {
        role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(aws_managed_policy[index]));
      }
    }


    new CfnOutput(this, 'cdk-oidc-deploy-role-output', {
      value: role.roleArn,
      description: 'Role for cdk deploy role arn',
      exportName: 'cdk-oidc-deploy-role',
    });

    addBaseTags(role);

    return role;
  }

  createCdkBootstrapRole(roleName?: string): iam.IRole {
    let policy = new iam.PolicyDocument(
      {
        statements: [
          new iam.PolicyStatement({
            resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
            actions: [
              'sts:AssumeRole',
              'iam:*Role*',
            ],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: [`arn:aws:cloudformation:${this.region}:${this.account}:stack/CDKToolkit/*`],
            actions: [
              'cloudformation:*',
            ],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: [
              's3:*',
            ],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: [`arn:aws:ecr:${this.region}:${this.account}:repository/cdk-*`],
            actions: [
              'ecr:SetRepositoryPolicy',
              'ecr:GetLifecyclePolicy',
              'ecr:PutImageScanningConfiguration',
              'ecr:DescribeRepositories',
              'ecr:CreateRepository',
              'ecr:DeleteRepository',
            ],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: [`arn:aws:ssm:${this.region}:${this.account}:parameter/cdk-bootstrap/*`],
            actions: [
              'ssm:GetParameter*',
              'ssm:PutParameter*',
              'ssm:DeleteParameter*',
            ],
            effect: iam.Effect.ALLOW,
          }),
        ],
      },
    );

    let role = new iam.Role(
      this,
      'cdk-oidc-bootstrap-role', {
        roleName: roleName ?? 'cdk-oidc-bootstrap-role',
        assumedBy: new iam.ServicePrincipal('cloudformation.amazonaws.com'),
        inlinePolicies: {
          CDKBootstrapPolicy: policy,
        },
      },
    );

    new CfnOutput(this, 'cdk-oidc-bootstrap-role-output', {
      value: role.roleArn,
      description: 'Role for cdk bootstrap role arn',
      exportName: 'cdk-oidc-bootstrap-role',
    });

    addBaseTags(role);

    return role;
  }

  createOidcRole(providerUrl: string, token: string, roleName?: string): iam.IRole {
    const oidcProvider = new iam.OpenIdConnectProvider(this, 'OIDCProvider', {
      url: providerUrl,
      clientIds: ['sts.amazonaws.com'],
      thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1'],
    });

    let role = new iam.Role(
      this,
      'oidc-role', {
        roleName: roleName ?? 'github-oidc-workflow-role',
        assumedBy: new iam.WebIdentityPrincipal(oidcProvider.openIdConnectProviderArn, {
          StringLike: {
            'token.actions.githubusercontent.com:sub': token,
          },
        }),
      },
    );

    role.addToPolicy(
      new iam.PolicyStatement({
        resources: ['*'],
        actions: [
          'iam:PassRole',
          'ssm:GetParameter*',
          'cloudformation:*',
          's3:*',
          'ecr:*',
        ],
        effect: iam.Effect.ALLOW,
      }),
    );

    role.addToPolicy(
      new iam.PolicyStatement({
        resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
        actions: ['sts:AssumeRole'],
        effect: iam.Effect.ALLOW,
      }),
    );

    new CfnOutput(this, 'github-oidc-workflow-role-output', {
      value: role.roleArn,
      description: 'Role for OIDC Github Workflow role arn',
      exportName: 'github-oidc-workflow-role',
    });

    addBaseTags(role);

    return role;
  }

}