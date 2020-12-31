export function getEnvOrThrow(environmentVariableName: string): string {
  const envVar = process.env[environmentVariableName];
  if (!envVar) {
    throw new Error(`Environment variable ${environmentVariableName} not set`);
  }
  return envVar;
}

export const Environment = {
  getLogLevel: (): string => getEnvOrThrow("LOG_LEVEL"),
  getEnvironment: (): string => getEnvOrThrow("NODE_ENV")
};
