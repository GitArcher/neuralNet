const express = require('express');
const app = express();

let port = process.env.PORT || 8080;

app.use(express.static('/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.listen(port, () => {
  console.log(port);
});
