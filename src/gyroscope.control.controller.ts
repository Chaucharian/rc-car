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
    // <script src="/socket.io-client/dist/socket.io.js"></script>

      <h1>Servo Control with Gyroscope</h1>
      <p>Use gyroscope data to control the servo:</p>
      <p>Gyroscope Data:</p>
      <p id="alpha">Alpha: -</p>
      <p id="beta">Beta: -</p>
      <p id="gamma">Gamma: -</p>
      <script>

      // const socketConnection = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL
      const socketConnection = new WebSocket("wss://rc-car-service.onrender.com:443/socket"); // Replace with your WebSocket server URL

      
      socketConnection.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');


      socketConnection.addEventListener('message', function(event) {
        const message = event.data;
        console.log('Received message:', message); 
      })

      });

      socketConnection.addEventListener('close', (event) => {
        console.log('Connection closed');
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
          socketConnection.send(JSON.stringify({ event: 'message', data: gyroData }));
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
