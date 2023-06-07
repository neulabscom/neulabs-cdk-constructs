import { Tags } from 'aws-cdk-lib';
import * as env from './env';

export interface BaseTagProps {
  readonly businessUnit?: string;
  readonly domain?: string;
  readonly repositoryName?: string;
  readonly repositoryVersion?: string;
}

export enum TagsKey {
  ENVIRONMENT='Environment',
  TIMESTAMP_DEPLOY_CDK='TimestampDeployCDK',
  BUSINESS_UNIT='BusinessUnit', // Indicates which business unit competes for the service released on aws
  DOMAIN='Domain', // Indicates the domain in which the service operates
  REPOSITORY_NAME='RepositoryName', // Indicates in which repository the released code is contained
  REPOSITORY_VERSION='RepositoryVersion', // Indicates which version of the code was released (can be a tag or a commit hash)
}

export function addBaseTags(module: any, props?: BaseTagProps) {
  Tags.of(module).add(TagsKey.ENVIRONMENT, env.ENVIRONMENT);
  Tags.of(module).add(TagsKey.TIMESTAMP_DEPLOY_CDK, env.TIMESTAMP_DEPLOY_CDK);

  let businessUnit = props?.businessUnit ?? env.BUSINESS_UNIT;
  if (businessUnit) {
    Tags.of(module).add(TagsKey.BUSINESS_UNIT, businessUnit);
  }

  let domain = props?.domain ?? env.DOMAIN;
  if (domain) {
    Tags.of(module).add(TagsKey.DOMAIN, domain);
  }

  let repositoryName = props?.repositoryName ?? env.REPOSITORY_NAME;
  if (repositoryName) {
    Tags.of(module).add(TagsKey.REPOSITORY_NAME, repositoryName);
  }

  let repositoryVersion = props?.repositoryVersion ?? env.REPOSITORY_VERSION;
  if (repositoryVersion) {
    Tags.of(module).add(TagsKey.REPOSITORY_VERSION, repositoryVersion);
  }
}

export const deprecated = (deprecationReason: string) => {
  return (_target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
          propertyDescriptor.value.apply(this, args);
        };

        Object.defineProperty(this, memberName, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        });
        return wrapperFn;
      },
    };
  };
};