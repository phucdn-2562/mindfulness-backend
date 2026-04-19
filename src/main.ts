import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.setGlobalPrefix('api');
  app.enableCors();

  // Swagger setup
  if (configService.get('swaggerEnabled')) {
    const config = new DocumentBuilder()
      .setTitle('Mindfulness API')
      .setDescription('The Mindfulness backend API documentation')
      .setVersion('1.0')
      .addTag('mindfulness')
      .addServer('/') // This allows Swagger to work on any domain (local or deployed)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    
    const appUrl = configService.get<string>('appUrl');
    logger.log(`Swagger documentation: ${appUrl}/docs`);
  }

  await app.listen(port || 3000);
  logger.log(`Application is running on: ${configService.get('appUrl')}/api`);
}
bootstrap();
