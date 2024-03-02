// server.js or index.js

const express = require('express');
const next = require('next');
const connectDB = require('./src/lib/mongodb'); // Adjust the path as needed

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to the database
connectDB();

app.prepare().then(() => {
  const server = express();

  // Your server configuration and routes go here

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
