  canv.addEventListener("mousemove", setRotate);
      
      addEventListener("keydown", function (e) {
		  if(e.repeat === false) {
			clearTimer()
		    getDistance();  
		  }
		  
		  if(e.keyCode == 38) {
		    obj.speedY = -1;
		  } else if(e.keyCode == 40) {
		    obj.speedY = 1;
		  } else if(e.keyCode == 39) {
		    obj.speedX = 1;
	      } else if(e.keyCode == 37) {
		    obj.speedX = -1;
	      }
	  });
	  addEventListener("keyup", function (e) {
		  if(e.keyCode == 37 || e.keyCode == 39) {
		    obj.speedX = 0;
		  } else 
		  if(e.keyCode == 38 || e.keyCode == 40) {
			obj.speedY = 0;
		  }
		  clearTimer
	  });
	  
	  function setRotate(e) {
		PosX = Math.round( (e.pageX*devicePixelRatio) - obj.x);
		PosY = Math.round(obj.y - (e.pageY*devicePixelRatio) );
		if(PosX >=0 && PosY >=0) {
		  obj.angle = -Math.atan(PosY/PosX);
		} else 
		if(PosX >=0 && PosY <=0) {
		  obj.angle = -Math.atan(PosY/PosX);
		} else
		if(PosX <=0 && PosY >=0) {
		  obj.angle = Math.PI-Math.atan(PosY/PosX);
		} else 
		if(PosX <=0 && PosY <=0) {
		  obj.angle = Math.PI-Math.atan(PosY/PosX);
		}
	  }
