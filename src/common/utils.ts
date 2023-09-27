import { Tags } from 'aws-cdk-lib';
import * as env from './env';

export interface BaseTagProps {
  readonly team?: string;
  readonly repositoryName?: string;
  readonly repositoryVersion?: string;
}

export function addBaseTags(module: any, props?: BaseTagProps) {
  Tags.of(module).add('Environment', env.TAG_ENVIRONMENT);
  Tags.of(module).add('TimestampDeployCDK', env.TAG_TIMESTAMP_DEPLOY_CDK);

  let team = props?.team ?? env.TAG_TEAM;
  if (team) {
    Tags.of(module).add('Team', props?.team ?? env.TAG_TEAM);
  }

  let repositoryName = props?.repositoryName ?? env.TAG_REPOSITORY_NAME;
  if (repositoryName) {
    Tags.of(module).add('RepositoryName', repositoryName);
  }

  let repositoryVersion = props?.repositoryVersion ?? env.TAG_REPOSITORY_VERSION;
  if (repositoryVersion) {
    Tags.of(module).add('RepositoryVersion', repositoryVersion);
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