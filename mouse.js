
var now = require('right-now');

var mousePosition = [0, 0];
var mousePrevPos  = [0, 0];
var mouseVelocity = [0, 0];
var isDown = false;
var lastMouse = 0;

var velocityTmeout = 0;

function vCopy( a, b ){
  a[0] = b[0], a[1] = b[1];
}

function register() {
  window.addEventListener( 'mousemove',  onMouseMove );
  window.addEventListener( 'touchmove',  onMouseMove );

  window.addEventListener( 'mouseup',    onMouseUp   );
  window.addEventListener( 'mousedown',  onMouseDown );

  window.addEventListener( 'touchstart', onTouchStart );
  window.addEventListener( 'touchend',   onTouchEnd );
}

function getMousePosition( e, res ){
  if( e.touches && e.touches[0] ) {
    res[0] = e.touches[0].clientX;
    res[1] = e.touches[0].clientY;
  } else {
    res[0] = e.clientX;
    res[1] = e.clientY;
  }
}


function onMouseMove( e ){
  vCopy( mousePrevPos, mousePosition );
  getMousePosition( e, mousePosition );

  var t = now();
  var dt = (t - lastMouse)/1000.0;

  mouseVelocity[0] = (mousePosition[0] - mousePrevPos[0])/dt;
  mouseVelocity[1] = (mousePosition[1] - mousePrevPos[1])/dt;

  clearTimeout(velocityTmeout);
  velocityTmeout = setTimeout( nullVelocity, 20 );
}

function nullVelocity(){
  mouseVelocity[0] = 0;
  mouseVelocity[1] = 0;
}

function onTouchStart( ){
  isDown = true;
}

function onTouchEnd( e ){
  isDown = e.touches.length > 0;
}

function onMouseUp  ( ){
  isDown = false;
}

function onMouseDown( ){
  isDown = true;
}

register();

module.exports = {

  getPosition : function( vec2 ){
    vCopy( vec2, mousePosition );
  },

  getVelocity : function( vec2 ){
    vCopy( vec2, mouseVelocity );
  },

  isDown : function(){
    return isDown;
  }

};

