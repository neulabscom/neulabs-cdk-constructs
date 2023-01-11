import { Tags } from 'aws-cdk-lib';
import * as env from './env';

export function addBaseTags(module: any) {
  Tags.of(module).add('Environment', env.ENVIRONMENT);
  Tags.of(module).add('Date', env.NEULABS_TIMESTAMP_CDK);
  Tags.of(module).add('BusinessUnit', env.NEULABS_BUSINESS_UNIT);
  Tags.of(module).add('Domain', env.NEULABS_DOMAIN);
  Tags.of(module).add('Repository', env.NEULABS_REPOSITORY);
  Tags.of(module).add('Version', env.NEULABS_VERSION);
}