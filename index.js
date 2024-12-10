const express = require('express');
const app = express();
const port = 3000;

// Import body parser
const bodyParser = require('body-parser');

// Insert, edit, delete
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Menangani request GET ke root ('/') dan mengirimkan HTML dengan tombol
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mobile Legends</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h1 {
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: #4CAF50;
          color: white;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div>
        <h1>Selamat datang di API Mobile Legends!</h1>
        <button onclick="goToHeroApi()">Ke API Hero</button>
      </div>

      <script>
        function goToHeroApi() {
          // Arahkan pengguna ke /api/hero
          window.location.href = "http://localhost:3000/api/hero";
        }
      </script>
    </body>
    </html>
    `;
    res.send(html);  // Kirim HTML sebagai response
});


// Import route post
const heroRouter = require('./routes/hero');
app.use('/api/hero', heroRouter);

// Mulai server
app.listen(port, () => {
    console.log(`Aplikasi ini berjalan di http://localhost:${port}`);
});
