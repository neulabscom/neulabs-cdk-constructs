/* eslint-disable @typescript-eslint/no-shadow */
export const CDK_REGION = process.env.CDK_DEFAULT_REGION ?? '';
export const CDK_ACCOUNT_ID = process.env.CDK_DEFAULT_ACCOUNT ?? '';
export const ENVIRONMENT = process.env.ENVIRONMENT ?? '';
export const BUSINESS_UNIT = process.env.BUSINESS_UNIT ?? '';
export const DOMAIN = process.env.DOMAIN ?? '';
export const REPOSITORY_NAME = process.env.REPOSITORY_NAME ?? '';
export const REPOSITORY_VERSION = process.env.REPOSITORY_VERSION ?? '';

let timestamp = new Date();
export const TIMESTAMP_DEPLOY_CDK = `${timestamp.getFullYear().toString()}/${timestamp.getMonth().toString()}/${timestamp.getDay().toString()} H:${timestamp.getHours().toString()}`;