import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GyroscopeGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: any) {
    // throw new Error('Method not implemented.');
  }
  @WebSocketServer() server: Server;
  private gyroData: any = {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.address}`);
    // Send stored gyroscope data to the connecting client
    client.emit('gyroData', this.gyroData);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.address}`);
  }
  @SubscribeMessage('gyroData') // This is a custom event
  handleGyroscopeData(client: Socket, data: any) {
    this.gyroData = data; // Store the gyroscope data
    this.server.emit('gyroData', data); // Forward data to all connected clients
  }
}
