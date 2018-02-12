const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

let port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

server.listen(port, () => {
  console.log(port, host);
});
