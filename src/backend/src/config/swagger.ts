import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function makeSwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('The Meet')
    .setDescription('The Meet API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
