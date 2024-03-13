import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as YAML from 'yamljs';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          statusCode: 400,
          message: Object.values(errors[0].constraints)[0],
        });
      },
    }),
  );

  const swaggerDocument = YAML.load('doc/api.yaml');
  SwaggerModule.setup('/yaml-docs', app, swaggerDocument);

  const config = new DocumentBuilder()
    .setTitle('Service example')
    .setDescription('The Service API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/runtime-docs', app, document);

  await app.listen(4000);
}
bootstrap();
