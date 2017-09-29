  var doc = document, html = doc.documentElement,
      globalwidth, globalheight;
      
  var mt = doc.getElementsByTagName('meta')[1],
      list = doc.getElementById('list'), 
      input = doc.getElementById('input'),
      chat = doc.getElementById('hide'),
      notfps = doc.getElementById('fps'),
      mvpad = doc.getElementById('mvpad'),
      rtpad = doc.getElementById('rtpad'),
      btnStart = doc.getElementById('start'),
      canv = doc.getElementById('c1'), 
      ctx = canv.getContext('2d');
      
  var fps = 0, PosX = 0, PosY = 0, timerID;
  var prefix = ['moz', 'webkit', 'ms', 'o'];
            
  var obj = {
        x: 100,
        y: 100,
        R: 30,
        speedX: 0,
        speedY: 0,
        angle: 0,
      };  
  var gameArea = {
		  width: 4000,
		  height: 4000,
	  };
  var camera = {
		  posX: 0,
		  posY: 0
	  };
 
	  onresize = setTimeout(sizeDef, 200);
      onorientationchange = setTimeout(sizeDef, 200);
      doc.onwebkitfullscreenchange = setTimeout(sizeDef, 200);
      reAnim ();
      sizeDef ();

      function reAnim () {
        ctx.clearRect(0, 0, canv.width, canv.height);       
        ctx.beginPath();
        
        ctx.fillStyle = "rgb(255, 165, 0)";
        ctx.arc(obj.x-camera.posX, obj.y-camera.posY, obj.R, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.fillStyle = "rgb(126, 126, 126)";
        
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.angle);  
        ctx.fillRect(0, -5, 35, 10);
        ctx.rotate(-obj.angle);
        ctx.translate(-obj.x, -obj.y);
                
        fps++;
        requestAnimationFrame(reAnim);
      }
      
      function sizeDef () {
		if(doc.webkitIsFullScreen) {
          globalheight = screen.height*devicePixelRatio;
          globalwidth = screen.width*devicePixelRatio;
		} else {
		  globalheight = innerHeight*devicePixelRatio;
          globalwidth = innerWidth*devicePixelRatio;
		}
		
        canv.height = globalheight;
        canv.width = globalwidth;
        canv.style.height = doc.body.style.height = globalheight+"px";
        canv.style.width = doc.body.style.width = globalwidth+"px";     
        html.style.zoom = 1/devicePixelRatio;
        
        mvpad.mddlX = 90;
        rtpad.mddlX = globalwidth+40;
        mvpad.mddlY = 
        rtpad.mddlY = globalheight-(15+90);
      }
	  
      function fullScreen() {
        if(docEl.requestFullscreen) {
          docEl.requestFullscreen();
        } else if(docEl.webkitrequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else if(docEl.mozRequestFullscreen) {
          docEl.mozRequestFullScreen();
        }
      }

      btnStart.onclick = function () {
		if(doc.webkitIsFullScreen) {
		  doc.webkitCancelFullScreen();
		  html.style.zoom = 1/devicePixelRatio;
		} else {      
        screen.orientation.lock('landscape');
		html.webkitRequestFullscreen();
        html.style.zoom = 1/devicePixelRatio;
		}
      }

      function getDistance() {
 /*       if(obj.speedX > 1) {
          obj.speedX = 1;
        }
        if(obj.speedX < -1) {
          obj.speedX = -1;
        }
        if(obj.speedY > 1) {
          obj.speedY = 1;
        }
        if(obj.speedY < -1) {
          obj.speedY = -1;
        }*/
        
		if(obj.x-obj.R <= 0 && obj.speedX >= '-1' && obj.speedX <= 0) { 
		  obj.speedX = 0;
		  obj.x = obj.R;
	    } else if(obj.x+obj.R >= canv.width && obj.speedX <= 1 && obj.speedX >= 0) {
		  obj.speedX = 0;
		  obj.x = canv.width-obj.R;
		}
		if(obj.y-obj.R <= 0 && obj.speedY >= '-1' && obj.speedY <= 0) {
		  obj.speedY = 0;
		  obj.y = obj.R;
		} else if(obj.y+obj.R >= canv.height && obj.speedY <= 1 && obj.speedY >= 0) {
		  obj.speedY = 0;
		  obj.y = canv.height-obj.R
		}
        obj.x = obj.x+Math.round(obj.speedX*200)/100;
        obj.y = obj.y+Math.round(obj.speedY*200)/100;
		timerID = setTimeout(getDistance, 20);
      }
      
       
	  
	  function clearTimer () {
	    clearTimeout(timerID);
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
          chat.style.width = '6%';
          chat.innerHTML = "Показать чат";
        } 
      } 

      setInterval(function () {
        notfps.innerHTML = "fps: "+fps;
        fps = 0;
      }, 1000);

