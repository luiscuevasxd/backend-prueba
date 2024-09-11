export function envVariableValidator(envVariables: {
  [key in string]: string;
}) {
  for (const [key, value] of Object.entries(envVariables)) {
    if (!value) {
      throw new Error(`Missing ${key} in env Variables`);
    }
  }
}

interface EnvVariables {
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  DB_WRITE_HOST: string;
  DB_READ_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

export function getEnvVariableValue(eventName: keyof EnvVariables) {
  const env = process.env[eventName];
  if (!env) throw Error(`env ${eventName} is empty`);
  return env;
}
