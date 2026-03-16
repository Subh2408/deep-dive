/* Deep Dive — Audio Engine
   Global: Aud.init(), Aud.depth(n), Aud.silence(), Aud.restore(), Aud.mute() */
var Aud=(function(){
  var ctx,mg,ng,oscGains=[],muted=false;
  function init(){
    if(ctx)return;
    ctx=new(window.AudioContext||window.webkitAudioContext)();
    ctx.resume();
    mg=ctx.createGain();mg.gain.setValueAtTime(0,ctx.currentTime);mg.connect(ctx.destination);
    [[55,.2,'sine'],[110,.06,'sine'],[82.4,.04,'triangle'],[73.4,.03,'sine']].forEach(function(d){
      var o=ctx.createOscillator(),g=ctx.createGain();
      o.type=d[2];o.frequency.value=d[0];g.gain.value=d[1];
      o.connect(g);g.connect(mg);o.start();oscGains.push(g);
    });
    var bs=ctx.sampleRate*2,buf=ctx.createBuffer(1,bs,ctx.sampleRate),data=buf.getChannelData(0),last=0;
    for(var i=0;i<bs;i++){var w=Math.random()*2-1;data[i]=(last+.02*w)/1.02;last=data[i];data[i]*=3;}
    var src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
    ng=ctx.createGain();ng.gain.value=.006;src.connect(ng);ng.connect(mg);src.start();
    var sil=ctx.createBuffer(1,1,ctx.sampleRate),ss=ctx.createBufferSource();
    ss.buffer=sil;ss.connect(ctx.destination);ss.start(0);
    mg.gain.linearRampToValueAtTime(.35,ctx.currentTime+2.5);
    document.addEventListener('touchstart',function ul(){if(ctx&&ctx.state==='suspended')ctx.resume();document.removeEventListener('touchstart',ul);},{once:true});
  }
  function depth(d){
    if(!ctx)return;
    var t=ctx.currentTime;
    mg.gain.linearRampToValueAtTime(Math.min(.3+d*.12,.88),t+1.8);
    if(oscGains[0])oscGains[0].gain.linearRampToValueAtTime(.2+d*.04,t+2);
    if(ng)ng.gain.linearRampToValueAtTime(.006+d*.003,t+2);
  }
  function silence(s){if(ctx)mg.gain.linearRampToValueAtTime(.015,ctx.currentTime+(s||1));}
  function restore(){if(ctx)mg.gain.linearRampToValueAtTime(.55,ctx.currentTime+2.5);}
  function mute(){if(!ctx)return muted;muted=!muted;mg.gain.linearRampToValueAtTime(muted?0:.35,ctx.currentTime+.6);return muted;}
  return{init:init,depth:depth,silence:silence,restore:restore,mute:mute};
})();
