import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // remove unwanted fields from the requiest if provided in the body
    forbidNonWhitelisted: true,  //Informs client that their input is wrong throws error if unwanted filed found in the body
    transform: true, // auto-transform incoming JSON to DTO types (numbers etc.) exampleConverts "50" → 50 (number)
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
