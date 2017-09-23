var express = require('express'),
    WebSocket = require('ws'),
    http = require('http');

var app = express();

app.use('/static', express.static(__dirname + 'res'));

app.get('/', function(req, res){
  res.sendfile("res/index.html");
});

var server = http.createServer(app),
    wss = new WebSocket.Server({ server });

var clients = [];

wss.on('connection', function (ws) {

  clients.push(ws);
  console.log('Клиент',ws._ultron.id,': Connected');

  ws.on('message', function (msg) {
    rocode (msg, ws);
    console.log('Клиент:', msg);
  });

  ws.on('close', function () {
    for (i=0; i<clients.length; i++) {
      if (ws == clients[i]) {
        clients.splice(i, 1);
        break;
      }
    }
    console.log('Клиент', ws.name, ':  disconnected');
  });

  ws.on('error', function(err) {
    console.log('Ошибка ', err);
  });

});

server.listen(process.env.PORT, function () {
  console.log('Сервер запущен');
});

function sendAll (msg) {
  for(i=0; i<clients.length; i++) {
    clients[i].send(msg);
  }
}

function rocode (msg, ws) {
  if (msg[0] == 's') {
      msg = msg.split('');
      msg.shift();
      ws.name = msg.join('');
      sendAll (ws.name +' connected');
  } else
  sendAll(msg);
}
