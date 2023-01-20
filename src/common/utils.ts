import { Tags } from 'aws-cdk-lib';
import * as env from './env';

export interface BaseTagProps {
  readonly businessUnit?: string;
  readonly domain?: string;
  readonly repositoryName?: string;
  readonly repositoryVersion?: string;
}

export function addBaseTags(module: any, props?: BaseTagProps) {
  Tags.of(module).add(env.TagsKey.ENVIRONMENT, env.ENVIRONMENT);
  Tags.of(module).add(env.TagsKey.TIMESTAMP_DEPLOY_CDK, env.TIMESTAMP_DEPLOY_CDK);

  let businessUnit = props?.businessUnit ?? env.BUSINESS_UNIT;
  if (businessUnit) {
    Tags.of(module).add(env.TagsKey.BUSINESS_UNIT, businessUnit);
  }

  let domain = props?.domain ?? env.DOMAIN;
  if (domain) {
    Tags.of(module).add(env.TagsKey.DOMAIN, domain);
  }

  let repositoryName = props?.repositoryName ?? env.REPOSITORY_NAME;
  if (repositoryName) {
    Tags.of(module).add(env.TagsKey.REPOSITORY_NAME, repositoryName);
  }

  let repositoryVersion = props?.repositoryVersion ?? env.REPOSITORY_VERSION;
  if (repositoryVersion) {
    Tags.of(module).add(env.TagsKey.REPOSITORY_VERSION, repositoryVersion);
  }
}
