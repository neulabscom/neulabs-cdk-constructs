export const ENVIRONMENT = process.env.ENVIRONMENT ?? '';
export const NEULABS_BUSINESS_UNIT = process.env.NEULABS_BUSINESS_UNIT ?? '';
export const NEULABS_DOMAIN = process.env.NEULABS_DOMAIN ?? '';
export const NEULABS_REPOSITORY = process.env.NEULABS_REPOSITORY ?? '';
export const NEULABS_VERSION = process.env.NEULABS_VERSION ?? '';

let timestamp = new Date();
export const NEULABS_TIMESTAMP_CDK = `${timestamp.getFullYear().toString()}/${timestamp.getMonth().toString()}/${timestamp.getDay().toString()} H:${timestamp.getHours().toString()}`;
