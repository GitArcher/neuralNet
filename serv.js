const express = require('express');
const app = express();

let port = process.env.PORT || 8080;

app.use('/op', express.static('res'));
console.log(__dirname);
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

app.listen(port, () => {
  console.log(port);
});
