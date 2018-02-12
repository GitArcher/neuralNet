      mvpad.styles = getComputedStyle(mvpad);
      mvpad.addEventListener("touchstart", getDistance);    
      mvpad.addEventListener("touchmove", getTouchCoords);
      mvpad.addEventListener("touchend", clearTimer);

      rtpad.styles = getComputedStyle(rtpad);
     // rtpad.ontouchstart
      rtpad.ontouchmove = function (e) {
        PosX = Math.floor(e.targetTouches[0].clientX);
        PosY = Math.floor(e.targetTouches[0].clientY);
        alert(PosX+" "+PosY)
        rtpad.touchX = PosX-rtpad.coordX
        rtpad.touchY = PosY-rtpad.coordY
        rtpad.angle = rtpad.touchY/rtpad.touchX
      }

function getTouchCoords(e) {
		e.preventDefault();
	    PosX = Math.floor(e.targetTouches[0].clientX)*devicePixelRatio; 
        PosY = Math.floor(e.targetTouches[0].clientY)*devicePixelRatio;
        
        obj.speedX = (parseInt(PosX-mvpad.mddlX) ) / (75);
        obj.speedY = (parseInt(PosY-mvpad.mddlY) ) / (75);
	  }
