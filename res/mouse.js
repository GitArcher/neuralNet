var statusWork = [];
addEventListener("mousemove", setRotate);
addEventListener("mousedown", function(e) {
	obj.bullets.push(new CreateBullet(e));
    obj.bullets[obj.bullets.length-1].setInterval();	
});

addEventListener("keydown", function (e) {
  if(status == '') {
    getDistance(); 
  }; 
  if(e.keyCode == 37) {
	setWork(0);
    obj.speedX =
    camera.speedX = -3;		
  } else 
  if(e.keyCode == 39) {
    setWork(1);
    obj.speedX =
    camera.speedX = 3;
  }
  if(e.keyCode == 38) {
    setWork(2);
    obj.speedY =
    camera.speedY = -3;
  } else
  if(e.keyCode == 40) {
    setWork(3);
    obj.speedY =
	camera.speedY = 3;
  }			
});

	  addEventListener("keyup", function (e) {
		  if(e.keyCode == 37) {
		    obj.speedX = 0;
		    camera.speedX = 0;
		    checkWork();
		  }
		  if(e.keyCode == 39) {
			obj.speedX = 0;
		    camera.speedX = 0;
		    checkWork();  
		  } 
		  if(e.keyCode == 38) {
			obj.speedY = 0;
			camera.speedY = 0;
			checkWork();
		  }
		  if(e.keyCode == 40) {
			obj.speedY = 0;
			camera.speedY = 0;
			checkWork();
		  }
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
	  
	  function setWork(i) {
		statusWork[i] = 'working';
	  };
	  function clearWork(i) {
		statusWork[i] = '';
	  }
	  function checkWork() {
		for(i=0; i++; i<statusWork.length) {  
		  if(statusWork[i] == 'working') {
		    statusWork[i] = '';
		  } else {
			clearTimer();
		  }
	    }
	  }
	  
