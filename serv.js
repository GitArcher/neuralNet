const express = require('express');
const app = express();

let port = process.env.PORT || 8080;

app.use('/op', express.static(__dirname+'/res'));

app.get('/', function (req, res) {
  res.sendFile('/op'+'/index.html');
});

app.listen(port, () => {
  console.log(port);
});
