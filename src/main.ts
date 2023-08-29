import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io'; // Import IoAdapter
import { GyroscopeGateway } from './gyroscope.gateway'; // Import the GyroscopeGateway

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app)); // Use the IoAdapter

  await app.listen(3000);
}
bootstrap();
