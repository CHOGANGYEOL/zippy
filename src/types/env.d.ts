declare namespace NodeJS {
  interface ProcessEnv {
    readonly DYNAMODB_REGION: string;
    readonly DYNAMODB_ACCESS_KEY: string;
    readonly DYNAMODB_SECRET_KEY: string;
    readonly DYNAMODB_TABLE_NAME: string;
  }
}
