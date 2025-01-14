import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //configuração da time-zone/fuso-horário em relação ao mediano de greenwich 
  process.env.TZ = '-03:00';

  // Habilita globalmente a validação de dados 
  app.useGlobalPipes(new ValidationPipe());

  // Habilita o CORS na aplicação
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
