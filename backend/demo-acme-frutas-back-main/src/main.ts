import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvVars } from './configs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DEFAULT_APP_NAME } from './configs/constants';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<ConfigEnvVars, true>);

  app.enableCors({
    origin: configService.get('ORIGINS'),
  });

  if (!configService.getOrThrow('IS_PRODUCTION', { infer: true })) {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  logger.log(
    'NODE_ENV: ' + configService.getOrThrow('NODE_ENV', { infer: true }),
  );

  const OpenAPIOptions = new DocumentBuilder()
    .setTitle(DEFAULT_APP_NAME)
    .setDescription('Back: ' + DEFAULT_APP_NAME)
    .setVersion(configService.get('APP_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, OpenAPIOptions);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(configService.getOrThrow('PORT', { infer: true }));
}
bootstrap();
