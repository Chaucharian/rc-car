import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller('control')
export class GyroControlController {
  @Get()
  // @Render('control')
  // @Render('gyro-control') // This uses a template engine to render the HTML
  getGyroControlPage(@Res() res) {
    //     const html = `
    //     <!DOCTYPE html>
    // <html>

    // <head>
    //     <script>
    //         // var connection = new WebSocket('ws://'+location.hostname+':81/', ['arduino']);
    //         var speed = 0;
    //         var accelerating = false;

    //         // Function to send motor speed value
    //         function sendSpeed(speed) {
    //           console.log('speed',speed)
    //             // connection.send(speed);
    //         }

    //         // Function to smoothly decrease speed to 0
    //         function smoothStop() {
    //             if (speed > 0) {
    //                 var interval = setInterval(function() {
    //                     speed -= 10; // Decrease speed gradually
    //                     if (speed <= 0) {
    //                         clearInterval(interval);
    //                         speed = 0;
    //                     }
    //                     sendSpeed(speed);
    //                 }, 100); // Adjust the interval as needed
    //             }
    //         }

    //         // Function to accelerate smoothly when button is pressed
    //         function accelerate() {
    //             if (!accelerating) {
    //                 accelerating = true;
    //                 var interval = setInterval(function() {
    //                     if (accelerating && speed < 255) {
    //                         speed += 10; // Increase speed gradually
    //                         sendSpeed(speed);
    //                     } else {
    //                         clearInterval(interval);
    //                     }
    //                 }, 100); // Adjust the interval as needed
    //             }
    //         }

    //         // Function to release button and stop smoothly
    //         function releaseButton() {
    //             accelerating = false;
    //             smoothStop();
    //         }
    //     </script>
    // </head>

    // <body>
    //     <b>Car Accelerator</b><br /><br />
    //     <button type="button" onmousedown="accelerate()" onmouseup="releaseButton()" ontouchstart="accelerate()"
    //         ontouchend="releaseButton()">Accelerate</button>
    // </body>

    // </html>
    // `;
    // res.send(html);

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Servo Control with Gyroscope</title>
        </head>
        <body>
        <script>

        var speed = 0;
        var accelerating = false;
        
        // // Function to send motor speed value
        // function sendSpeed(speed) {
        //   console.log('speed',speed)
        //     // connection.send(speed);
        // }

        // Function to smoothly decrease speed to 0
        function smoothStop() {
            if (speed > 0) {
                var interval = setInterval(function() {
                    speed -= 10; // Decrease speed gradually
                    if (speed <= 0) {
                        clearInterval(interval);
                        speed = 0;
                    }
                    sendControls()
                    // sendSpeed(speed);
                }, 100); // Adjust the interval as needed
            }
        }

        // Function to accelerate smoothly when button is pressed
        function accelerate() {
            if (!accelerating) {
                accelerating = true;
                var interval = setInterval(function() {
                    if (accelerating && speed < 255) {
                        speed += 10; // Increase speed gradually
                        sendControls()
                        // sendSpeed(speed);
                    } else {
                        clearInterval(interval);
                    }
                }, 100); // Adjust the interval as needed
            }
        }

        // Function to release button and stop smoothly
        function releaseButton() {
            accelerating = false;
            smoothStop();
        }
    </script>
        <script>

        // const socketConnection = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL
        const socketConnection = new WebSocket("wss://rc-car-service.onrender.com:443/socket"); // Replace with your WebSocket server URL
        let gyroData = {
          alpha: 0,
          beta: 0,
          gamma: 0
        };

        function sendControls() {
          const direction = 'foward';
          console.log({speed,gyroData, direction})
          socketConnection.send(JSON.stringify({ event: 'message', data: { gyroData, speed, direction } }));
        }


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
            
            document.getElementById('alpha').textContent = 'Alpha: ' + gyroData.alpha;
            document.getElementById('beta').textContent = 'Beta: ' + gyroData.beta;
            document.getElementById('gamma').textContent = 'Gamma: ' + gyroData.gamma;
            gyroData = event
            // sendControls(gyroData)
          });
        
        </script>
        
          <h1>Servo Control with Gyroscope</h1>
          <p>Use gyroscope data to control the servo:</p>
          <p>Gyroscope Data:</p>
          <p id="alpha">Alpha: -</p>
          <p id="beta">Beta: -</p>
          <p id="gamma">Gamma: -</p>
          <b>Car Accelerator</b><br /><br />
          <button type="button" onmousedown="accelerate()" onmouseup="releaseButton()" ontouchstart="accelerate()"
              ontouchend="releaseButton()">Accelerate</button>
         
        </body>
        </html>
        `;
    res.send(html);
  }
}
