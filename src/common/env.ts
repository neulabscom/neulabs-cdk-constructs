export const ENVIRONMENT = process.env.ENVIRONMENT ?? '';
export const BUSINESS_UNIT = process.env.BUSINESS_UNIT ?? '';
export const DOMAIN = process.env.DOMAIN ?? '';
export const REPOSITORY_NAME = process.env.REPOSITORY_NAME ?? '';
export const REPOSITORY_VERSION = process.env.REPOSITORY_VERSION ?? '';

let timestamp = new Date();
export const TIMESTAMP_DEPLOY_CDK = `${timestamp.getFullYear().toString()}/${timestamp.getMonth().toString()}/${timestamp.getDay().toString()} H:${timestamp.getHours().toString()}`;

export enum TagsKey {
  Environment='Environment',
  TimestampDeployCDK='TimestampDeployCDK',
  BusinessUnit='BusinessUnit', // Indicates which business unit competes for the service released on aws
  Domain='Domain', // Indicates the domain in which the service operates
  RepositoryName='RepositoryName', // Indicates in which repository the released code is contained
  RepositoryVersion='RepositoryVersion', // Indicates which version of the code was released (can be a tag or a commit hash)
}