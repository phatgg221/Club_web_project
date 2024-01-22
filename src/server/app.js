const express = require('express');
const next = require('next');
const connectDB = require('@/lib/mongodb'); 

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Connect to MongoDB
  connectDB();

  // No need to manually handle API routes, Next.js does it automatically

  // Handle other routes
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
