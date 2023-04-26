import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe - global pipes for all endpoints
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip away unwanted properties from the input object
    forbidNonWhitelisted: true, // throw an error when unwanted properties are present
    transform: true, // automatically transform incoming values to match the expected DTO class
  }));

  // Swagger UI setup
  const config = new DocumentBuilder()
    .setTitle('NestJS Blog API')
    .setDescription('The official API documentation for the NestJS Blog')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
