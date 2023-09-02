import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import { IoAdapter } from '@nestjs/platform-socket.io'; // Import IoAdapter
import { GyroscopeGateway } from './gyroscope.gateway'; // Import the GyroscopeGateway

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useWebSocketAdapter(new IoAdapter(app)); // Use the IoAdapter
  app.useWebSocketAdapter(new WsAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', './src/views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
