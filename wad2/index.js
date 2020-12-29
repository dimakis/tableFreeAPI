// Load the http module to create an http server.
import http from 'http';
import dotenv from 'dotenv'
const fs = require('file-system')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')


dotenv.config()

const port = process.env.PORT
// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello  World!');
});

server.listen(port);

// Put a friendly message on the terminal
console.log(`Server running at ${port}`);

