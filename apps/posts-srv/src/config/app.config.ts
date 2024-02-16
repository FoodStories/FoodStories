interface IAppConfig {
  GRPC_PORT: string;
  MONGODB_URI: string;
}

export const envKeys: string[] = ['GRPC_PORT', 'MONGODB_URI'];

export const appConfig : Partial<IAppConfig> = {};




