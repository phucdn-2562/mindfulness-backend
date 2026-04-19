import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port || 3000);
  logger.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
