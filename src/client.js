const WebSocket = require('ws');
const client = new WebSocket('ws://localhost:3000');

client.on('error', console.error);
client.on('open', () => {
  console.log('OPEN');

  client.send(JSON.stringify({ event: 'message', data: 'Hello Server!' }));
});
// client.on('ping', heartbeat);
client.on('close', function clear() {
  clearTimeout(this.pingTimeout);
});

client.on('message', function data(data) {
  console.log('DATA', data);
});
