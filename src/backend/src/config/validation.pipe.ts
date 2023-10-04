import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_CONFIG: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
};
