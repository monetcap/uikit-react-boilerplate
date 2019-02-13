const express = require('express');

const app = express();
const path = require('path');

const port = process.env.PORT || 8080;

// viewed at http://localhost:8080
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

console.log(`Listening on port ${port}`);
app.listen(port);
