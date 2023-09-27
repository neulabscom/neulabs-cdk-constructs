function padTo2Digits(num: any) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
        ' ' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
        ].join(':')
  );
}

export const CDK_REGION = process.env.CDK_DEFAULT_REGION ?? '';
export const CDK_ACCOUNT_ID = process.env.CDK_DEFAULT_ACCOUNT ?? '';
export const TAG_ENVIRONMENT = process.env.ENVIRONMENT ?? '';
export const TAG_TEAM = process.env.TEAM ?? '';
export const TAG_REPOSITORY_NAME = process.env.REPOSITORY_NAME ?? '';
export const TAG_REPOSITORY_VERSION = process.env.REPOSITORY_VERSION ?? '';
export const TAG_TIMESTAMP_DEPLOY_CDK = formatDate(new Date());