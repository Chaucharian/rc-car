// import {
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   MessageBody,
// } from '@nestjs/websockets';

// @WebSocketGateway()
// // @WebSocketGateway({ path: '/sendControls', transports: ['websocket'] })
// export class GyroscopeGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   server;

//   handleConnection(client, ...args: any[]) {
//     console.log('Client connected:', client.id);
//   }

//   handleDisconnect(client) {
//     console.log('Client disconnected:', client.id);
//   }

//   @SubscribeMessage('message') // 'message' is the event name
//   // handleMessage(@MessageBody() data: string, client: Socket) {
//   // @ConnectedSocket
//   handleMessage(data, client) {
//     console.log('Received message:', client);

//     // setTimeout(() => {
//     //   console.log('EMIT ');
//     //   // this.server.em
//     //   // data.sender.send('newMessage', 'asdsdas');
//     //   // client..emit('newMessage', 'Message for all other clients');
//     //   // client.emit('newMessage', 'restinsd');
//     //   data.emit('aasdadsad', 'adasdsa');
//     //   this.server.emit('newMessage', data);
//     // }, 4000);

//     // return data.emit('adasdsa', { event: 'adasd', data: 'adasd' });
//     // return this.server.emit(
//     //   '{"event": "message", "data": "Gyroscope data from ESP8266"}',
//     // );

//     console.log(data);
//     return this.server.emit('message', { adasd: 'ada' });
//   }
// }
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

@WebSocketGateway({ path: '/socket', transports: ['websocket'] })
export class GyroscopeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  // Keep track of connected clients
  connectedClients: Set<any> = new Set();

  handleConnection(client) {
    console.log('Client connected:', client.id);

    // Add the connected client to the set
    this.connectedClients.add(client);
  }

  handleDisconnect(client) {
    console.log('Client disconnected:', client.id);

    // Remove the disconnected client from the set
    this.connectedClients.delete(client);
  }

  @SubscribeMessage('message')
  handleMessage(data, client) {
    // console.log('Received message:', data);

    // Broadcast the message to all connected clients
    this.connectedClients.forEach((connectedClient) => {
      connectedClient.send(
        JSON.stringify({ event: 'controlData', data: 'Broadcasted message' }),
      );
    });
  }
}
