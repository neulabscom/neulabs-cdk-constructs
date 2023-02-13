import { CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from './base';
import { addBaseTags } from '../common/utils';

export enum ProviderUrl {
  GITHUB = 'https://token.actions.githubusercontent.com'
}

export enum TokenActions {
  ALL,
  ALL_BRANCH,
  ALL_TAGS,
  CUSTOM,
}

export interface GithubOIDCStackStackProps extends BaseStackProps {
  readonly githubUser: string;
  readonly githubRepository: string;
  readonly tokenAction: TokenActions;
  readonly cdkDeployRoleManagedPolicies?: iam.ManagedPolicy[];
  readonly cdkDeployRolePolicyStatements?: iam.PolicyStatement[];
  readonly tokenActionCustom?: string;
}

export class GithubOIDCStack extends BaseStack {
  githubUser: string;
  githubRepository: string;
  tokenAction: TokenActions;
  oidcRole: iam.IRole;
  cdkBootstrapRole: iam.IRole;
  cdkDeployRole: iam.IRole;
  cdkDeployRoleManagedPolicies?: iam.ManagedPolicy[];
  cdkDeployRolePolicyStatements?: iam.PolicyStatement[];

  constructor(scope: Construct, id: string, props: GithubOIDCStackStackProps) {
    super(scope, id, props);

    this.githubUser = props.githubUser;
    this.githubRepository = props.githubRepository;
    this.tokenAction = props.tokenAction;

    let token = this.createTokenAction(props.tokenAction, props.githubUser, props.githubRepository, props.tokenActionCustom);

    this.oidcRole = this.createOidcRole(ProviderUrl.GITHUB, token);
    this.cdkBootstrapRole = this.createCdkBootstrapRole();

    this.cdkDeployRoleManagedPolicies = props.cdkDeployRoleManagedPolicies;
    this.cdkDeployRolePolicyStatements = props.cdkDeployRolePolicyStatements;
    this.cdkDeployRole = this.createCdkDeployRole(this.cdkDeployRoleManagedPolicies, this.cdkDeployRolePolicyStatements);
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

    if (tokenAction === TokenActions.CUSTOM) {
      return `repo:${githubUser}/${githubRepository}:ref:refs/${tokenActionCustom}`;
    }

    throw new Error('tokenAction not found');
  }


  createCdkDeployRole(managed_policies?: iam.IManagedPolicy[], policy_statements?: iam.PolicyStatement[]): iam.IRole {
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
            resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
            actions: [
              'iam:PassRole',
              'iam:CreateRole',
              'iam:DeleteRole',
              'iam:UpdateRole',
              'iam:DetachRolePolicy',
              'iam:AttachRolePolicy',
              'iam:DeleteRolePolicy',
              'iam:PutRolePolicy',
              'ssm:GetParameters',
            ],
            effect: iam.Effect.ALLOW,
          }),
        ],
      },
    );
    let role = new iam.Role(
      this,
      'cdk-oidc-deploy-role', {
        roleName: 'cdk-oidc-deploy-role',
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
        role.addManagedPolicy(managed_policies[index]);
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

  createCdkBootstrapRole(): iam.IRole {
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
        roleName: 'cdk-oidc-bootstrap-role',
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

  createOidcRole(providerUrl: string, token: string): iam.IRole {
    let oidcProvider = new iam.OpenIdConnectProvider(
      this,
      'oidc-provider',
      {
        url: providerUrl,
        clientIds: ['sts.amazonaws.com'],
      },
    );

    let role = new iam.Role(
      this,
      'oidc-role', {
        roleName: 'github-oidc-workflow-role',
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