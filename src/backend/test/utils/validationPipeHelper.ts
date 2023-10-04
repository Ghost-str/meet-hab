import { Type, ValidationPipe } from '@nestjs/common';
import { VALIDATION_PIPE_CONFIG } from '../../src/config/validation.pipe';

export default function validationPipeHelper() {
  const pipe = new ValidationPipe({
    ...VALIDATION_PIPE_CONFIG,
    exceptionFactory: (errors) => {
      return errors;
    },
  });

  return async (value: unknown, targetDto: Type<unknown>) => {
    return pipe.transform(value, { type: 'body', metatype: targetDto });
  };
}
