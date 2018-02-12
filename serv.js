const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

let port = process.env.PORT || 8080;
let host = process.env.HOST || '192.168.1.101';

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

server.listen(port, host, () => {
  console.log(port, host);
});
