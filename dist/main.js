!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/dist/",t(t.s=0)}([function(e,n,t){var r=document.getElementById("canvas"),i=r.getContext("2d");document.getElementById("sound");r.height=700,r.width=1e3;var a=new Image;a.src="src/styles/images/city.png";var o=new Image;o.src="src/styles/images/two.jpg";var f=[],m={x:11,y:570,w:140.5,h:135,frameX:0,frameY:0,speed:5,moving:!1,jumping:!1,position:-20,running:!1,faceLeft:!1},u=new Image;u.src="src/styles/images/captainV3.png",window.addEventListener("keydown",(function(e){f[e.keyCode]=!0,m.moving=!0})),window.addEventListener("keyup",(function(e){delete f[e.keyCode],m.moving=!1,m.running=!1}));var g,c,d,s;function y(){var e,n,t,o,p,v,l,w,h;requestAnimationFrame(y),c=Date.now(),(s=c-d)>g&&(d=c-s%g,i.clearRect(0,0,r.width,r.height),i.drawImage(a,m.position%a.width-500,0,a.width,r.height),e=u,n=m.w*m.frameX,t=m.h*m.frameY,o=m.w,p=m.h,v=m.x,l=m.y,w=.9*m.w,h=.9*m.h,i.drawImage(e,n,t,o,p,v,l,w,h),f[39]&&m.x<550&&(m.position-=5,m.frameY=0,m.x+=m.speed,m.moving=!0,m.faceLeft=!1),f[39]&&m.x>=550&&(m.moving=!0,m.position-=5,m.faceLeft=!1),575===m.y&&f[16]&&f[39]&&(m.frameY=2,m.h=130,m.running=!0,m.faceLeft=!1),f[37]&&m.x>0&&(m.position+=5,m.moving=!0,m.frameY=1,m.h=125,m.x-=m.speed,m.faceLeft=!0),f[37]&&m.x>=-10&&(m.moving=!0,m.faceLeft=!0),575===m.y&&f[16]&&f[37]&&(m.frameY=3,m.h=125,m.running=!0,m.faceLeft=!0),f[38]&&575===m.y&&!m.faceLeft&&(m.frameX=0,m.frameY=4,m.h=130,m.y-=40,m.jumping=!0),f[38]&&575===m.y&&m.faceLeft&&(m.frameX=0,m.frameY=9,m.h=138,m.y-=50,m.jumping=!0),575!==m.y&&(m.moving=!1,m.jumping=!0,m.y+=5),m.frameX<3&&0===m.frameY&&m.moving||m.frameX<3&&1===m.frameY&&m.moving||m.frameX<3&&2===m.frameY||m.frameX<3&&3===m.frameY?m.frameX++:m.frameX=0,function(){for(;m.y>602;)m.y+=5,m.frameX=0,m.frameY=0;575===m.y&&(m.jumping=!1)}(),m.frameX<3&&4===m.frameY||!0===m.jumping&&m.y>600?m.frameX++:!1===m.moving&&m.y<=601&&m.jumping,m.moving||m.jumping||m.running||575!==m.y||m.faceLeft?m.moving||m.jumping||m.running||!m.faceLeft||(m.frameX=0,m.frameY=1):(m.frameX=0,m.frameY=0),!0===m.moving?m.running=!1:!0===m.running&&(m.moving=!1))}window.addEventListener("DOMContentLoaded",(function(e){var n=document.querySelector("audio");n.volume=.2,n.play()})),function(e){g=1e3/e,d=Date.now(),d,y()}(20)}]);
//# sourceMappingURL=main.js.map