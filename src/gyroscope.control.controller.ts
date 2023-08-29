import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller('control')
export class GyroControlController {
  @Get()
  // @Render('gyro-control') // This uses a template engine to render the HTML
  getGyroControlPage(@Res() res) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Servo Control with Gyroscope</title>
    </head>
    <body>
    // <script src="/socket.io/socket.io.js"></script>
    <script src="/socket.io-client/dist/socket.io.js"></script>

      <h1>Servo Control with Gyroscope</h1>
      <p>Use gyroscope data to control the servo:</p>
      <p>Gyroscope Data:</p>
      <p id="alpha">Alpha: -</p>
      <p id="beta">Beta: -</p>
      <p id="gamma">Gamma: -</p>
      <script>
      const socket = io();

      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        
        // Send data to the server
        // socket.emit('gyroData', { alpha: 45, beta: 30, gamma: 60 });
      });
      
      socket.on('gyroData', (gyro) => {
        console.log('Dataa',gyro);
        const receivedData = JSON.parse(event.data);
          document.getElementById('alpha').textContent = 'Alpha: ' + receivedData.alpha;
          document.getElementById('beta').textContent = 'Beta: ' + receivedData.beta;
          document.getElementById('gamma').textContent = 'Gamma: ' + receivedData.gamma;
        // Send data to the server
        // socket.emit('gyroData', { alpha: 45, beta: 30, gamma: 60 });
      });
      
      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      window.addEventListener('deviceorientation', function(event) {
          const gyroData = {
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
          };
          document.getElementById('alpha').textContent = 'Alpha: ' + gyroData.alpha;
          document.getElementById('beta').textContent = 'Beta: ' + gyroData.beta;
          document.getElementById('gamma').textContent = 'Gamma: ' + gyroData.gamma;
          socket.emit('gyroData', gyroData);
          // ws.send(JSON.stringify(gyroData));
        });
        // const ws = new WebSocket('ws://' + location.hostname + ':3000'); // Adjust the endpoint
        // // const ws = new WebSocket('ws://7d50-201-213-84-107.ngrok-free.app/gyro-data'); // Adjust the endpoint
        // ws.onopen = function() {
        //   console.log('WebSocket connection established');
        // };
        // window.addEventListener('deviceorientation', function(event) {
        //   const gyroData = {
        //     alpha: event.alpha,
        //     beta: event.beta,
        //     gamma: event.gamma
        //   };
        //   ws.send(JSON.stringify(gyroData));
        // });
        // ws.addEventListener('message', function(event) {
        //   const receivedData = JSON.parse(event.data);
        //   document.getElementById('alpha').textContent = 'Alpha: ' + receivedData.alpha;
        //   document.getElementById('beta').textContent = 'Beta: ' + receivedData.beta;
        //   document.getElementById('gamma').textContent = 'Gamma: ' + receivedData.gamma;
        // });
      </script>
    </body>
    </html>
    `;

    res.send(html);
  }
}