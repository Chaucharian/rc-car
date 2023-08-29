import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GyroControlController } from './gyroscope.control.controller';
import { GyroscopeGateway } from './gyroscope.gateway'; // Import the GyroscopeGateway

@Module({
  imports: [],
  controllers: [AppController, GyroControlController],
  providers: [AppService, GyroscopeGateway], // Add GyroscopeGateway to providers
})
export class AppModule {}
