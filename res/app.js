window.onload = function () {		
  var doc = document, docEl = doc.documentElement,
      list = doc.getElementById('list'), 
      input = doc.getElementById('input'),
      chat = doc.getElementById('hide'),
      notfps = doc.getElementById('fps'),
      mvpad = doc.getElementById('mvpad'),
      rtpad = doc.getElementById('rtpad'),
      btnStart = doc.getElementById('start'),
      globalheight = screen.height*devicePixelRatio,
      globalwidth = screen.width*devicePixelRatio,
      name, fps = 0, socket, timerId, PosX, PosY,
      obj = {
        x: 402,
        y: 202,
        speedX: 0,
        speedY: 0
      },
      canv = doc.getElementById('c1'), 
      ctx = canv.getContext('2d');

      mvpad.styles = getComputedStyle(mvpad);      
      mvpad.ontouchstart = getDistance;
      mvpad.ontouchmove = function (e) {
        PosX = Math.floor(e.targetTouches[0].clientX)*1.5; 
        PosY = Math.floor(e.targetTouches[0].clientY)*1.5;
        obj.speedX = (PosX-mvpad.coordX)/(parseInt(mvpad.styles.width)/2);
        obj.speedY = (PosY-mvpad.coordY)/(parseInt(mvpad.styles.height)/2);
        e.preventDefault();
      }
      mvpad.ontouchend = function () {
        clearTimeout(timerId);
      }
      mvpad.onmousemove = function () {alert('s')}

      rtpad.styles = getComputedStyle(rtpad);
     // rtpad.ontouchstart
      rtpad.ontouchmove = function (e) {
        PosX = Math.floor(e.targetTouches[0].clientX)*1.5;
        PosY = Math.floor(e.targetTouches[0].clientY)*1.5;
        rtpad.touchX = PosX-rtpad.coordX
        rtpad.touchY = PosY-rtpad.coordY
        rtpad.angle = rtpad.touchY/rtpad.touchX
      }

      function reAnim () {
        ctx.save()
        ctx.clearRect(0, 0, canv.width, canv.height);
        
        ctx.beginPath();
        ctx.fillStyle = "rgb(255, 165, 0)";
        ctx.arc(obj.x, obj.y, 25, 0, 2*Math.PI, true);
        ctx.fill();
        
        ctx.fillStyle = "rgb(0, 0, 255)";
        ctx.fillRect(obj.x-4, obj.y, 8, 20);
        ctx.translate(obj.x, obj.y)
        ctx.rotate(rtpad.angle)
        ctx.restore()
        fps++;
        requestAnimationFrame(reAnim);
      }

window.onorientationchange = sizeDef;
      function sizeDef () {
        globalheight = docEl.clientHeight*devicePixelRatio;
        globalwidth = docEl.clientWidth*devicePixelRatio;
        
        canv.height = innerHeight = globalheight;
        canv.width = innerWidth = globalwidth;
        canv.style.height = doc.body.style.height = globalheight+"px";
        canv.style.width = doc.body.style.width = globalwidth+"px";
         
        mvpad.coordX = 15+parseInt(mvpad.styles.width)/2;
        mvpad.coordY = rtpad.coordY = (globalheight-parseInt(mvpad.styles.height)-25)+parseInt(mvpad.styles.height)/2;
        rtpad.coordX = (globalwidth-parseInt(rtpad.styles.width)-15)+parseInt(rtpad.styles.width)/2;
      }
      sizeDef ();
      alert(innerWidth+" "+document.documentElement.clientWidth)

      btnStart.onclick = function () { 
        doc.body.removeChild(btnStart);
        doc.documentElement.webkitRequestFullscreen();
   //     screen.orientation.lock('landscape');

        doc.documentElement.style.zoom = screen.width/globalwidth;
        reAnim ();
      }

      function getDistance() {
        timerId = setTimeout(getDistance, 20);
        if (obj.speedX > 1) {
          obj.speedX = 1;
        }
        if (obj.speedX < -1) {
          obj.speedX = -1;
        }
        if (obj.speedY > 1) {
          obj.speedY = 1;
        }
        if (obj.speedY < -1) {
          obj.speedY = -1;
        }
        obj.x = obj.x+Math.round(obj.speedX*200)/100;
        obj.y = obj.y+Math.round(obj.speedY*200)/100;
      }
 
      chat.onclick = function () {
        if (list.style.left == "-500px") {
          list.style.left = "1px";
          input.style.left = "1px";
          chat.innerHTML = "Скрыть чат";
        } 
        else {
          list.style.left= "-500px";
          input.style.left = "-500px";
          chat.innerHTML = "Показать чат";
        } 
      } 

      setTimeout(function timerfps () {
        setTimeout(timerfps, 1000);
        notfps.innerHTML = "fps: "+fps;
        fps = 0;
      }, 1000);
      
      input.onkeydown = function (e) {
        if (e.keyCode == "13") {
          socket.send(name+": "+input.value);
          input.value = ' ';
        }   
      }

      function checkName () {
        if (name.length == 0 || name === 'null') {
          name = prompt("Введи имя");
          checkName ();
        }
      }

      function addli (text) {
        var li = doc.createElement('li');
        list.appendChild(li);
        li.innerHTML = text;
      }
      
      socket = new WebSocket('ws://localhost:8080');
       
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
}
