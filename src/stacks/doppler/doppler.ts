import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { BaseStack, BaseStackProps } from '../../stack';

const DOPPLER_AWS_ACCOUNT_ID = '299900769157';

export interface DopplerSecretsManagerStackProps extends BaseStackProps {
  readonly dopplerSecretName: string;
  readonly dopplerAccountId: string;
  readonly withSecretCreation?: boolean;
}

export class DopplerSecretsManagerStack extends BaseStack {
  dopplerSecret: secretsmanager.ISecret;
  role: iam.IRole;

  constructor(
    scope: Construct,
    id: string,
    props: DopplerSecretsManagerStackProps,
  ) {
    super(scope, id, props);

    const name = `${props.dopplerSecretName}/${this.stage}/doppler`;

    if (props.withSecretCreation) {
      new secretsmanager.Secret(
        this,
        'doppler-secret',
        {
          secretName: name,
          secretObjectValue: {},
        },
      );
    }

    this.role = new iam.Role(
      this,
      'doppler-role', {
        roleName: 'DopplerRole-Integrations',
        assumedBy: new iam.AccountPrincipal(DOPPLER_AWS_ACCOUNT_ID),
        externalIds: [
          props.dopplerAccountId,
        ],
        inlinePolicies: {
          DopplerRoleBasePolicy: new iam.PolicyDocument(
            {
              statements: [
                new iam.PolicyStatement({
                  resources: ['*'],
                  actions: [
                    'secretsmanager:GetSecretValue',
                    'secretsmanager:DescribeSecret',
                    'secretsmanager:PutSecretValue',
                    'secretsmanager:CreateSecret',
                    'secretsmanager:DeleteSecret',
                    'secretsmanager:TagResource',
                    'secretsmanager:UpdateSecret',
                  ],
                  effect: iam.Effect.ALLOW,
                }),
              ],
            },
          ),
        },
      },
    );
    this.addBaseTags(this.role);

    this.dopplerSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      name,
      name,
    );
  }
}
