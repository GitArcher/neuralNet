var socket = new WebSocket('wss://obscure-waters-65421.herokuapp.com/');
//var socket = new WebSocket('ws://192.168.1.101:8080');
var name;
       
    socket.onopen = function () {
      name = prompt("Введи имя"); 
      checkName ();
      socket.send('s'+name);
      addli("Connected to server!");
    }
     
    socket.onmessage = function (e) {
      addli(e.data);
    }
       
    socket.onerror = function (error) {
      alert(error.message);
    }
      
    function checkName () {
      if (name.length == 0 || name === 'null') {
        name = prompt("Введи имя");
        checkName ();
      }
    }
      
    input.onkeydown = function (e) {
      if (e.keyCode == "13") {
        socket.send(name+": "+input.value);
        input.value = ' ';
      }   
    }
      
    function addli (text) {
      var li = doc.createElement('li');
      list.appendChild(li);
      li.innerHTML = text;
    }
