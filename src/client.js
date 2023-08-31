const WebSocket = require('ws');
const client = new WebSocket('wss://rc-car-service.onrender.com:443/socket');

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
