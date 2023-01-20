import { Tags } from 'aws-cdk-lib';
import * as env from './env';

interface BaseTagPorps {
  BusinessUnit?: string;
  Domain?: string;
  RepositoryName?: string;
  RepositoryVersion?: string;
}

export function addBaseTags(module: any, props?: BaseTagPorps) {
  Tags.of(module).add(env.TagsKey.Environment, env.ENVIRONMENT);
  Tags.of(module).add(env.TagsKey.TimestampDeployCDK, env.TIMESTAMP_DEPLOY_CDK);

  let businessUnit = props?.BusinessUnit ?? env.BUSINESS_UNIT;
  if (businessUnit) {
    Tags.of(module).add(env.TagsKey.BusinessUnit, businessUnit);
  }

  let domain = props?.Domain ?? env.DOMAIN;
  if (domain) {
    Tags.of(module).add(env.TagsKey.Domain, domain);
  }

  let repositoryName = props?.RepositoryName ?? env.REPOSITORY_NAME;
  if (repositoryName) {
    Tags.of(module).add(env.TagsKey.RepositoryName, repositoryName);
  }

  let repositoryVersion = props?.RepositoryVersion ?? env.REPOSITORY_VERSION;
  if (repositoryVersion) {
    Tags.of(module).add(env.TagsKey.RepositoryVersion, repositoryVersion);
  }
}
