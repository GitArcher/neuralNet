const express = require('express');
const app = express();

let port = process.env.PORT || 8080;
let host = process.env.HOST || '192.168.1.101';

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.listen(port, host, () => {
  console.log(port, host);
});
