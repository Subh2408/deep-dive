/* Deep Dive — Particle Field
   Global: startParticles(canvas) → { setDepth(n), destroy() } */
function startParticles(canvas){
  var cx=canvas.getContext('2d'),W,H,D=0,raf;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  var pts=[];
  for(var i=0;i<55;i++) pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.3+.3,o:Math.random()*.35+.07});
  function draw(){
    cx.clearRect(0,0,W,H);
    var cd=72+D*18,al=.022+D*.012;
    pts.forEach(function(p){
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);
      cx.fillStyle='rgba(184,146,78,'+(p.o*(0.35+D*.1))+')';cx.fill();
    });
    for(var i=0;i<pts.length;i++) for(var j=i+1;j<pts.length;j++){
      var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<cd){cx.beginPath();cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.strokeStyle='rgba(184,146,78,'+(al*(1-d/cd))+')';cx.lineWidth=.45;cx.stroke();}
    }
    raf=requestAnimationFrame(draw);
  }
  draw();
  return{setDepth:function(d){D=d;},destroy:function(){cancelAnimationFrame(raf);window.removeEventListener('resize',resize);}};
}
