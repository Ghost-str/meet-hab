import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsAlphanumeric,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsAlphanumeric('en-US')
  POSTGRES_HOST: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  POSTGRES_PORT: number;

  @IsAlphanumeric('en-US')
  POSTGRES_USER: string;

  @IsAlphanumeric('en-US')
  POSTGRES_PASSWORD: string;

  @IsAlphanumeric('en-US')
  POSTGRES_DB: string;

  @IsAlphanumeric('en-US')
  BACKEND_APP_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { whitelist: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

const config: ConfigModuleOptions = {
  isGlobal: true,
  // validate,
  cache: true,
  ignoreEnvFile: true,
};

export default config;
