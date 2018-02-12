var express = require('express'),
    WebSocket = require('ws'),
    http = require('http');

var app = express();
app.use(express.static('res'));
app.get('/', function(req, res){
  res.sendfile("res/index.html");
});

var server = http.createServer(app),
    wss = new WebSocket.Server({ server });

var clients = [];
var gamers = [];

wss.on('connection', function (ws) {
  clients.push(ws);
  console.log('Клиент',ws._ultron.id,': Connected');

  ws.on('message', function (msg) {
    routeCode(msg, ws);
  });

  ws.on('close', function () {
    for (i=0; i<clients.length; i++) {
      if (ws === clients[i]) {
        clients.splice(i, 1);
        gamers.splice(i, 1);
        break;
      };
    };
    sendAll('m'+ws.name+' disconnected')
    console.log('Клиент', ws.name, ':  disconnected');
  });

  ws.on('error', function(err) {
    console.log('Ошибка ', err);
  });

});

var port = process.env.PORT || 8080;
server.listen(port, function () {
  console.log('Сервер запущен на порту:'+port);
});

function sendAll (msg, ws) {
  for(i=0; i<clients.length; i++) {
    clients[i].send(msg);      
  };
};

function routeCode (msg, ws) {
  if(msg[0] === '{'){
	for(i=0; i<clients.length; i++) {
	  if(ws === clients[i]) {
		gamers[i] = msg;
		msg = gamers.join(';')
	  };
	};
    sendAll(msg, ws);
  } else
  if(msg[0] === 's') {
      msg = msg.split('');
      msg.shift();
      ws.name = msg.join('');
      sendAll ("m"+ws.name +' connected', ws);
      console.log('Клиент',ws.name,': ', msg);
  } 
  else {
    sendAll(msg, ws);
  };
};
