// index.js
const express = require('express');
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// A basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
