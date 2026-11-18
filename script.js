/* script.js — all JavaScript from Olga v25, original order.
   Data (images, voices, assistant knowledge) lives in assets/data/; server settings in config.js. */
/* ===== <script id="olx-js"> — block 1, original order ===== */
/* =====================================================================
   OLGA · Language transition engine  —  window.OlgaLangFX.play(lang, swap, btn)
   Timeline:  curtain → wreath grows → olive pressed → golden drop →
              oil rises & reveals flag (JO / US) → OLGA logo in gold → exit
   ===================================================================== */
(function(){
  "use strict";
  var root=document.getElementById("olx"); if(!root||!root.animate) return;
  var NS="http://www.w3.org/2000/svg";
  var $=function(id){return document.getElementById(id)};
  var RM=window.matchMedia("(prefers-reduced-motion: reduce)");
  var EASE="cubic-bezier(.22,1,.36,1)", EASE2="cubic-bezier(.65,0,.35,1)", BACK="cubic-bezier(.34,1.56,.64,1)", IN="cubic-bezier(.55,0,.85,.35)";
  var COPY={
    ar:{greet:"أهلاً وسهلاً",sub:"العربية · الأردن",skip:"انقر للتخطي"},
    en:{greet:"Welcome",sub:"English · United States",skip:"Tap to skip"}
  };

  function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
  function star(cx,cy,R,r,n){var p=[];for(var i=0;i<n*2;i++){var a=-Math.PI/2+i*Math.PI/n,rr=i%2?r:R;p.push((cx+Math.cos(a)*rr).toFixed(1)+","+(cy+Math.sin(a)*rr).toFixed(1));}return "M"+p.join("L")+"Z";}

  /* ---------- flags (pure SVG, official colours) ---------- */
  function flagJO(){
    return '<svg x="90" y="90" width="220" height="220" viewBox="0 0 10080 5040" preserveAspectRatio="xMinYMid slice">'+
      '<rect width="10080" height="1680" fill="#000000"/><rect y="1680" width="10080" height="1680" fill="#FFFFFF"/><rect y="3360" width="10080" height="1680" fill="#316218"/>'+
      '<path d="M0 0L5040 2520L0 5040Z" fill="#CE1126"/><path d="'+star(1600,2520,370,170,7)+'" fill="#FFFFFF"/></svg>';
  }
  function flagUS(){
    var s='<svg x="90" y="90" width="220" height="220" viewBox="0 0 7410 3900" preserveAspectRatio="xMinYMid slice">';
    for(var i=0;i<13;i++) s+='<rect y="'+i*300+'" width="7410" height="300" fill="'+(i%2?"#FFFFFF":"#B22234")+'"/>';
    s+='<rect width="2964" height="2100" fill="#4D6A3F"/>'; var d="";
    for(var r=0;r<9;r++){var n=r%2?5:6;for(var j=0;j<n;j++){d+=star(247*(r%2?2+2*j:1+2*j),210*(r+1),120,46,5);}}
    return s+'<path d="'+d+'" fill="#FFFFFF"/></svg>';
  }

  /* ---------- olive branch generator ---------- */
  var BR=[[[196,352],[128,350],[58,300],[52,214]],[[52,214],[48,150],[78,96],[124,60]]];
  var LEAF="M0,0 C5,-5 14,-6 24,0 C14,6 5,5 0,0Z";
  function bz(s,t,k){var u=1-t;return u*u*u*s[0][k]+3*u*u*t*s[1][k]+3*u*t*t*s[2][k]+t*t*t*s[3][k];}
  function bd(s,t,k){var u=1-t;return 3*u*u*(s[1][k]-s[0][k])+6*u*t*(s[2][k]-s[1][k])+3*t*t*(s[3][k]-s[2][k]);}
  function at(t){var i=t<.5?0:1,tt=t<.5?t*2:(t-.5)*2,s=BR[i];return {x:bz(s,tt,0),y:bz(s,tt,1),a:Math.atan2(bd(s,tt,1),bd(s,tt,0))*180/Math.PI};}
  function branch(g,animated){
    var out={stem:null,leaves:[],olives:[]};
    out.stem=el("path",{d:"M"+BR[0][0]+" C"+BR[0][1]+" "+BR[0][2]+" "+BR[0][3]+" C"+BR[1][1]+" "+BR[1][2]+" "+BR[1][3],fill:"none",stroke:"#88985A","stroke-width":"2.4","stroke-linecap":"round",pathLength:"1","stroke-dasharray":"1","stroke-dashoffset":animated?"1":"0"},g);
    var N=11;
    for(var i=0;i<N;i++){
      var t=.06+i*(.92/(N-1)), p=at(t), last=i===N-1, len=26-i*.9;
      var sides=last?[0]:[-1,1];
      sides.forEach(function(sd){
        var sc=(len/24)*(sd>0?.8:1);
        var gg=el("g",{transform:"translate("+p.x.toFixed(1)+" "+p.y.toFixed(1)+") rotate("+(p.a+sd*40).toFixed(1)+") scale("+sc.toFixed(3)+")"},g);
        var lf=el("g",{},gg);
        el("path",{d:LEAF,fill:"url(#olxLeaf)"},lf);
        el("path",{d:"M2,0 L21,0",stroke:"#E4E8DA","stroke-opacity":".35","stroke-width":".9",fill:"none"},lf);
        if(animated) lf.style.transform="scale(0)";
        out.leaves.push({el:lf,t:t});
      });
    }
    [.2,.42,.63,.83].forEach(function(t,k){
      var p=at(t), n=(p.a-90)*Math.PI/180, ox=p.x+Math.cos(n)*10, oy=p.y+Math.sin(n)*10;
      var gg=el("g",{transform:"translate("+ox.toFixed(1)+" "+oy.toFixed(1)+") rotate("+(p.a-90).toFixed(1)+")"},g);
      var o=el("g",{},gg);
      el("ellipse",{rx:"8.5",ry:"6.2",fill:k%2?"url(#olxOliveG)":"url(#olxOliveR)"},o);
      el("ellipse",{cx:"-2.5",cy:"-2.6",rx:"2.4",ry:"1.5",fill:"#FFFFFF",opacity:".45"},o);
      if(animated) o.style.transform="scale(0)";
      out.olives.push(o);
    });
    return out;
  }

  /* build emblem wreath (both sides) */
  var wreath=$("olxWreath"), W=[];
  W.push(branch(el("g",{},wreath),true));
  W.push(branch(el("g",{transform:"matrix(-1 0 0 1 400 0)"},wreath),true));
  /* decorative background branches */
  (function(){var d=$("olxDeco");
    branch(el("g",{transform:"translate(-70 420) scale(1.9) rotate(-14 200 200)"},d),false);
    branch(el("g",{transform:"translate(1070 -120) scale(-1.9 1.9) rotate(-14 200 200)"},d),false);
    branch(el("g",{transform:"translate(1050 560) scale(-1.4 -1.4) rotate(20 200 200)"},d),false);
  })();

  /* ripples + splash */
  var rip=$("olxRipples"), ripples=[], splash=[];
  for(var r=0;r<3;r++){var g=el("g",{transform:"translate(200 200)"},rip);var c=el("circle",{r:"1",fill:"none",stroke:"#DFC292","stroke-width":"1.6","vector-effect":"non-scaling-stroke",opacity:"0"},g);ripples.push(c);}
  var sp=$("olxSplash");
  for(var s=0;s<12;s++){var g2=el("g",{transform:"translate(200 200) rotate("+(s*30+((s%3)*7))+")"},sp);var dd=el("circle",{r:(1.6+(s%3)*.9).toFixed(1),fill:"#E6C793",opacity:"0"},g2);splash.push(dd);}

  /* wave paths */
  function wave(){var s="M-260,0";for(var x=-260;x<660;x+=60)s+=" q15,-8 30,0 t30,0";return s;}
  var WAVE=wave(), WAVE_CLOSED=WAVE+" L660,440 L-260,440 Z";
  var wClip=$("olxWaveClip"), crest=$("olxCrest"), crestB=$("olxCrestB");
  wClip.setAttribute("d",WAVE_CLOSED); crest.setAttribute("d",WAVE); crestB.setAttribute("d",WAVE);
  var foldG=$("olxFoldG");

  /* particles */
  var PBOX=$("olxParticles"), parts=[];
  for(var q=0;q<26;q++){var sp2=document.createElement("i");sp2.className="olx__p";sp2.style.left=(Math.random()*100).toFixed(2)+"%";sp2.style.setProperty("--s",(3+Math.random()*7).toFixed(1)+"px");PBOX.appendChild(sp2);parts.push(sp2);}

  var logoPaths=[].slice.call(document.querySelectorAll("#olxLogo path"));

  /* ---------- runtime state ---------- */
  var anims=[], timers=[], raf=0, state=null;
  /* global tempo: every duration, delay and timer is multiplied by SPEED (1 = original ~4.5s) */
  var SPEED=.3;
  function A(node,kf,opt){var o=Object.assign({fill:"both",easing:EASE},opt);if(o.duration>1)o.duration=Math.round(o.duration*SPEED);if(o.delay)o.delay=Math.round(o.delay*SPEED);var a=node.animate(kf,o);anims.push(a);return a;}
  function T(fn,ms){timers.push(setTimeout(fn,Math.round(ms*SPEED)));}
  function cleanup(){
    anims.forEach(function(a){try{a.cancel()}catch(e){}}); anims=[];
    timers.forEach(clearTimeout); timers=[]; cancelAnimationFrame(raf);
  }
  function center(btn){
    var r=btn&&btn.getBoundingClientRect();
    if(!r||(!r.width&&!r.height)) return {x:innerWidth/2,y:innerHeight/2};
    return {x:r.left+r.width/2,y:r.top+r.height/2};
  }
  function radius(c){return Math.ceil(Math.hypot(Math.max(c.x,innerWidth-c.x),Math.max(c.y,innerHeight-c.y)))+20;}
  function block(e){e.preventDefault();}

  /* oil level + cloth folds loop */
  function loop(st){
    var t0=performance.now();
    function f(now){
      var e=now-t0, lvl;
      var k=Math.min(1,Math.max(0,(e-st.riseAt*SPEED)/(st.riseDur*SPEED))); k=1-Math.pow(1-k,3);
      lvl=st.riseAt<0?78:(322-262*k);
      var ph=-((e*.06/SPEED)%60), ph2=-((e*.035/SPEED+30)%60);
      wClip.setAttribute("transform","translate("+ph.toFixed(2)+" "+lvl.toFixed(2)+")");
      crest.setAttribute("transform","translate("+ph.toFixed(2)+" "+lvl.toFixed(2)+")");
      crestB.setAttribute("transform","translate("+ph2.toFixed(2)+" "+(lvl+5).toFixed(2)+")");
      foldG.setAttribute("gradientTransform","translate("+((e*.05)%120).toFixed(2)+" 0)");
      raf=requestAnimationFrame(f);
    }
    raf=requestAnimationFrame(f);
  }

  function setCopy(lang){
    var c=COPY[lang], g=$("olxGreet"), s=$("olxSub");
    g.textContent=c.greet; g.className="olx__greet is-"+lang; g.lang=lang; g.dir=lang==="ar"?"rtl":"ltr";
    s.textContent=c.sub; s.className="olx__sub is-"+lang; s.lang=lang; s.dir=g.dir;
    $("olxSkip").textContent=c.skip;
    $("olxFlag").innerHTML=lang==="ar"?flagJO():flagUS();
  }

  function finishExit(st){
    if(st.exiting) return; st.exiting=true;
    if(!st.swapped){st.swapped=true;st.swap();}
    timers.forEach(clearTimeout); timers=[];
    var c=center(st.btn), R=radius(c);
    var stage=$("olxStage");
    var fast=st.reduced;
    A(stage,[{opacity:1,transform:"none",filter:"blur(0)"},{opacity:0,transform:"scale(.94)",filter:"blur(6px)"}],{duration:fast?250:520,easing:EASE2});
    var bg=A($("olxBg"),[{clipPath:"circle("+R+"px at "+c.x+"px "+c.y+"px)",opacity:1},{clipPath:"circle(0px at "+c.x+"px "+c.y+"px)",opacity:fast?0:1}],{duration:fast?300:780,delay:fast?0:120,easing:EASE2});
    bg.finished.then(end,end);
    function end(){
      if(state!==st) return;
      cleanup(); root.classList.remove("is-on"); state=null;
      document.removeEventListener("keydown",st.key);
      try{st.btn&&st.btn.focus({preventScroll:true});}catch(e){}
    }
  }

  function play(lang,swap,btn){
    if(state){ return; }                       /* ignore double clicks */
    cleanup(); setCopy(lang);
    var st=state={lang:lang,swap:swap,btn:btn,swapped:false,exiting:false,reduced:RM.matches,riseAt:-1,riseDur:900};
    var c=center(btn), R=radius(c);
    root.classList.add("is-on");
    st.key=function(e){if(e.key==="Escape"||e.key==="Enter"||e.key===" "){e.preventDefault();finishExit(st);}};
    document.addEventListener("keydown",st.key);
    var doSwap=function(){ if(!st.swapped){st.swapped=true;swap();} };

    /* ---- reduced motion: calm cross-fade with the finished emblem ---- */
    if(st.reduced){
      W.forEach(function(b){A(b.stem,[{strokeDashoffset:0},{strokeDashoffset:0}],{duration:1});b.leaves.forEach(function(l){A(l.el,[{transform:"none"},{transform:"none"}],{duration:1})});b.olives.forEach(function(o){A(o,[{transform:"none"},{transform:"none"}],{duration:1})});});
      A($("olxRing"),[{strokeDashoffset:0},{strokeDashoffset:0}],{duration:1});
      A($("olxTint"),[{opacity:0},{opacity:0}],{duration:1});
      logoPaths.forEach(function(p){A(p,[{strokeDashoffset:0,fillOpacity:1,strokeWidth:0},{strokeDashoffset:0,fillOpacity:1,strokeWidth:0}],{duration:1})});
      [$("olxGreet"),$("olxSub")].forEach(function(n){A(n,[{opacity:1},{opacity:1}],{duration:1})});
      A($("olxBg"),[{clipPath:"circle("+R+"px at 50% 50%)",opacity:0},{clipPath:"circle("+R+"px at 50% 50%)",opacity:1}],{duration:260,easing:"ease"});
      A($("olxStage"),[{opacity:0},{opacity:1}],{duration:260,easing:"ease"});
      loop(st);
      T(doSwap,300); T(function(){finishExit(st)},1500);
      return;
    }

    /* ---- 1 · curtain of night opens from the button ---- */
    A($("olxBg"),[{clipPath:"circle(0px at "+c.x+"px "+c.y+"px)"},{clipPath:"circle("+R+"px at "+c.x+"px "+c.y+"px)"}],{duration:760,easing:EASE2});
    A($("olxStage"),[{opacity:1,transform:"none",filter:"blur(0)"},{opacity:1,transform:"none",filter:"blur(0)"}],{duration:1});
    A($("olxDeco"),[{opacity:0,transform:"scale(1.08) rotate(-2deg)"},{opacity:.09,transform:"scale(1) rotate(0)"}],{duration:2600,delay:200});
    parts.forEach(function(p){
      var d=2600+Math.random()*1800, dl=200+Math.random()*1600, dx=(Math.random()*80-40);
      A(p,[{opacity:0,transform:"translate(0,0) scale(.6)"},{opacity:.9,offset:.25},{opacity:.7,offset:.7},{opacity:0,transform:"translate("+dx+"px,-"+(55+Math.random()*40)+"vh) scale(1.1)"}],{duration:d,delay:dl,easing:"cubic-bezier(.3,.6,.4,1)"});
    });

    /* ---- 2 · golden frame + olive wreath grow ---- */
    A($("olxHaloC"),[{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"scale(1)"}],{duration:1100,delay:200});
    $("olxHaloC").style.transformOrigin="200px 200px";
    A($("olxRing"),[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:1000,delay:160,easing:EASE2});
    A($("olxRing2"),[{opacity:0},{opacity:.7}],{duration:800,delay:500});
    W.forEach(function(b){
      A(b.stem,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:900,delay:240,easing:EASE2});
      b.leaves.forEach(function(l){A(l.el,[{transform:"scale(0)"},{transform:"scale(1.15)",offset:.7},{transform:"scale(1)"}],{duration:520,delay:320+l.t*720,easing:EASE});});
      b.olives.forEach(function(o,i){A(o,[{transform:"scale(0)"},{transform:"scale(1.25)",offset:.6},{transform:"scale(1)"}],{duration:520,delay:760+i*110,easing:BACK});});
    });

    /* ---- 3 · the ripe olive is pressed ---- */
    var press=$("olxPress"), olive=$("olxOlive");
    A(press,[{opacity:0,transform:"translateY(-18px)"},{opacity:1,transform:"none"}],{duration:520,delay:420});
    A(olive,[{transform:"scale(1)"},{transform:"scale(1)",offset:.2},{transform:"scale(1.32,.68)",offset:.45},{transform:"scale(.9,1.12)",offset:.65},{transform:"scale(1.18,.8)",offset:.82},{transform:"scale(.92,.92)"}],{duration:700,delay:780,easing:"ease-in-out"});
    A(press,[{opacity:1},{opacity:0,transform:"translateY(-10px)"}],{duration:500,delay:1550,fill:"forwards"});

    /* ---- 4 · a golden drop falls into the frame ---- */
    var drop=$("olxDrop");
    A(drop,[
      {opacity:0,transform:"translate(200px,52px) scale(.1)"},
      {opacity:1,transform:"translate(200px,58px) scale(.75,.9)",offset:.32},
      {opacity:1,transform:"translate(200px,64px) scale(.7,1.05)",offset:.45},
      {opacity:1,transform:"translate(200px,192px) scale(.62,1.45)",offset:.92,easing:IN},
      {opacity:0,transform:"translate(200px,200px) scale(1.6,.2)"}
    ],{duration:820,delay:1080,easing:"ease-out"});
    var IMPACT=1860;
    ripples.forEach(function(rc,i){A(rc,[{opacity:.9,transform:"scale(4)"},{opacity:0,transform:"scale("+(150+i*30)+")"}],{duration:1300,delay:IMPACT+i*150,easing:"cubic-bezier(.16,1,.3,1)"});});
    splash.forEach(function(d,i){var dist=24+(i%4)*9;A(d,[{opacity:1,transform:"translate(0,0) scale(1)"},{opacity:0,transform:"translate("+dist+"px,0) scale(.2)"}],{duration:620+(i%3)*80,delay:IMPACT,easing:"cubic-bezier(.16,1,.3,1)"});});
    A($("olxEmblem"),[{transform:"none"},{transform:"scale(1.035)",offset:.25},{transform:"none"}],{duration:620,delay:IMPACT,easing:EASE});

    /* ---- 5 · oil rises and the flag appears ---- */
    st.riseAt=IMPACT; st.riseDur=950; loop(st);
    A($("olxFlag"),[{transform:"scale(1.18)",filter:"saturate(.6)"},{transform:"scale(1)",filter:"saturate(1)"}],{duration:1500,delay:IMPACT,easing:EASE});
    A($("olxTint"),[{opacity:.78},{opacity:0}],{duration:800,delay:IMPACT+800,easing:"ease-out"});
    A($("olxSheen"),[{opacity:0,transform:"rotate(18deg) translateX(0)"},{opacity:1,offset:.2},{opacity:0,transform:"rotate(18deg) translateX(520px)"}],{duration:900,delay:IMPACT+1050,easing:EASE2});
    $("olxSheen").style.transformOrigin="200px 200px"; $("olxSheen").removeAttribute("transform");

    /* language swap happens behind the closed curtain */
    T(doSwap,860);

    /* ---- 6 · OLGA logo written in liquid gold + greeting ---- */
    logoPaths.forEach(function(p,i){
      A(p,[{strokeDashoffset:1,fillOpacity:0,strokeWidth:46},{strokeDashoffset:0,fillOpacity:0,strokeWidth:46,offset:.62},{strokeDashoffset:0,fillOpacity:1,strokeWidth:0}],{duration:1300,delay:1500+i*70,easing:EASE2});
    });
    A($("olxLogo"),[{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:700,delay:1450});
    A($("olxGreet"),[{opacity:0,transform:"translateY(14px)",filter:"blur(8px)",clipPath:"inset(0 50% 0 50%)"},{opacity:1,transform:"none",filter:"blur(0)",clipPath:"inset(0 0 0 0)"}],{duration:900,delay:2350});
    A($("olxSub"),[{opacity:0,letterSpacing:lang==="ar"?".3em":".9em"},{opacity:.9,letterSpacing:lang==="ar"?".06em":".42em"}],{duration:1000,delay:2550});

    /* ---- 7 · exit: curtain closes into the language button ---- */
    T(function(){finishExit(st)},3700);
  }

  root.addEventListener("click",function(){ if(state) finishExit(state); });
  root.addEventListener("wheel",block,{passive:false});
  root.addEventListener("touchmove",block,{passive:false});

  window.OlgaLangFX={play:play,busy:function(){return !!state;}};
})();
;

/* ===== <script id="olga-gov"> — block 2, original order ===== */
/* v25 · frame governor — on phones the heavy decorative loops (Shams' canvas figure) pause
   while the page is scrolling or a bag animation is playing, and otherwise run at 30 fps,
   so scrolling, taps and the add-to-bag flight always get the full frame budget. */
window.OLGA_GOV=(function(){
  var mob=window.matchMedia("(max-width:760px),(pointer:coarse)").matches, busy=0, lastScroll=-1e9, lastTouch=-1e9, last=0;
  addEventListener("scroll",function(){ lastScroll=performance.now(); },{passive:true});
  addEventListener("touchmove",function(){ lastTouch=performance.now(); },{passive:true});
  function scrolling(now){ now=now||performance.now(); return now-lastScroll<240 || now-lastTouch<180; }
  return {
    mob:mob,
    busy:function(d){ busy=Math.max(0,busy+d); },
    isBusy:function(){ return busy>0; },
    scrolling:scrolling,
    allow:function(ts){ if(!mob) return true; if(busy>0||scrolling()) return false;
      if(document.body.classList.contains("is-locked")){ var o=document.getElementById("olh-root"); if(!o||!o.classList.contains("is-open")) return false; } if(ts-last<29) return false; last=ts; return true; }
  };
})();
;

/* ===== <script id="olga-app"> — block 3, original order ===== */
(function(){
"use strict";
var A=window.OLGA||{}, IMG=A.IMG||{}, CUT=A.CUT||{}, FR=A.FR||[];
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var lerp=function(a,b,t){return a+(b-a)*t};
var DT=1/60; var ease=function(f){return 1-Math.pow(1-f,DT*60)};
var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var WA="962792000155";
document.documentElement.classList.remove("no-js");
if(reduced) document.documentElement.classList.add("reduced");
$("#year").textContent=new Date().getFullYear();
var LOGO_P2D=null; try{ LOGO_P2D=new Path2D(A.LOGO||""); }catch(e){}
function drawLogo(g,cx,cy,h){
  if(!LOGO_P2D) return; var s=h/726, w=1260*s;
  g.save(); g.translate(cx-w/2,cy-h/2); g.scale(s,s); g.translate(0,726); g.scale(.1,-.1); g.fill(LOGO_P2D); g.restore();
}
var LOGO_SVG='<svg class="logo" viewBox="0 0 1260 726" aria-hidden="true"><use href="#olga-logo"/></svg>';

/* ======================= DATA =======================
   Product content comes from the official OLGA Line catalogue.
   PRICES ARE PLACEHOLDERS — replace with Olga's real prices (JOD). */
var ML={en:" ml",ar:" مل"};
function ml(n){return {en:n+" ml",ar:n+" مل"}}
var PRODUCTS=[
 {id:"nabulsi",cat:"body",acc:"#87916B",badge:{en:"Signature",ar:"الأصلي"},
  name:{en:"Nabulsi Liquid Soap",ar:"صابون نابلسي سائل"},
  type:{en:"Hand wash & shower soap",ar:"غسول للأيدي وصابون استحمام"},
  desc:{en:"A rich formula infused with natural oils that provides deep hydration and exceptional softness for your hands.",ar:"تركيبة غنية بالزيوت الطبيعية، توفّر ترطيبًا فائقًا ونعومة لليدين."},
  ing:{en:"Olive oil, natural oil extracts, potassium hydroxide, purified water",ar:"زيت الزيتون، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Extracted from olive oil","Deep hydration & softness","Hand wash & shower soap","100% natural"],ar:["مستخلص من زيت الزيتون","ترطيب فائق ونعومة","غسول للأيدي وصابون استحمام","طبيعي 100%"]},
  variants:[{id:"nabulsi-300",size:ml(300),price:3.50,cut:"nabulsi-900",sc:.8},{id:"nabulsi-900",size:ml(900),price:6.50,cut:"nabulsi-900",sc:1}],def:1,
  gallery:["ph_nabulsi","gift_red","ig_nabulsi","ig_hero_still"],
  spread:{bg:"grove",cal:"نابلسي",sub:"Nabulsi Liquid Soap",page:"06",b1:"nabulsi-900",b2:"nabulsi-900",sizes:"300ml | 900ml"}},
 {id:"shea",cat:"body",acc:"#896832",badge:{en:"Deep moisture",ar:"ترطيب عميق"},
  name:{en:"Shea Butter Liquid Soap",ar:"صابون سائل بزبدة الشيا"},
  type:{en:"Hand wash & shower soap",ar:"غسول للأيدي وصابون استحمام"},
  desc:{en:"A gentle formula enriched with natural shea butter that deeply moisturizes the skin, protects it from dryness, and leaves it soft and refreshed all day long.",ar:"تركيبة لطيفة وغنية بزبدة الشيا الطبيعية، ترطّب البشرة بفعالية وتحميها من الجفاف، وتمنحها نعومة وانتعاشًا يدوم."},
  ing:{en:"Shea butter, natural oil extracts, potassium hydroxide, purified water",ar:"زبدة الشيا، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Shea butter for deep moisture","Protects from dryness","Soft, refreshed skin all day","100% natural"],ar:["زبدة الشيا لترطيب عميق","تحمي البشرة من الجفاف","نعومة وانتعاش يدوم","طبيعي 100%"]},
  variants:[{id:"shea-300",size:ml(300),price:3.50,cut:"shea-300",sc:.84},{id:"shea-900",size:ml(900),price:6.50,cut:"shea-900",sc:1}],def:1,
  gallery:["ph_shea","gift_spot","ig_shea300","ig_shea_anatomy","ig_woman"],
  spread:{bg:"shea_seeds",cal:"الشيا",sub:"Shea Butter Liquid Soap",page:"07",b1:"shea-900",sizes:"300ml | 900ml"}},
 {id:"laurel",cat:"body",acc:"#4D713B",badge:{en:"Purifying",ar:"منقٍّ ومهدّئ"},
  name:{en:"Liquid Laurel Soap",ar:"صابون غار سائل"},
  type:{en:"Hand wash & shower soap",ar:"غسول للأيدي وصابون استحمام"},
  desc:{en:"A natural formula made with laurel oil, known for its purifying and soothing properties. Suitable for all skin types.",ar:"تركيبة طبيعية بزيت الغار المعروف بخصائصه المطهّرة، مناسب لجميع أنواع البشرة."},
  ing:{en:"Laurel oil, natural oils, potassium hydroxide, purified water",ar:"زيت الغار، زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Laurel oil as the key ingredient","Purifying & soothing","Suitable for all skin types","100% natural"],ar:["زيت الغار مكوّن أساسي","مطهّر ومهدّئ","مناسب لجميع أنواع البشرة","طبيعي 100%"]},
  variants:[{id:"laurel-300",size:ml(300),price:3.50,cut:"laurel-300",sc:.84},{id:"laurel-900",size:ml(900),price:6.50,cut:"laurel-900",sc:1}],def:0,
  gallery:["ph_laurel","gift_hand","ig_laurel","ig_handwash"],
  spread:{bg:"laurel_leaf",cal:"الغار",sub:"Liquid Laurel Soap",page:"08",b1:"laurel-300",sizes:"300ml | 900ml"}},
 {id:"laundry",cat:"laundry",acc:"#5B8C42",badge:{en:"Sensitive skin",ar:"للبشرة الحساسة"},
  name:{en:"Nabulsi Laundry Soap",ar:"صابون نابلسي لغسيل الملابس"},
  type:{en:"For children & adults",ar:"للأطفال والكبار"},
  desc:{en:"A gentle formula that cleans deeply and removes tough stains while keeping fabrics soft. Ideal for children’s clothing, safe for sensitive skin and suitable for the whole family’s laundry.",ar:"تركيبة لطيفة تنظّف بعمق وتزيل البقع الصعبة، مع الحفاظ على نعومة الأقمشة. مثالي لملابس الأطفال الصغار ولا يسبب تهيّجًا للبشرة الحساسة، وآمن لملابس جميع أفراد العائلة."},
  ing:{en:"Purified water, fragrance, natural oils, potassium hydroxide",ar:"ماء نقي، عطر، زيوت طبيعية، هيدروكسيد البوتاسيوم"},
  points:{en:["Removes tough stains","Keeps fabrics soft","Ideal for children’s clothes","Extracted from olive oil"],ar:["يزيل البقع الصعبة","يحافظ على نعومة الأقمشة","مثالي لملابس الأطفال","مستخلص من زيت الزيتون"]},
  variants:[{id:"laundry-1800",size:{en:"1800 g",ar:"1800 غ"},price:4.50,cut:"laundry",sc:1}],def:0,
  gallery:["ph_laundry"],
  spread:{bg:"bubbles",cal:"نابلسي",sub:"Nabulsi Laundry Soap",page:"09",b1:"laundry",deco:"baby",sizes:"1.800g"}},
 {id:"moroccan",cat:"hammam",acc:"#7C1D2B",badge:{en:"Detox & exfoliation",ar:"تقشير وديتوكس"},
  name:{en:"Moroccan Hammam Soap",ar:"صابون الحمّام المغربي"},
  type:{en:"Deep cleansing ritual",ar:"طقس تنظيف عميق"},
  desc:{en:"A traditional soap enriched with natural Moroccan oils that enhance the skin’s radiance and softness — a luxurious formula inspired by authentic Moroccan beauty rituals.",ar:"صابون تقليدي غني بزيوت مغربية طبيعية يعزّز إشراقة ونعومة البشرة — تركيبة فاخرة مستوحاة من طقوس الجمال المغربي."},
  ing:{en:"Natural Moroccan oils",ar:"زيوت مغربية طبيعية"},
  points:{en:["100% natural","Deep cleansing","Detox & exfoliation","Radiance & softness"],ar:["طبيعي 100%","تنظيف عميق","ديتوكس وتقشير","إشراقة ونعومة"]},
  variants:[{id:"moroccan-jar",size:{en:"Jar · gift box",ar:"علبة · صندوق هدية"},price:5.00,cut:"moroccan",sc:1,wide:true}],def:0,
  gallery:[],
  spread:{bg:"face_moroccan",cal:"المغربي",sub:"Moroccan Hammam Soap",page:"10",b1:"moroccan",deco:"stones",wide:true,sizes:"100% Natural"}},
 {id:"shea-duo",cat:"sets",acc:"#9E7A3C",badge:{en:"Gift set",ar:"مجموعة هدية"},
  name:{en:"Shea Ritual Duo",ar:"ثنائي الشيا"},
  type:{en:"300 ml + 900 ml",ar:"300 مل + 900 مل"},
  desc:{en:"One for the sink, one for the shower — the complete shea butter ritual. A thoughtful gift, or a treat for yourself.",ar:"واحدة للمغسلة وأخرى للاستحمام — طقس زبدة الشيا الكامل. هدية مميزة أو دلال لنفسك."},
  ing:{en:"Shea butter, natural oil extracts, potassium hydroxide, purified water",ar:"زبدة الشيا، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["Shea Butter Liquid Soap 300 ml","Shea Butter Liquid Soap 900 ml","Beautiful as a gift"],ar:["صابون الشيا السائل 300 مل","صابون الشيا السائل 900 مل","مثالية كهدية"]},
  variants:[{id:"shea-duo",size:{en:"2 bottles",ar:"عبوتان"},price:9.50,cut:"shea-duo",sc:1}],def:0,
  gallery:["ph_shea","gift_spot","gift_red","ig_shea_anatomy"]},
 {id:"home-set",cat:"sets",acc:"#9E7A3C",badge:{en:"Best value",ar:"الأوفر"},
  name:{en:"The Olga Home Set",ar:"مجموعة أولغا للمنزل"},
  type:{en:"6 bottles",ar:"6 عبوات"},
  desc:{en:"Six bottles of natural care to fill your home — Olga shea butter liquid soaps for every sink and shower.",ar:"ست عبوات من العناية الطبيعية لكل مغسلة وحمّام في منزلك — صابون أولغا السائل بزبدة الشيا."},
  ing:{en:"Shea butter, natural oil extracts, potassium hydroxide, purified water",ar:"زبدة الشيا، خلاصة زيوت طبيعية، هيدروكسيد البوتاسيوم، ماء نقي"},
  points:{en:["6 × Olga liquid soap","Natural care for every room","Best value for families"],ar:["6 × صابون أولغا السائل","عناية طبيعية لكل غرفة","الخيار الأوفر للعائلات"]},
  variants:[{id:"home-set",size:{en:"6 bottles",ar:"6 عبوات"},price:19.00,cut:"home-set",sc:1,wide:true}],def:0,
  gallery:["gift_spot","gift_hand","gift_red","ig_family_bottles","ig_family_sofa"]}
];
var CATS=["all","body","laundry","hammam","sets"];window.OLGA_PRODUCTS=PRODUCTS;
var byId={}, VAR={};
PRODUCTS.forEach(function(p,i){ p.order=i; byId[p.id]=p; p.variants.forEach(function(v){ v.p=p; VAR[v.id]=v; }); });
var sel={}; PRODUCTS.forEach(function(p){ sel[p.id]=p.def; });
var REELS=[
 {img:"ig_oil_swirl",t:{en:"Liquid gold",ar:"ذهب سائل"},s:{en:"The pour",ar:"السكب"}},
 {img:"ig_nabulsi",t:{en:"Held by nature",ar:"من الطبيعة إلى يديك"},s:{en:"Nabulsi",ar:"نابلسي"}},
 {img:"ig_family_sofa",t:{en:"Everyday moments",ar:"لحظات كل يوم"},s:{en:"At home",ar:"في البيت"}},
 {img:"ig_woman",t:{en:"After a long day",ar:"بعد يوم طويل"},s:{en:"Shea butter",ar:"زبدة الشيا"}},
 {img:"ig_handwash",t:{en:"A softer wash",ar:"غسلة أنعم"},s:{en:"Laurel",ar:"الغار"}},
 {img:"ig_family_bottles",t:{en:"Shared at the table",ar:"على مائدة العائلة"},s:{en:"Family",ar:"العائلة"}},
 {img:"ig_shea_anatomy",t:{en:"Inside the bottle",ar:"ما بداخل العبوة"},s:{en:"Ingredients",ar:"المكونات"}}
];

/* ======================= I18N ======================= */
var T={
en:{
 skip:"Skip to shop",heroAria:"Olga — featured products",hbFrom:"From",hbMore:"Discover",hb1k:"The original · Nabulsi",hb1t:'Olive gold, <em>in your hands</em>',hb1d:"Nabulsi liquid soap with pure olive oil — deep hydration and exceptional softness for hands and body.",hb2k:"Deep moisture · Shea",hb2t:'Softness that <em>lasts all day</em>',hb2d:"Enriched with natural shea butter to protect skin from dryness and keep it soft and refreshed.",hb3k:"Purifying · Laurel",hb3t:'The purity of <em>laurel oil</em>',hb3d:"Laurel oil, known for its purifying and soothing properties — suitable for every skin type.",hb4k:"Detox & exfoliation · Hammam",hb4t:'A Moroccan hammam <em>ritual at home</em>',hb4d:"A traditional soap rich in natural Moroccan oils that enhances the skin’s radiance and softness.",hb5k:"Best value · Home set",hb5t:'Natural care <em>for every room</em>',hb5d:"Six bottles of Olga liquid soap for every sink and shower in your home — the family’s best value.",shopK:"OLGA Line · The shop",tr1t:"99% natural",tr1s:"Sulfate & paraben free",tr2t:"Delivery across Jordan",tr2s:"Our team confirms delivery with you",tr3t:"Order in seconds",tr3s:"Checkout right here in the store",tr4t:"Safe for the family",tr4s:"Gentle on sensitive skin",bar1:"Made in Jordan · 99% natural formulations",bar2:"Order in seconds — delivery across Jordan",bar3:"Free from sulfates & parabens · Safe for sensitive skin",
 nShop:"Shop",nLine:"The Line",nEssence:"Essence",nAbout:"About",nFaq:"FAQ",nContact:"Contact",
 mnEyebrow:"Explore Olga",mnShopD:"The full natural collection",mnShopGo:"Shop now",mnLineD:"Signature soaps & gift sets",mnEssenceD:"Olive oil, shea butter & laurel",mnAboutD:"Our story · Made in Jordan",mnFaqD:"Ordering, delivery & care",mnContactD:"Call, visit or message us",mnWa:"Order on WhatsApp",mnNote:"99% natural · Made in Jordan",
 aSearch:"Search products",aBag:"Shopping bag",aMenu:"Open menu",aClose:"Close",aSort:"Sort products",aPrev:"Previous",aNext:"Next",aWa:"Chat with Olga on WhatsApp",
 heroKicker:"Natural Products · Made in Jordan",heroSub:"Liquid soaps and care crafted from olive oil, laurel, shea butter and Moroccan oils — the wisdom of our grandparents, made for today.",
 ctaShop:"Shop the collection",ctaWa:"Order on WhatsApp",
 ch1n:"I · The Olive",ch1t:'Born in the <span class="it oil-text">olive groves</span>',ch1p:"Pure olive oil — the heart of the Levantine Nabulsi soap tradition.",
 ch2n:"II · The Pour",ch2t:'Liquid <span class="it oil-text">gold,</span> slowly',ch2p:"Natural oils folded gently into a pure base until the texture turns to silk.",
 ch3n:"III · The Ritual",ch3t:'Care you can <span class="it oil-text">feel</span>',ch3p:"Gentle even with frequent washing — soft, hydrated skin, every single day.",
 ch4k:"The purity of nature… in every touch",ch4t:'The <b>OLGA</b> <span class="it oil-text">Line</span>',
 heroMeta:"Olive · Laurel · Shea · Moroccan oils",scroll:"Scroll",skipFilm:"Skip to shop",
 marquee:["<b>99%</b> natural","Safe for sensitive skin","Sulfate & paraben free","Eco-friendly","Made in Jordan","Extracted from natural oils"],
 purT:'The purity of nature… <span class="it c-olive">in every touch</span>',purP:"Natural personal and home care products, 99% naturally derived. From the heart of Jordan, to every home seeking purity.",
 st1:"Naturally derived",st2:"Product families",st3:"Made in Jordan",
 ingr:["Pure olive oil","Laurel oil","Shea butter","Moroccan oils"],
 shopT:'Our premium <b>natural</b> products',shopSub:'Our Premium Natural Products <span style="opacity:.55">|</span> <span lang="ar" dir="rtl">منتجاتنا المميزة</span>',
 shopP:"Choose a size, add to your bag and confirm your order — our team contacts you to arrange delivery.",
 cat_all:"All",cat_body:"Hand & shower",cat_laundry:"Laundry",cat_hammam:"Hammam",cat_sets:"Gift sets",
 sort_featured:"Featured",sort_low:"Price: low to high",sort_high:"Price: high to low",searchPh:"Search products…",noResults:"No products match your search.",
 addBag:"Add to bag",add:"Add",inBag:"in bag",quick:"Quick view",view3d:"View in 3D",tap3d:"Tap for 3D · 360°",
 promoT:'Wholesale &amp; <b>business</b>',promoP:"For trade partnerships and wholesale orders, BatteL Natural Industries is happy to hear from you.",promoBtn:"Contact BatteL",
 lineK:"OLGA Line · The catalogue",lineT:'Every formula, <span class="it c-olive">page by page</span>',lineP:"A carefully developed collection, made from the purest and most effective ingredients — natural philosophy meets modern innovation.",
 lPremium:"Our Premium Natural Products",lIng:"Ingredients",lExtract:"Extracted from natural oils",lHand:"Hand wash & shower soap",lNatural:"100% natural",
 essK:"The Essence",essT:'Four gifts of <span class="it oil-text">nature</span>',
 e1t:"Pure Olive Oil",e1p:"The heart of Nabulsi soap — rich, nourishing and true to Levantine tradition.",
 e2t:"Laurel Oil",e2p:"Known for its purifying and soothing properties — suitable for all skin types.",
 e3t:"Shea Butter",e3p:"Deep moisture that protects skin from dryness and leaves it soft all day.",
 e4t:"Moroccan Oils",e4p:"Inspired by authentic Moroccan beauty rituals — for radiant, softer skin.",
 whyK:"Why choose Olga",whyT:'Natural care, <span class="it c-olive">without compromise</span>',
 w1t:"99% natural formulations",w1p:"Extracted from olive oil, laurel, shea butter and Moroccan oils.",
 w2t:"Safe for sensitive skin",w2p:"Gentle enough for the whole family — even children.",
 w3t:"Free from sulfates & parabens",w3p:"Clean formulas that respect your skin.",
 w4t:"Eco-friendly",w4p:"Our commitment to nature is part of who we are.",
 w5t:"Professional-grade quality",w5p:"Tailored for local and Arab markets.",
 w6t:"From the heart of Jordan",w6p:"Developed and manufactured by BatteL Natural Industries, Jordan.",
 abK:"About us",abT:'From the heart of Jordan, <span class="it c-olive">to every home</span>',abWho:"Made in Jordan with purity at heart",
 abStory:"BatteL is a leading Jordanian company in the natural industries sector. We develop and manufacture high-quality, safe and effective personal and home care products derived from nature — proudly combining scientific innovation with authentic natural heritage: pure olive oil, laurel oil, shea butter and traditional Moroccan oils.",
 mT:"Our Mission",mP:"To deliver advanced care solutions inspired by nature, backed by the highest standards of quality and health, and tailored to the needs of local and regional markets.",
 vT:"Our Vision",vP:"To become the leading name in the Arab world’s natural products industry through continuous innovation, smart expansion and sustainable relationships with our customers.",
 valT:"Our Core Values",vals:[["Excellence in quality","nothing less than the best"],["Integrity & transparency","trust is built on honesty"],["Sustainable innovation","we innovate with the future in mind"],["Customer focus","your satisfaction comes first"],["Respect for nature","part of our identity"]],
 rlT:'Moments of <span class="it oil-text">Olga</span>',rlCta:"Follow on Instagram",rtK:"The result on your skin",rtT:'From dry <span class="it oil-text">to hydrated</span>',rtP:"Olga Liquid Laurel Soap cleanses gently and helps keep your skin soft and hydrated — day after day.",rtOff:"Dry skin",rtOffS:"Tight, rough, flaky",rtOn:"Hydration",rtOnS:"Soft, smooth, comfortable",rtP1:"Extracted from olive oil",rtP2:"For hands & shower",rtP3:"Natural ingredients",rtCta:"Shop Laurel Soap",rtCap:"Dry skin off · Hydration on — Olga Liquid Laurel Soap",lkZoom:"Enlarge photo",lkClose:"Close",gfK:"The Olga Box · Moments to gift",gfT:'A gift <span class="it oil-text">opened with love</span>',gfP:"A luxurious green box holding three bottles — laurel, shea and nabulsi — carried in an Olga bag with golden handles. Small details that make a moment to remember.",gf1:"A gift in hand",gf2:"On velvet",gf3:"A touch of shea",gf4:"The unboxing",gf5:"In the spotlight",gf6:"Morning light",gfF1:"Three 300 ml bottles",gfF2:"A box patterned with the Olga mark",gfF3:"Gift bag with golden handles",gfCta:"Shop the collection",watch:"Watch on Instagram →",
 fqK:"FAQ",fqT:'Good to <span class="it c-olive">know</span>',fqP:"Can’t find your answer? Message us on WhatsApp — we usually reply the same day.",
 faq:[["How do I place an order?","Add products to your bag, tap Checkout, fill in your delivery details and tap Confirm order. Your order reaches our team instantly, and we contact you to confirm the timing and payment."],
      ["Do you deliver across Jordan?","Yes. The delivery fee for your city is shown before you confirm, and our team arranges the delivery with you."],
      ["Are the products suitable for sensitive skin?","Our formulations are 99% natural, free from sulfates and parabens and safe for sensitive skin. The Nabulsi Laundry Soap is ideal for children’s clothing."],
      ["What sizes are available?","Nabulsi, Shea Butter and Laurel liquid soaps come in 300 ml and 900 ml. The Nabulsi Laundry Soap comes in an 1800 g bottle."],
      ["Do you offer wholesale?","Yes. For trade partnerships and wholesale orders, contact BatteL Natural Industries on +962 79 673 8495 or batte.jor9@gmail.com."]],
 ctT:'Let’s talk <span class="it">nature</span>',ctP:"Because your skin deserves the best of nature.",
 cc1T:"Orders & questions",cc1P:"Talk to the Olga team directly.",cc2T:"Wholesale · BatteL",cc2P:"For trade partnerships and wholesale orders.",
 lPhone:"Phone",lEmail:"Email",lWeb:"Website",
 cfT:"Send us a message",cfP:"Your message opens directly in WhatsApp.",fName:"Your name",fPhoneOpt:"Phone (optional)",fMsg:"How can we help?",fSend:"Send via WhatsApp",
 ftP:"Natural soaps and care extracted from natural oils — by BatteL Natural Industries, Jordan.",ftShop:"Shop",ftFollow:"Follow",ftRights:"All rights reserved",ftMade:"The purity of nature… in every touch",
 bagT:"Your bag",item:"item",items:"items",emptyT:"Your bag is waiting",emptyP:"Discover natural care from the olive groves.",explore:"Explore the collection",
 subtotal:"Subtotal",delivery:"Delivery",deliveryV:"By city",total:"Total",checkout:"Checkout",secureNote:"Secure ordering in the store · Delivery across Jordan",
 back:"← Back to bag",delT:"Delivery details",delP:"Complete your details and your order goes straight to the Olga team.",
 oName:"Full name *",oPhone:"Mobile number *",oCity:"City",oLoc:"Delivery location *",oNotes:"Notes",oPay:"Payment method *",
  eName:"Please enter your full name (first and last name).",ePhone:"Enter a valid Jordanian mobile: 9 digits starting with 77, 78 or 79.",eLoc:"Please pin your delivery location on the map.",ePay:"Please choose a payment method.",phHint:"9 digits · starts with 7",
  locBtn:"Pin your location on the map",locBtnS:"Tap to open the map and drop the pin at your door",locSet:"Delivery location pinned",locChange:"Change",locOpen:"Open map",
  mapT:"Choose delivery location",mapP:"Tap the map or drag the pin to your exact door.",mapSearch:"Search an area or street…",mapGo:"Search",mapMe:"My location",mapConfirm:"Confirm location",mapPick:"Tap the map to drop your pin",mapLoading:"Loading map…",mapFail:"The map couldn’t load. Check your connection and try again.",mapNoRes:"No results found in Jordan",mapGeoFail:"We couldn’t access your location. Enable location or pin it manually.",mapOut:"Please choose a location inside Jordan",mapAddr:"Finding address…",mapRetry:"Try again",
  pay_cod:"Cash on delivery",pay_codS:"Pay the courier when your order arrives",pay_cliq:"CliQ transfer",pay_cliqS:"We’ll send you the CliQ alias on WhatsApp",pay_wallet:"E-wallet",pay_walletS:"Zain Cash · Orange Money · other wallets",
 sendOrder:"Confirm order",feeNote:"The Olga team will contact you to confirm the delivery time.",sending:"Sending your order…",eCity:"Please enter your city",ordErrT:"We couldn’t send your order",ordErr:"Check your internet connection and try again.",ordRetry:"Try again",ordWa:"Send the order on WhatsApp instead",e_invalid_phone:"Please check your mobile number.",e_invalid_name:"Please enter your full name.",e_invalid_city:"Please enter your city.",e_too_many_orders:"We just received several orders from this number. Please wait a few minutes or message us on WhatsApp.",e_unknown_item:"One of the products in your bag is no longer available. Remove it and try again.",e_busy:"The store is busy right now — please try again in a moment.",orderNo:"Order no.",totalDel:"Total incl. delivery",
 thanksT:"Thank you",thanksP:"Your order {id} has reached the Olga team. We’ll contact you shortly to confirm delivery.",contShop:"Continue shopping",
 remove:"Remove",upsell:"Complete your ritual",added:"added to your bag",viewBag:"View bag",
 o3dHint:"⟲ Drag to rotate 360° · Scroll / pinch to zoom",pauseRot:"Pause rotation",autoRot:"Auto rotate",fullDetails:"Full details",preparing:"Preparing 3D…",no3d:"3D view unavailable",
 waHello:"Hello Olga 🌿\nI would like to place an order:",waName:"Name",waPhone:"Mobile",waCity:"City",waAddr:"Address",waNotes:"Notes",waLoc:"Delivery location",waMap:"Map",waPay:"Payment",
 cur:"JOD",title:"Olga — Natural Products Extracted From Natural Oils · Made in Jordan",
 desc:"Olga natural liquid soaps by BatteL Natural Industries: Nabulsi olive oil, shea butter, laurel, Nabulsi laundry soap and Moroccan hammam soap. 99% natural, made in Jordan. Order online."
},
ar:{
 skip:"انتقل إلى المتجر",heroAria:"أولغا — منتجات مميزة",hbFrom:"يبدأ من",hbMore:"اكتشف المنتج",hb1k:"الأصلي · نابلسي",hb1t:'ذهب الزيتون… <em>بين يديك</em>',hb1d:"صابون نابلسي سائل بزيت الزيتون النقي — ترطيب فائق ونعومة استثنائية لليدين والجسم.",hb2k:"ترطيب عميق · الشيا",hb2t:'نعومة <em>تدوم طوال اليوم</em>',hb2d:"غني بزبدة الشيا الطبيعية ليحمي بشرتك من الجفاف ويمنحها نعومة وانتعاشًا يدوم.",hb3k:"منقٍّ ومهدّئ · الغار",hb3t:'نقاء <em>زيت الغار</em>',hb3d:"تركيبة طبيعية بزيت الغار المعروف بخصائصه المطهّرة والمهدّئة — لجميع أنواع البشرة.",hb4k:"تقشير وديتوكس · الحمّام المغربي",hb4t:'طقس الحمّام المغربي <em>في بيتك</em>',hb4d:"صابون تقليدي غني بالزيوت المغربية الطبيعية، يعزّز إشراقة البشرة ونعومتها.",hb5k:"الأوفر · مجموعة المنزل",hb5t:'عناية طبيعية <em>لكل زاوية في بيتك</em>',hb5d:"ست عبوات من صابون أولغا السائل لكل مغسلة وحمّام — الخيار الأوفر للعائلة.",shopK:"مجموعة أولغا · المتجر",tr1t:"طبيعي 99%",tr1s:"بدون سلفات أو بارابين",tr2t:"توصيل لكل مناطق الأردن",tr2s:"فريقنا يؤكد التوصيل معك",tr3t:"اطلب خلال ثوانٍ",tr3s:"إتمام الطلب مباشرة من المتجر",tr4t:"آمن للعائلة",tr4s:"لطيف على البشرة الحساسة",bar1:"صُنع في الأردن · تركيبات طبيعية بنسبة 99%",bar2:"اطلب خلال ثوانٍ — توصيل لجميع مناطق المملكة",bar3:"بدون سلفات أو بارابين · آمن للبشرة الحساسة",
 nShop:"المتجر",nLine:"مجموعة أولغا",nEssence:"المكوّنات",nAbout:"من نحن",nFaq:"الأسئلة",nContact:"تواصل معنا",
 mnEyebrow:"تصفّح أولغا",mnShopD:"مجموعتنا الطبيعية كاملة",mnShopGo:"تسوّق الآن",mnLineD:"صابون أولغا المميّز وأطقم الهدايا",mnEssenceD:"زيت الزيتون، زبدة الشيا والغار",mnAboutD:"قصتنا · صُنع في الأردن",mnFaqD:"الطلب، التوصيل وطريقة الاستخدام",mnContactD:"اتصل بنا، زرنا أو راسلنا",mnWa:"اطلب عبر واتساب",mnNote:"طبيعي 99% · صُنع في الأردن",
 aSearch:"ابحث عن منتج",aBag:"سلة التسوق",aMenu:"القائمة",aClose:"إغلاق",aSort:"ترتيب المنتجات",aPrev:"السابق",aNext:"التالي",aWa:"تحدث مع أولغا عبر واتساب",
 heroKicker:"منتجات طبيعية · صُنع في الأردن",heroSub:"صابون سائل ومنتجات عناية من زيت الزيتون والغار وزبدة الشيا والزيوت المغربية — خبرة الأجداد يتوارثها الأحفاد.",
 ctaShop:"تسوّق المجموعة",ctaWa:"اطلب عبر واتساب",
 ch1n:"I · الزيتون",ch1t:'وُلد في <span class="it oil-text">حقول الزيتون</span>',ch1p:"زيت الزيتون النقي — قلب تقاليد الصابون النابلسي الأصيل.",
 ch2n:"II · السكب",ch2t:'ذهبٌ <span class="it oil-text">سائل</span> بهدوء',ch2p:"زيوت طبيعية تُمزج بلطف مع ماء نقي حتى يصبح القوام كالحرير.",
 ch3n:"III · طقس كل يوم",ch3t:'عناية <span class="it oil-text">تشعر بها</span>',ch3p:"لطيف حتى مع الاستخدام المتكرر — بشرة ناعمة ورطبة كل يوم.",
 ch4k:"نقاء الطبيعة… في كل لمسة",ch4t:'مجموعة <span class="it oil-text">أولغا</span>',
 heroMeta:"زيتون · غار · شيا · زيوت مغربية",scroll:"مرّر",skipFilm:"تخطَّ إلى المتجر",
 marquee:["طبيعي <b>99%</b>","آمن للبشرة الحساسة","بدون سلفات أو بارابين","صديق للبيئة","صُنع في الأردن","مستخلص من زيوت طبيعية"],
 purT:'نقاء الطبيعة… <span class="it c-olive">في كل لمسة</span>',purP:"منتجات طبيعية للعناية الشخصية والمنزلية، طبيعية بنسبة 99%. من قلب الأردن، إلى كل بيت يبحث عن النقاء.",
 st1:"طبيعية المصدر",st2:"عائلات منتجات",st3:"صُنع في الأردن",
 ingr:["زيت الزيتون النقي","زيت الغار","زبدة الشيا","الزيوت المغربية"],
 shopT:'منتجاتنا <b>الطبيعية</b> المميزة',shopSub:'منتجاتنا المميزة <span style="opacity:.55">|</span> <span class="ltr" lang="en">Our Premium Natural Products</span>',
 shopP:"اختر الحجم، أضف إلى سلّتك، وأكّد طلبك — وفريقنا يتواصل معك لترتيب التوصيل.",
 cat_all:"الكل",cat_body:"للأيدي والاستحمام",cat_laundry:"غسيل الملابس",cat_hammam:"الحمّام المغربي",cat_sets:"مجموعات",
 sort_featured:"المميّز",sort_low:"السعر: من الأقل",sort_high:"السعر: من الأعلى",searchPh:"ابحث عن منتج…",noResults:"لا توجد منتجات مطابقة لبحثك.",
 addBag:"أضف إلى السلة",add:"أضف",inBag:"في السلة",quick:"نظرة سريعة",view3d:"عرض ثلاثي الأبعاد",tap3d:"اضغط للعرض 3D · 360°",
 promoT:'الجملة و<b>الأعمال</b>',promoP:"للتعاون التجاري وطلبات الجملة، يسعد شركة باتل للصناعات الطبيعية تواصلكم.",promoBtn:"تواصل مع باتل",
 lineK:"مجموعة أولغا · الكتالوج",lineT:'كل تركيبة، <span class="it c-olive">صفحةً بصفحة</span>',lineP:"مجموعة مميزة طُوّرت بعناية لتمنحك تجربة طبيعية راقية، مستخلصة من أنقى المكونات وأكثرها فاعلية.",
 lPremium:"منتجاتنا المميزة",lIng:"المكونات",lExtract:"مستخلص من زيوت طبيعية",lHand:"غسول للأيدي وصابون استحمام",lNatural:"طبيعي 100%",
 essK:"الجوهر",essT:'أربع هدايا من <span class="it oil-text">الطبيعة</span>',
 e1t:"زيت الزيتون النقي",e1p:"قلب الصابون النابلسي — غني ومغذٍّ ووفيّ للتقاليد الأصيلة.",
 e2t:"زيت الغار",e2p:"معروف بخصائصه المطهّرة والمهدّئة — مناسب لجميع أنواع البشرة.",
 e3t:"زبدة الشيا",e3p:"ترطيب عميق يحمي البشرة من الجفاف ويمنحها نعومة تدوم.",
 e4t:"الزيوت المغربية",e4p:"مستوحاة من طقوس الجمال المغربي الأصيل — لإشراقة ونعومة البشرة.",
 whyK:"ليش تختار أولغا؟",whyT:'عناية طبيعية <span class="it c-olive">بلا تنازلات</span>',
 w1t:"تركيبات طبيعية بنسبة 99%",w1p:"مستخلصة من زيت الزيتون والغار وزبدة الشيا والزيوت المغربية.",
 w2t:"آمنة للبشرة الحساسة",w2p:"لطيفة على جميع أفراد العائلة، حتى الأطفال.",
 w3t:"بدون سلفات أو بارابين",w3p:"تركيبات نظيفة تحترم بشرتك.",
 w4t:"صديقة للبيئة",w4p:"التزامنا بالطبيعة جزء من هويتنا.",
 w5t:"جودة مهنية",w5p:"تلائم السوق المحلي والعربي.",
 w6t:"من قلب الأردن",w6p:"تطوير وتصنيع شركة باتل للصناعات الطبيعية – الأردن.",
 abK:"من نحن؟",abT:'من قلب الأردن، <span class="it c-olive">إلى كل بيت</span>',abWho:"صُنع في الأردن بنقاء",
 abStory:"شركة باتل هي شركة أردنية رائدة في مجال الصناعات الطبيعية، متخصصة في تطوير وتصنيع منتجات العناية الشخصية والمنزلية بجودة عالية وفعالية آمنة مستخلصة من الطبيعة. منذ تأسيسنا حرصنا على مزج الابتكار العلمي مع التراث الطبيعي الأصيل: زيت الزيتون النقي، زيت الغار، زبدة الشيا، والزيوت المغربية.",
 mT:"رسالتنا",mP:"أن نقدم حلولًا متطورة في مجال العناية مستوحاة من الطبيعة، مدعومة بأعلى معايير الجودة والصحة، وبما يلبي احتياجات السوقين المحلي والإقليمي.",
 vT:"رؤيتنا",vP:"أن نكون الاسم الأول في العالم العربي في قطاع الصناعات الطبيعية، عبر الابتكار المستمر، والتوسع الذكي، وبناء علاقات مستدامة مع عملائنا.",
 valT:"قيمنا الأساسية",vals:[["التميّز في الجودة","لا نقبل إلا بأعلى المعايير"],["النزاهة والشفافية","الثقة تُبنى بالصدق"],["الابتكار المستدام","نطوّر لنلبي المستقبل"],["التركيز على العميل","رضا العميل هو الأولوية"],["احترام البيئة","التزامنا بالطبيعة جزء من هويتنا"]],
 rlT:'لحظات <span class="it oil-text">أولغا</span>',rlCta:"تابعنا على إنستغرام",rtK:"النتيجة على بشرتك",rtT:'من الجفاف <span class="it oil-text">إلى الترطيب</span>',rtP:"صابون الغار السائل من أولغا ينظّف بلطف ويحافظ على نعومة بشرتك وترطيبها، يومًا بعد يوم.",rtOff:"جفاف البشرة",rtOffS:"شدّ وخشونة وتقشّر",rtOn:"الترطيب",rtOnS:"نعومة وراحة طوال اليوم",rtP1:"مستخلص من زيت الزيتون",rtP2:"للأيدي والاستحمام",rtP3:"مكوّنات طبيعية",rtCta:"تسوّق صابون الغار",rtCap:"وداعًا للجفاف، أهلًا بالترطيب — صابون الغار السائل من أولغا",lkZoom:"تكبير الصورة",lkClose:"إغلاق",gfK:"صندوق أولغا · لحظات تُهدى",gfT:'هديّة <span class="it oil-text">تُفتح بحب</span>',gfP:"علبة خضراء فاخرة تضم ثلاث عبوات من الغار والشيا والنابلسي، في كيس أولغا بمقابض ذهبية… تفاصيل صغيرة تصنع لحظة لا تُنسى.",gf1:"هديّة بين يديك",gf2:"على المخمل",gf3:"لمسة الشيا",gf4:"لحظة الفتح",gf5:"تحت الضوء",gf6:"ضوء الصباح",gfF1:"ثلاث عبوات 300 مل",gfF2:"علبة مزخرفة بشعار أولغا",gfF3:"كيس هدية بمقابض ذهبية",gfCta:"تسوّق المجموعة",watch:"شاهد على إنستغرام ←",
 fqK:"أسئلة شائعة",fqT:'معلومات <span class="it c-olive">تهمّك</span>',fqP:"لم تجد إجابتك؟ راسلنا عبر واتساب — نرد عادةً في نفس اليوم.",
 faq:[["كيف أطلب؟","أضف المنتجات إلى سلّتك، اضغط «إتمام الطلب»، املأ تفاصيل التوصيل ثم اضغط «تأكيد الطلب». يصل طلبك فورًا إلى فريقنا، ونتواصل معك لتأكيد الموعد وطريقة الدفع."],
      ["هل يوجد توصيل لجميع مناطق الأردن؟","نعم. تظهر لك رسوم التوصيل لمدينتك قبل تأكيد الطلب، ويرتّب فريقنا التوصيل معك."],
      ["هل المنتجات مناسبة للبشرة الحساسة؟","تركيباتنا طبيعية بنسبة 99%، بدون سلفات أو بارابين، وآمنة للبشرة الحساسة. وصابون الغسيل النابلسي مثالي لملابس الأطفال."],
      ["ما الأحجام المتوفرة؟","الصابون السائل النابلسي والشيا والغار متوفر بحجمي 300 مل و900 مل، وصابون الغسيل النابلسي بعبوة 1800 غ."],
      ["هل يوجد بيع بالجملة؟","نعم. للتعاون التجاري وطلبات الجملة تواصل مع شركة باتل على ‎+962 79 673 8495‎ أو batte.jor9@gmail.com."]],
 ctT:'لنتحدث عن <span class="it">الطبيعة</span>',ctP:"لأن بشرتكِ تستحق الأفضل من الطبيعة.",
 cc1T:"الطلبات والاستفسارات",cc1P:"تواصل مباشرة مع فريق أولغا.",cc2T:"الجملة · باتل",cc2P:"للتعاون التجاري وطلبات الجملة، يسعدنا تواصلكم معنا.",
 lPhone:"الهاتف",lEmail:"البريد الإلكتروني",lWeb:"الموقع",
 cfT:"أرسل لنا رسالة",cfP:"تُفتح رسالتك مباشرة في واتساب.",fName:"الاسم",fPhoneOpt:"الهاتف (اختياري)",fMsg:"كيف نساعدك؟",fSend:"أرسل عبر واتساب",
 ftP:"صابون ومنتجات عناية مستخلصة من الزيوت الطبيعية — من إنتاج شركة باتل للصناعات الطبيعية، الأردن.",ftShop:"المتجر",ftFollow:"تابعنا",ftRights:"جميع الحقوق محفوظة",ftMade:"نقاء الطبيعة… في كل لمسة",
 bagT:"سلّتك",item:"منتج",items:"منتجات",emptyT:"سلّتك بانتظارك",emptyP:"اكتشف العناية الطبيعية من حقول الزيتون.",explore:"تصفّح المجموعة",
 subtotal:"المجموع الفرعي",delivery:"التوصيل",deliveryV:"حسب المدينة",total:"الإجمالي",checkout:"إتمام الطلب",secureNote:"طلب آمن مباشرة من المتجر · توصيل لجميع مناطق المملكة",
 back:"→ العودة إلى السلة",delT:"تفاصيل التوصيل",delP:"أكمل بياناتك ليصل طلبك مباشرة إلى فريق أولغا.",
 oName:"الاسم الكامل *",oPhone:"رقم الموبايل *",oCity:"المدينة",oLoc:"موقع التوصيل *",oNotes:"ملاحظات",oPay:"طريقة الدفع *",
  eName:"يرجى إدخال الاسم الكامل (الاسم الأول واسم العائلة).",ePhone:"أدخل رقم موبايل أردني صحيح: 9 أرقام تبدأ بـ 77 أو 78 أو 79.",eLoc:"يرجى تحديد موقع التوصيل على الخريطة.",ePay:"يرجى اختيار طريقة الدفع.",phHint:"9 أرقام · يبدأ بـ 7",
  locBtn:"حدّد موقعك على الخريطة",locBtnS:"اضغط لفتح الخريطة وضع الدبوس على باب منزلك",locSet:"تم تحديد موقع التوصيل",locChange:"تغيير",locOpen:"فتح الخريطة",
  mapT:"حدّد موقع التوصيل",mapP:"اضغط على الخريطة أو اسحب الدبوس إلى موقعك بدقّة.",mapSearch:"ابحث عن منطقة أو شارع…",mapGo:"بحث",mapMe:"موقعي الحالي",mapConfirm:"تأكيد الموقع",mapPick:"اضغط على الخريطة لوضع الدبوس",mapLoading:"جارٍ تحميل الخريطة…",mapFail:"تعذّر تحميل الخريطة. تحقّق من اتصالك بالإنترنت وحاول مجددًا.",mapNoRes:"لم نجد نتائج داخل الأردن",mapGeoFail:"تعذّر الوصول إلى موقعك. فعّل خدمة الموقع أو حدّده يدويًا.",mapOut:"يرجى اختيار موقع داخل الأردن",mapAddr:"جارٍ تحديد العنوان…",mapRetry:"إعادة المحاولة",
  pay_cod:"الدفع نقدًا عند الاستلام",pay_codS:"ادفع للمندوب عند وصول طلبك",pay_cliq:"تحويل كليك CliQ",pay_cliqS:"نرسل لك اسم المستخدم (Alias) عبر واتساب",pay_wallet:"محفظة إلكترونية",pay_walletS:"زين كاش · أورنج موني · محافظ أخرى",
 sendOrder:"تأكيد الطلب",feeNote:"سيتواصل معك فريق أولغا لتأكيد موعد التوصيل.",sending:"جارٍ إرسال طلبك…",eCity:"يرجى كتابة المدينة",ordErrT:"تعذّر إرسال الطلب",ordErr:"تحقق من اتصالك بالإنترنت ثم حاول مرة أخرى.",ordRetry:"إعادة المحاولة",ordWa:"أرسل الطلب عبر واتساب بدلاً من ذلك",e_invalid_phone:"يرجى التحقق من رقم الموبايل.",e_invalid_name:"يرجى كتابة الاسم الكامل.",e_invalid_city:"يرجى كتابة المدينة.",e_too_many_orders:"استلمنا عدة طلبات من هذا الرقم قبل قليل. انتظر بضع دقائق أو راسلنا عبر واتساب.",e_unknown_item:"أحد المنتجات في سلّتك لم يعد متوفرًا. احذفه وحاول مرة أخرى.",e_busy:"المتجر مشغول الآن — حاول بعد لحظات.",orderNo:"رقم الطلب",totalDel:"الإجمالي مع التوصيل",
 thanksT:"شكرًا لك",thanksP:"وصل طلبك رقم {id} إلى فريق أولغا، وسنتواصل معك قريبًا لتأكيد التوصيل.",contShop:"متابعة التسوق",
 remove:"إزالة",upsell:"أكمل طقس العناية",added:"أُضيف إلى سلّتك",viewBag:"عرض السلة",
 o3dHint:"⟲ اسحب للتدوير 360° · مرّر أو اقرص للتكبير",pauseRot:"إيقاف الدوران",autoRot:"تدوير تلقائي",fullDetails:"التفاصيل الكاملة",preparing:"جارٍ تجهيز العرض…",no3d:"العرض ثلاثي الأبعاد غير متاح",
 waHello:"مرحبًا أولغا 🌿\nأرغب بطلب ما يلي:",waName:"الاسم",waPhone:"الموبايل",waCity:"المدينة",waAddr:"العنوان",waNotes:"ملاحظات",waLoc:"موقع التوصيل",waMap:"الخريطة",waPay:"طريقة الدفع",
 cur:"د.أ",title:"أولغا — منتجات طبيعية مستخلصة من زيوت طبيعية · صُنع في الأردن",
 desc:"صابون أولغا السائل الطبيعي من شركة باتل للصناعات الطبيعية: نابلسي بزيت الزيتون، زبدة الشيا، الغار، صابون الغسيل النابلسي وصابون الحمّام المغربي. طبيعي 99%، صُنع في الأردن. اطلب أونلاين."
}};
var LANG="ar";
try{ var sv=localStorage.getItem("olga-lang"); if(sv==="en"||sv==="ar") LANG=sv; }catch(e){}
try{ var qp=new URLSearchParams(location.search).get("lang"); if(qp==="en"||qp==="ar") LANG=qp; }catch(e){}
function t(k){ var v=T[LANG][k]; return v===undefined?(T.en[k]||k):v; }
function L(o){ return o? (o[LANG]!==undefined?o[LANG]:o.en) : ""; }
function money(v){ var n=v.toFixed(2); return LANG==="ar"? n+' <small>'+t("cur")+'</small>' : '<small style="margin:0 4px 0 0">'+t("cur")+'</small>'+n; }
function moneyTxt(v){ return LANG==="ar"? v.toFixed(2)+" "+t("cur") : t("cur")+" "+v.toFixed(2); }

/* ======================= LAZY MEDIA ======================= */
var lazyIO=("IntersectionObserver" in window)? new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ loadMedia(e.target); lazyIO.unobserve(e.target); } }); },{rootMargin:"600px 0px"}) : null;
function loadMedia(el){
  var k=el.getAttribute("data-img");
  if(k){ var src=IMG[k]||pickCut(el,k); if(src && el.getAttribute("src")!==src){ el.onload=function(){ el.classList.add("is-loaded"); }; el.src=src; if(el.complete) el.classList.add("is-loaded"); } return; }
  var b=el.getAttribute("data-bg"); if(b && IMG[b]) el.style.backgroundImage="url("+IMG[b]+")";
}
/* v25 · light copies of the product cut-outs: 240px for the bag orb / toast / drawer / chips,
   560px for category cards and phone product cards. Full-size cut-outs (1600px) stay for
   desktop cards, quick view and 3D. Built at idle time, then swapped in place. */
var THUMBS={}, THUMBM={}, MOBGRID=window.matchMedia("(max-width:760px)").matches;
function pickCut(el,k){
  if(!CUT[k]) return "";
  if(el && el.closest){
    if(el.closest(".mchip,.toast__img,.line-item__img")) return THUMBS[k]||THUMBM[k]||CUT[k];
    if(el.closest(".catc") || (MOBGRID && el.classList.contains("pcard__img"))) return THUMBM[k]||CUT[k];
  }
  return CUT[k];
}
(function buildThumbs(){
  var keys=Object.keys(CUT), i=0, started=false;
  var idle=window.requestIdleCallback?function(f){ return requestIdleCallback(f,{timeout:1200}); }:function(f){ return setTimeout(f,90); };
  function make(k,im,h,store,done){
    var nw=im.naturalWidth, nh=im.naturalHeight; if(!nw||!nh){ done(); return; }
    var hh=Math.min(h,nh), ww=Math.round(hh*nw/nh); if(nw>nh*1.15){ ww=Math.min(Math.round(h*1.3),nw); hh=Math.round(ww*nh/nw); }
    if(hh>=nh){ store[k]=CUT[k]; done(); return; }
    var c=document.createElement("canvas"); c.width=ww; c.height=hh; var g=c.getContext("2d"); g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high"; g.drawImage(im,0,0,ww,hh);
    if(c.toBlob) c.toBlob(function(bl){ if(bl) store[k]=URL.createObjectURL(bl); done(); },"image/webp",.9); else { try{ store[k]=c.toDataURL("image/webp",.9); }catch(e){} done(); }
  }
  function swap(k){
    $$('img[data-img="'+k+'"]').forEach(function(el){ if(!el.getAttribute("src")) return; var s=pickCut(el,k); if(s && el.getAttribute("src")!==s) el.src=s; });
    $$('.toast__img img,.line-item__img img').forEach(function(el){ if(el.getAttribute("src")===CUT[k] && THUMBS[k]) el.src=THUMBS[k]; });
  }
  function one(){
    if(i>=keys.length) return; var k=keys[i++], im=new Image(); im.src=CUT[k];
    var ok=function(){ make(k,im,240,THUMBS,function(){ make(k,im,560,THUMBM,function(){ swap(k); idle(one); }); }); };
    if(im.decode) im.decode().then(ok,function(){ idle(one); }); else { im.onload=ok; im.onerror=function(){ idle(one); }; }
  }
  function go(){ if(started) return; started=true; idle(one); }
  if(document.readyState==="complete") setTimeout(go,600); else window.addEventListener("load",function(){ setTimeout(go,600); });
})();
function lazy(root){ $$("[data-img],[data-bg]",root).forEach(function(el){ if(lazyIO) lazyIO.observe(el); else loadMedia(el); }); }

/* ======================= TEXT FX ======================= */
function splitWords(el){
  function wrap(node,cls){
    var out=document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(function(w){
      if(!w) return;
      if(/^\s+$/.test(w)){ out.appendChild(document.createTextNode(" ")); return; }
      var o=document.createElement("span"); o.className="wl"; var i=document.createElement("span"); if(cls) i.className=cls; i.textContent=w; o.appendChild(i); out.appendChild(o);
    });
    return out;
  }
  Array.prototype.slice.call(el.childNodes).forEach(function(n){
    if(n.nodeType===3) el.replaceChild(wrap(n,""),n);
    else if(n.nodeType===1 && n.tagName!=="BR"){ var tag=n.tagName.toLowerCase(), cls=n.className||""; var f=wrap(n,cls); if(tag==="b"||tag==="strong"){ $$(".wl>span",f).forEach(function(s){ s.style.fontWeight="600"; }); } el.replaceChild(f,n); }
  });
  $$(".wl>span",el).forEach(function(s,i){ s.style.transitionDelay=(i*0.06)+"s"; });
}
var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); if(e.target.querySelector("[data-count]")||e.target.hasAttribute("data-count")) runCounters(e.target); } }); },{threshold:0.12,rootMargin:"0px 0px -6% 0px"});
function observeReveal(root){ $$("[data-reveal],[data-split],[data-clip]",root).forEach(function(el){ if(!el.classList.contains("is-in")) io.observe(el); }); }
function runCounters(root){
  $$("[data-count]",root).forEach(function(el){
    if(el._done) return; el._done=true;
    var to=+el.getAttribute("data-count"), t0=performance.now(), d=1800;
    (function step(now){ var k=clamp((now-t0)/d,0,1), v=Math.round(to*(1-Math.pow(1-k,4))); el.textContent=v; if(k<1) requestAnimationFrame(step); })(t0);
  });
}

/* ======================= RENDER ======================= */
var ICO={
 bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
 eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 minus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12"/></svg>',
 plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 12h12M12 6v12"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12 4 4 10-10"/></svg>',
 arrow:'<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 leaf:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z"/></svg>'
};
function curVar(p){ return p.variants[sel[p.id]]||p.variants[0]; }
function qctlHTML(v,big){
  return '<span class="qctl'+(big?' qctl--big':'')+'" data-qctl="'+v.id+'">'+
    (big?'<button type="button" class="btn btn--olive" data-add="'+v.id+'">'+ICO.bag+'<span>'+t("addBag")+'</span></button>'
        :'<button type="button" class="add" data-add="'+v.id+'" aria-label="'+t("addBag")+' — '+L(v.p.name)+'">'+ICO.bag+'<span>'+t("add")+'</span></button>')+
    '<span class="qstep" role="group"><button type="button" class="qstep__btn" data-dec="'+v.id+'" aria-label="−">'+ICO.minus+'</button><span class="qstep__n" aria-live="polite"><b>0</b><small>'+t("inBag")+'</small></span><button type="button" class="qstep__btn" data-inc="'+v.id+'" aria-label="+">'+ICO.plus+'</button></span></span>';
}
function sizesHTML(p,scope){
  if(p.variants.length<2) return '<div class="sizes"><span class="size is-on" style="cursor:default">'+L(p.variants[0].size)+'</span></div>';
  return '<div class="sizes" role="radiogroup">'+p.variants.map(function(v,i){ return '<button type="button" class="size'+(i===sel[p.id]?' is-on':'')+'" role="radio" aria-checked="'+(i===sel[p.id])+'" data-size="'+p.id+'" data-vi="'+i+'" data-scope="'+scope+'">'+L(v.size)+'</button>'; }).join("")+'</div>';
}
function imgH(v){ return v.wide? "40%" : "60%"; }
function cardHTML(p){
  var v=curVar(p);
  return '<article class="pcard" data-pid="'+p.id+'" data-cat="'+p.cat+'" style="--acc:'+p.acc+'" data-reveal>'+
    '<div class="pcard__stage" data-view3d="'+p.id+'" role="button" tabindex="0" aria-label="'+t("view3d")+' — '+L(p.name)+'">'+
      '<span class="pcard__badge">'+L(p.badge)+'</span>'+'<span class="pcard__hint3d"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>'+t("tap3d")+'</span>'+
      '<div class="pcard__acts"><button type="button" class="pcard__act" data-quick="'+p.id+'" aria-label="'+t("quick")+'">'+ICO.eye+'</button>'+
      '<button type="button" class="pcard__act pcard__act--3d" data-view3d="'+p.id+'" aria-label="'+t("view3d")+'">3D</button></div>'+
      '<div class="pcard__tilt"><span class="pcard__shadow"></span><img class="pcard__img" data-img="'+v.cut+'" alt="'+L(p.name)+' '+L(v.size)+'" style="--sc:'+v.sc+';--h:'+imgH(v)+'" draggable="false"></div>'+
    '</div>'+
    '<div class="pcard__body">'+
      '<span class="pcard__cat">'+L(p.type)+'</span>'+
      '<h3 class="pcard__name"><button type="button" data-quick="'+p.id+'">'+L(p.name)+'</button></h3>'+
      '<span class="pcard__alt" lang="'+(LANG==="ar"?"en":"ar")+'">'+p.name[LANG==="ar"?"en":"ar"]+'</span>'+
      sizesHTML(p,"card")+
      '<div class="pcard__foot"><span class="price" data-price="'+p.id+'">'+money(v.price)+'</span>'+qctlHTML(v,false)+'</div>'+
    '</div></article>';
}
var shopState={cat:"all",q:"",sort:"featured"};
var grid=$("#grid");
function renderGrid(){
  var q=shopState.q.trim().toLowerCase();
  var list=PRODUCTS.filter(function(p){
    if(shopState.cat!=="all" && p.cat!==shopState.cat) return false;
    if(!q) return true;
    var hay=(p.name.en+" "+p.name.ar+" "+p.type.en+" "+p.type.ar+" "+p.ing.en+" "+p.ing.ar+" "+p.desc.en+" "+p.desc.ar).toLowerCase();
    return q.split(/\s+/).every(function(w){ return hay.indexOf(w)>=0; });
  });
  if(shopState.sort==="low") list.sort(function(a,b){ return curVar(a).price-curVar(b).price; });
  else if(shopState.sort==="high") list.sort(function(a,b){ return curVar(b).price-curVar(a).price; });
  else list.sort(function(a,b){ return a.order-b.order; });
  var h=list.map(cardHTML).join("");
  if(!list.length) h='<div class="empty-results">'+t("noResults")+'</div>';
  if(shopState.cat==="all" && !q) h+='<div class="promo" data-reveal><div><span class="olga-pill" style="background:var(--white);color:var(--olive)"><b>BatteL</b><span>B2B</span></span><h3 style="margin-top:22px">'+t("promoT")+'</h3></div><p>'+t("promoP")+'</p><a href="#contact" class="btn btn--cream btn--sm" data-scroll-js><span>'+t("promoBtn")+'</span>'+ICO.arrow+'</a></div>';
  grid.innerHTML=h;
  lazy(grid); observeReveal(grid); syncSteppers(); bindTilt(grid);
  // count per filter
  // live status in the toolbar (category · result count)
  renderCatStatus(list.length);
}
/* ===== CATEGORIES v24 ===== */
Object.assign(T.en,{
  catsK:"Shop by category", catsHint:"Tap a category to see its products",
  catD_all:"The complete Olga collection", catD_body:"Nabulsi, shea & laurel", catD_laundry:"Gentle on kids' clothes",
  catD_hammam:"Detox & exfoliation ritual", catD_sets:"Gifts & best value",
  catShowing:"Showing", catFor:"for", catClear:"Show all", catClearS:"All"
});
Object.assign(T.ar,{
  catsK:"تسوّقي حسب الفئة", catsHint:"اختاري فئة لعرض منتجاتها",
  catD_all:"مجموعة أولغا كاملة", catD_body:"نابلسي، شيا وغار", catD_laundry:"لطيف على ملابس الأطفال",
  catD_hammam:"طقس التقشير والديتوكس", catD_sets:"هدايا وعروض أوفر",
  catShowing:"عرض", catFor:"نتائج", catClear:"عرض كل المنتجات", catClearS:"الكل"
});
var CAT_META={
  all:{acc:"#B8944F",img:["laurel-300","nabulsi-900","shea-900"]},
  body:{acc:"#87916B",img:["shea-900","nabulsi-900"]},
  laundry:{acc:"#5B8C42",img:["laundry"]},
  hammam:{acc:"#7C1D2B",img:["moroccan"]},
  sets:{acc:"#9E7A3C",img:["shea-duo"]}
};
var ICO_X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
function catEsc(s){ return String(s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function catCount(c){ return c==="all"?PRODUCTS.length:PRODUCTS.filter(function(p){ return p.cat===c; }).length; }
function nProducts(n){
  if(LANG==="ar"){ if(n===0) return "لا توجد منتجات"; if(n===1) return "منتج واحد"; if(n===2) return "منتجان"; if(n<=10) return n+" منتجات"; return n+" منتجًا"; }
  return n+(n===1?" product":" products");
}
function catCardHTML(c,i){
  var m=CAT_META[c]||{acc:"#35452D",img:[]}, on=c===shopState.cat;
  var imgs=m.img.map(function(k,j){ return '<img class="catc__b catc__b--'+(j+1)+'" data-img="'+k+'" alt="" draggable="false" decoding="async">'; }).join("");
  return '<button type="button" class="catc catc--'+c+(on?' is-active':'')+'" data-filter="'+c+'" role="tab" id="cat-'+c+'" aria-selected="'+on+'" aria-controls="grid" tabindex="'+(on?0:-1)+'" data-n="'+m.img.length+'" style="--acc:'+m.acc+';--i:'+i+'">'+
    '<span class="catc__media" aria-hidden="true"><span class="catc__halo"></span>'+imgs+'</span>'+
    '<span class="catc__txt"><b class="catc__name">'+t("cat_"+c)+'</b><small class="catc__desc">'+t("catD_"+c)+'</small></span>'+
    '<span class="catc__count">'+nProducts(catCount(c))+'</span>'+
    '<span class="catc__tick" aria-hidden="true">'+ICO.check+'</span>'+
  '</button>';
}
function miniChipHTML(c){
  var m=CAT_META[c]||{acc:"#35452D",img:[]}, on=c===shopState.cat, k=m.img[c==="all"?1:0];
  return '<button type="button" class="mchip mchip--'+c+(on?' is-active':'')+'" data-filter="'+c+'" aria-pressed="'+on+'" style="--acc:'+m.acc+'">'+
    '<span class="mchip__dot" aria-hidden="true">'+(k?'<img data-img="'+k+'" alt="" draggable="false">':'')+'</span>'+
    '<span>'+t("cat_"+c)+'</span><i>'+catCount(c)+'</i></button>';
}
function renderCatStatus(n){
  var el=$("#catStatus"); if(!el) return;
  var c=shopState.cat, m=CAT_META[c]||{}, q=shopState.q.trim();
  el.style.setProperty("--acc",m.acc||"#35452D");
  el.innerHTML='<span class="tbar__dot" aria-hidden="true"></span>'+
    '<span class="tbar__txt"><b>'+t("cat_"+c)+'</b><small>'+nProducts(n)+(q?' · '+t("catFor")+' «'+catEsc(q)+'»':'')+'</small></span>'+
    (c!=="all"?'<button type="button" class="tbar__clear" data-filter="all" aria-label="'+t("catClear")+'">'+ICO_X+'<span>'+t("catClearS")+'</span></button>':'');
}
function renderFilters(){
  var f=$("#filters");
  f.innerHTML=CATS.map(catCardHTML).join("");
  lazy(f);
  var mini=$("#catMini"); if(mini){ mini.innerHTML=CATS.map(miniChipHTML).join(""); lazy(mini); }
  var s=$("#sort"); s.innerHTML=["featured","low","high"].map(function(k){ return '<option value="'+k+'"'+(k===shopState.sort?' selected':'')+'>'+t("sort_"+k)+'</option>'; }).join("");
}
function setCat(c,opts){
  opts=opts||{};
  if(CATS.indexOf(c)<0) c="all";
  var changed=c!==shopState.cat; shopState.cat=c;
  $$("#filters [data-filter],#catMini [data-filter]").forEach(function(x){
    var on=x.getAttribute("data-filter")===c; x.classList.toggle("is-active",on);
    if(x.classList.contains("catc")){ x.setAttribute("aria-selected",on); x.tabIndex=on?0:-1; }
    else x.setAttribute("aria-pressed",on);
  });
  renderGrid();
  if(changed && !reduced){ grid.classList.remove("is-swapping"); void grid.offsetWidth; grid.classList.add("is-swapping"); }
  var tb=$("#toolbar");
  // bring the results into view when they are below the fold (mostly on phones)
  if(opts.reveal){
    var r=grid.getBoundingClientRect(), off=(parseFloat(getComputedStyle(tb).top)||70)+tb.offsetHeight+14;
    if(r.top>window.innerHeight*0.6 || r.top<off-40) scrollToEl(grid,off);
  }
  if(tb.classList.contains("is-compact")) centerMiniChip(false);
}
// keep the active mini chip visible in the compact switcher (works in RTL and LTR)
function centerMiniChip(instant){
  var mc=$("#catMini .mchip.is-active"), mini=$("#catMini"); if(!mc||!mini) return;
  var mr=mini.getBoundingClientRect(), cr=mc.getBoundingClientRect();
  mini.scrollBy({left:(cr.left+cr.width/2)-(mr.left+mr.width/2),behavior:(instant||reduced)?"auto":"smooth"});
}
function onCatClick(e){ var b=e.target.closest("[data-filter]"); if(!b) return; setCat(b.getAttribute("data-filter"),{reveal:true}); }
$("#filters").addEventListener("click",onCatClick);
$("#catStatus").addEventListener("click",onCatClick);
$("#catMini").addEventListener("click",onCatClick);
// keyboard: arrows move between category tabs (RTL aware), Home/End jump
$("#filters").addEventListener("keydown",function(e){
  var keys=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"]; if(keys.indexOf(e.key)<0) return;
  var tabs=$$(".catc",this), i=tabs.indexOf(document.activeElement); if(i<0) return;
  var rtl=document.documentElement.dir==="rtl", n=tabs.length, d=0;
  if(e.key==="Home") i=0; else if(e.key==="End") i=n-1;
  else { d=(e.key==="ArrowRight"||e.key==="ArrowDown")?1:-1; if(rtl&&(e.key==="ArrowRight"||e.key==="ArrowLeft")) d=-d; i=(i+d+n)%n; }
  e.preventDefault(); tabs[i].focus(); setCat(tabs[i].getAttribute("data-filter"));
});
// compact switcher appears in the sticky toolbar once the big cards scroll away
(function(){
  var cards=$("#filters"), tb=$("#toolbar"); if(!cards||!tb||!("IntersectionObserver" in window)) return;
  new IntersectionObserver(function(es){ es.forEach(function(e){
    var on=!e.isIntersecting && e.boundingClientRect.top<0, was=tb.classList.contains("is-compact");
    tb.classList.toggle("is-compact", on);
    if(on&&!was) centerMiniChip(true);
  }); },{rootMargin:"-140px 0px 0px 0px",threshold:0}).observe(cards);
})();
$("#sort").addEventListener("change",function(e){ shopState.sort=e.target.value; renderGrid(); });
var qT; $("#q").addEventListener("input",function(e){ clearTimeout(qT); qT=setTimeout(function(){ shopState.q=e.target.value; renderGrid(); },140); });

/* card 3D tilt (desktop) */
function bindTilt(root){
  if(reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  $$(".pcard__stage",root).forEach(function(st){
    var tl=st.querySelector(".pcard__tilt");
    st.addEventListener("pointermove",function(e){ var r=st.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; tl.style.transform="rotateY("+(x*14).toFixed(2)+"deg) rotateX("+(-y*10).toFixed(2)+"deg)"; });
    st.addEventListener("pointerleave",function(){ tl.style.transform=""; });
  });
}

/* catalogue spreads */
var spreadsEl=$("#spreads");
function spreadHTML(p){
  var s=p.spread, v=curVar(p), alt=p.name[LANG==="ar"?"en":"ar"];
  var b='<div class="spread__bottles'+(s.wide?' is-wide':'')+'">'+
    (s.b2?'<img class="b2" data-img="'+s.b2+'" alt="" style="'+(s.b2===s.b1?'height:62%':'')+'">':'')+
    '<img class="b1" data-img="'+s.b1+'" alt="'+L(p.name)+'">'+
    (s.deco?'<img class="deco" data-img="'+s.deco+'" alt="" style="'+(s.deco==="baby"?'height:46%;inset-inline-start:-34%;bottom:-2%':'height:62%;inset-inline-start:30%;bottom:-24%')+'">':'')+
  '</div>';
  return '<article class="spread" style="--acc:'+p.acc+'" data-pid="'+p.id+'">'+
   '<div class="spread__text">'+
     '<div class="spread__top"><div class="spread__line"><span class="olga-pill"><b>OLGA</b><span>Line</span></span><span class="sub">'+t("lPremium")+' <span style="opacity:.5">|</span> <span lang="'+(LANG==="ar"?"en":"ar")+'">'+T[LANG==="ar"?"en":"ar"].lPremium+'</span></span></div></div>'+
     '<div class="spread__mid">'+
       '<h3 class="spread__title">'+L(p.name)+' <span lang="'+(LANG==="ar"?"en":"ar")+'">'+alt+'</span></h3>'+
       '<p class="spread__desc">'+L(p.desc)+'</p>'+
       '<p class="spread__ing"><b>'+t("lIng")+':</b> '+L(p.ing)+'</p>'+
       '<ul class="spread__points">'+L(p.points).slice(0,3).map(function(x){return '<li>'+x+'</li>'}).join("")+'</ul>'+
       '<div class="spread__buy">'+sizesHTML(p,"spread")+'<span class="price" data-price="'+p.id+'">'+money(v.price)+'</span>'+qctlHTML(v,true)+
         '<button type="button" class="btn btn--ghost btn--sm" data-view3d="'+p.id+'" style="color:var(--ink)">3D</button></div>'+
     '</div>'+
     '<div class="spread__panel"><div class="spread__cal">'+s.cal+'<small>'+s.sub+'</small></div><div class="spread__facts">'+t("lExtract")+'<br><em>'+L(p.type)+'</em><b>'+s.sizes+'</b></div><span class="pagenum spread__num">'+s.page+'</span></div>'+
   '</div>'+
   '<div class="spread__visual"><img class="bg" data-img="'+s.bg+'" alt=""><span class="spine"></span><div class="vtext" aria-hidden="true"><b>NATURAL</b><span>PRODUCTS</span></div><span class="vcap" aria-hidden="true">Extracted From Natural Oils</span></div>'+
   b+(p.cat==="body"?'<span class="spread__drop" aria-hidden="true"></span>':'')+
   '<div class="spread__dim"></div></article>';
}
var SPREADS=[];
function renderSpreads(){
  spreadsEl.innerHTML=PRODUCTS.filter(function(p){return p.spread}).map(spreadHTML).join("");
  SPREADS=$$(".spread",spreadsEl).map(function(el){ return {el:el,dim:el.querySelector(".spread__dim"),bottles:el.querySelector(".spread__bottles"),bg:el.querySelector(".bg")}; });
  lazy(spreadsEl); syncSteppers();
}
function renderMarquee(){
  var item='<div class="marquee__item">'+t("marquee").map(function(x){ return '<span>'+x+'</span>'+ICO.leaf; }).join("")+'</div>';
  $("#marquee").innerHTML=item+item;
}
function renderMisc(){
  $("#ingrRow").innerHTML=t("ingr").map(function(x){ return '<span class="ingr">'+x+'</span>'; }).join("");
  $("#valList").innerHTML=t("vals").map(function(x){ return '<li><span><b>'+x[0]+':</b> '+x[1]+'</span></li>'; }).join("");
  $("#acc").innerHTML=t("faq").map(function(x,i){ return '<div class="acc__item'+(i===0?' is-open':'')+'"><button type="button" class="acc__q" aria-expanded="'+(i===0)+'">'+x[0]+'<i aria-hidden="true"></i></button><div class="acc__a"><div><p>'+x[1]+'</p></div></div></div>'; }).join("");
  $("#ftShop").innerHTML=PRODUCTS.filter(function(p){return p.cat!=="sets"}).map(function(p){ return '<li><a class="link-u" href="#shop" data-quick="'+p.id+'">'+L(p.name)+'</a></li>'; }).join("");
}
$("#acc").addEventListener("click",function(e){ var q=e.target.closest(".acc__q"); if(!q) return; var it=q.parentNode, open=!it.classList.contains("is-open"); $$(".acc__item",this).forEach(function(x){ x.classList.remove("is-open"); x.querySelector(".acc__q").setAttribute("aria-expanded","false"); }); if(open){ it.classList.add("is-open"); q.setAttribute("aria-expanded","true"); } setTimeout(remeasure,650); });

/* reels */
var track=$("#reelTrack"), reels=[];
function renderReels(){
  track.innerHTML=REELS.map(function(r){ return '<a class="reel" href="https://www.instagram.com/olga.jo11/" target="_blank" rel="noopener" aria-label="'+L(r.t)+'"><img data-img="'+r.img+'" alt="'+L(r.t)+'" draggable="false"><div class="reel__top"><span class="reel__avatar"><i>'+LOGO_SVG+'</i>olga.jo11</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor"/></svg></div><span class="reel__play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5-13-7.5Z"/></svg></span><div class="reel__cap"><h4>'+L(r.t)+'</h4><p><span>'+L(r.s)+'</span><span>'+t("watch")+'</span></p></div></a>'; }).join("");
  reels=$$(".reel",track); lazy(track); updateReels();
}
function updateReels(){
  if(!reels.length) return;
  var tr=track.getBoundingClientRect(), mid=tr.left+tr.width/2;
  reels.forEach(function(el){ var r=el.getBoundingClientRect(), d=(r.left+r.width/2-mid)/tr.width; el.style.setProperty("--ry",clamp(-d*26,-22,22).toFixed(2)+"deg"); el.style.setProperty("--sc",(1-Math.min(Math.abs(d),0.6)*0.14).toFixed(3)); });
}
track.addEventListener("scroll",updateReels,{passive:true});
(function(){
  var dragging=false, sx=0, sl=0, moved=0;
  track.addEventListener("pointerdown",function(e){ if(e.pointerType!=="mouse") return; dragging=true; moved=0; sx=e.clientX; sl=track.scrollLeft; track.classList.add("is-drag"); });
  window.addEventListener("pointermove",function(e){ if(!dragging) return; var dx=e.clientX-sx; moved=Math.max(moved,Math.abs(dx)); track.scrollLeft=sl-dx; });
  window.addEventListener("pointerup",function(){ if(!dragging) return; dragging=false; track.classList.remove("is-drag"); });
  track.addEventListener("click",function(e){ if(moved>6){ e.preventDefault(); moved=0; } },true);
  var dir=function(){ return document.dir==="rtl"?-1:1; };
  $("#reelPrev").addEventListener("click",function(){ track.scrollBy({left:-track.clientWidth*0.6*dir(),behavior:"smooth"}); });
  $("#reelNext").addEventListener("click",function(){ track.scrollBy({left:track.clientWidth*0.6*dir(),behavior:"smooth"}); });
})();

/* story text (word light) */
var storyText=$("#storyText"), sWords=[], litN=-1;
function wrapStory(){ var words=storyText.textContent.trim().split(/\s+/); storyText.innerHTML=words.map(function(w){ return '<span class="w">'+w+'</span>'; }).join(" "); sWords=$$(".w",storyText); litN=-1; }

/* ======================= LANGUAGE ======================= */
var firstApply=true;
function applyLang(lang){
  LANG=lang; try{ localStorage.setItem("olga-lang",lang); }catch(e){}
  var h=document.documentElement; h.lang=lang; h.dir=lang==="ar"?"rtl":"ltr"; document.dir=h.dir;
  document.title=t("title"); var md=$('meta[name="description"]'); if(md) md.setAttribute("content",t("desc"));
  $$("[data-i]").forEach(function(el){
    var k=el.getAttribute("data-i"), v=t(k), wasIn=el.classList.contains("is-in");
    if(el.hasAttribute("data-html")) el.innerHTML=v; else el.textContent=v;
    if(el.hasAttribute("data-split")){ splitWords(el); if(wasIn||firstApply===false) { if(wasIn) el.classList.add("is-in"); } }
  });
  $$("[data-i-aria]").forEach(function(el){ el.setAttribute("aria-label",t(el.getAttribute("data-i-aria"))); });
  $$("[data-i-ph]").forEach(function(el){ el.setAttribute("placeholder",t(el.getAttribute("data-i-ph"))); });
  $("#langBtn").textContent=lang==="ar"?"EN":"عربي";
  $("#langBtn").setAttribute("aria-label",lang==="ar"?"Switch to English":"التبديل إلى العربية");
  var mlb=$("#menuLang"); if(mlb){ mlb.textContent=lang==="ar"?"EN":"عربي"; mlb.setAttribute("aria-label",$("#langBtn").getAttribute("aria-label")); }
  renderHero(); renderMarquee(); renderMisc(); renderFilters(); renderGrid(); renderSpreads(); renderReels(); wrapStory();
  if(typeof renderBag==="function"){ renderBag(); renderBadge(false); }
  if(typeof oCur!=="undefined" && oCur && o3d.classList.contains("is-open")) fill3DInfo();
  observeReveal(document);
  firstApply=false;
  if(typeof remeasure==="function") remeasure();
}
$("#langBtn").addEventListener("click",function(){
  if(window.OlgaLangFX && OlgaLangFX.busy()) return;
  var next=LANG==="ar"?"en":"ar", btn=this, y=window.scrollY;
  var swap=function(){
    applyLang(next);
    $$("[data-reveal],[data-split]").forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top<window.innerHeight && r.bottom>0) el.classList.add("is-in"); });
    window.scrollTo(0,y);
  };
  /* OLGA signature transition: olive → golden drop → flag (JO / US) */
  if(window.OlgaLangFX) OlgaLangFX.play(next,swap,btn); else swap();
});

/* ======================= SCROLL HELPERS ======================= */
var LY={heroTop:0,heroH:1,essTop:0,essH:1,storyTop:0,storyH:1,contactTop:0,contactH:1,spTop:0,spH:1};
var vh=window.innerHeight, vw=window.innerWidth, sy=window.scrollY;
function scrollToEl(target,offset){
  var el=typeof target==="string"?$(target):target; if(!el) return;
  var top=el===document.body?0:el.getBoundingClientRect().top+window.scrollY-(offset===undefined?70:offset);
  window.scrollTo({top:Math.max(0,top),behavior:reduced?"auto":"smooth"});
}
function lockScroll(on){ document.body.classList.toggle("is-locked",on); setTimeout(function(){ updateBagFloat(false); },0); }
document.addEventListener("click",function(e){
  var a=e.target.closest("a[data-scroll],a[data-scroll-js]"); if(!a) return;
  var h=a.getAttribute("href"); if(!h||h.charAt(0)!=="#") return;
  e.preventDefault(); closeMenu(); closeBag();
  scrollToEl(h==="#top"?document.body:h, h==="#shop"?60:70);
});

/* ======================= HEADER ======================= */
var nav=$("#header"), lastY=window.scrollY, navSolid=null;
function updateNav(){
  var y=window.scrollY, heroEnd=LY.heroTop+LY.heroH-vh*0.6;
  var solid=y>heroEnd; if(solid!==navSolid){ navSolid=solid; nav.classList.toggle("is-solid",solid); }
  var hide=!fxHold && y>heroEnd+240 && y>lastY+2 && !document.body.classList.contains("is-locked");
  if(y<lastY-2||y<heroEnd) nav.classList.remove("is-hidden"); else if(hide) nav.classList.add("is-hidden");
  lastY=y; updateBagFloat(false);
}
(function(){ var msgs=$$(".bar__msg"), i=0; if(reduced||msgs.length<2) return; setInterval(function(){ if(document.hidden) return; var a=msgs[i]; a.classList.remove("is-on"); a.classList.add("is-out"); setTimeout(function(){ a.classList.remove("is-out"); },800); i=(i+1)%msgs.length; msgs[i].classList.add("is-on"); },4200); })();
var menu=$("#menu");
function openMenu(){ menu.classList.add("is-open"); menu.setAttribute("aria-hidden","false"); lockScroll(true); }
function closeMenu(){ if(!menu.classList.contains("is-open")) return; menu.classList.remove("is-open"); menu.setAttribute("aria-hidden","true"); lockScroll(false); }
$("#burger").addEventListener("click",openMenu);
$("#menuClose").addEventListener("click",closeMenu);
/* menu v9: language shortcut, featured photo, live "you are here" marker */
$("#menuLang").addEventListener("click",function(){ $("#langBtn").click(); });
(function(){
  var img=$("#menuFeatureImg"), I=window.OLGA&&OLGA.IMG; if(img&&I){ var s=I.ph_nabulsi||I.banner_olive; if(s) img.src=s; else img.parentNode.style.display="none"; }
  var links=$$(".menu__link[href^='#']"); if(!("IntersectionObserver" in window)||!links.length) return;
  var feat=$(".menu__feature"), map={}; links.concat(feat?[feat]:[]).forEach(function(a){ map[a.getAttribute("href")]=a; });
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; var k="#"+e.target.id; Object.keys(map).forEach(function(h){ map[h].classList.toggle("is-active",h===k); map[h].removeAttribute("aria-current"); }); if(map[k]) map[k].setAttribute("aria-current","location"); }); },{rootMargin:"-45% 0px -50% 0px"});
  Object.keys(map).forEach(function(h){ var s=document.querySelector(h); if(s) io.observe(s); });
})();
$("#searchBtn").addEventListener("click",function(){ scrollToEl("#shop",60); setTimeout(function(){ $("#q").focus({preventScroll:true}); },700); });

/* ---------------- HERO · animated advertising banner ----------------
   Each slide = full-bleed scene photo + the real product cut-out standing on the podium.
   The scene is a square laid out like object-fit:cover but steered so the podium lands
   where the layout wants it (side on desktop, centre stage on phones). */
var MOB=window.matchMedia("(max-width:900px)").matches;
var hero=$("#hero"), heroStage=$("#heroStage"), hbEl=$("#hb"), hbSlides=$("#hbSlides"), hbBars=$("#hbBars"), hbCount=$("#hbCount"), cue=$("#scrollCue");
var mqHeroMob=window.matchMedia("(max-width:760px), (max-aspect-ratio:4/5) and (max-width:1024px)");
var DIM={"nabulsi-900":[448,1000],"shea-900":[416,1000],"shea-300":[365,1000],"laurel-300":[400,1000],"laurel-900":[262,639],"moroccan":[535,264],"home-set":[900,794]};
var SLIDES=[
 {pid:"nabulsi",v:"nabulsi-900",bg:"banner_olive",p1:"nabulsi-900",p2:"nabulsi-900",x:.5,y:.79,w:.52,fx:"dust",acc:"#CFA866",k:"hb1k",t:"hb1t",d:"hb1d"},
 {pid:"shea",v:"shea-900",bg:"banner_shea",p1:"shea-900",p2:"shea-300",x:.534,y:.745,w:.58,fx:"dust",acc:"#C89C52",k:"hb2k",t:"hb2t",d:"hb2d"},
 {pid:"laurel",v:"laurel-300",bg:"banner_laurel",p1:"laurel-300",x:.497,y:.752,w:.55,fx:"bubble",acc:"#A3B278",k:"hb3k",t:"hb3t",d:"hb3d"},
 {pid:"moroccan",v:"moroccan-jar",bg:"banner_moroccan",p1:"moroccan",x:.5,y:.75,w:.47,fx:"ember",acc:"#C0394B",k:"hb4k",t:"hb4t",d:"hb4d",wide:true},
 {pid:"home-set",v:"home-set",bg:"banner_home",p1:"home-set",x:.503,y:.765,w:.84,fx:"dust",acc:"#CFA866",k:"hb5k",t:"hb5t",d:"hb5d",wide:true}
];
/* Autoplay every two seconds; arrows, bars and swipe still work manually. */
var HB_DUR=2000, hbI=0, hbEls=[], hbTimer=0, hbStart=0, hbLeft=HB_DUR, hbHold={}, hbBusy=false;
function fxDots(kind){
  var n=MOB?9:16, h="";
  for(var i=0;i<n;i++){ var d=kind==="bubble"?(8+Math.random()*22):(2+Math.random()*(kind==="ember"?4:6));
    h+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;--d:'+d.toFixed(1)+'px;--t:'+(7+Math.random()*9).toFixed(1)+'s;--dl:'+(-Math.random()*12).toFixed(1)+'s;--x:'+((Math.random()-.5)*120).toFixed(0)+'px;--o:'+(.35+Math.random()*.55).toFixed(2)+'"></i>'; }
  return h;
}
function slideHTML(s,i){
  var p=byId[s.pid], v=VAR[s.v]||curVar(p), sizes=p.variants.map(function(x){return L(x.size)}).join(" · ");
  var from=p.variants.length>1?'<small>'+t("hbFrom")+'</small>':'';
  return '<article class="hslide" data-k="'+i+'" data-fx="'+s.fx+'" data-pid="'+p.id+'" style="--acc:'+s.acc+'" aria-roledescription="slide" aria-label="'+(i+1)+' / '+SLIDES.length+'">'+
    '<div class="hslide__par"><div class="hslide__scene"><img class="hslide__bg" src="'+(IMG[s.bg]||"")+'" alt="" draggable="false" decoding="async">'+
      '<div class="hslide__prod"><div class="hslide__float"><span class="hslide__halo"></span><span class="hslide__glow"></span>'+
        (s.p2?'<img class="hslide__p2" src="'+CUT[s.p2]+'" alt="" draggable="false">':'')+
        '<img class="hslide__p1" src="'+CUT[s.p1]+'" alt="'+L(p.name)+'" draggable="false"></div></div></div></div>'+
    '<div class="hslide__veil"></div><div class="hslide__fx">'+fxDots(s.fx)+'</div>'+
    '<div class="hslide__copy">'+
      '<span class="hslide__badge"><i></i>'+t(s.k)+'</span>'+
      '<h2 class="hslide__title">'+t(s.t)+'</h2>'+
      '<p class="hslide__desc">'+t(s.d)+'</p>'+
      '<div class="hslide__meta"><span class="hslide__price">'+from+moneyTxt(p.variants[0].price).replace(t("cur"),'<span>'+t("cur")+'</span>')+'</span><span class="hslide__size">'+sizes+'</span></div>'+
      '<div class="hslide__cta">'+qctlHTML(v,true)+'<button type="button" class="btn btn--glass" data-quick="'+p.id+'"><span>'+t("hbMore")+'</span></button></div>'+
    '</div>'+
    '<div class="hslide__num">'+String(i+1).padStart(2,"0")+'</div>'+
  '</article>';
}
function renderHero(){
  hbSlides.innerHTML=SLIDES.map(slideHTML).join("");
  hbBars.innerHTML=SLIDES.map(function(s,i){ return '<button type="button" class="hb__bar" data-hb="'+i+'" aria-label="'+(i+1)+'"><span>'+L(byId[s.pid].name)+'</span><i></i></button>'; }).join("");
  hbEls=$$(".hslide",hbSlides);
  hbEls[hbI].classList.add("is-active");
  layoutHero(); hbBarsSet(); syncSteppers();
}
function layoutHero(){
  if(!hbEls.length) return;
  var W=hero.clientWidth||window.innerWidth, H=hero.clientHeight||window.innerHeight, mob=mqHeroMob.matches, rtl=document.dir==="rtl";
  var S=mob?Math.max(W,H*1.5):Math.max(W*1.25,H*1.25);
  var Tx=mob?.5:(rtl?.36:.64), Ty=mob?.62:.86, capH=mob?H*.4:H*.62, capW=mob?W*.86:W*.42;
  hbEls.forEach(function(el,i){
    var s=SLIDES[i];
    var sx=clamp(Tx*W-s.x*S,W-S,0), sy2=clamp(Ty*H-s.y*S,H-S,0);
    var sc=el.querySelector(".hslide__scene"); sc.style.setProperty("--S",S+"px"); sc.style.setProperty("--sx",sx.toFixed(1)+"px"); sc.style.setProperty("--sy",sy2.toFixed(1)+"px");
    var pr=el.querySelector(".hslide__prod"); pr.style.setProperty("--pX",(s.x*100)+"%"); pr.style.setProperty("--pY",(s.y*100)+"%");
    var d=DIM[s.p1], r=d[0]/d[1], podW=s.w*S, maxW=Math.min(capW,podW*(s.wide?.95:.5));
    var h1=Math.min(capH,maxW/r), w1=h1*r;
    var f=el.querySelector(".hslide__float"); f.style.setProperty("--h1",h1.toFixed(0)+"px");
    var p1=el.querySelector(".hslide__p1"); p1.style.height=h1.toFixed(0)+"px";
    var p2=el.querySelector(".hslide__p2");
    if(p2){ var d2=DIM[s.p2], h2=h1*(s.p2===s.p1?.7:.66), w2=h2*d2[0]/d2[1], off=(w1/2+w2/2)*.74*(mob||rtl?-1:-1);
      p2.style.height=h2.toFixed(0)+"px"; p2.style.left=off.toFixed(0)+"px"; }
    el.querySelector(".hslide__bg").style.setProperty("--px",(s.x*100)+"%");
  });
}
function hbBarsSet(){
  $$(".hb__bar",hbBars).forEach(function(b,i){ b.classList.remove("is-on"); b.classList.toggle("is-done",i<hbI); b.style.setProperty("--dur",HB_DUR+"ms"); });
  var cur=hbBars.children[hbI]; if(cur){ void cur.offsetWidth; cur.classList.add("is-on"); }
  hbCount.innerHTML="<b>"+String(hbI+1).padStart(2,"0")+"</b> / "+String(SLIDES.length).padStart(2,"0");
}
function hbGo(i,back){
  i=(i+SLIDES.length)%SLIDES.length; if(i===hbI||!hbEls.length) return;
  var prev=hbEls[hbI], next=hbEls[i];
  hbEls.forEach(function(el){ el.classList.remove("is-prev","is-enter","back"); });
  prev.classList.remove("is-active"); prev.classList.add("is-prev");
  next.classList.add("is-active");
  if(!reduced){ next.classList.add("is-enter"); if(back) next.classList.add("back"); }
  setTimeout(function(){ prev.classList.remove("is-prev"); next.classList.remove("is-enter","back"); },1400);
  hbI=i; hbLeft=HB_DUR; hbBarsSet(); hbSchedule();
}
function hbPausedNow(){ for(var k in hbHold) if(hbHold[k]) return true; return false; }
function hbSchedule(){
  clearTimeout(hbTimer); hbTimer=0;
  var p=hbPausedNow(); hbEl.classList.toggle("is-paused",p);
  if(p||reduced) return;
  hbStart=performance.now(); hbTimer=setTimeout(function(){ hbGo(hbI+1); },hbLeft);
}
function hbPause(k,on){
  if(!!hbHold[k]===on) return;
  if(on && hbTimer && !hbPausedNow()){ hbLeft=Math.max(400,hbLeft-(performance.now()-hbStart)); }
  hbHold[k]=on; hbSchedule();
}
hbBars.addEventListener("click",function(e){ var b=e.target.closest("[data-hb]"); if(b){ var i=+b.getAttribute("data-hb"); hbGo(i,i<hbI); } });
$("#hbNext").addEventListener("click",function(){ hbGo(hbI+1); });
$("#hbPrev").addEventListener("click",function(){ hbGo(hbI-1,true); });
/* Keep autoplay running under the mouse pointer; pause only for loading, swiping,
   an off-screen banner, a hidden tab, or the visitor's reduced-motion preference. */
document.addEventListener("visibilitychange",function(){ hbPause("tab",document.hidden); });
new IntersectionObserver(function(es){ hbPause("view",!es[0].isIntersecting); },{threshold:.2}).observe(hero);
(function(){ /* swipe */
  var x0=0,y0=0,on=false;
  hbEl.addEventListener("pointerdown",function(e){ if(e.target.closest("button,a")) return; on=true; x0=e.clientX; y0=e.clientY; hbPause("drag",true); },{passive:true});
  var end=function(e){ if(!on) return; on=false; hbPause("drag",false); var dx=e.clientX-x0, dy=e.clientY-y0;
    if(Math.abs(dx)>46 && Math.abs(dx)>Math.abs(dy)*1.2){ var fwd=document.dir==="rtl"?dx>0:dx<0; hbGo(hbI+(fwd?1:-1),!fwd); } };
  window.addEventListener("pointerup",end,{passive:true}); window.addEventListener("pointercancel",function(){ on=false; hbPause("drag",false); });
})();
mqHeroMob.addEventListener&&mqHeroMob.addEventListener("change",layoutHero);
function sizeHero(){ layoutHero(); }

/* ---------------- loader ---------------- */
var loader=$("#loader"), lBar=$("#loaderBar"), lPct=$("#loaderPct");
var shown=0, t0=performance.now(), loaderDone=false, heroReady=false;
(function(){ var im=new Image(); im.onload=im.onerror=function(){ heroReady=true; }; im.src=IMG.banner_olive||""; if(!IMG.banner_olive) heroReady=true; })();
function setLoader(v){ shown=v; lBar.style.setProperty("--s",v); lPct.textContent=String(Math.round(v*100)).padStart(3,"0"); }
function loaderTick(){
  if(loaderDone) return;
  var el=performance.now()-t0, target=heroReady?1:Math.min(.85,el/2400);
  setLoader(lerp(shown,target,0.12));
  if((heroReady && shown>0.97 && el>1700) || el>6000){
    loaderDone=true; setLoader(1);
    setTimeout(function(){ loader.classList.add("is-done"); document.body.classList.add("is-ready"); hbPause("load",false); },200);
    setTimeout(function(){ loader.style.display="none"; },1500);
    return;
  }
  requestAnimationFrame(loaderTick);
}
hbHold.load=true;
requestAnimationFrame(loaderTick);

/* scroll: the banner sinks and softens while the page rises over it */
var heroLastP=-1;
function updateHero(){
  var p=clamp(sy/Math.max(1,LY.heroH||vh),0,1);
  if(Math.abs(p-heroLastP)<0.0005) return false; heroLastP=p;
  if(p>=1){ heroStage.style.visibility="hidden"; return false; } heroStage.style.visibility="";
  if(!reduced) heroStage.style.transform="translate3d(0,"+(p*vh*0.42).toFixed(1)+"px,0) scale("+(1-p*0.08).toFixed(4)+")";
  heroStage.style.setProperty("--hp",p.toFixed(3));
  if(cue) cue.style.opacity=(1-clamp(p/0.08,0,1)).toFixed(3);
  return false;
}


/* ---------------- essence 3D soap ---------------- */
var ess=$("#essence"), essWord=$("#essWord"), ings=$$(".ingredient"), dots=$$(".essence__dots b"), essHalo=$("#essHalo");
var essP=0, essCur=0, essLast=-1, soap=null;
function updateEssence(){
  var total=LY.essH-vh;
  essP=clamp((sy-LY.essTop)/Math.max(1,total),0,1);
  if(!(sy < LY.essTop+LY.essH && sy+vh > LY.essTop)){ essCur=essP; return false; }
  essCur = reduced? essP : lerp(essCur,essP,ease(0.14));
  var moving=Math.abs(essCur-essP)>0.0005; if(!moving) essCur=essP;
  if(soap) soap.progress=essCur;
  if(Math.abs(essCur-essLast)<0.00005) return moving;
  essLast=essCur;
  var p=essCur, mobile=vw<=900||(vh<=640&&vw>vh);
  essWord.style.transform="translate3d(calc(-50% + "+((0.5-p)*40).toFixed(2)+"vw),-50%,0)";
  essHalo.style.opacity=(0.55+0.45*Math.sin(p*Math.PI)).toFixed(3);
  ings.forEach(function(el,i){
    var a=0.1+i*0.2, b=a+0.2, al;
    if(mobile){ al = Math.min(clamp((p-a)/0.05,0,1), i===3?1:clamp((b-p)/0.05,0,1)); }
    else { al = clamp((p-a)/0.06,0,1); }
    el.style.opacity=al.toFixed(3);
    var ty=((1-al)*30).toFixed(1);
    el.style.transform = mobile ? "translate3d(-50%,"+ty+"px,0)" : "translate3d(0,"+ty+"px,0)";
    dots[i].style.transform="scaleX("+clamp((p-a)/0.2,0,1).toFixed(3)+")";
  });
  return moving;
}
function initSoap(){
  var canvas=$("#soapCanvas");
  var fallback=function(){ canvas.style.display="none"; var fb=$("#soapFallback"); fb.src=IMG.ig_hero_still; fb.classList.add("is-loaded"); fb.style.display="block"; };
  if(!window.THREE){ fallback(); return; }
  var T=window.THREE, renderer;
  try{ renderer=new T.WebGLRenderer({canvas:canvas,antialias:true,alpha:true,powerPreference:"high-performance"}); }catch(e){ fallback(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,MOB?1:1.5));
  if("outputEncoding" in renderer) renderer.outputEncoding=T.sRGBEncoding;
  renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=0.92;
  var scene=new T.Scene(), cam=new T.PerspectiveCamera(30,1,0.1,100); cam.position.set(0,0,10.5);

  // rounded bar geometry
  var W=3.2,H=2.1,R=0.42, shape=new T.Shape(), x=-W/2, y=-H/2;
  shape.moveTo(x+R,y); shape.lineTo(x+W-R,y); shape.quadraticCurveTo(x+W,y,x+W,y+R); shape.lineTo(x+W,y+H-R); shape.quadraticCurveTo(x+W,y+H,x+W-R,y+H);
  shape.lineTo(x+R,y+H); shape.quadraticCurveTo(x,y+H,x,y+H-R); shape.lineTo(x,y+R); shape.quadraticCurveTo(x,y,x+R,y);
  var geo=new T.ExtrudeGeometry(shape,{depth:0.95,bevelEnabled:true,bevelThickness:0.26,bevelSize:0.22,bevelSegments:10,curveSegments:28});
  geo.center(); geo.computeBoundingBox();
  var bb=geo.boundingBox, bw=bb.max.x-bb.min.x, bh=bb.max.y-bb.min.y, pos=geo.attributes.position, uv=geo.attributes.uv;
  var nrm=geo.attributes.normal; for(var i=0;i<pos.count;i++){ var u=(pos.getX(i)-bb.min.x)/bw; if(nrm && nrm.getZ(i)<-0.5) u=1-u; uv.setXY(i,u,(pos.getY(i)-bb.min.y)/bh); }
  uv.needsUpdate=true;

  // procedural stamped texture
  var TW=1400, TH=Math.round(TW*bh/bw);
  function makeTex(bump){
    var c=document.createElement("canvas"); c.width=TW; c.height=TH; var g=c.getContext("2d");
    if(bump){ g.fillStyle="#8A8A8A"; g.fillRect(0,0,TW,TH); }
    else{
      var gr=g.createLinearGradient(0,0,TW,TH); gr.addColorStop(0,"#F1E2C8"); gr.addColorStop(.5,"#E4CFAC"); gr.addColorStop(1,"#D5BB8E");
      g.fillStyle=gr; g.fillRect(0,0,TW,TH);
    }
    // natural speckle
    for(var k=0;k<9000;k++){
      var a=Math.random();
      g.fillStyle = bump ? "rgba("+(a>.5?160:110)+","+(a>.5?160:110)+","+(a>.5?160:110)+","+(Math.random()*.35)+")" : "rgba("+(a>.5?255:150)+","+(a>.5?248:120)+","+(a>.5?225:60)+","+(Math.random()*.10)+")";
      var r=Math.random()*2.2; g.beginPath(); g.arc(Math.random()*TW,Math.random()*TH,r,0,7); g.fill();
    }
    var stamp = bump ? "#222222" : "rgba(53,69,45,.72)", hi = bump? "#222222" : "rgba(251,241,224,.75)";
    var cx=TW/2, cy=TH/2;
    function drawStamp(col,dx,dy){
      g.save(); g.translate(dx,dy); g.strokeStyle=col; g.fillStyle=col;
      g.lineWidth=TW*0.006; var ix=TW*0.2, iy=TH*0.2;
      rr(g,ix,iy,TW-ix*2,TH-iy*2,TH*0.12); g.stroke();
      g.lineWidth=TW*0.0025; rr(g,ix+TW*0.018,iy+TW*0.018,TW-ix*2-TW*0.036,TH-iy*2-TW*0.036,TH*0.1); g.stroke();
      drawLogo(g,cx,cy-TH*0.03,TH*0.3); g.textAlign="center"; g.textBaseline="middle";
      g.font="600 "+Math.round(TH*0.04)+"px 'Readex Pro', sans-serif";
      if("letterSpacing" in g) g.letterSpacing=Math.round(TH*0.02)+"px";
      g.fillText("NABULSI · EXTRACTED FROM NATURAL OILS",cx,cy+TH*0.17);
      leaf(g,cx-TW*0.2,cy-TH*0.02,TH*0.12,-1); leaf(g,cx+TW*0.2,cy-TH*0.02,TH*0.12,1);
      g.restore();
    }
    if(!bump) drawStamp(hi,-2,-2);
    drawStamp(stamp,0,0);
    var t=new T.CanvasTexture(c);
    if(!bump && "encoding" in t) t.encoding=T.sRGBEncoding;
    t.anisotropy=renderer.capabilities.getMaxAnisotropy();
    return t;
  }
  function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
  function leaf(g,x,y,s,dir){
    g.save(); g.translate(x,y); g.scale(dir,1);
    g.lineWidth=s*0.06; g.beginPath(); g.moveTo(-s*0.9,s*0.2); g.quadraticCurveTo(0,-s*0.2,s*0.9,-s*0.1); g.stroke();
    for(var j=0;j<4;j++){ var lx=-s*0.6+j*s*0.42; g.beginPath(); g.ellipse(lx,-s*0.1,s*0.26,s*0.09,-0.6,0,7); g.fill(); g.beginPath(); g.ellipse(lx+s*0.12,s*0.12,s*0.24,s*0.08,0.6,0,7); g.fill(); }
    g.restore();
  }
  var mat=new T.MeshPhysicalMaterial({map:makeTex(false),bumpMap:makeTex(true),bumpScale:0.05,roughness:0.66,metalness:0,clearcoat:0.2,clearcoatRoughness:0.55,sheen:0.5,sheenRoughness:0.6,sheenColor:new T.Color("#F6E2C1")});
  var bar=new T.Mesh(geo,mat), group=new T.Group(); group.add(bar); scene.add(group);

  // ingredient orbs
  var orbCols=["#C89B4F","#4D713B","#E9D8BA","#8E2A35"], orbs=[];
  orbCols.forEach(function(col,i){
    var m=new T.Mesh(new T.SphereGeometry(0.2,40,40), new T.MeshPhysicalMaterial({color:col,roughness:0.12,metalness:0.05,clearcoat:1,clearcoatRoughness:0.05,transmission:i===0?0.45:0,thickness:0.5,emissive:new T.Color(col),emissiveIntensity:0.12}));
    m.scale.setScalar(0.001); scene.add(m); orbs.push(m);
  });
  // gold dust
  var pg=new T.BufferGeometry(), pc=520, arr=new Float32Array(pc*3);
  for(var q=0;q<pc;q++){ var rr2=3+Math.random()*5, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1); arr[q*3]=rr2*Math.sin(ph)*Math.cos(th); arr[q*3+1]=rr2*Math.sin(ph)*Math.sin(th)*0.7; arr[q*3+2]=rr2*Math.cos(ph)-2; }
  pg.setAttribute("position",new T.BufferAttribute(arr,3));
  var dust=new T.Points(pg,new T.PointsMaterial({color:"#DFC292",size:0.035,transparent:true,opacity:0.8,blending:T.AdditiveBlending,depthWrite:false}));
  scene.add(dust);

  scene.add(new T.HemisphereLight(0xfff0d0,0x4a3418,0.5));
  var key=new T.DirectionalLight(0xffdfa0,1.7); key.position.set(4,5,7); scene.add(key);
  var rim=new T.DirectionalLight(0xe6b955,3.2); rim.position.set(-6,2,-5); scene.add(rim);
  var fill=new T.PointLight(0xa7b37e,0.6,30); fill.position.set(-4,-3,4); scene.add(fill);

  var looping=false, visible=false, mouseX=0, mouseY=0, start=performance.now();
  soap={progress:0,visible:false};
  new IntersectionObserver(function(e){visible=e[0].isIntersecting; if(visible&&!looping){ looping=true; requestAnimationFrame(loop); }},{rootMargin:"100px"}).observe(ess);
  window.addEventListener("pointermove",function(e){mouseX=e.clientX/window.innerWidth-.5;mouseY=e.clientY/window.innerHeight-.5},{passive:true});
  function resize(){ var w=canvas.clientWidth,h=canvas.clientHeight; renderer.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); }
  window.addEventListener("resize",resize); resize();
  var sm=0;
  function loop(){
    if(!visible){ looping=false; return; }
    requestAnimationFrame(loop);
    var t=(performance.now()-start)/1000, p=soap.progress, mobile=canvas.clientWidth<=900;
    sm=lerp(sm,p,ease(0.1));
    var intro=clamp(sm/0.1,0,1), e=1-Math.pow(1-intro,3);
    var asp=canvas.clientWidth/Math.max(1,canvas.clientHeight); var sc=Math.min(0.92,asp*0.98)*(0.7+0.3*e);
    group.scale.setScalar(sc);
    group.position.y=(mobile?0.55:-0.1)+Math.sin(t*1.1)*0.06;
    group.rotation.y=-0.55+sm*Math.PI*2.2+mouseX*0.25;
    group.rotation.x=-0.5+Math.sin(sm*Math.PI)*0.45+mouseY*0.15;
    group.rotation.z=0.08*Math.sin(t*0.6);
    orbs.forEach(function(o,i){
      var a=0.1+i*0.2, on=clamp((sm-a)/0.08,0,1), ang=t*0.5+i*Math.PI/2, rad=(mobile?1.75:2.6)+Math.sin(t+i)*0.08;
      o.scale.setScalar(Math.max(0.001,on)*(mobile?0.8:1));
      o.position.set(Math.cos(ang)*rad,(mobile?0.55:-0.1)+Math.sin(ang*1.3)*0.55,Math.sin(ang)*rad*0.6);
    });
    dust.rotation.y=t*0.03; dust.rotation.x=Math.sin(t*0.1)*0.05;
    renderer.render(scene,cam);
  }
}


/* ================= Olga · Oil-to-Bag FX v25 — mobile-first rewrite =================
   The product is lifted into a glowing orb half-filled with olive oil, flies into the bag
   and drips oil on the way. v25 engine:
   - ONE shared rAF loop drives every flight and every particle (no competing loops)
   - orbs move with transform / opacity only: no layout, no repaint per frame
   - oil drops and sparks are pre-rendered sprites (one drawImage each), physics are
     time based (same speed at 30, 60 or 120 Hz), only the dirty area is cleared
   - particle budget scales with the device and with the frame rate it actually gets
   - the canvas is hidden while idle and never re-allocated while scrolling */
var fxHold=0;
var OFX=(function(){
  var mob=!!(window.OLGA_GOV&&OLGA_GOV.mob) || window.matchMedia("(max-width:760px)").matches;
  var lowEnd=(navigator.hardwareConcurrency||8)<=4 || (navigator.deviceMemory||8)<=3;
  var BUDGET=mob?(lowEnd?55:85):240, MAXFLY=mob?3:5, PUDMAX=mob?4:10;
  var OIL=["#A47A33","#B78B41","#C69A51","#4D8133","#CFA763","#A97E37"];
  var GLOW=["#FAEFDB","#DFC292","#E9CFA4","#C5D0A5","#FCF7ED"];
  var rnd=function(a,b){return a+Math.random()*(b-a)}, ri=function(n){return Math.random()*n|0};
  var easeIO=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}, easeOut=function(t){return 1-Math.pow(1-t,3)};
  var cv=null,cx=null,DPR=1,W=0,H=0,parts=[],flights=[],running=false,lastT=0,ema=16.7,dirty=null,puddles=0;
  var SPR={d:[],s:[]};
  function mkC(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c}
  function rgba(hex,a){var n=parseInt(hex.slice(1),16);return "rgba("+(n>>16&255)+","+(n>>8&255)+","+(n&255)+","+a+")"}
  function sprites(){
    if(SPR.d.length) return;
    OIL.forEach(function(col){ /* teardrop: tail at the left, head (r=7) centred at 31,9 — drawn at 2x for crisp phones */
      var c=mkC(80,36),g=c.getContext("2d"); g.scale(2,2);
      g.fillStyle=col; g.beginPath(); g.moveTo(2,9); g.quadraticCurveTo(22,1.9,31,2); g.arc(31,9,7,-Math.PI/2,Math.PI/2); g.quadraticCurveTo(22,16.1,2,9); g.fill();
      g.globalAlpha=.35; g.fillStyle="#345B21"; g.beginPath(); g.arc(31.7,11.4,4.9,0,Math.PI); g.fill();
      g.globalAlpha=.85; g.fillStyle="#FBF3E4"; g.beginPath(); g.ellipse(32.8,6.2,2.7,1.5,0,0,6.283); g.fill();
      SPR.d.push(c); });
    GLOW.forEach(function(col){
      var c=mkC(32,32),g=c.getContext("2d"),gr=g.createRadialGradient(16,16,0,16,16,16);
      gr.addColorStop(0,col); gr.addColorStop(.3,col); gr.addColorStop(.38,rgba(col,.32)); gr.addColorStop(1,rgba(col,0));
      g.fillStyle=gr; g.fillRect(0,0,32,32); SPR.s.push(c); });
  }
  function size(){
    var w=window.innerWidth, h=Math.max(window.innerHeight, document.documentElement.clientHeight||0);
    if(cv && w===W && h<=H && h>H-140) return;             /* URL-bar show/hide never re-allocates the canvas */
    W=w; H=h+(mob?80:0); DPR=Math.min(window.devicePixelRatio||1, mob?1.5:2);
    cv.width=Math.round(W*DPR); cv.height=Math.round(H*DPR); cv.style.width=W+"px"; cv.style.height=H+"px"; dirty=null;
  }
  function ensure(){
    if(!cv){ cv=document.createElement("canvas"); cv.className="ofx-cv"; cv.setAttribute("aria-hidden","true"); document.body.appendChild(cv); cx=cv.getContext("2d"); sprites(); }
    size();
  }
  /* quality: emission scales down when the phone is struggling */
  function q(){ return ema>34?.35:(ema>24?.65:1); }
  function drop(x,y,vx,vy,big,life){
    if(parts.length>=BUDGET) return;
    parts.push({k:0,x:x,y:y,vx:vx,vy:vy,r:big?rnd(2.8,5):rnd(1.4,3),s:ri(SPR.d.length),l:0,m:life||(mob?rnd(.8,1.25):rnd(1.1,1.7))});
  }
  function spark(x,y,sp){
    if(parts.length>=BUDGET || (mob&&Math.random()<.4)) return;
    var a=rnd(0,6.283),v=rnd(40,sp*60);
    parts.push({k:1,x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:rnd(1,2.5),s:ri(SPR.s.length),l:0,m:mob?rnd(.35,.7):rnd(.5,1)});
  }
  function puddle(x,y,r){ if(puddles>=PUDMAX) return; puddles++; parts.push({k:2,x:x,y:y,r:1.5,max:r,c:OIL[ri(OIL.length)],l:0,m:mob?.9:1.3}); }
  function burst(x,y,ns,nd,sp){ var f=q(); ns=Math.round(ns*f); nd=Math.round(nd*f);
    for(var i=0;i<ns;i++) spark(x,y,sp); for(i=0;i<nd;i++) drop(x+rnd(-14,14),y+rnd(-6,6),rnd(-220,220),rnd(-380,-80),false); }
  function ring(x,y,s,delay){ var el=document.createElement("div"); el.className="ofx-ring"; el.style.left=x+"px"; el.style.top=y+"px"; el.style.width=el.style.height=s+"px"; if(delay) el.style.animationDelay=delay+"ms"; document.body.appendChild(el); setTimeout(function(){el.remove()},1000+(delay||0)); }
  function pulse(el,cls){ if(!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function buzz(p){ if(navigator.vibrate) try{navigator.vibrate(p)}catch(_){} }

  /* ---------- the one loop ---------- */
  function kick(){ if(!running){ running=true; lastT=0; cv.style.display="block"; requestAnimationFrame(loop); } }
  function loop(now){
    var dt=lastT?Math.min(.05,(now-lastT)/1000):1/60; lastT=now; ema=ema*.9+dt*1000*.1;
    for(var f=flights.length-1;f>=0;f--){ if(flights[f].step(now,dt)===false) flights.splice(f,1); }
    /* clear only what was drawn last frame */
    cx.setTransform(1,0,0,1,0,0);
    if(dirty) cx.clearRect(Math.max(0,dirty[0]*DPR-2),Math.max(0,dirty[1]*DPR-2),(dirty[2]-dirty[0])*DPR+4,(dirty[3]-dirty[1])*DPR+4);
    else cx.clearRect(0,0,cv.width,cv.height);
    var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9, floor=window.innerHeight-3, g=1500*dt, dmp=Math.pow(.4,dt), dmp2=Math.pow(.55,dt);
    for(var i=parts.length-1;i>=0;i--){ var p=parts[i]; p.l+=dt; var k=p.l/p.m;
      if(k>=1){ if(p.k===2) puddles--; parts[i]=parts[parts.length-1]; parts.pop(); continue; }
      var a=Math.min(1,(1-k)*1.5), e;
      if(p.k===2){ p.r+=(p.max-p.r)*Math.min(1,dt*11);
        cx.setTransform(DPR,0,0,DPR,0,0); cx.globalAlpha=a*.55; cx.fillStyle=p.c; cx.beginPath(); cx.ellipse(p.x,p.y,p.r,p.r*.26,0,0,6.283); cx.fill();
        e=p.r+2;
      } else if(p.k===0){
        p.vy+=g; p.vx*=dmp; p.x+=p.vx*dt; p.y+=p.vy*dt;
        if(p.y>floor){ puddle(p.x,floor,rnd(8,17)*(p.r/3)); if(!mob&&parts.length<BUDGET){ parts.push({k:0,x:p.x,y:floor-3,vx:rnd(-90,90),vy:rnd(-200,-80),r:p.r*.4,s:p.s,l:0,m:.35}); } parts[i]=parts[parts.length-1]; parts.pop(); continue; }
        var sp=Math.sqrt(p.vx*p.vx+p.vy*p.vy), s=p.r/7*DPR*.5, st=Math.min(1.55,.55+sp/700), c=p.vx/(sp||1), sn=p.vy/(sp||1);
        if(!sp){c=0;sn=1}
        cx.setTransform(c*s*st,sn*s*st,-sn*s,c*s,p.x*DPR,p.y*DPR); cx.globalAlpha=a*.95; cx.drawImage(SPR.d[p.s],-62,-18);
        e=p.r*(2+st*3);
      } else {
        p.vy+=180*dt; p.vx*=dmp2; p.vy*=dmp2; p.x+=p.vx*dt; p.y+=p.vy*dt;
        var z=p.r*2.8/16*DPR; cx.setTransform(z,0,0,z,p.x*DPR,p.y*DPR); cx.globalAlpha=a; cx.drawImage(SPR.s[p.s],-16,-16);
        e=p.r*2.9;
      }
      if(p.x-e<x0)x0=p.x-e; if(p.y-e<y0)y0=p.y-e; if(p.x+e>x1)x1=p.x+e; if(p.y+e>y1)y1=p.y+e;
    }
    cx.globalAlpha=1;
    dirty=x1>x0?[x0,y0,x1,y1]:null;
    if(parts.length||flights.length) requestAnimationFrame(loop);
    else { running=false; cx.setTransform(1,0,0,1,0,0); cx.clearRect(0,0,cv.width,cv.height); dirty=null; cv.style.display="none"; }
  }
  function target(){
    var fb=document.querySelector(".bag-float.is-on"); if(fb){ var q2=fb.getBoundingClientRect(); return {x:q2.left+q2.width/2,y:q2.top+q2.height/2,el:fb}; }
    var b=$("#bagBtn"), r=b&&b.getBoundingClientRect();
    if(r&&r.width&&r.bottom>0) return {x:r.left+r.width/2,y:r.top+r.height/2,el:b};
    return {x:window.innerWidth-40,y:36,el:null};
  }
  function makeOrb(src,D,back){
    var orb=document.createElement("div"); orb.className="ofx-orb"+(back?" ofx-orb--back":"");
    orb.style.width=orb.style.height=D+"px";
    var im=document.createElement("img"); im.alt=""; im.decoding="sync"; im.src=src; orb.appendChild(im);
    var oil=document.createElement("i"); oil.className="ofx-oil"; orb.appendChild(oil);
    return orb;
  }
  function place(orb,x,y,D,rot,sc,op){ orb.style.transform="translate3d("+(x-D/2).toFixed(1)+"px,"+(y-D/2).toFixed(1)+"px,0) rotate("+rot.toFixed(1)+"deg) scale("+sc.toFixed(3)+")"; if(op!==undefined) orb.style.opacity=op.toFixed(3); }
  function begin(hold){ if(hold){ fxHold++; nav.classList.remove("is-hidden"); } if(window.OLGA_GOV) OLGA_GOV.busy(1); }
  function end(hold){ if(hold) fxHold=Math.max(0,fxHold-1); if(window.OLGA_GOV) OLGA_GOV.busy(-1); }

  /* product -> bag */
  function fly(rect,imgSrc,btn,done,to){
    if(btn) pulse(btn,"ofx-press");
    if(reduced||!imgSrc||flights.length>=MAXFLY){ pulse(bagCount,"ofx-pop"); buzz(10); done&&done(); return; }
    ensure(); var hold=!to; begin(hold);
    var r=rect&&rect.width?rect:{left:window.innerWidth/2-60,top:window.innerHeight*.35-75,width:120,height:150};
    var near=!!to, TG=to||target;
    var D=near?Math.max(54,Math.min(76,r.width*.7)):(mob?68:Math.max(76,Math.min(108,r.width*.42)));
    var sx=r.left+r.width/2, sy=r.top+r.height/2, s0=Math.max(.8,Math.min(2.1,Math.min(r.width,r.height)/D));
    var T1=near?260:(mob?300:420), T2=near?560:(mob?640:900), t0=performance.now(), lx=sx, ly=sy-16, acc=0, c1x=0, c1y=0, init=false;
    var orb=makeOrb(imgSrc,D,false); place(orb,sx,sy,D,0,s0,0); document.body.appendChild(orb);
    burst(sx,sy,mob?10:24,mob?6:14,7);
    buzz(8);
    flights.push({step:function(now,dt){
      var e=now-t0;
      if(e<T1){ var k=easeOut(e/T1); place(orb,sx,sy-k*16,D,0,s0+(1-s0)*k+Math.sin(k*Math.PI)*.1,Math.min(1,e/110)); return; }
      var tg=TG();
      if(!init){ init=true; c1x=sx+(tg.x-sx)*.15; c1y=Math.max(80,Math.min(sy,tg.y+200)-Math.max(150,window.innerHeight*.26)); }
      var k2=Math.min((e-T1)/T2,1), qq=easeIO(k2), u=1-qq;
      var ix=u*u*sx+2*u*qq*c1x+qq*qq*tg.x, iy=u*u*(sy-16)+2*u*qq*c1y+qq*qq*tg.y;
      var vx=(ix-lx)/Math.max(dt,.008), vy=(iy-ly)/Math.max(dt,.008); lx=ix; ly=iy;
      var sc=1-qq*.72, tilt=Math.max(-50,Math.min(50,vx*.035))+Math.sin(k2*9)*5;
      place(orb,ix,iy,D,tilt,sc,1);
      /* oil dripping from the orb's lower rim, trailing behind its motion */
      if(k2<.88){ acc+=dt*(mob?26:95)*q(); var rr=D*sc*.45;
        while(acc>=1){ acc--; drop(ix+rnd(-rr*.55,rr*.55),iy+rr*.78,-vx*.2+rnd(-50,50),-vy*.1+rnd(15,110),Math.random()<.22); } }
      if(Math.random()<(mob?.25:.6)) spark(ix+rnd(-8,8),iy+rnd(-8,8),2.2);
      if(k2<1) return;
      /* arrival */
      var a=orb.animate([{opacity:1,transform:orb.style.transform},{opacity:0,transform:"translate3d("+(tg.x-D/2).toFixed(1)+"px,"+(tg.y-D/2).toFixed(1)+"px,0) scale(0)"}],{duration:200,easing:"cubic-bezier(.6,0,.9,.3)",fill:"forwards"});
      a.onfinish=function(){ orb.remove(); }; setTimeout(function(){ orb.isConnected&&orb.remove(); },400);
      ring(tg.x,tg.y,near?70:90,0); if(!mob&&!near) ring(tg.x,tg.y,140,90);
      burst(tg.x,tg.y,mob?14:40,mob?4:12,8);
      if(tg.el) pulse(tg.el,tg.cls||"ofx-hit");
      pulse(bagCount,"ofx-pop"); buzz([12,40,18]);
      end(hold); done&&done();
      return false;
    }});
    kick();
  }
  /* bag -> back to its place on the card */
  function back(dest,imgSrc,btn,done,from){
    if(btn) pulse(btn,"ofx-press");
    if(reduced||!imgSrc||flights.length>=MAXFLY){ buzz(8); done&&done(); return; }
    ensure(); var hold=!from, SRC=from||target; begin(hold);
    var d0=dest(), r0=d0.r&&d0.r.width?d0.r:{left:window.innerWidth/2-60,top:window.innerHeight*.45-75,width:120,height:150};
    var near=!hold, D=near?Math.max(54,Math.min(76,r0.width*.7)):(mob?64:Math.max(72,Math.min(104,r0.width*.42)));
    var s=SRC(); if(s.el) pulse(s.el,s.cls||"ofx-out");
    ring(s.x,s.y,near?66:90,0);
    burst(s.x,s.y,near?10:(mob?10:22),0,5); buzz(10);
    var T0=near?160:200, T1=near?520:(mob?600:860), T2=near?300:(mob?300:420), t0=performance.now(), bx=s.x, by=s.y, lx=bx, ly=by, cxp=0, cyp=0, started=false, landed=false, acc=0;
    var orb=makeOrb(imgSrc,D,true); place(orb,bx,by,D,0,.05,1); document.body.appendChild(orb);
    function cur(){ var d=dest(); return d.r&&d.r.width?d:{r:r0,el:null}; }
    flights.push({step:function(now,dt){
      var e=now-t0;
      if(e<T0){ s=SRC(); bx=s.x; by=s.y; lx=bx; ly=by; place(orb,bx,by,D,0,.05+easeOut(e/T0)*.27,1); return; }
      var d=cur(), r=d.r, ex=r.left+r.width/2, ey=r.top+r.height/2;
      if(!started){ started=true; cxp=bx+(ex-bx)*.85; cyp=Math.max(60,Math.min(by,ey)-(near?70:Math.max(130,window.innerHeight*.2))); }
      var e1=e-T0;
      if(e1<T1){ var k2=e1/T1, qq=easeIO(k2), u=1-qq;
        var ix=u*u*bx+2*u*qq*cxp+qq*qq*ex, iy=u*u*by+2*u*qq*cyp+qq*qq*ey;
        var vx=(ix-lx)/Math.max(dt,.008), vy=(iy-ly)/Math.max(dt,.008); lx=ix; ly=iy;
        var sc=.32+qq*.68; place(orb,ix,iy,D,Math.max(-45,Math.min(45,vx*.035))+Math.sin(k2*8)*4,sc,1);
        if(k2<.9){ acc+=dt*(mob?16:60)*q(); var rr=D*sc*.45; while(acc>=1){ acc--; drop(ix+rnd(-rr*.5,rr*.5),iy+rr*.78,-vx*.18+rnd(-45,45),-vy*.1+rnd(15,95),Math.random()<.18); } }
        if(Math.random()<(mob?.2:.5)) spark(ix+rnd(-8,8),iy+rnd(-8,8),2);
        return;
      }
      var k3=Math.min((e1-T1)/T2,1), m=easeOut(k3), full=Math.max(1,Math.min(2.4,Math.min(r.width,r.height)/D));
      if(!landed){ landed=true; orb.classList.add("is-land");
        burst(ex,ey,near?12:(mob?12:28),0,5);
        var nd=Math.round((near?4:(mob?4:10))*q()); for(var g2=0;g2<nd;g2++) drop(ex+rnd(-r.width*.25,r.width*.25),r.top+r.height*.82,rnd(-180,180),rnd(-300,-60),false);
        if(!near&&!mob) puddle(ex,Math.min(window.innerHeight-4,r.top+r.height*.9),Math.min(70,r.width*.42));
      }
      place(orb,ex,ey,D,0,1+(full-1)*m,1-m*m);
      if(k3<1) return;
      orb.remove();
      if(d.el) pulse(d.el,"ofx-land");
      end(hold); done&&done();
      return false;
    }});
    kick();
  }
  return {fly:fly,back:back};
})();


/* ======================= BAG ======================= */
var bag={}; try{ bag=JSON.parse(localStorage.getItem("olga-bag2")||"{}")||{}; }catch(e){ bag={}; }
function cleanBag(){ Object.keys(bag).forEach(function(k){ if(!VAR[k]||!(bag[k]>0)) delete bag[k]; }); }
cleanBag();
var step="bag";
var drawer=$("#drawer"), overlay=$("#overlay"), dBody=$("#drawerBody"), dFoot=$("#drawerFoot"), bagCount=$("#bagCount");
function save(){ try{ localStorage.setItem("olga-bag2",JSON.stringify(bag)); }catch(e){} }
function countItems(){ return Object.keys(bag).reduce(function(s,k){ return s+bag[k]; },0); }
function subtotal(){ return Object.keys(bag).reduce(function(s,k){ return s+bag[k]*VAR[k].price; },0); }
function syncSteppers(changed){
  $$("[data-qctl]").forEach(function(box){
    var id=box.getAttribute("data-qctl"), q=bag[id]||0, on=q>0, n=box.querySelector(".qstep__n b"), was=box.classList.contains("in-bag");
    box.classList.toggle("in-bag",on);
    if(n && n.textContent!==String(q)){ n.textContent=q; if(on&&was&&changed===id){ n.classList.remove("tick"); void n.offsetWidth; n.classList.add("tick"); } }
    var card=box.closest(".pcard"); if(card) card.classList.toggle("is-in-bag",on);
  });
}
var bagFloat=document.createElement("button"); bagFloat.className="bag-float"; bagFloat.type="button"; bagFloat.setAttribute("aria-label","Bag");
bagFloat.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="bag-float__n">0</span>';
document.body.appendChild(bagFloat); var bagFloatN=bagFloat.querySelector(".bag-float__n");
bagFloat.addEventListener("click",function(){ openBag(); });
function updateBagFloat(bump){
  var show=countItems()>0 && nav.classList.contains("is-hidden") && !document.body.classList.contains("is-locked");
  bagFloat.classList.toggle("is-on",show);
  if(bump&&show){ bagFloat.classList.remove("ofx-hit"); void bagFloat.offsetWidth; bagFloat.classList.add("ofx-hit"); }
}
function renderBadge(bump,changed){
  var n=countItems(); bagCount.textContent=n; bagCount.classList.toggle("has",n>0);
  if(bump){ bagCount.classList.remove("bump"); void bagCount.offsetWidth; bagCount.classList.add("bump"); }
  $("#drawerCount").textContent=n?"("+n+" "+(n===1?t("item"):t("items"))+")":"";
  bagFloatN.textContent=n; updateBagFloat(bump); syncSteppers(changed);
}
function thumbOf(v){ return THUMBS[v.cut]||CUT[v.cut]||""; }
function totalsHTML(){ var fee=step==="checkout"?deliveryFee(CK.city):null; return '<div class="totals"><div><span>'+t("subtotal")+'</span><span>'+moneyTxt(subtotal())+'</span></div><div><span>'+t("delivery")+'</span><span>'+(fee===null?t("deliveryV"):moneyTxt(fee))+'</span></div><div class="grand"><span>'+t("total")+'</span><span>'+moneyTxt(subtotal()+(fee||0))+'</span></div></div>'; }
function updTotals(){ var tt=dFoot&&dFoot.querySelector(".totals"); if(tt) tt.outerHTML=totalsHTML(); }
function renderBag(){
  var ids=Object.keys(bag);
  if(!ids.length && step!=="done"){
    step="bag";
    dBody.innerHTML='<div class="empty">'+LOGO_SVG+'<strong>'+t("emptyT")+'</strong><p>'+t("emptyP")+'</p></div>';
    dFoot.innerHTML='<button class="btn btn--block" type="button" data-goto="#shop">'+t("explore")+'</button>'; return;
  }
  if(step==="done"){
    var lo=(typeof ORD!=="undefined")?ORD.last:null, oid=lo&&lo.id?'<b class="ord-no" dir="ltr">#'+ckEsc(String(lo.id))+'</b>':"";
    dBody.innerHTML='<div class="empty">'+LOGO_SVG+'<strong>'+t("thanksT")+'</strong><p>'+t("thanksP").replace("{id}",oid)+'</p>'+(lo&&lo.total!=null?'<p class="ord-sum">'+t("totalDel")+': <b>'+moneyTxt(+lo.total)+'</b></p>':'')+'</div>';
    dFoot.innerHTML='<button class="btn btn--block" type="button" id="doneBtn">'+t("contShop")+'</button>'; return;
  }
  if(step==="checkout"){
    dBody.innerHTML=checkoutHTML();
    dFoot.innerHTML=totalsHTML()+'<button class="btn btn--olive btn--block" type="button" id="sendOrder">'+t("sendOrder")+'</button><p class="note">'+t("feeNote")+'</p>'; return;
  }
  var h=ids.map(function(id){ var v=VAR[id], p=v.p; return '<div class="line-item"><div class="line-item__img"><img src="'+thumbOf(v)+'" alt=""></div><div><h4>'+L(p.name)+'</h4><div class="meta">'+L(v.size)+'</div><div class="qty"><button type="button" data-dec="'+id+'" aria-label="−">−</button><span>'+bag[id]+'</span><button type="button" data-inc="'+id+'" aria-label="+">+</button></div></div><div class="line-item__right"><b>'+moneyTxt(v.price*bag[id])+'</b><button type="button" class="remove" data-rm="'+id+'">'+t("remove")+'</button></div></div>'; }).join("");
  var inBagP={}; ids.forEach(function(id){ inBagP[VAR[id].p.id]=1; });
  var ups=PRODUCTS.filter(function(p){ return !inBagP[p.id]; }).slice(0,2);
  if(ups.length) h+='<div class="upsell"><h5>'+t("upsell")+'</h5><div class="upsell__row">'+ups.map(function(p){ var v=curVar(p); return '<button type="button" class="upsell__item" data-add="'+v.id+'"><img src="'+thumbOf(v)+'" alt=""><span>'+L(p.name)+'<small>+ '+moneyTxt(v.price)+'</small></span></button>'; }).join("")+'</div></div>';
  dBody.innerHTML=h;
  dFoot.innerHTML=totalsHTML()+'<button class="btn btn--block" type="button" id="toCheckout">'+t("checkout")+'</button><p class="note">'+t("secureNote")+'</p>';
}
function openBag(){ renderBag(); drawer.classList.add("is-open"); overlay.classList.add("is-open"); drawer.setAttribute("aria-hidden","false"); lockScroll(true); setTimeout(function(){ $("#drawerClose").focus({preventScroll:true}); },80); }
function closeBag(){ if(!drawer.classList.contains("is-open")) return; drawer.classList.remove("is-open"); overlay.classList.remove("is-open"); drawer.setAttribute("aria-hidden","true"); lockScroll(false); if(step!=="checkout") step="bag"; }
$("#bagBtn").addEventListener("click",openBag);
$("#drawerClose").addEventListener("click",closeBag);
overlay.addEventListener("click",closeBag);
function addToBag(id,qty,fromEl){
  if(!VAR[id]) return;
  if(step==="done") step="bag";
  bag[id]=Math.min(99,(bag[id]||0)+(qty||1)); save();
  renderBadge(false,id);
  try{ flyToBag(fromEl,id,function(){ renderBadge(false,id); }); }catch(err){ renderBadge(true,id); }
  toast(id);
  if(drawer.classList.contains("is-open")) renderBag();
}
window.addEventListener("storage",function(e){ if(e.key!=="olga-bag2") return; try{ bag=JSON.parse(e.newValue||"{}")||{}; }catch(_){ bag={}; } cleanBag(); renderBag(); renderBadge(false); });
function flyToBag(fromEl,id,done){
  var v=VAR[id], el=null;
  if(fromEl && fromEl.closest("#o3d")) el=oStage;
  else if(fromEl && fromEl.closest(".drawer")){ var li=fromEl.closest(".line-item"); el=(li&&li.querySelector(".line-item__img"))||fromEl; return OFX.fly(el.getBoundingClientRect(), thumbOf(v), fromEl, done, drawerTgt); }
  else { var c=fromEl&&fromEl.closest(".pcard,.spread,.modal__card,.hslide"); el=c&&(c.querySelector(".pcard__img,.spread__bottles .b1,.modal__gallery,.hslide__p1")); }
  OFX.fly(el?el.getBoundingClientRect():null, thumbOf(v), fromEl, done);
}
function drawerTgt(){
  var h=document.querySelector(".drawer__head h3"), sm=document.getElementById("drawerCount");
  var r=(sm&&sm.textContent?sm:h).getBoundingClientRect();
  return {x:r.left+r.width/2,y:r.top+r.height/2,el:h,cls:"ofx-soft"};
}
/* where a product returns to when it leaves the bag (resolved live, the drawer re-renders) */
function backDest(btn,id){
  if(btn.closest(".drawer")){
    var li=btn.closest(".line-item"), im0=li&&li.querySelector(".line-item__img"), r0=im0&&im0.getBoundingClientRect();
    return function(){ var b=dBody.querySelector('[data-dec="'+id+'"]'), n=b&&b.closest(".line-item"), e=n&&n.querySelector(".line-item__img"); return e?{r:e.getBoundingClientRect(),el:e}:{r:r0,el:null}; };
  }
  var c=btn.closest(".pcard,.spread,.modal__card,.hslide"), e=c&&c.querySelector(".pcard__img,.spread__bottles .b1,.modal__gallery,.hslide__p1"), r1=e&&e.getBoundingClientRect();
  return function(){ return e&&e.isConnected?{r:e.getBoundingClientRect(),el:e.tagName==="IMG"?e:null}:{r:r1,el:null}; };
}
function returnFromBag(btn,id){
  try{ OFX.back(backDest(btn,id), thumbOf(VAR[id]), btn, null, btn.closest(".drawer")?drawerTgt:null); }catch(_){}
}
var toastEl=$("#toast"), toastT;
function toast(id){
  var v=VAR[id];
  toastEl.innerHTML='<span class="toast__img"><img src="'+thumbOf(v)+'" alt=""></span><span><b style="font-weight:500">'+L(v.p.name)+'</b> · '+L(v.size)+' — '+t("added")+'</span><button type="button" id="toastView">'+t("viewBag")+'</button>';
  toastEl.classList.add("is-on"); clearTimeout(toastT); toastT=setTimeout(function(){ toastEl.classList.remove("is-on"); },3400);
}
function setSize(pid,vi){
  var p=byId[pid]; if(!p||!p.variants[vi]) return; sel[pid]=vi; var v=p.variants[vi];
  $$('[data-size="'+pid+'"]').forEach(function(b){ var on=+b.getAttribute("data-vi")===vi; b.classList.toggle("is-on",on); b.setAttribute("aria-checked",on); });
  $$('[data-price="'+pid+'"]').forEach(function(el){ el.innerHTML=money(v.price); });
  $$('.pcard[data-pid="'+pid+'"],.spread[data-pid="'+pid+'"]').forEach(function(c){
    var box=c.querySelector("[data-qctl]"); if(box){ box.setAttribute("data-qctl",v.id); $$("[data-add],[data-inc],[data-dec]",box).forEach(function(b){ ["data-add","data-inc","data-dec"].forEach(function(a){ if(b.hasAttribute(a)) b.setAttribute(a,v.id); }); }); }
    var im=c.querySelector(".pcard__img");
    if(im){ im.classList.add("is-swap"); setTimeout(function(){ im.setAttribute("data-img",v.cut); im.src=pickCut(im,v.cut); im.style.setProperty("--sc",v.sc); im.style.setProperty("--h",imgH(v)); im.classList.remove("is-swap"); },220); }
  });
  syncSteppers();
}
document.addEventListener("click",function(e){
  var t2=e.target.closest("button,[data-goto],[data-quick],[data-view3d]"); if(!t2) return;
  var id;
  if((id=t2.getAttribute("data-size"))){ setSize(id,+t2.getAttribute("data-vi")); if(t2.getAttribute("data-scope")==="o3d") switch3D(); if(t2.getAttribute("data-scope")==="modal") refreshQuick(); return; }
  if((id=t2.getAttribute("data-add"))){ e.preventDefault(); addToBag(id,1,t2); return; }
  if((id=t2.getAttribute("data-view3d"))){ e.preventDefault(); e.stopPropagation(); open3D(id); if(window.OLH_explain&&t2.closest(".pcard")) OLH_explain(id); return; }
  if((id=t2.getAttribute("data-quick"))){ e.preventDefault(); openQuick(id); return; }
  if((id=t2.getAttribute("data-inc"))){ if(!VAR[id]) return; if((bag[id]||0)>=99){ renderBadge(true,id); return; }
    bag[id]=(bag[id]||0)+1; save(); if(step==="done") step="bag";
    try{ flyToBag(t2,id,function(){ renderBadge(false,id); }); }catch(err){}
    renderBag(); renderBadge(false,id); return; }
  if((id=t2.getAttribute("data-dec"))){ if(!VAR[id]||!bag[id]) return;
    returnFromBag(t2,id);
    bag[id]=bag[id]-1; if(bag[id]<1) delete bag[id]; save(); renderBag(); renderBadge(true,id); return; }
  if((id=t2.getAttribute("data-rm"))){ delete bag[id]; save(); renderBag(); renderBadge(false,id); return; }
  if(t2.id==="toastView"){ toastEl.classList.remove("is-on"); openBag(); return; }
  if(t2.id==="toCheckout"){ step="checkout"; renderBag(); setTimeout(function(){ var i=$("#oName"); i&&i.focus(); },300); return; }
  if(t2.id==="backBtn"){ step="bag"; renderBag(); return; }
  if(t2.id==="doneBtn"){ step="bag"; closeBag(); renderBag(); scrollToEl("#shop",60); return; }
  if(t2.id==="sendOrder"){ sendOrder(); return; }
  if(t2.id==="sendOrderWa"){ sendOrderWhatsApp(); return; }
  if(t2.getAttribute("data-goto")){ closeBag(); setTimeout(function(){ scrollToEl(t2.getAttribute("data-goto"),60); },350); }
});
document.addEventListener("keydown",function(e){ if((e.key==="Enter"||e.key===" ") && e.target.classList && e.target.classList.contains("pcard__stage")){ e.preventDefault(); open3D(e.target.getAttribute("data-view3d")); } });
/* ======================= CHECKOUT v3 (phone · map · payment) ======================= */
var CK={name:"",phone:"",city:"",notes:"",pay:"",loc:null};
var JO_CITIES={ar:["عمّان","الزرقاء","إربد","العقبة","السلط","مادبا","جرش","عجلون","المفرق","الكرك","الطفيلة","معان","الرصيفة"],en:["Amman","Zarqa","Irbid","Aqaba","Salt","Madaba","Jerash","Ajloun","Mafraq","Karak","Tafilah","Ma'an","Russeifa"]};
var PAYS=["cod","cliq","wallet"];
var JO_BOX={s:29.18,w:34.88,n:33.38,e:39.31};
function ckEsc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function toLatinDigits(s){ return String(s||"").replace(/[\u0660-\u0669]/g,function(d){ return String(d.charCodeAt(0)-0x0660); }).replace(/[\u06F0-\u06F9]/g,function(d){ return String(d.charCodeAt(0)-0x06F0); }); }
/* Jordan mobile: 9 digits, starts with 7 (77 / 78 / 79) */
function cleanJoPhone(raw){
  var d=toLatinDigits(raw).replace(/\D+/g,"");
  if(d.indexOf("00962")===0) d=d.slice(5); else if(d.indexOf("962")===0 && d.length>9) d=d.slice(3);
  d=d.replace(/^0+/,"");
  while(d.length && d.charAt(0)!=="7") d=d.slice(1);
  return d.slice(0,9);
}
function isJoMobile(d){ return /^7[789]\d{7}$/.test(d); }
function fmtJoPhone(d){ return "+962 "+d.slice(0,2)+" "+d.slice(2,5)+" "+d.slice(5); }
function inJordan(lat,lng){ return lat>=JO_BOX.s && lat<=JO_BOX.n && lng>=JO_BOX.w && lng<=JO_BOX.e; }
var FLAG_JO=(function(){ var p=[],cx=4.6,cy=7,R=1.55,r=.68; for(var i=0;i<14;i++){ var a=-Math.PI/2+i*Math.PI/7,rr=i%2?r:R; p.push((cx+Math.cos(a)*rr).toFixed(2)+","+(cy+Math.sin(a)*rr).toFixed(2)); }
  return '<svg class="flag" viewBox="0 0 28 14" aria-hidden="true"><rect width="28" height="4.67" fill="#000000"/><rect y="4.67" width="28" height="4.67" fill="#FFFFFF"/><rect y="9.33" width="28" height="4.67" fill="#316218"/><path d="M0 0L14 7L0 14Z" fill="#CE1126"/><path d="M'+p.join("L")+'Z" fill="#FFFFFF"/></svg>'; })();
var CK_ICO={
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3.5 6.2v13.6L9 17.6l6 2.2 5.5-2.2V4.2L15 6.4 9 4Z"/><path d="M9 4v13.6M15 6.4v13.4"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>',
  pinS:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
  me:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  cod:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v.01M18 14.5v.01"/></svg>',
  cliq:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
  wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M9.5 9.5h5M9.5 12.5h3"/></svg>'
};
function checkoutHTML(){
  var f=function(id,k,val,ac,err,extra){ return '<div class="field field--light" id="f-'+id+'"><input id="'+id+'" placeholder=" " value="'+ckEsc(val)+'"'+(ac?' autocomplete="'+ac+'"':'')+(extra||"")+'><label for="'+id+'">'+t(k)+'</label>'+(err?'<p class="ferr" role="alert">'+t(err)+'</p>':'')+'</div>'; };
  var lbDir=LANG==="ar"?"rtl":"ltr";
  var phone='<div class="field field--light field--tel'+(isJoMobile(CK.phone)?' ok':'')+'" id="f-oPhone">'+
    '<span class="tel__cc" aria-hidden="true">'+FLAG_JO+'<span>+962</span><span class="tick">'+CK_ICO.check+'</span></span>'+
    '<input id="oPhone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder=" " dir="ltr" value="'+ckEsc(CK.phone)+'" aria-describedby="oPhoneHint">'+
    '<label for="oPhone" dir="'+lbDir+'">'+t("oPhone")+'</label>'+
    '<p class="fhint" id="oPhoneHint"><span>'+t("phHint")+'</span><b id="oPhoneCnt">'+CK.phone.length+'/9</b></p>'+
    '<p class="ferr" role="alert">'+t("ePhone")+'</p></div>';
  var cities='<datalist id="joCities">'+JO_CITIES[LANG==="ar"?"ar":"en"].map(function(c){ return '<option value="'+ckEsc(c)+'">'; }).join("")+'</datalist>';
  var set=!!CK.loc;
  var loc='<div class="ckf'+(set?' is-set':'')+'" id="f-oLoc"><span class="ckf__lab">'+t("oLoc")+'</span>'+
    '<button type="button" class="locbtn" id="openMap" aria-haspopup="dialog">'+
      '<span class="locbtn__ico">'+(set?CK_ICO.pin:CK_ICO.map)+'<i>'+(set?CK_ICO.check:CK_ICO.pinS)+'</i></span>'+
      '<span class="locbtn__txt"><b>'+t(set?"locSet":"locBtn")+'</b><small>'+(set?ckEsc(CK.loc.addr||(CK.loc.lat.toFixed(5)+", "+CK.loc.lng.toFixed(5))):t("locBtnS"))+'</small></span>'+
      '<span class="locbtn__go"><span>'+t(set?"locChange":"locOpen")+'</span>'+CK_ICO.arrow+'</span>'+
    '</button><p class="ferr" role="alert">'+t("eLoc")+'</p></div>';
  var pay='<div class="ckf" id="f-oPay"><span class="ckf__lab" id="oPayLab">'+t("oPay")+'</span><div class="pay" role="radiogroup" aria-labelledby="oPayLab">'+
    PAYS.map(function(k){ return '<label class="pay__opt"><input type="radio" name="oPay" value="'+k+'"'+(CK.pay===k?' checked':'')+'><span class="pay__box"><span class="pay__ico">'+CK_ICO[k]+'</span><span class="pay__t"><b>'+t("pay_"+k)+'</b><small>'+t("pay_"+k+"S")+'</small></span><i class="pay__dot"></i></span></label>'; }).join("")+
    '</div><p class="ferr" role="alert">'+t("ePay")+'</p></div>';
  return '<form class="checkout" id="checkout" novalidate><button type="button" class="step-back" id="backBtn">'+t("back")+'</button><h4>'+t("delT")+'</h4><p>'+t("delP")+'</p>'+
    f("oName","oName",CK.name,"name","eName")+phone+f("oCity","oCity",CK.city,"address-level2","eCity",' list="joCities"')+cities+loc+
    '<div class="field field--light"><textarea id="oNotes" placeholder=" ">'+ckEsc(CK.notes)+'</textarea><label for="oNotes">'+t("oNotes")+'</label></div>'+pay+'</form>';
}
function ckValid(k){
  if(k==="oName") return CK.name.trim().split(/\s+/).filter(function(w){ return w.length>0; }).length>=2 && CK.name.trim().length>=4;
  if(k==="oPhone") return isJoMobile(CK.phone);
  if(k==="oLoc") return !!CK.loc;
  if(k==="oPay") return PAYS.indexOf(CK.pay)>-1;
  if(k==="oCity") return CK.city.trim().length>=2;
  return true;
}
function ckMark(k,on){ var el=$("#f-"+k); if(el) el.classList.toggle("bad",on); }
dBody.addEventListener("beforeinput",function(e){
  if(!e.target || e.target.id!=="oPhone") return;
  if(e.inputType==="insertText" || e.inputType==="insertCompositionText"){
    var d=toLatinDigits(e.data||"");
    if(/\D/.test(d)){ e.preventDefault(); return; }
    var cur=e.target.value, s=e.target.selectionStart, en=e.target.selectionEnd, next=cur.slice(0,s)+d+cur.slice(en);
    if(next.length>9 || (next.length && next.charAt(0)!=="7")) e.preventDefault();
  }
});
dBody.addEventListener("input",function(e){
  var el=e.target; if(!el || !el.id) return;
  if(el.id==="oPhone"){
    var c=cleanJoPhone(el.value); if(el.value!==c) el.value=c; CK.phone=c;
    var ok=isJoMobile(c), box=$("#f-oPhone"); box.classList.toggle("ok",ok); if(ok) box.classList.remove("bad");
    var cnt=$("#oPhoneCnt"); if(cnt) cnt.textContent=c.length+"/9"; return;
  }
  if(el.id==="oName"){ CK.name=el.value; if(ckValid("oName")) ckMark("oName",false); return; }
  if(el.id==="oCity"){ CK.city=el.value; if(ckValid("oCity")) ckMark("oCity",false); updTotals(); return; }
  if(el.id==="oNotes"){ CK.notes=el.value; return; }
});
dBody.addEventListener("change",function(e){ var el=e.target; if(el && el.name==="oPay"){ CK.pay=el.value; ckMark("oPay",false); } });
dBody.addEventListener("focusout",function(e){ var el=e.target; if(!el) return; if(el.id==="oPhone" && CK.phone.length) ckMark("oPhone",!isJoMobile(CK.phone)); if(el.id==="oName" && CK.name.trim()) ckMark("oName",!ckValid("oName")); });
dBody.addEventListener("click",function(e){ if(e.target.closest && e.target.closest("#openMap")){ e.preventDefault(); openMap(); } });

/* ---------- map picker ----------
   Engine 1: MapLibre GL + OpenFreeMap vector tiles (keyless, no Referer needed, Arabic labels).
   Engine 2 (automatic fallback, no WebGL / blocked worker / CDN issue): Leaflet + Esri raster tiles.
   OpenStreetMap's own tile servers are NOT used: they return 403 "Access blocked" whenever the page
   is opened from a file, a preview frame or any context that sends no Referer. */
var LM={el:null,map:null,marker:null,pend:null,geoT:null,geoN:0,hintT:null,engine:null,booting:false,cbs:[]};
var MAP_CFG={
  gl:{js:["https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.1/dist/maplibre-gl.js","https://unpkg.com/maplibre-gl@5.24.1/dist/maplibre-gl.js"],
      css:["https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.1/dist/maplibre-gl.css","https://unpkg.com/maplibre-gl@5.24.1/dist/maplibre-gl.css"],
      rtl:"https://cdn.jsdelivr.net/npm/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
      style:"https://tiles.openfreemap.org/styles/liberty"},
  lf:{js:["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js","https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"],
      css:["https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css","https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"],
      tiles:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      attr:'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a> &middot; HERE, Garmin, &copy; OpenStreetMap contributors'},
  bounds:{s:28.4,w:33.9,n:34.2,e:40.3}, center:[31.9539,35.9106]
};
function loadCSS(urls){ urls.forEach(function(u,i){ if(i) return; if(document.querySelector('link[href="'+u+'"]')) return; var l=document.createElement("link"); l.rel="stylesheet"; l.href=u; l.onerror=function(){ if(urls[1]){ var l2=document.createElement("link"); l2.rel="stylesheet"; l2.href=urls[1]; document.head.appendChild(l2); } }; document.head.appendChild(l); }); }
function loadJS(urls,test,cb){
  if(test()) return cb(true);
  var i=0;(function next(){
    if(i>=urls.length) return cb(false);
    var s=document.createElement("script"); s.src=urls[i++]; s.async=true;
    var to=setTimeout(function(){ s.onload=s.onerror=null; next(); },15000);
    s.onload=function(){ clearTimeout(to); test()?cb(true):next(); };
    s.onerror=function(){ clearTimeout(to); s.remove(); next(); };
    document.head.appendChild(s);
  })();
}
function hasWebGL(){ try{ var c=document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2")||c.getContext("webgl"))); }catch(e){ return false; } }
function pinEl(){
  var d=document.createElement("div"); d.className="lpin drop";
  var lg=A.LOGO?'<g transform="translate(12.5 15.9) scale(.018254)"><g transform="translate(0,726) scale(.1,-.1)"><path d="'+A.LOGO+'" fill="#35452D"/></g></g>':'<circle cx="24" cy="22.5" r="5" fill="#87916B"/>';
  d.innerHTML='<svg viewBox="0 0 48 60" aria-hidden="true"><defs><linearGradient id="lpinG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#88985A"/><stop offset=".5" stop-color="#87916B"/><stop offset="1" stop-color="#35452D"/></linearGradient></defs><path d="M24 1.8C12.2 1.8 2.8 11.1 2.8 22.7 2.8 38 24 58.2 24 58.2S45.2 38 45.2 22.7C45.2 11.1 35.8 1.8 24 1.8Z" fill="url(#lpinG)" stroke="#FBF6EC" stroke-width="2.2"/><circle cx="24" cy="22.5" r="15.2" fill="#FBF6EC"/><circle cx="24" cy="22.5" r="13.6" fill="none" stroke="#C5A36A" stroke-width="1" stroke-opacity=".85"/>'+lg+'</svg>';
  return d;
}
function pinBounce(el){ if(!el) return; el.classList.remove("drop"); void el.offsetWidth; el.classList.add("drop"); }
/* Olga palette over the OpenFreeMap "liberty" style + language-aware labels */
function olgaTint(m){
  var st=m.getStyle(); if(!st||!st.layers) return;
  var nameExpr=LANG==="ar"?["coalesce",["get","name:ar"],["get","name"],["get","name_en"]]:["coalesce",["get","name_en"],["get","name:latin"],["get","name"]];
  st.layers.forEach(function(l){
    var id=l.id, set=function(p,v){ try{ m.setPaintProperty(id,p,v); }catch(e){} };
    try{
      if(l.type==="background") set("background-color","#F6EEE1");
      else if(l.type==="raster") set("raster-opacity",.35);
      else if(l.type==="fill"){
        if(/water/.test(id)) set("fill-color","#C9D7C2");
        else if(/park|grass|wood|wetland|pitch|cemetery/.test(id)) set("fill-color","#DCE1CF");
        else if(/residential/.test(id)) set("fill-color","#F1E6D3");
        else if(/sand/.test(id)) set("fill-color","#EEDFC5");
        else if(/building/.test(id)) set("fill-color","#EADCC5");
      }
      else if(l.type==="fill-extrusion"){ set("fill-extrusion-color","#E8D8BE"); set("fill-extrusion-opacity",.55); }
      else if(l.type==="line"){
        if(/waterway/.test(id)) set("line-color","#B7C9AE");
        else if(/casing/.test(id)){ if(/motorway|trunk|primary/.test(id)) set("line-color","#C7A265"); }
        else if(/motorway/.test(id)) set("line-color","#DAB981");
        else if(/trunk_primary/.test(id)) set("line-color","#ECD7B3");
      }
      else if(l.type==="symbol" && l.layout && l.layout["text-field"]!==undefined){
        if(JSON.stringify(l.layout["text-field"]).indexOf('"name')>-1 && !/shield|ref/.test(id)) m.setLayoutProperty(id,"text-field",nameExpr);
        set("text-halo-color","#FBF6EC");
      }
    }catch(e){}
  });
}
function engineGL(cb){
  if(!hasWebGL()) return cb(null);
  loadCSS(MAP_CFG.gl.css);
  loadJS(MAP_CFG.gl.js,function(){ return !!(window.maplibregl&&window.maplibregl.Map); },function(ok){
    if(!ok) return cb(null);
    var G=window.maplibregl, done=false, m;
    try{ if(G.getRTLTextPluginStatus && G.getRTLTextPluginStatus()==="unavailable"){ var pr=G.setRTLTextPlugin(MAP_CFG.gl.rtl,true); if(pr&&pr.catch) pr.catch(function(){}); } }catch(e){}
    var fail=function(){ if(done) return; done=true; try{ m&&m.remove(); }catch(e){} $("#lmapMap").innerHTML=""; cb(null); };
    var to=setTimeout(fail,16000);
    try{
      var c=LM.pend?[LM.pend.lng,LM.pend.lat]:[MAP_CFG.center[1],MAP_CFG.center[0]], B=MAP_CFG.bounds;
      m=new G.Map({container:"lmapMap",style:MAP_CFG.gl.style,center:c,zoom:LM.pend?16:12,minZoom:6,maxZoom:19,maxBounds:[[B.w,B.s],[B.e,B.n]],attributionControl:{compact:true},dragRotate:false,pitchWithRotate:false,touchPitch:false,cooperativeGestures:false});
      m.touchZoomRotate.disableRotation();
      m.addControl(new G.NavigationControl({showCompass:false}),"top-left");
    }catch(e){ clearTimeout(to); return fail(); }
    m.on("error",function(){ /* tile hiccups are retried by MapLibre; style failure is caught by the timeout */ });
    m.once("load",function(){
      if(done) return; done=true; clearTimeout(to);
      olgaTint(m);
      var mk=null;
      m.on("click",function(e){ setPin(e.lngLat.lat,e.lngLat.lng,true); });
      cb({kind:"gl",
        resize:function(){ m.resize(); },
        view:function(lat,lng,z){ m.jumpTo({center:[lng,lat],zoom:z}); },
        fly:function(lat,lng,z){ m.flyTo({center:[lng,lat],zoom:z,speed:1.6,essential:true}); },
        zoom:function(){ return m.getZoom(); },
        pin:function(lat,lng,anim){
          if(!mk){ mk=new G.Marker({element:pinEl(),anchor:"bottom",offset:[0,2],draggable:true}).setLngLat([lng,lat]).addTo(m); mk.on("dragend",function(){ var p=mk.getLngLat(); setPin(p.lat,p.lng,false); }); }
          else { mk.setLngLat([lng,lat]); if(anim) pinBounce(mk.getElement().querySelector(".lpin")||mk.getElement()); }
        }});
    });
  });
}
function engineLF(cb){
  loadCSS(MAP_CFG.lf.css);
  loadJS(MAP_CFG.lf.js,function(){ return !!(window.L&&window.L.map&&window.L.tileLayer); },function(ok){
    if(!ok) return cb(null);
    var Lf=window.L, B=MAP_CFG.bounds, c=LM.pend?[LM.pend.lat,LM.pend.lng]:MAP_CFG.center, m, loaded=0, errs=0;
    try{
      m=Lf.map("lmapMap",{zoomControl:false,minZoom:6,maxBounds:[[B.s,B.w],[B.n,B.e]],maxBoundsViscosity:.9}).setView(c,LM.pend?16:12);
      Lf.control.zoom({position:"topleft"}).addTo(m);
      var tl=Lf.tileLayer(MAP_CFG.lf.tiles,{maxZoom:19,maxNativeZoom:19,attribution:MAP_CFG.lf.attr}).addTo(m);
      tl.on("tileload",function(){ loaded++; }); tl.on("tileerror",function(){ errs++; if(errs>=8&&!loaded) mapError(); });
      m.attributionControl.setPrefix(false);
    }catch(e){ return cb(null); }
    var icon=Lf.divIcon({className:"lpin-wrap",iconSize:[56,70],iconAnchor:[28,68],html:pinEl().outerHTML}), mk=null;
    m.on("click",function(e){ setPin(e.latlng.lat,e.latlng.lng,true); });
    cb({kind:"lf",
      resize:function(){ m.invalidateSize(); },
      view:function(lat,lng,z){ m.setView([lat,lng],z,{animate:false}); },
      fly:function(lat,lng,z){ m.flyTo([lat,lng],z,{duration:.9}); },
      zoom:function(){ return m.getZoom(); },
      pin:function(lat,lng,anim){
        if(!mk){ mk=Lf.marker([lat,lng],{icon:icon,draggable:true,keyboard:false,autoPan:true}).addTo(m); mk.on("dragend",function(){ var p=mk.getLatLng(); setPin(p.lat,p.lng,false); }); }
        else { mk.setLatLng([lat,lng]); if(anim){ var el=mk.getElement(); pinBounce(el&&el.querySelector(".lpin")); } }
      }});
  });
}
function mapError(){ var ld=$("#lmapLoad",LM.el); if(!ld) return; ld.classList.remove("is-off"); ld.classList.add("is-err"); $("span",ld).textContent=t("mapFail"); $("#lmapRetry",ld).hidden=false; }
function bootMap(cb){
  if(LM.map) return cb(true);
  LM.cbs.push(cb); if(LM.booting) return; LM.booting=true;
  var fin=function(api){ LM.booting=false; if(api){ LM.map=api; LM.engine=api.kind; LM.el.setAttribute("data-engine",api.kind); } var q=LM.cbs; LM.cbs=[]; q.forEach(function(f){ f(!!api); }); };
  engineGL(function(api){ if(api) return fin(api); $("#lmapMap").innerHTML=""; engineLF(fin); });
}

function buildMapDialog(){
  if(LM.el) return LM.el;
  var d=document.createElement("div"); d.className="lmap"; d.id="lmap"; d.setAttribute("role","dialog"); d.setAttribute("aria-modal","true"); d.setAttribute("aria-hidden","true"); d.setAttribute("aria-labelledby","lmapT");
  d.innerHTML='<div class="lmap__bg" data-lclose></div><div class="lmap__card">'+
    '<div class="lmap__head"><span class="lmap__ico">'+CK_ICO.pin+'</span><div><h4 id="lmapT"></h4><p id="lmapP"></p></div><button type="button" class="icon-btn lmap__x" data-lclose id="lmapX">'+CK_ICO.close+'</button></div>'+
    '<form class="lmap__search" id="lmapSearch">'+CK_ICO.search+'<input id="lmapQ" type="search" autocomplete="off" enterkeyhint="search"><button type="submit" class="btn btn--sm" id="lmapGo"></button></form>'+
    '<div class="lmap__stage"><div id="lmapMap"></div><div class="lmap__hint" id="lmapHint"></div><button type="button" class="lmap__me" id="lmapMe">'+CK_ICO.me+'<span></span></button><div class="lmap__load" id="lmapLoad"><i></i><span></span><button type="button" class="btn btn--sm" id="lmapRetry" hidden></button></div></div>'+
    '<div class="lmap__foot"><div class="lmap__addr">'+CK_ICO.pin+'<div><small id="lmapAL"></small><span id="lmapAddr">—</span></div></div><button type="button" class="btn btn--olive" id="lmapOk" disabled>'+CK_ICO.check+'<span></span></button></div>'+
  '</div>';
  document.body.appendChild(d); LM.el=d;
  d.addEventListener("click",function(e){
    if(e.target.closest("[data-lclose]")){ closeMap(); return; }
    if(e.target.closest("#lmapOk")){ confirmMap(); return; }
    if(e.target.closest("#lmapMe")){ locateMe(); return; }
    if(e.target.closest("#lmapRetry")){ startMap(); return; }
  });
  $("#lmapSearch",d).addEventListener("submit",function(e){ e.preventDefault(); searchPlace($("#lmapQ",d).value); });
  return d;
}
function mapTexts(){
  var d=LM.el; $("#lmapT",d).textContent=t("mapT"); $("#lmapP",d).textContent=t("mapP");
  $("#lmapQ",d).setAttribute("placeholder",t("mapSearch")); $("#lmapGo",d).textContent=t("mapGo");
  $("#lmapMe span",d).textContent=t("mapMe"); $("#lmapOk span",d).textContent=t("mapConfirm");
  $("#lmapRetry",d).textContent=t("mapRetry"); $("#lmapAL",d).textContent=t("oLoc").replace(/\s*\*$/,""); $("#lmapX",d).setAttribute("aria-label",t("aClose"));
}
function mapHint(k,warn,ms){
  var h=$("#lmapHint",LM.el); if(!h) return; clearTimeout(LM.hintT);
  if(!k){ h.classList.add("is-off"); return; }
  h.textContent=t(k); h.classList.toggle("is-warn",!!warn); h.classList.remove("is-off");
  if(ms) LM.hintT=setTimeout(function(){ if(LM.pend) h.classList.add("is-off"); else mapHint("mapPick"); },ms);
}
function openMap(){
  var d=buildMapDialog(); mapTexts();
  LM.pend=CK.loc?{lat:CK.loc.lat,lng:CK.loc.lng,addr:CK.loc.addr,city:CK.loc.city}:null;
  $("#lmapAddr",d).textContent=LM.pend?(LM.pend.addr||LM.pend.lat.toFixed(5)+", "+LM.pend.lng.toFixed(5)):"—";
  $("#lmapOk",d).disabled=!LM.pend;
  d.classList.add("is-open"); d.setAttribute("aria-hidden","false");
  startMap();
  setTimeout(function(){ var x=$("#lmapX",d); x&&x.focus({preventScroll:true}); },60);
}
function startMap(){
  var d=LM.el, ld=$("#lmapLoad",d);
  if(!LM.map){ ld.classList.remove("is-off","is-err"); $("span",ld).textContent=t("mapLoading"); $("#lmapRetry",ld).hidden=true; }
  bootMap(function(ok){
    if(!ok){ mapError(); return; }
    ld.classList.add("is-off");
    var sync=function(){ if(!LM.map) return; LM.map.resize(); if(LM.pend){ LM.map.view(LM.pend.lat,LM.pend.lng,Math.max(LM.map.zoom(),16)); setPin(LM.pend.lat,LM.pend.lng,false,true); } else mapHint("mapPick"); };
    sync(); setTimeout(sync,420);
  });
}

function closeMap(){ if(!LM.el||!LM.el.classList.contains("is-open")) return; LM.el.classList.remove("is-open"); LM.el.setAttribute("aria-hidden","true"); var b=$("#openMap"); b&&b.focus({preventScroll:true}); }
window.addEventListener("keydown",function(e){ if(e.key==="Escape" && LM.el && LM.el.classList.contains("is-open")){ e.stopImmediatePropagation(); e.preventDefault(); closeMap(); } },true);
function setPin(lat,lng,anim,keepAddr){
  if(!LM.map) return;
  if(!inJordan(lat,lng)){ mapHint("mapOut",true,2600); return; }
  LM.map.pin(lat,lng,anim);
  var keep=keepAddr&&LM.pend&&LM.pend.addr;
  LM.pend={lat:lat,lng:lng,addr:keep?LM.pend.addr:"",city:keep?LM.pend.city:""};
  $("#lmapOk",LM.el).disabled=false; mapHint(null);
  if(!keep){ $("#lmapAddr",LM.el).textContent=t("mapAddr"); reverseGeo(lat,lng); }
}

function reverseGeo(lat,lng){
  clearTimeout(LM.geoT); var n=++LM.geoN;
  LM.geoT=setTimeout(function(){
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat="+lat+"&lon="+lng+"&accept-language="+(LANG==="ar"?"ar,en":"en,ar"))
    .then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); })
    .then(function(j){
      if(n!==LM.geoN||!LM.pend) return;
      var a=j.address||{}, city=a.city||a.town||a.village||a.municipality||a.county||a.state||"";
      var parts=[a.road||a.pedestrian||"",a.neighbourhood||a.suburb||a.quarter||a.city_district||"",city].filter(function(x,i,arr){ return x && arr.indexOf(x)===i; });
      LM.pend.addr=parts.length?parts.join("، "):(j.display_name||"").split(",").slice(0,3).join("،");
      LM.pend.city=city;
      $("#lmapAddr",LM.el).textContent=LM.pend.addr||(lat.toFixed(5)+", "+lng.toFixed(5));
    })
    .catch(function(){ if(n===LM.geoN&&LM.pend) $("#lmapAddr",LM.el).textContent=lat.toFixed(5)+", "+lng.toFixed(5); });
  },450);
}
function searchPlace(q){
  q=String(q||"").trim().slice(0,120); if(q.length<2||!LM.map) return;
  var go=$("#lmapGo",LM.el); go.disabled=true;
  fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=jo&accept-language="+(LANG==="ar"?"ar,en":"en,ar")+"&q="+encodeURIComponent(q))
  .then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); })
  .then(function(res){
    go.disabled=false;
    if(!res||!res.length){ mapHint("mapNoRes",true,2600); return; }
    var lat=+res[0].lat, lng=+res[0].lon; LM.map.fly(lat,lng,17); setPin(lat,lng,true);
  })
  .catch(function(){ go.disabled=false; mapHint("mapNoRes",true,2600); });
}
function locateMe(){
  var b=$("#lmapMe",LM.el);
  if(!navigator.geolocation||!LM.map){ mapHint("mapGeoFail",true,3200); return; }
  b.classList.add("is-busy");
  navigator.geolocation.getCurrentPosition(function(p){
    b.classList.remove("is-busy");
    var lat=p.coords.latitude, lng=p.coords.longitude;
    if(!inJordan(lat,lng)){ mapHint("mapOut",true,2600); return; }
    LM.map.fly(lat,lng,17); setPin(lat,lng,true);
  },function(){ b.classList.remove("is-busy"); mapHint("mapGeoFail",true,3400); },{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
}
function confirmMap(){
  if(!LM.pend) return;
  CK.loc={lat:LM.pend.lat,lng:LM.pend.lng,addr:LM.pend.addr||"",city:LM.pend.city||""};
  if(!CK.city.trim() && CK.loc.city) CK.city=CK.loc.city;
  closeMap(); if(step==="checkout") renderBag();
}

/* ======================= ORDERS → OLGA CONTROL PANEL =======================
   Orders go straight into the Olga control panel database through the secure
   `place_order` function (prices and delivery fee are set by the database).
   If the panel can't be reached, the customer can still send the same order
   on WhatsApp so no order is lost. */
var OLGA_DB={
  url:(window.OLGA_DB_URL||"https://sktmniwsdipeaocxkykz.supabase.co").replace(/\/+$/,""),
  key:window.OLGA_DB_KEY||"sb_publishable_z3nEmyXGA5H-fKXp1NdA-w_hSwYslK2"
};
var ORD={busy:false,last:null,set:null};
function dbHeaders(){ return {"apikey":OLGA_DB.key,"Content-Type":"application/json","Accept":"application/json"}; }
/* delivery fees as configured in the control panel (Settings → deliveryAmman / deliveryOther) */
(function loadStoreSettings(){
  try{
    fetch(OLGA_DB.url+"/rest/v1/app_settings?select=value&key=eq.store",{headers:dbHeaders()})
      .then(function(r){ return r.ok?r.json():null; })
      .then(function(rows){ if(rows&&rows[0]&&rows[0].value){ ORD.set=rows[0].value; if(step==="checkout") updTotals(); } })
      .catch(function(){});
  }catch(e){}
})();
function isAmman(c){ return /^(عم+ّ?ان|عمان|amman)$/i.test(String(c||"").trim()); }
function cityAr(c){ c=String(c||"").trim(); var i=JO_CITIES.en.map(function(x){ return x.toLowerCase(); }).indexOf(c.toLowerCase()); return i>-1?JO_CITIES.ar[i]:c; }
function deliveryFee(city){
  if(typeof ORD==="undefined"||!ORD.set||!String(city||"").trim()) return null;
  var v=isAmman(city)?ORD.set.deliveryAmman:ORD.set.deliveryOther; v=+v;
  return isFinite(v)&&v>=0?v:null;
}
function orderErr(code){ var k="e_"+String(code||"").split(":")[0]; var m=t(k); return (m&&m!==k)?m:t("ordErr"); }
function postOrder(payload){
  var ctl=window.AbortController?new AbortController():null, to=ctl?setTimeout(function(){ ctl.abort(); },20000):0;
  return fetch(OLGA_DB.url+"/rest/v1/rpc/place_order",{method:"POST",headers:dbHeaders(),body:JSON.stringify({payload:payload}),signal:ctl?ctl.signal:undefined})
    .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ clearTimeout(to); if(!r.ok||!j||!j.id){ var e=new Error((j&&j.message)||("http_"+r.status)); e.code=(j&&j.message)||""; throw e; } return j; }); },
          function(err){ clearTimeout(to); throw err; });
}
function ordBusy(on){
  ORD.busy=on; var b=$("#sendOrder"); if(!b) return;
  b.disabled=on; b.classList.toggle("is-busy",on); b.setAttribute("aria-busy",on?"true":"false");
  b.textContent=on?t("sending"):t("sendOrder");
}
function ordShowErr(err){
  var old=dFoot.querySelector(".ord-err"); if(old) old.remove();
  var box=document.createElement("div"); box.className="ord-err"; box.setAttribute("role","alert");
  box.innerHTML='<b>'+t("ordErrT")+'</b><p>'+ckEsc(orderErr(err&&err.code))+'</p><button type="button" class="ord-err__wa" id="sendOrderWa">'+t("ordWa")+'</button>';
  var b=$("#sendOrder"); if(b){ dFoot.insertBefore(box,b); b.textContent=t("ordRetry"); } else dFoot.appendChild(box);
}
function ckValidateAll(){
  var nm=$("#oName"); if(nm) CK.name=nm.value;
  var ci=$("#oCity"); if(ci) CK.city=ci.value;
  var bad=null;
  ["oName","oPhone","oCity","oLoc","oPay"].forEach(function(k){ var ok=ckValid(k); ckMark(k,!ok); if(!ok&&!bad) bad=k; });
  if(bad){
    var box=$("#f-"+bad), foc=bad==="oLoc"?$("#openMap"):bad==="oPay"?$('input[name="oPay"]'):$("#"+bad);
    if(box) box.scrollIntoView({block:"center",behavior:"smooth"});
    if(foc) setTimeout(function(){ foc.focus({preventScroll:true}); },250);
    return false;
  }
  return true;
}
function finishOrder(last){
  ORD.last=last||null;
  bag={}; save(); renderBadge(); CK.notes=""; CK.loc=null; CK.pay=""; step="done"; renderBag();
}
function sendOrder(){
  if(ORD.busy) return;
  if(!ckValidateAll()) return;
  var items=Object.keys(bag).filter(function(id){ return VAR[id]&&bag[id]>0; }).map(function(id){ return {sku:id,qty:bag[id]}; });
  if(!items.length) return;
  var payload={
    name:CK.name.trim(), phone:CK.phone, city:cityAr(CK.city),
    address:CK.loc.addr||(CK.loc.lat.toFixed(5)+", "+CK.loc.lng.toFixed(5)),
    lat:+CK.loc.lat.toFixed(6), lng:+CK.loc.lng.toFixed(6),
    payment:CK.pay, notes:CK.notes.trim(), items:items, lang:LANG
  };
  var old=dFoot.querySelector(".ord-err"); if(old) old.remove();
  ordBusy(true);
  postOrder(payload).then(function(res){
    ordBusy(false);
    finishOrder({id:res.id,total:res.total});
  },function(err){
    ordBusy(false);
    if(window.console) console.warn("Olga order failed",err);
    ordShowErr(err);
  });
}
/* fallback: the original WhatsApp order message */
function sendOrderWhatsApp(){
  if(!ckValidateAll()) return;
  var lines=Object.keys(bag).map(function(id){ var v=VAR[id]; return "• "+L(v.p.name)+" ("+L(v.size)+") × "+bag[id]+" — "+moneyTxt(v.price*bag[id]); });
  var maps="https://maps.google.com/?q="+CK.loc.lat.toFixed(6)+","+CK.loc.lng.toFixed(6);
  var msg=t("waHello")+"\n\n"+lines.join("\n")+"\n\n"+t("subtotal")+": "+moneyTxt(subtotal())+
    "\n\n"+t("waName")+": "+CK.name.trim()+
    "\n"+t("waPhone")+": "+fmtJoPhone(CK.phone)+
    (CK.city.trim()?"\n"+t("waCity")+": "+CK.city.trim():"")+
    "\n"+t("waLoc")+": "+(CK.loc.addr||(CK.loc.lat.toFixed(5)+", "+CK.loc.lng.toFixed(5)))+
    "\n"+t("waMap")+": "+maps+
    "\n"+t("waPay")+": "+t("pay_"+CK.pay)+
    (CK.notes.trim()?"\n"+t("waNotes")+": "+CK.notes.trim():"");
  window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank","noopener");
  finishOrder(null);
}

/* ======================= QUICK VIEW ======================= */
var modal=$("#modal"), mCard=$("#modalCard"), mQty=1, mSrcs=[], mPid=null;
function quickHTML(p){
  var v=curVar(p);
  mSrcs=[{s:CUT[v.cut],c:1}].concat(p.gallery.map(function(k){ return {s:IMG[k],c:0}; }));
  if(p.spread) mSrcs.push({s:IMG[p.spread.bg],c:0});
  var thumbs='<div class="modal__thumbs">'+mSrcs.map(function(o,i){ return '<button type="button" class="'+(i?'':'is-on')+'" data-thumb="'+i+'" aria-label="'+(i+1)+'"><img class="'+(o.c?'contain':'')+'" src="'+o.s+'" alt=""></button>'; }).join("")+'</div>';
  return '<button class="icon-btn modal__close" type="button" data-close aria-label="'+t("aClose")+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'+
    '<div class="modal__gallery" style="background:radial-gradient(60% 50% at 50% 58%,color-mix(in oklab,'+p.acc+' 24%,white),transparent 70%),linear-gradient(180deg,var(--cream-soft),var(--cream))"><img id="mMain" class="contain" src="'+mSrcs[0].s+'" alt="'+L(p.name)+'">'+thumbs+'</div>'+
    '<div class="modal__info"><span class="eyebrow">'+L(p.badge)+' · '+L(p.type)+'</span><h3 id="mTitle">'+L(p.name)+'</h3><div class="alt">'+p.name[LANG==="ar"?"en":"ar"]+'</div>'+
    '<div class="price" data-price="'+p.id+'">'+money(v.price)+'</div>'+sizesHTML(p,"modal")+
    '<p class="desc">'+L(p.desc)+'</p><p class="ing"><b>'+t("lIng")+':</b> '+L(p.ing)+'</p>'+
    '<ul>'+L(p.points).map(function(x){ return '<li>'+ICO.check+x+'</li>'; }).join("")+'</ul>'+
    '<div class="modal__buy"><div class="qty"><button type="button" id="mDec" aria-label="−">−</button><span id="mQty">1</span><button type="button" id="mInc" aria-label="+">+</button></div><button class="btn btn--olive" type="button" id="mAdd">'+ICO.bag+'<span>'+t("addBag")+'</span></button></div>'+
    '<div class="o3d__more"><button type="button" class="btn btn--ghost btn--sm" data-view3d="'+p.id+'" style="color:var(--ink)">'+t("view3d")+'</button></div></div>';
}
function openQuick(id){ var p=byId[id]; if(!p) return; mPid=id; mQty=1; mCard.innerHTML=quickHTML(p); modal.classList.add("is-open"); modal.setAttribute("aria-hidden","false"); lockScroll(true); setTimeout(function(){ var c=$(".modal__close",mCard); c&&c.focus({preventScroll:true}); },60); }
function refreshQuick(){ var p=byId[mPid]; if(!p) return; var v=curVar(p), m=$("#mMain"); mSrcs[0].s=CUT[v.cut]; m.style.opacity=0; setTimeout(function(){ m.src=CUT[v.cut]; m.className="contain"; m.style.opacity=1; },180); var t0=$('[data-thumb="0"] img',mCard); if(t0) t0.src=CUT[v.cut]; $$(".modal__thumbs button",mCard).forEach(function(b,i){ b.classList.toggle("is-on",i===0); }); }
function closeQuick(){ if(!modal.classList.contains("is-open")) return; modal.classList.remove("is-open"); modal.setAttribute("aria-hidden","true"); lockScroll(false); }
modal.addEventListener("click",function(e){
  var tg=e.target;
  if(tg.closest("[data-close]")){ closeQuick(); return; }
  if(tg.closest("[data-view3d]")){ closeQuick(); return; }
  if(tg.closest("#mMain") && mPid && $("#mMain").className==="contain"){ open3D(mPid); return; }
  var th=tg.closest("[data-thumb]");
  if(th){ var m=$("#mMain"), o=mSrcs[+th.getAttribute("data-thumb")]; m.style.opacity=0; setTimeout(function(){ m.src=o.s; m.className=o.c?"contain":""; m.style.opacity=1; },200); $$(".modal__thumbs button").forEach(function(b){ b.classList.toggle("is-on",b===th); }); return; }
  if(tg.closest("#mInc")){ mQty=Math.min(20,mQty+1); $("#mQty").textContent=mQty; return; }
  if(tg.closest("#mDec")){ mQty=Math.max(1,mQty-1); $("#mQty").textContent=mQty; return; }
  var add=tg.closest("#mAdd"); if(add){ addToBag(curVar(byId[mPid]).id,mQty,add); setTimeout(closeQuick,280); }
});

/* ======================= 3D VIEWER ======================= */
var P3D=(function(){
  var T=window.THREE; if(!T) return null;
  var gl=false; try{ var tc=document.createElement("canvas"); gl=!!(window.WebGLRenderingContext&&(tc.getContext("webgl2")||tc.getContext("webgl"))); }catch(e){ gl=false; }
  if(!gl) return null;

  var SPEC={
    "nabulsi-900":{cut:"nabulsi-900",h:3.0,depth:.64,name:"NABULSI · OLIVE OIL",lab:"#F2E4CD"},
    "nabulsi-300":{cut:"nabulsi-900",h:2.2,depth:.64,name:"NABULSI · OLIVE OIL",lab:"#F2E4CD"},
    "shea-300":{cut:"shea-300",h:2.2,depth:.6,name:"SHEA BUTTER",lab:"#F2E7D3"},
    "shea-900":{cut:"shea-900",h:3.0,depth:.62,name:"SHEA BUTTER",lab:"#F2E7D3"},
    "laurel-300":{cut:"laurel-300",h:2.2,depth:.6,name:"LAUREL OIL",lab:"#F1E5D2"},
    "laurel-900":{cut:"laurel-900",h:3.0,depth:.62,name:"LAUREL OIL",lab:"#F1E5D2"},
    "laundry-1800":{cut:"laundry",h:3.3,depth:.72,name:"NABULSI LAUNDRY",lab:"#F5EBDB"}
  };
  var SETS={
    "shea-duo":[{b:"shea-900",x:-.58,z:-.12,ry:.32},{b:"shea-300",x:.72,z:.42,ry:-.22}],
    "home-set":[{b:"shea-900",x:-.92,z:-.8,ry:.28},{b:"shea-900",x:.92,z:-.8,ry:-.28},
                {b:"shea-300",x:-1.95,z:.45,ry:.5},{b:"shea-300",x:-.66,z:.82,ry:.16},{b:"shea-300",x:.66,z:.82,ry:-.16},{b:"shea-300",x:1.95,z:.45,ry:-.5}]
  };
  var cache={}, shadowTex=null;

  function loadImg(src){ return new Promise(function(res,rej){ var im=new Image(); im.onload=function(){res(im)}; im.onerror=rej; im.src=src; }); }

  /* ---- read the real silhouette of the bottle from the cut-out ---- */
  function analyse(im){
    var W=im.naturalWidth,H=im.naturalHeight,c=document.createElement("canvas"); c.width=W; c.height=H;
    var g=c.getContext("2d"); g.drawImage(im,0,0);
    var d=g.getImageData(0,0,W,H).data, L=new Int16Array(H), R=new Int16Array(H), top=-1, bot=-1, maxW=0, x, y;
    for(y=0;y<H;y++){ var l=-1,r=-1; for(x=0;x<W;x++){ if(d[(y*W+x)*4+3]>120){ if(l<0) l=x; r=x; } } L[y]=l; R[y]=r; if(l>=0){ if(top<0) top=y; bot=y; maxW=Math.max(maxW,r-l); } }
    var cs=[]; for(y=top;y<=bot;y++){ if(L[y]>=0 && R[y]-L[y]>maxW*.72) cs.push((L[y]+R[y])/2); }
    cs.sort(function(a,b){return a-b}); var cx=cs.length?cs[cs.length>>1]:W/2;
    var raw=new Float32Array(H), ext=new Float32Array(H);
    for(y=0;y<H;y++){ if(L[y]<0) continue; var a=cx-L[y], b=R[y]-cx; raw[y]=Math.max(0,Math.min(a,b)); ext[y]=b>a?b:-a; }
    // median (kills oil drips / stray pixels) then gentle box smoothing
    var med=new Float32Array(H), sm=new Float32Array(H), w=Math.max(4,Math.round(H/110)), bw2=Math.max(2,Math.round(H/220)), buf=[];
    for(y=0;y<H;y++){ buf.length=0; for(var k=-w;k<=w;k++){ var yy=y+k; if(yy>=top&&yy<=bot) buf.push(raw[yy]); } buf.sort(function(a,b){return a-b}); med[y]=buf.length?buf[buf.length>>1]:0; }
    for(y=0;y<H;y++){ var s=0,n=0; for(k=-bw2;k<=bw2;k++){ yy=y+k; if(yy>=top&&yy<=bot){ s+=med[yy]; n++; } } sm[y]=n?s/n:0; }
    var maxR=0; for(y=top;y<=bot;y++) maxR=Math.max(maxR,sm[y]);
    while(top<bot && sm[top]<maxR*.08) top++;
    // pump spout: rows near the top that stick far out to one side
    var spRows=[], dirs=0, len=0, lim=top+(bot-top)*.24;
    for(y=top;y<lim;y++){ var e=Math.abs(ext[y]); if(e>sm[y]*1.8 && e>maxR*.32 && e-sm[y]>4){ spRows.push(y); dirs+=ext[y]>0?1:-1; len=Math.max(len,e); } }
    var spout=null;
    if(spRows.length>=2){ var my=0; spRows.forEach(function(v){my+=v}); my/=spRows.length; spout={y:my,dir:dirs>=0?1:-1,len:len,th:Math.max(4,Math.min(spRows.length,maxR*.4)),stem:sm[Math.round(my)]||maxR*.3}; }
    // average body colour (fills gaps) and front-label box (light, low-saturation area)
    var rs=0,gs=0,bs=0,n2=0, labRows=[];
    for(y=top;y<=bot;y++){ var rr=sm[y]; if(rr<maxR*.5) continue; var lit=0,tot=0;
      for(x=Math.round(cx-rr*.55);x<=Math.round(cx+rr*.55);x++){ var i=(y*W+x)*4; if(d[i+3]<200) continue; var R0=d[i],G0=d[i+1],B0=d[i+2]; tot++;
        var mx=Math.max(R0,G0,B0), mn=Math.min(R0,G0,B0); if(mx>165 && (mx-mn)<85) lit++; else { rs+=R0; gs+=G0; bs+=B0; n2++; } }
      if(tot && lit/tot>.55) labRows.push(y); }
    var avg=n2?"rgb("+Math.round(rs/n2)+","+Math.round(gs/n2)+","+Math.round(bs/n2)+")":"#653B26";
    var lab=null;
    if(labRows.length>(bot-top)*.15){ var lt=labRows[0], lb=labRows[labRows.length-1], lm=Math.round((lt+lb)/2); lab={t:lt,b:lb,hw:Math.min(sm[lt],sm[lb],sm[lm])*.86}; }
    else { lab={t:top+(bot-top)*.36,b:top+(bot-top)*.88,hw:maxR*.72}; }
    return {W:W,H:H,cx:cx,top:top,bot:bot,rad:sm,maxR:maxR,spout:spout,avg:avg,lab:lab};
  }

  function rrect(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
  function dilate(g,im,W,H,S){ for(var k=5;k>=1;k--){ for(var a=0;a<12;a++){ var t=a/12*Math.PI*2; g.drawImage(im,Math.cos(t)*k*S,Math.sin(t)*k*S,W,H); } } g.drawImage(im,0,0,W,H); }

  /* ---- textures: front = the real photo; back = liquid seen through + printed back label ---- */
  function makeTex(A,im,sp,back,maxAniso){
    var S=Math.max(1,Math.min(4,Math.round(1600/A.H))), W=A.W*S, H=A.H*S, c=document.createElement("canvas"); c.width=W; c.height=H;
    var g=c.getContext("2d"); g.imageSmoothingQuality="high"; g.fillStyle=A.avg; g.fillRect(0,0,W,H);
    if(!back){ dilate(g,im,W,H,S); }
    else {
      g.save(); g.translate(2*A.cx*S,0); g.scale(-1,1); dilate(g,im,W,H,S); g.restore();
      // the front label seen from behind through the liquid is hidden by the back label
      var L=A.lab, lx=(A.cx-L.hw)*S, ly=L.t*S, lw=L.hw*2*S, lh=(L.b-L.t)*S, cxp=A.cx*S;
      g.save(); g.shadowColor="rgba(0,0,0,.25)"; g.shadowBlur=4*S;
      var gr=g.createLinearGradient(lx,0,lx+lw,0); gr.addColorStop(0,"#DCCAAD"); gr.addColorStop(.18,sp.lab); gr.addColorStop(.82,sp.lab); gr.addColorStop(1,"#DCCAAD");
      g.fillStyle=gr; rrect(g,lx,ly,lw,lh,Math.min(lw,lh)*.18); g.fill(); g.restore();
      g.strokeStyle="rgba(131,73,45,.75)"; g.lineWidth=Math.max(1,lw*.012); rrect(g,lx+lw*.05,ly+lw*.05,lw*.9,lh-lw*.1,Math.min(lw,lh)*.14); g.stroke();
      g.textAlign="center"; g.textBaseline="middle"; g.fillStyle="#203416";
      g.fillStyle="#35452D"; drawLogo(g,cxp,ly+lh*.15,lw*.24);
      g.font="800 "+Math.round(Math.min(lw*.088,lw*1.3/Math.max(1,sp.name.length)))+"px 'Readex Pro', sans-serif"; g.fillStyle="#87916B"; g.fillText(sp.name,cxp,ly+lh*.29,lw*.84);
      g.fillStyle="#203416"; g.font="700 "+Math.round(lw*.07)+"px 'Readex Pro', sans-serif";
      ["HAND & SHOWER SOAP","100% NATURAL"].forEach(function(t,i){ g.fillText(t,cxp,ly+lh*(.42+i*.1)); });
      g.font="italic 500 "+Math.round(lw*.085)+"px 'Instrument Serif', serif"; g.fillText("from natural oils",cxp,ly+lh*.6);
      g.strokeStyle="rgba(131,73,45,.6)"; g.lineWidth=Math.max(1,lw*.008); g.beginPath(); g.moveTo(lx+lw*.25,ly+lh*.68); g.lineTo(lx+lw*.75,ly+lh*.68); g.stroke();
      g.fillStyle="rgba(32,52,22,.85)"; g.font="600 "+Math.round(lw*.06)+"px 'Readex Pro', sans-serif";
      g.fillText("Made with love in Jordan",cxp,ly+lh*.76); g.fillText("@olga.jo11",cxp,ly+lh*.84);
      // barcode
      var bw=lw*.34, bx=cxp-bw/2, by=ly+lh*.885, bh=lh*.05; g.fillStyle="#1B2317";
      for(var i=0,xx=bx;xx<bx+bw;i++){ var w2=(i*7%3+1)*lw*.0045; if(i%2===0) g.fillRect(xx,by,w2,bh); xx+=w2; }
    }
    var t=new T.CanvasTexture(c); t.encoding=T.sRGBEncoding; t.anisotropy=maxAniso||8; return t;
  }

  /* ---- one bottle: lathe solid from the silhouette, oval section, photo-projected UVs ---- */
  function bottle(key,maxAniso){
    if(cache[key]) return cache[key];
    var sp=SPEC[key];
    return cache[key]=loadImg(CUT[sp.cut||key]).then(function(im){
      var A=analyse(im), hpx=A.bot-A.top, u=sp.h/hpx, yc=(A.top+A.bot)/2, pts=[], step=Math.max(1,Math.round(hpx/240));
      pts.push(new T.Vector2(0.0005,(yc-A.bot)*u));
      for(var y=A.bot;y>=A.top;y-=step) pts.push(new T.Vector2(Math.max(A.rad[y]*u,0.0005),(yc-y)*u));
      pts.push(new T.Vector2(0.0005,(yc-A.top)*u));
      function half(front){
        var geo=new T.LatheGeometry(pts,56,front?-Math.PI/2:Math.PI/2,Math.PI);
        geo.scale(1,1,sp.depth);
        var p=geo.attributes.position, uv=geo.attributes.uv;
        for(var i=0;i<p.count;i++){ var px=A.cx+p.getX(i)/u*(front?1:-1), py=yc-p.getY(i)/u; uv.setXY(i,px/A.W,1-py/A.H); }
        uv.needsUpdate=true; return geo;
      }
      var tf=makeTex(A,im,sp,false,maxAniso), tb=makeTex(A,im,sp,true,maxAniso);
      var mat=function(t,front){ return new T.MeshPhysicalMaterial({map:t,emissive:0xffffff,emissiveMap:t,emissiveIntensity:front?.2:.12,roughness:.26,metalness:0,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.05}); };
      var grp=new T.Group();
      grp.add(new T.Mesh(half(true),mat(tf,true)));
      grp.add(new T.Mesh(half(false),mat(tb,false)));
      if(A.spout){
        var S=A.spout, r=S.th/2*u, x0=S.stem*u*.6, x1=S.len*u, L=Math.max(.02,x1-x0-r*2);
        var sg=new T.CapsuleGeometry(r,L,6,16); sg.rotateZ(Math.PI/2); sg.scale(1,1,1.15);
        var sm=new T.Mesh(sg,new T.MeshPhysicalMaterial({color:0x0c0c0b,roughness:.32,metalness:0,clearcoat:.9,clearcoatRoughness:.15}));
        sm.position.set(S.dir*(x0+r+L/2),(yc-S.y)*u,0); grp.add(sm);
      }
      grp.userData={h:sp.h,r:A.maxR*u};
      grp.position.y=sp.h/2; // bottom sits on y=0
      var wrap=new T.Group(); wrap.add(grp); wrap.userData={h:sp.h,r:A.maxR*u,d:sp.depth};
      return wrap;
    });
  }
  function shadowPlane(w,d){
    if(!shadowTex){ var c=document.createElement("canvas"); c.width=c.height=256; var g=c.getContext("2d"), gr=g.createRadialGradient(128,128,0,128,128,128);
      gr.addColorStop(0,"rgba(18,10,6,.62)"); gr.addColorStop(.45,"rgba(18,10,6,.3)"); gr.addColorStop(1,"rgba(18,10,6,0)"); g.fillStyle=gr; g.fillRect(0,0,256,256); shadowTex=new T.CanvasTexture(c); }
    var m=new T.Mesh(new T.PlaneGeometry(w,d),new T.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false,toneMapped:false}));
    m.rotation.x=-Math.PI/2; m.position.y=.002; m.renderOrder=-1; return m;
  }
  /* ---- a product = one bottle, or a set assembled from bottles ---- */
  function product(id,maxAniso){
    var root=new T.Group(), spin=new T.Group(); root.add(spin);
    var parts=SETS[id]||(SPEC[id]?[{b:id,x:0,z:0,ry:0}]:null);
    if(!parts) return Promise.reject(new Error("no model"));
    return Promise.all(parts.map(function(pt){ return bottle(pt.b,maxAniso); })).then(function(tpls){
      var maxH=0, ext=0, xmin=1e9,xmax=-1e9,zmin=1e9,zmax=-1e9;
      tpls.forEach(function(tp,i){ var pt=parts[i], o=tp.clone(); o.position.set(pt.x,0,pt.z); o.rotation.y=pt.ry; spin.add(o);
        var r=tp.userData.r; maxH=Math.max(maxH,tp.userData.h); xmin=Math.min(xmin,pt.x-r); xmax=Math.max(xmax,pt.x+r); zmin=Math.min(zmin,pt.z-r*tp.userData.d); zmax=Math.max(zmax,pt.z+r*tp.userData.d);
        ext=Math.max(ext,Math.hypot(Math.abs(pt.x)+r,Math.abs(pt.z)+r*tp.userData.d)); });
      var sw=(xmax-xmin)*1.9+.6, sd=(zmax-zmin)*1.9+.9; spin.add(shadowPlane(Math.max(sw,sd*.8),Math.max(sd,sw*.45)));
      root.userData={h:maxH,ext:ext,set:!!SETS[id]};
      root.userData.spin=spin;
      return root;
    });
  }
  /* ---- studio lighting + reflections ---- */
  function studio(renderer,scene){
    var pm=new T.PMREMGenerator(renderer), s=new T.Scene(); s.background=new T.Color(0x16140f);
    function panel(w,h,x,y,z,col){ var m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:col,side:T.DoubleSide})); m.position.set(x,y,z); m.lookAt(0,0,0); s.add(m); }
    panel(5,12,-7,2,5,new T.Color(6,5.6,5));      // big key softbox
    panel(2.2,12,7.5,1,3,new T.Color(4,4,3.8));   // strip light → long vertical highlight
    panel(12,4,0,9,0,new T.Color(2.2,2.1,1.9));   // top
    panel(6,8,2,1,-9,new T.Color(2.4,1.8,.9));    // warm gold back
    panel(8,3,0,-6,4,new T.Color(.5,.6,.35));     // olive bounce
    scene.environment=pm.fromScene(s,.03).texture; pm.dispose();
    scene.add(new T.HemisphereLight(0xfff4e0,0x3a2a14,.45));
    var key=new T.DirectionalLight(0xffffff,1.25); key.position.set(3,5,6); scene.add(key);
    var rim=new T.DirectionalLight(0xffe2a8,1.5); rim.position.set(-5,3,-5); scene.add(rim);
    var fill=new T.DirectionalLight(0xd8f08a,.3); fill.position.set(-4,-1,4); scene.add(fill);
  }
  function makeRenderer(canvas,opts){
    var r=new T.WebGLRenderer(Object.assign({canvas:canvas,antialias:true,alpha:true,powerPreference:"high-performance"},opts||{}));
    r.setClearColor(0x000000,0); r.outputEncoding=T.sRGBEncoding; r.toneMapping=T.ACESFilmicToneMapping; r.toneMappingExposure=1.05;
    return r;
  }
  function fit(cam,model,aspect,margin){
    var u=model.userData, t=Math.tan(cam.fov*Math.PI/360);
    var dh=(u.h*.5*margin)/t, dw=(u.ext*margin)/(t*aspect);
    return {dist:Math.max(dh,dw)+u.ext*.6, y:u.h*.5};
  }
  return {T:T,product:product,studio:studio,makeRenderer:makeRenderer,fit:fit,has:function(k){return !!(SETS[k]||SPEC[k]);}};
})();

var o3d=$("#o3d"), oStage=$("#o3dStage"), oCur=null, oQty=1, oSpin=true;
var V={ready:false};
function v3dInit(){
  if(V.ready||V.failed) return;
  var cv=document.createElement("canvas"); cv.className="o3d__cv"; oStage.insertBefore(cv,$("#o3dLoad"));
  V.cv=cv;
  if(!P3D){ V.failed=true; return; }
  try{ V.r=P3D.makeRenderer(cv); }catch(e){ V.failed=true; cv.remove(); return; }
  var T=P3D.T; V.T=T; V.scene=new T.Scene(); P3D.studio(V.r,V.scene); V.cam=new T.PerspectiveCamera(26,1,.1,100);
  V.aniso=V.r.capabilities.getMaxAnisotropy();
  V.models={}; V.model=null; V.ry=0; V.rx=.08; V.try=0; V.trx=.08; V.vel=0; V.zoom=1; V.tz=1; V.drag=false; V.idle=0; V.ready=true;
  var lx=0, ly=0, pinch=0, pts={};
  cv.addEventListener("pointerdown",function(e){ pts[e.pointerId]=[e.clientX,e.clientY]; V.drag=true; V.vel=0; lx=e.clientX; ly=e.clientY; try{cv.setPointerCapture(e.pointerId)}catch(_){} });
  cv.addEventListener("pointermove",function(e){
    if(!V.drag||!pts[e.pointerId]) return; pts[e.pointerId]=[e.clientX,e.clientY];
    var ids=Object.keys(pts);
    if(ids.length===2){ var a=pts[ids[0]],b=pts[ids[1]],d=Math.hypot(a[0]-b[0],a[1]-b[1]); if(pinch) V.tz=Math.max(.7,Math.min(2,V.tz*d/pinch)); pinch=d; return; }
    var dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY;
    V.try+=dx*.011; V.vel=dx*.011; V.trx=Math.max(-.35,Math.min(.55,V.trx+dy*.006)); V.idle=performance.now();
  });
  var up=function(e){ delete pts[e.pointerId]; if(Object.keys(pts).length<2) pinch=0; if(!Object.keys(pts).length){ V.drag=false; V.idle=performance.now(); } };
  cv.addEventListener("pointerup",up); cv.addEventListener("pointercancel",up);
  cv.addEventListener("wheel",function(e){ e.preventDefault(); V.tz=Math.max(.7,Math.min(2,V.tz-e.deltaY*.0015)); },{passive:false});
  cv.addEventListener("dblclick",function(){ V.tz=V.tz>1.15?1:1.6; });
  new ResizeObserver(v3dSize).observe(oStage);
}
function v3dSize(){
  if(!V.ready) return; var w=oStage.clientWidth, h=oStage.clientHeight; if(!w||!h) return;
  V.r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)); V.r.setSize(w,h,false); V.cam.aspect=w/h; V.cam.updateProjectionMatrix();
  if(V.model){ var f=P3D.fit(V.cam,V.model,w/h,V.model.userData.set?1.12:1.28); V.fd=f.dist; V.fy=f.y; }
}

function v3dShow(key,flatSrc){
  var load=$("#o3dLoad"), flat=$(".o3d__flat",oStage);
  var can=!V.failed && P3D && P3D.has(key);
  if(!can){
    if(V.cv) V.cv.style.display="none";
    if(V.models) Object.keys(V.models).forEach(function(k){ V.models[k].visible=false; }); V.model=null;
    if(!flat){ flat=document.createElement("img"); flat.className="o3d__flat"; flat.alt=""; oStage.insertBefore(flat,load); }
    flat.style.display=""; flat.src=flatSrc; load.style.display="none"; return;
  }
  if(flat) flat.style.display="none"; V.cv.style.display="";
  if(V.model) V.model.visible=false;
  V.ry=V.try=-.5; V.rx=V.trx=.08; V.vel=0; V.zoom=.82; V.tz=1; V.idle=0;
  var have=V.models[key];
  load.textContent=t("preparing"); load.style.display=have?"none":"grid";
  (have?Promise.resolve(have):P3D.product(key,V.aniso)).then(function(m){
    if(!V.models[key]){ V.models[key]=m; V.scene.add(m); }
    if(oKey!==key) return;
    Object.keys(V.models).forEach(function(k){ V.models[k].visible=(k===key); });
    V.model=m; v3dSize(); load.style.display="none";
  }).catch(function(){ load.textContent=t("no3d"); });
}
var oRaf=0, oLast=0;
function o3dLoop(now){
  oRaf=requestAnimationFrame(o3dLoop);
  if(!V.ready||!V.model) return;
  var dt=oLast?Math.min(.05,(now-oLast)/1000):1/60; oLast=now;
  if(!V.drag){ V.vel*=Math.pow(.93,dt*60); V.try+=V.vel; if(oSpin && !reduced && now-V.idle>2200) V.try+=dt*.5; }
  var k=1-Math.pow(1-.12,dt*60);
  V.ry+=(V.try-V.ry)*k; V.rx+=(V.trx-V.rx)*k; V.zoom+=(V.tz-V.zoom)*(1-Math.pow(.8,dt*60));
  var sp=V.model.userData.spin; sp.rotation.y=V.ry; V.model.rotation.x=V.rx*.35; sp.position.y=reduced?0:Math.sin(now/950)*.04;
  V.cam.position.set(0,V.fy*(1.1+V.rx*.9),V.fd/V.zoom); V.cam.lookAt(0,V.fy*.95,0);
  V.r.render(V.scene,V.cam);
}

var oKey=null;
function fill3DInfo(){
  var p=oCur, v=curVar(p);
  $("#o3dTag").textContent=L(p.badge)+" · "+L(v.size); $("#o3dName").textContent=L(p.name); $("#o3dPrice").innerHTML=money(v.price); $("#o3dPrice").setAttribute("data-price",p.id);
  $("#o3dSizes").outerHTML=sizesHTML(p,"o3d").replace('class="sizes"','class="sizes" id="o3dSizes"');
  $("#o3dDesc").textContent=L(p.desc); $("#o3dQty").textContent=oQty;
  $("#o3dPoints").innerHTML=L(p.points).map(function(x){ return '<li>'+ICO.check+x+'</li>'; }).join("");
  $("#o3dAdd").textContent=t("addBag"); $("#o3dSpin").textContent=oSpin?t("pauseRot"):t("autoRot"); $("#o3dDetails").textContent=t("fullDetails");
}
function switch3D(){ if(!oCur) return; var v=curVar(oCur); oKey=v.id; fill3DInfo(); v3dShow(v.id,CUT[v.cut]); }
function open3D(pid){
  var p=byId[pid]; if(!p) return; oCur=p; oQty=1; closeQuick();
  v3dInit(); fill3DInfo();
  o3d.classList.add("is-open"); o3d.setAttribute("aria-hidden","false"); lockScroll(true);
  var v=curVar(p); oKey=v.id; v3dShow(v.id,CUT[v.cut]); setTimeout(v3dSize,30);
  cancelAnimationFrame(oRaf); oLast=0; oRaf=requestAnimationFrame(o3dLoop);
  setTimeout(function(){ var c=$("#o3dClose"); c&&c.focus({preventScroll:true}); },60);
}
function close3D(){if(window.OLH_quiet)OLH_quiet();
  if(!o3d.classList.contains("is-open")) return;
  o3d.classList.remove("is-open"); o3d.setAttribute("aria-hidden","true"); lockScroll(false);
  setTimeout(function(){ if(!o3d.classList.contains("is-open")) cancelAnimationFrame(oRaf); },500);
}
$("#o3dClose").addEventListener("click",close3D);
o3d.addEventListener("click",function(e){ if(e.target===o3d) close3D(); });
$("#o3dInc").addEventListener("click",function(){ oQty=Math.min(20,oQty+1); $("#o3dQty").textContent=oQty; });
$("#o3dDec").addEventListener("click",function(){ oQty=Math.max(1,oQty-1); $("#o3dQty").textContent=oQty; });
$("#o3dAdd").addEventListener("click",function(e){ if(!oCur) return; addToBag(curVar(oCur).id,oQty,e.currentTarget); setTimeout(close3D,280); });
$("#o3dSpin").addEventListener("click",function(e){ oSpin=!oSpin; e.currentTarget.textContent=oSpin?t("pauseRot"):t("autoRot"); });
$("#o3dDetails").addEventListener("click",function(){ var id=oCur&&oCur.id; close3D(); if(id) setTimeout(function(){ openQuick(id); },320); });
window.addEventListener("keydown",function(e){ if(!o3d.classList.contains("is-open")||!V.ready) return; if(e.key==="ArrowLeft"){ V.try-=.6; V.idle=performance.now(); } if(e.key==="ArrowRight"){ V.try+=.6; V.idle=performance.now(); } });
document.addEventListener("keydown",function(e){ if(e.key==="Escape"){ close3D(); closeQuick(); closeBag(); closeMenu(); } });

/* ======================= CONTACT ======================= */
$("#contactForm").addEventListener("submit",function(e){
  e.preventDefault();
  var n=$("#cName"), m=$("#cMsg"), ok=true;
  [n,m].forEach(function(i){ var v=i.value.trim().length>1; i.parentNode.classList.toggle("bad",!v); if(!v) ok=false; });
  if(!ok){ (n.value.trim().length>1?m:n).focus(); return; }
  var msg=(LANG==="ar"?"مرحبًا أولغا 🌿":"Hello Olga 🌿")+"\n\n"+m.value.trim()+"\n\n— "+n.value.trim()+($("#cPhone").value.trim()?" ("+$("#cPhone").value.trim()+")":"");
  window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank","noopener");
  e.target.reset();
});

/* ======================= SCROLL-LINKED FX ======================= */
var parEls=[], contactBg=$("#contactBg");
function updateStory(){
  if(!sWords.length) return;
  if(!(sy+vh>LY.storyTop-200 && sy<LY.storyTop+LY.storyH+200)) return;
  var top=LY.storyTop-sy, p=clamp((vh*0.86-top)/(LY.storyH+vh*0.4),0,1), lit=Math.round(p*sWords.length);
  if(lit===litN) return;
  var a=litN<0?0:Math.min(lit,litN), b=litN<0?sWords.length:Math.max(lit,litN);
  for(var i=a;i<b;i++) sWords[i].classList.toggle("on",i<lit);
  litN=lit;
}
function updateParallax(){
  parEls.forEach(function(o){
    if(sy+vh>o.top && sy<o.top+o.h){ var c=((o.top+o.h/2)-(sy+vh/2))/vh; o.el.style.transform="translate3d(0,"+(c*o.k).toFixed(2)+"%,0)"; }
  });
  if(sy+vh>LY.contactTop && sy<LY.contactTop+LY.contactH) contactBg.style.transform="translate3d(0,"+(((LY.contactTop-sy)/vh)*-6).toFixed(2)+"%,0)";
}
var spreadTops=[];
function updateSpreads(){
  if(!SPREADS.length) return;
  if(!(sy+vh>LY.spTop && sy<LY.spTop+LY.spH)) return;
  var stack=!reduced && (vw>1000 ? vh>640 : (vh>=vw && vh>=520)); /* phones & tablets in portrait stack too */
  for(var i=0;i<SPREADS.length;i++){
    var s=SPREADS[i], r=s.el.getBoundingClientRect();
    // parallax of bottles & photo while the page arrives
    var enter=clamp(1-(r.top-80)/vh,0,1), e3=1-Math.pow(1-enter,3);
    if(s.bottles) s.bottles.style.transform="translate3d(0,"+((1-e3)*14).toFixed(2)+"%,0)";
    if(s.bg) s.bg.style.transform="translate3d(0,"+((1-enter)*-6).toFixed(2)+"%,0) scale("+(1.08-0.08*e3).toFixed(4)+")";
    if(!stack){ s.el.style.transform=""; s.dim.style.opacity=0; continue; }
    var nx=SPREADS[i+1];
    if(nx){
      var nr=nx.el.getBoundingClientRect(), H=r.height||1;
      var cover=clamp(1-(nr.top-r.top)/H,0,1);
      s.el.style.transform="scale("+(1-cover*0.06).toFixed(4)+") translate3d(0,"+(-cover*2).toFixed(2)+"%,0)";
      s.dim.style.opacity=(cover*0.45).toFixed(3);
    }
  }
}

/* ======================= CURSOR & MAGNETIC ======================= */
if(window.matchMedia("(hover:hover) and (pointer:fine)").matches && !reduced){
  var cur=$(".cursor"), dot=$(".cursor__dot"), ring=$(".cursor__ring"), mx=-100,my=-100,rx=-100,ry=-100, crun=false, cHover=false;
  dot.style.transform=ring.style.transform="translate3d(-100px,-100px,0)";
  var rl=function(){ rx=lerp(rx,mx,0.24); ry=lerp(ry,my,0.24); ring.style.transform="translate3d("+rx.toFixed(1)+"px,"+ry.toFixed(1)+"px,0)"; if(Math.abs(rx-mx)+Math.abs(ry-my)>0.4) requestAnimationFrame(rl); else crun=false; };
  window.addEventListener("pointermove",function(e){ mx=e.clientX; my=e.clientY; dot.style.transform="translate3d("+mx+"px,"+my+"px,0)"; if(!crun){ crun=true; requestAnimationFrame(rl); } },{passive:true});
  document.addEventListener("pointerover",function(e){ var h=!!(e.target.closest&&e.target.closest("a,button,.pcard__stage,.reel,select,input")); if(h!==cHover){ cHover=h; cur.classList.toggle("is-hover",h); } });
  document.addEventListener("pointermove",function(e){
    var b=e.target.closest&&e.target.closest(".btn:not(.btn--block),.round-btn,.fab"); 
    $$(".is-mag").forEach(function(x){ if(x!==b){ x.style.transform=""; x.classList.remove("is-mag"); } });
    if(!b) return; var r=b.getBoundingClientRect(), x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
    b.classList.add("is-mag"); b.style.transform="translate3d("+(x*0.18).toFixed(1)+"px,"+(y*0.28).toFixed(1)+"px,0)";
  },{passive:true});
} else { var c0=$(".cursor"); c0&&c0.remove(); }

/* ======================= FRAME LOOP ======================= */
var lastT=0, ticking=false;
function kick(){ if(!ticking){ ticking=true; requestAnimationFrame(frame); } }
function frame(time){
  ticking=false;
  DT=lastT?clamp((time-lastT)/1000,0.001,0.05):1/60; lastT=time;
  sy=window.scrollY;
  var busy=updateHero();
  busy=updateEssence()||busy;
  updateStory(); updateParallax(); updateSpreads();
  if(busy) kick(); else lastT=0;
}
function measure(){
  vh=window.innerHeight; vw=window.innerWidth; sy=window.scrollY;
  var top=function(el){ return el.getBoundingClientRect().top+sy; };
  LY.heroTop=top(hero); LY.heroH=hero.offsetHeight;
  LY.essTop=top(ess); LY.essH=ess.offsetHeight;
  LY.storyTop=top(storyText); LY.storyH=storyText.offsetHeight;
  var ct=contactBg.parentNode; LY.contactTop=top(ct); LY.contactH=ct.offsetHeight;
  var spEl=$("#line"); LY.spTop=top(spEl); LY.spH=spEl.offsetHeight;
  parEls=$$("[data-par]").map(function(el){ var b=el.parentNode; return {el:el,k:+el.getAttribute("data-par"),top:top(b),h:b.offsetHeight}; });
  heroLastP=-1; essLast=-1; litN=-1;
  kick();
}
var mt=0; function remeasure(){ clearTimeout(mt); mt=setTimeout(measure,120); }
window.addEventListener("scroll",function(){ kick(); updateNav(); },{passive:true});
window.addEventListener("resize",function(){ sizeHero(); updateReels(); remeasure(); });
if(window.ResizeObserver) new ResizeObserver(remeasure).observe(document.querySelector("main"));
window.addEventListener("load",measure);
var offIO=new IntersectionObserver(function(es){ es.forEach(function(e){ e.target.classList.toggle("is-off",!e.isIntersecting); }); },{rootMargin:"160px 0px"});
$$("[data-live]").forEach(function(s){ offIO.observe(s); });

/* ======================= INIT ======================= */
applyLang(LANG);
lazy(document);
observeReveal(document);
sizeHero(); measure(); renderBadge(); renderBag(); updateNav();
if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ initSoap(); measure(); }); } else initSoap();
})();
;

/* ===== <script id="olga-motion"> — block 4, original order ===== */
/* =====================================================================
   OLGA v8 · Motion engine — scroll-linked effects tuned for phones first.
   Only transform / opacity / CSS variables are touched (GPU-friendly), every
   listener is passive, nothing hijacks the native scroll, and everything turns
   itself off for "reduce motion" users.
   ===================================================================== */
(function(){
"use strict";
var A=window.OLGA||{}, IMG=A.IMG||{};
if(IMG.card_stage) document.documentElement.style.setProperty("--stage",'url("'+IMG.card_stage+'")');
var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var vh=innerHeight, vw=innerWidth, mob=vw<=760, lastY=scrollY, vel=0, skew=0, raf=0;
var prog=$("#sprog"), marq=$("#marqSkew"), ftWord=$("#ftWord");
var speedEls=[], riseEls=[], atHero=null;
document.documentElement.classList.toggle("at-hero",scrollY<innerHeight*0.55);

/* stagger: cards/tiles enter one after another, per visual row on phones */
function cols(el){ var s=getComputedStyle(el).gridTemplateColumns; return s&&s!=="none"?s.split(" ").length:1; }
function stagger(root){
  if(!root) return; var c=cols(root);
  Array.prototype.forEach.call(root.children,function(ch,i){ ch.style.setProperty("--i",c>1?(i%c):Math.min(i,1)); });
}
["#grid",".bento",".mvv",".contact__grid"].forEach(function(s){ var el=$(s); stagger(el); if(el&&window.MutationObserver) new MutationObserver(function(){ stagger(el); }).observe(el,{childList:true}); });
addEventListener("resize",function(){ ["#grid",".bento",".mvv",".contact__grid"].forEach(function(s){ stagger($(s)); }); },{passive:true});

/* sections that rise and unfold as they enter */
function collect(){
  vh=innerHeight; vw=innerWidth; mob=vw<=760;
  speedEls=$$("[data-speed]").map(function(el){ return {el:el,k:+el.getAttribute("data-speed")}; });
  riseEls=$$(".reels,.contact .contact__grid,.essence__head").map(function(el){ return {el:el}; });
}
function frame(){
  raf=0;
  var y=scrollY, dy=y-lastY; lastY=y;
  vel=vel*0.82+dy*0.18;
  var doc=document.documentElement.scrollHeight-vh;
  var ah=y<vh*0.55; if(ah!==atHero){ atHero=ah; document.documentElement.classList.toggle("at-hero",ah); }
  if(prog) prog.style.setProperty("--p",clamp(y/Math.max(1,doc),0,1).toFixed(4));
  if(!reduced){
    /* marquee leans with your scroll speed */
    var target=clamp(-vel*(mob?0.12:0.08),-9,9); skew+= (target-skew)*0.25;
    if(marq) marq.style.setProperty("--skew",skew.toFixed(2)+"deg"), marq.style.transform="skewX("+skew.toFixed(2)+"deg)";
    /* soft parallax */
    var SR=[], RR=[], i, j;
    for(i=0;i<speedEls.length;i++) SR[i]=speedEls[i].el.getBoundingClientRect();
    for(j=0;j<riseEls.length;j++) RR[j]=riseEls[j].el.getBoundingClientRect();
    var FR=ftWord?ftWord.getBoundingClientRect():null;
    for(i=0;i<speedEls.length;i++){ var o=speedEls[i], r=SR[i];
      if(r.bottom<-200||r.top>vh+200) continue;
      var c=(r.top+r.height/2-vh/2)*o.k*(mob?.55:1), cs="translate3d(0,"+c.toFixed(1)+"px,0)"; if(o.last!==cs){ o.last=cs; o.el.style.transform=cs; } }
    /* rise & unfold */
    for(j=0;j<riseEls.length;j++){ var e=riseEls[j].el, rr=RR[j];
      if(rr.top>vh*1.1||rr.bottom<0){ continue; }
      var p=clamp((vh-rr.top)/(vh*(mob?.55:.75)),0,1), ez=1-Math.pow(1-p,3);
      e.style.transform=p>=1?"":"translate3d(0,"+((1-ez)*(mob?40:80)).toFixed(1)+"px,0) scale("+(0.94+0.06*ez).toFixed(4)+")";
      e.style.opacity=p>=1?"":(0.35+0.65*ez).toFixed(3); }
    /* the giant footer word slides across */
    if(ftWord){ var fr=FR; if(fr.top<vh&&fr.bottom>0){ var fp=clamp((vh-fr.top)/(vh+fr.height),0,1); ftWord.style.transform="translate3d("+((0.5-fp)*(mob?7:5)).toFixed(2)+"%,0,0)"; } }
  }
  if(Math.abs(vel)>0.15||Math.abs(skew)>0.05) raf=requestAnimationFrame(frame);
}
function kick(){ if(!raf) raf=requestAnimationFrame(frame); }
addEventListener("scroll",kick,{passive:true});
addEventListener("resize",function(){ collect(); kick(); },{passive:true});
addEventListener("load",function(){ collect(); kick(); });
collect(); kick();
})();
;

/* ===== <script id="olh-js"> — block 5, original order ===== */
(function(){
"use strict";
/* ===== SHAMS · Olga AI assistant =====
   Live AI + natural voice come from OLH_API (Lovable Cloud). If it is unreachable, Shams answers
   from the store facts below and speaks with the browser's own voice. */
var OLH_API=(window.OLGA_HALA_API||"https://project--7fabf78b-6b0b-4e94-acd2-5e6b844a6811.lovable.app/api/public/").replace(/\/?$/,"/");
var K=JSON.parse(document.getElementById("olh-knowledge").textContent);
var IMG=JSON.parse(document.getElementById("olh-img").textContent);
var $=function(i){return document.getElementById(i)};
var root=$("olh-root"),log=$("olh-log"),inp=$("olh-in"),typing=$("olh-typing"),bubble=$("olh-bubble"),cv=$("olh-canvas");
var WA=K.whatsapp, reduced=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var T={
 ar:{name:"شمس",sub:"مساعدتك الذكية في متجر أولغا · أونلاين",ph:"اكتبي سؤالك… مثلاً: شو بناسب البشرة الجافة؟",in:"رسالتك",
  hi:"يا هلا ومرحبا فيكِ! 🌿 أنا شمس من أولغا. بساعدك تختاري الصابون الطبيعي الأنسب إلك ولعيلتك، وبجاوبك عن الأسعار والطلب والتوصيل. كيف بقدر أساعدك؟",
  q:["شو بتنصحيني لبشرتي؟","الأسعار والأحجام","كيف بطلب؟","هدية مميزة","للأطفال والغسيل"],
  ask:"اسأليني 💬",thx:"شكراً شمس 🤍",hello:"أهلاً وسهلاً! أنا شمس 🌿 لابسة ثوب بلادي وجاهزة أساعدك تختاري من منتجات أولغا الطبيعية.",
  view:"عرض المنتج",wa:"اطلبي عبر واتساب",fb:"هاي المعلومة بيأكدها فريق أولغا مباشرة على واتساب 🤍",
  err:"صار خلل بسيط بالاتصال، فجاوبتك من معلومات المتجر:",lang:"EN",voiceOn:"تشغيل الصوت",voiceOff:"كتم الصوت",clr:"محادثة جديدة",min:"تصغير",mic:"تحدثي مع شمس",send:"إرسال",hide:"إخفاء شمس",open:"تحدثي مع شمس",tap:"اضغطي على شمس لتتحدث معك",hear:"اضغطي لتسمعي صوتي"},
 en:{name:"Shams",sub:"Your Olga shopping assistant · online",ph:"Ask me… e.g. what suits dry skin?",in:"Your message",
  hi:"Hello and welcome! 🌿 I’m Shams from Olga. I’ll help you choose the right natural soap for you and your family, and answer anything about prices, ordering and delivery. How can I help?",
  q:["What suits my skin?","Prices & sizes","How do I order?","A special gift","For kids & laundry"],
  ask:"Ask me 💬",thx:"Thanks, Shams 🤍",hello:"Welcome! I’m Shams 🌿 dressed in my Palestinian thobe and here to help you pick from Olga’s natural products.",
  view:"View product",wa:"Order on WhatsApp",fb:"The Olga team confirms that directly on WhatsApp 🤍",
  err:"There was a small connection issue, so I answered from the store information:",lang:"ع",voiceOn:"Turn voice on",voiceOff:"Mute voice",clr:"New chat",min:"Minimize",mic:"Talk to Shams",send:"Send",hide:"Hide Shams",open:"Chat with Shams",tap:"Tap Shams to talk",hear:"Tap to hear me"}
};
var TOUR={"hero": [{"g": "wave"}, {"g": "open"}, {"g": "present"}], "purity": [{"g": "open"}, {"g": "count"}, {"g": "present"}], "shop": [{"g": "present"}, {"g": "count"}, {"g": "open"}, {"g": "wave"}], "line": [{"g": "present"}, {"g": "count"}, {"g": "open"}], "essence": [{"g": "open"}, {"g": "count"}, {"g": "present"}], "why": [{"g": "open"}, {"g": "count"}, {"g": "present"}], "about": [{"g": "present"}, {"g": "open"}, {"g": "count"}], "reels": [{"g": "present"}, {"g": "wave"}], "faq": [{"g": "open"}, {"g": "present"}], "contact": [{"g": "present"}, {"g": "open"}, {"g": "wave"}]};
var LINES={"t.hero.0": {"g": "wave", "ar": "يا هلا ومرحبا فيكِ! أنا شمس، وأهلاً بكِ في عالم أولغا.", "en": "Hello and welcome! I'm Shams, and this is the world of Olga."}, "t.hero.1": {"g": "open", "ar": "منتجات طبيعية مستخلصة من زيت الزيتون والغار وزبدة الشيا والزيوت المغربية، مصنوعة في الأردن بكل حب.", "en": "Natural products extracted from olive oil, laurel, shea butter and Moroccan oils, lovingly made in Jordan."}, "t.hero.2": {"g": "present", "ar": "خليني آخذك بجولة سريعة، وكل ما توصلي لقسم جديد، بشرحلك عنه.", "en": "Let me take you on a quick tour. Each time you reach a new section, I'll tell you all about it."}, "t.purity.0": {"g": "open", "ar": "هون وعد أولغا: نقاء الطبيعة في كل لمسة.", "en": "This is Olga's promise: the purity of nature in every touch."}, "t.purity.1": {"g": "count", "ar": "منتجاتنا للعناية الشخصية والمنزلية، طبيعية المصدر بنسبة تسعة وتسعين بالمية.", "en": "Our personal and home care products are ninety-nine percent naturally derived."}, "t.purity.2": {"g": "present", "ar": "من قلب الأردن، لكل بيت بدوّر على النقاء.", "en": "From the heart of Jordan, to every home that seeks purity."}, "t.shop.0": {"g": "present", "ar": "وهون المتجر! بتلاقي فيه كل منتجات أولغا مع أسعارها.", "en": "And here's the shop, with every Olga product and its price."}, "t.shop.1": {"g": "count", "ar": "فيكِ تختاري حسب النوع: للأيدي والاستحمام، غسيل الملابس، الحمّام المغربي، أو المجموعات.", "en": "You can filter by type: hand and shower, laundry, Moroccan hammam, or gift sets."}, "t.shop.2": {"g": "open", "ar": "اختاري الحجم، اضغطي أضف، وابعتي طلبك على واتساب، وفريقنا بيأكد معك التوصيل.", "en": "Choose a size, tap Add, and send your order on WhatsApp. Our team confirms delivery with you."}, "t.shop.3": {"g": "wave", "ar": "وإذا محتارة شو تختاري، اسأليني وأنا بساعدك.", "en": "And if you're not sure what to pick, just ask me. I'm happy to help."}, "t.line.0": {"g": "present", "ar": "هاي مجموعة أولغا، كل تركيبة صفحة بصفحة، متل الكتالوج.", "en": "This is the Olga line. Every formula, page by page, like a catalogue."}, "t.line.1": {"g": "count", "ar": "صابون النابلسي السائل بزيت الزيتون، والشيا للترطيب العميق، والغار المطهّر للبشرة الحساسة.", "en": "Nabulsi liquid soap with olive oil, shea for deep moisture, and purifying laurel for sensitive skin."}, "t.line.2": {"g": "open", "ar": "وكمان صابون الغسيل النابلسي لملابس العيلة، وصابون الحمّام المغربي لطقس تنظيف عميق.", "en": "Plus Nabulsi laundry soap for the family's clothes, and Moroccan hammam soap for a deep cleansing ritual."}, "t.essence.0": {"g": "open", "ar": "هاد هو الجوهر: أربع هدايا من الطبيعة.", "en": "This is our essence: four gifts from nature."}, "t.essence.1": {"g": "count", "ar": "زيت الزيتون النقي، قلب الصابون النابلسي، وزيت الغار المطهّر والمهدّئ.", "en": "Pure olive oil, the heart of Nabulsi soap, and soothing, purifying laurel oil."}, "t.essence.2": {"g": "present", "ar": "وزبدة الشيا للترطيب العميق، والزيوت المغربية لإشراقة ونعومة البشرة.", "en": "Shea butter for deep moisture, and Moroccan oils for radiant, soft skin."}, "t.why.0": {"g": "open", "ar": "ليش أولغا؟ لأنها عناية طبيعية بلا تنازلات.", "en": "Why Olga? Because it's natural care, with no compromises."}, "t.why.1": {"g": "count", "ar": "آمنة للبشرة الحساسة ولكل العيلة حتى الأطفال، وبدون سلفات أو بارابين.", "en": "It's safe for sensitive skin and the whole family, even children, with no sulfates or parabens."}, "t.why.2": {"g": "present", "ar": "صديقة للبيئة، بجودة مهنية، ومن تصنيع شركة باتل في الأردن.", "en": "Eco-friendly, professional quality, and made by BatteL Natural Industries in Jordan."}, "t.about.0": {"g": "present", "ar": "هاي قصتنا: أولغا من شركة باتل للصناعات الطبيعية، شركة أردنية رائدة.", "en": "Our story: Olga comes from BatteL Natural Industries, a leading Jordanian company."}, "t.about.1": {"g": "open", "ar": "بنمزج الابتكار العلمي مع التراث الطبيعي الأصيل.", "en": "We blend scientific innovation with authentic natural heritage."}, "t.about.2": {"g": "count", "ar": "ورؤيتنا نكون الاسم الأول بالعالم العربي في الصناعات الطبيعية.", "en": "And our vision is to be the leading name in natural industries across the Arab world."}, "t.reels.0": {"g": "present", "ar": "وهون فيديوهاتنا من إنستغرام، شوفي منتجاتنا وهي بتشتغل.", "en": "Here are our Instagram reels. See our products in action."}, "t.reels.1": {"g": "wave", "ar": "تابعينا على إنستغرام، ليوصلك كل جديد.", "en": "Follow us on Instagram to catch everything new."}, "t.faq.0": {"g": "open", "ar": "عندك سؤال؟ هون الأسئلة الأكثر تكراراً مع أجوبتها.", "en": "Got a question? Here are the most common ones, with their answers."}, "t.faq.1": {"g": "present", "ar": "وإذا ما لقيتي جوابك، اكتبيلي وبجاوبك فوراً.", "en": "And if you don't find your answer, just write to me and I'll reply right away."}, "t.contact.0": {"g": "present", "ar": "للطلبات والاستفسارات، تواصلي معنا على واتساب، وفريقنا جاهز يخدمك.", "en": "For orders and questions, message us on WhatsApp. Our team is ready to help."}, "t.contact.1": {"g": "open", "ar": "ولطلبات الجملة، تواصلي مع شركة باتل مباشرة.", "en": "For wholesale, contact BatteL directly."}, "t.contact.2": {"g": "wave", "ar": "شكراً إنك زرتينا، وأنا هون إذا احتجتي أي إشي.", "en": "Thank you for visiting. I'm right here whenever you need me."}, "x.back": {"g": "wave", "ar": "أهلاً فيكِ من جديد! مبسوطة كتير إنك رجعتي.", "en": "Welcome back! So glad to see you again."}, "x.thanks": {"g": "wave", "ar": "العفو يا قلبي، أنا هون إذا احتجتيني.", "en": "You're very welcome. I'm here if you need me."}, "x.add1": {"g": "open", "ar": "يا سلام، اختيار موفّق!", "en": "Lovely choice!"}, "x.add2": {"g": "present", "ar": "تمام! صار بالسلة.", "en": "Done! It's in your bag."}, "x.chat": {"g": "open", "ar": "تفضلي، اسأليني أي إشي.", "en": "Go ahead, ask me anything."}, "r.hi": {"g": "open", "ar": "يا هلا ومرحبا فيكِ! أنا شمس من أولغا. بساعدك تختاري الصابون الطبيعي الأنسب إلك ولعيلتك، وبجاوبك عن الأسعار والطلب والتوصيل. كيف بقدر أساعدك؟", "en": "Hello and welcome! I'm Shams from Olga. I'll help you choose the right natural soap for you and your family, and answer anything about prices, ordering and delivery. How can I help?"}, "r.dry": {"g": "present", "ar": "للبشرة الجافة بنصحك بصابون الشيا السائل، بيرطب بعمق وبيحمي من الجفاف.", "en": "For dry skin I recommend the Shea Butter Liquid Soap. Deep moisture and protection from dryness."}, "r.oily": {"g": "present", "ar": "صابون الغار السائل مطهّر ومهدّئ ومناسب لكل أنواع البشرة، وكل منتجاتنا بدون سلفات أو بارابين وآمنة للبشرة الحساسة.", "en": "Liquid Laurel Soap is purifying and soothing for all skin types, and all our products are sulfate and paraben free, safe for sensitive skin."}, "r.kids": {"g": "present", "ar": "صابون الغسيل النابلسي مثالي لملابس الأطفال، بيشيل البقع الصعبة وبحافظ على نعومة الأقمشة، بدون ما يهيّج البشرة الحساسة.", "en": "The Nabulsi Laundry Soap is ideal for children's clothes. It lifts tough stains, keeps fabrics soft and won't irritate sensitive skin."}, "r.gift": {"g": "open", "ar": "للهدايا عنا خيارات حلوة كتير.", "en": "We have lovely gift options."}, "r.prices": {"g": "present", "ar": "هاي أسعار منتجات أولغا.", "en": "Here are Olga's prices."}, "r.order": {"g": "count", "ar": "الطلب سهل: ضيفي المنتجات للسلة، اضغطي إتمام الطلب، عبّي تفاصيل التوصيل وابعتي الطلب على واتساب. فريق أولغا بيأكد معك رسوم التوصيل والموعد وطريقة الدفع، والتوصيل لكل مناطق الأردن.", "en": "Ordering is easy: add products to your bag, tap Checkout, fill in your delivery details and send the order on WhatsApp. The Olga team confirms the delivery fee, timing and payment, with delivery across Jordan."}, "r.wholesale": {"g": "present", "ar": "لطلبات الجملة والتعاون التجاري، تواصلي مع شركة باتل للصناعات الطبيعية على الرقم أو الإيميل اللي قدامك.", "en": "For wholesale and trade partnerships, contact BatteL Natural Industries on the number or email shown here."}, "r.about": {"g": "open", "ar": "أولغا من شركة باتل للصناعات الطبيعية، صُنع في الأردن. تركيباتنا طبيعية بنسبة تسعة وتسعين بالمية، بدون سلفات أو بارابين، وآمنة للبشرة الحساسة.", "en": "Olga is made in Jordan by BatteL Natural Industries. Our formulations are ninety-nine percent natural, free from sulfates and parabens, and safe for sensitive skin."}, "r.recommend": {"g": "count", "ar": "أكيد! خبريني عن بشرتك: جافة، دهنية، ولا حساسة؟ وبشكل عام، هاي اختياراتي.", "en": "Of course! Tell me about your skin: dry, oily or sensitive? Meanwhile, here are my picks."}, "r.fb": {"g": "open", "ar": "هاي المعلومة بيأكدها فريق أولغا مباشرة على واتساب.", "en": "The Olga team confirms that directly on WhatsApp."}, "p.nabulsi": {"g": "present", "ar": "صابون نابلسي سائل", "en": "Nabulsi Liquid Soap"}, "p.shea": {"g": "present", "ar": "صابون سائل بزبدة الشيا", "en": "Shea Butter Liquid Soap"}, "p.laurel": {"g": "present", "ar": "صابون غار سائل", "en": "Liquid Laurel Soap"}, "p.laundry": {"g": "present", "ar": "صابون نابلسي لغسيل الملابس", "en": "Nabulsi Laundry Soap"}, "p.moroccan": {"g": "present", "ar": "صابون الحمّام المغربي", "en": "Moroccan Hammam Soap"}, "p.shea-duo": {"g": "present", "ar": "ثنائي الشيا", "en": "Shea Ritual Duo"}, "p.home-set": {"g": "present", "ar": "مجموعة أولغا للمنزل", "en": "The Olga Home Set"}};
var ORDER=["hero","purity","shop","line","essence","why","about","reels","faq","contact"];
function curLang(){return (document.documentElement.lang||"ar").indexOf("en")===0?"en":"ar"}
var lang=curLang(), hist=[], busy=false, voiceOn=true, interacted=false, tourOff=false;
try{voiceOn=sessionStorage.getItem("olh-voice")!=="0";tourOff=sessionStorage.getItem("olh-tour")==="0";}catch(e){}

/* ---------- helpers ---------- */
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function md(t){var links=[];var raw=String(t).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,function(m,l,u){links.push([u,l]);return "\u0001"+(links.length-1)+"\u0002"})
 .replace(/https?:\/\/[^\s<>()]+/g,function(u){links.push([u,u.replace(/^https?:\/\//,"")]);return "\u0001"+(links.length-1)+"\u0002"});
 var h=esc(raw).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/^#{1,4}\s*/gm,"").replace(/^\s*[-*]\s+/gm,"• ");
 return h.replace(/\u0001(\d+)\u0002/g,function(m,i){var x=links[+i];var ok=/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(x[0])||/^mailto:/.test(x[0]);
  return ok?'<a href="'+esc(x[0])+'" target="_blank" rel="noopener noreferrer">'+esc(x[1])+'</a>':esc(x[1])})}
function detect(s){var a=(s.match(/[\u0600-\u06FF]/g)||[]).length,l=(s.match(/[A-Za-z]/g)||[]).length;return a>l?"ar":(l>0?"en":lang)}
function money(n){return n.toFixed(2)+(lang==="ar"?" د.أ":" JOD")}
function findProducts(text){var s=String(text).toLowerCase(),out=[];K.products.forEach(function(p){if(p.keys.some(function(k){return s.indexOf(k)>-1}))out.push(p)});return out}
function hasQuick(id){return !!document.querySelector('[data-quick="'+id+'"]')}
function openProduct(id){var el=document.querySelector('[data-quick="'+id+'"]');if(!el)return;if(window.matchMedia("(max-width:640px)").matches)setOpen(false);el.click()}

/* ---------- local answers (offline / fallback) ---------- */
function pLine(p,L){return "• <b>"+esc(p.name[L])+"</b> — "+p.variants.map(function(v){return esc(v.size[L])+": "+v.price.toFixed(2)+(L==="ar"?" د.أ":" JOD")}).join(" · ")}
function localReply(q,L){var s=q.toLowerCase(),t=T[L],P=K.products,by=function(id){return P.filter(function(p){return p.id===id})[0]};
 if(/ignore|system prompt|instruction|api key|secret|password|تجاهل|التعليمات|مفتاح|كلمة السر/i.test(q))return {h:esc(t.fb),ids:[],a:"r.fb"};
 var hit=findProducts(q);
 if(/(dry|جاف|جفاف|ترطيب|moistur)/i.test(q))return {h:esc(L==="ar"?"للبشرة الجافة بنصحك بصابون الشيا السائل، بيرطب بعمق وبيحمي من الجفاف 💛":"For dry skin I recommend the Shea Butter Liquid Soap — deep moisture and protection from dryness 💛")+"\n"+pLine(by("shea"),L),ids:["shea","shea-duo"],a:"r.dry"};
 if(/(oily|acne|دهني|حبوب|تطهير|purif|sensitive|حساس)/i.test(q))return {h:esc(L==="ar"?"صابون الغار السائل مطهّر ومهدّئ ومناسب لكل أنواع البشرة، وكل منتجاتنا بدون سلفات أو بارابين وآمنة للبشرة الحساسة.":"Liquid Laurel Soap is purifying and soothing for all skin types — and all our products are sulfate- and paraben-free, safe for sensitive skin.")+"\n"+pLine(by("laurel"),L),ids:["laurel"],a:"r.oily"};
 if(/(kid|child|baby|laundry|cloth|طفل|اطفال|أطفال|بيبي|غسيل|ملابس|اواعي|أواعي|بقع)/i.test(q))return {h:esc(L==="ar"?"صابون الغسيل النابلسي مثالي لملابس الأطفال، بيشيل البقع الصعبة وبحافظ على نعومة الأقمشة بدون ما يهيّج البشرة الحساسة 👶":"The Nabulsi Laundry Soap is ideal for children’s clothes — it lifts tough stains, keeps fabrics soft and won’t irritate sensitive skin 👶")+"\n"+pLine(by("laundry"),L),ids:["laundry"],a:"r.kids"};
 if(/(gift|present|هدي|هدية|مناسبة)/i.test(q))return {h:esc(L==="ar"?"للهدايا عنا خيارات حلوة كتير 🎁":"We have lovely gift options 🎁")+"\n"+pLine(by("shea-duo"),L)+"\n"+pLine(by("moroccan"),L)+"\n"+pLine(by("home-set"),L),ids:["shea-duo","moroccan","home-set"],a:"r.gift"};
 if(hit.length)return {h:hit.map(function(p){return "<b>"+esc(p.name[L])+"</b>\n"+esc(p.desc[L])+"\n"+pLine(p,L).replace(/^• <b>[^<]*<\/b> — /,"💰 ")}).join("\n\n"),ids:hit.map(function(p){return p.id}),a:"p."+hit[0].id};
 if(/(price|cost|how much|size|سعر|اسعار|أسعار|بكم|قديش|كم|حجم|أحجام|احجام)/i.test(q))return {h:esc(L==="ar"?"هاي أسعار منتجات أولغا:":"Here are Olga’s prices:")+"\n"+P.map(function(p){return pLine(p,L)}).join("\n"),ids:[],a:"r.prices"};
 if(/(order|buy|checkout|deliver|shipping|اطلب|أطلب|طلب|شراء|اشتري|توصيل|شحن|دفع|pay)/i.test(q))return {h:esc(K.order[L])+"\n"+md(WA),ids:[],a:"r.order"};
 if(/(wholesale|bulk|trade|جملة|تجار|موزع)/i.test(q))return {h:esc(K.wholesale[L]),ids:[],a:"r.wholesale"};
 if(/(ingredient|natural|sulfate|paraben|مكون|مكوّن|طبيعي|سلفات|بارابين)/i.test(q))return {h:esc(K.about[L]),ids:[],a:"r.about"};
 if(/(who|about|company|brand|مين|من انتم|من أنتم|باتل|battel|الشركة)/i.test(q))return {h:esc(K.about[L]),ids:[],a:"r.about"};
 if(/(recommend|suggest|best|skin|انصح|بتنصح|اقترح|أفضل|افضل|بشرة|بشرتي)/i.test(q))return {h:esc(L==="ar"?"أكيد! خبريني عن بشرتك: جافة، دهنية، حساسة؟ وبشكل عام هاي اختياراتي:":"Of course! Tell me about your skin — dry, oily or sensitive? Meanwhile, my picks:")+"\n"+pLine(by("nabulsi"),L)+"\n"+pLine(by("shea"),L)+"\n"+pLine(by("laurel"),L),ids:["nabulsi","shea","laurel"],a:"r.recommend"};
 if(/^(hi|hello|hey|مرحب|اهلا|أهلا|السلام|هلا|هاي)/i.test(s.trim()))return {h:esc(t.hi),ids:[],a:"r.hi"};
 return {h:esc(t.fb)+"\n"+md(WA),ids:[],a:"r.fb"}}

/* ---------- chat UI ---------- */
function actsHtml(ids,L){ids=ids.filter(function(id,i){return ids.indexOf(id)===i&&hasQuick(id)}).slice(0,3);
 if(!ids.length)return "";var byId={};K.products.forEach(function(p){byId[p.id]=p});
 return '<div class="olh-acts">'+ids.map(function(id){return '<button type="button" class="olh-btn olh-btn--ol" data-olh-p="'+esc(id)+'">'+esc(T[L].view+": "+byId[id].name[L])+'</button>'}).join("")+'</div>'}
function add(role,html,L,ids){var d=document.createElement("div");d.className="olh-m "+(role==="u"?"olh-u":"olh-b");d.dir=L==="ar"?"rtl":"ltr";d.lang=L;d.innerHTML=html+(ids?actsHtml(ids,L):"");log.appendChild(d);log.scrollTop=log.scrollHeight;return d}
log.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-olh-p]");if(b)openProduct(b.getAttribute("data-olh-p"))});
function render(){log.innerHTML="";add("b",esc(T[lang].hi),lang);hist.forEach(function(h){add(h.r,h.r==="u"?esc(h.t):(h.local?h.t:md(h.t)),h.l,h.ids)})}
function ui(){var t=T[lang];root.dir=lang==="ar"?"rtl":"ltr";$("olh-name").textContent=t.name;$("olh-sub").textContent=t.sub;inp.placeholder=t.ph;inp.dir=root.dir;$("olh-inl").textContent=t.in;
 $("olh-lang").textContent=t.lang;$("olh-lang").setAttribute("aria-label",lang==="ar"?"English":"العربية");
 $("olh-voice").textContent=voiceOn?"🔊":"🔇";$("olh-voice").setAttribute("aria-pressed",voiceOn?"true":"false");$("olh-voice").setAttribute("aria-label",voiceOn?t.voiceOff:t.voiceOn);
 $("olh-clear").setAttribute("aria-label",t.clr);$("olh-min").setAttribute("aria-label",t.min);$("olh-mic").setAttribute("aria-label",t.mic);$("olh-send").setAttribute("aria-label",t.send);
 $("olh-launch").setAttribute("aria-label",t.open);cv.setAttribute("aria-label",t.open);
 $("olh-bask").textContent=t.ask;$("olh-bthx").textContent=t.thx;
 var qb=$("olh-quick");qb.innerHTML="";t.q.forEach(function(x){var b=document.createElement("button");b.type="button";b.className="olh-btn";b.textContent=x;b.onclick=function(){send(x)};qb.appendChild(b)})}
function setOpen(o){if(o)cancelBye();root.classList.toggle("is-open",o);if(o){root.classList.remove("is-hidden");chatOpened();setTimeout(function(){if(!matchMedia("(max-width:640px)").matches)inp.focus()},250)}else stopSpeak()}
function busyUi(b){busy=b;typing.classList.toggle("is-on",b);$("olh-send").disabled=b;HB.think=b}
function rename(t){return String(t).replace(/(^|[^\u0621-\u064A\u0671-\u06D3])([وف]?[بل]?)حلا(?![\u0621-\u064A\u0671-\u06D3])/g,"$1$2شمس").replace(/\bHala\b/g,"Shams")}

/* ===== SHAMS · speaks about a product while its 3D view is open ===== */
var OLH_GUIDE={"nabulsi": {"ar": {"what": "صابون نابلسي سائل أصيل، مصنوع من زيت الزيتون النقي على طريقة الصابون النابلسي التقليدية، بتركيبة سائلة عملية للاستخدام اليومي.", "why": ["غسل اليدين يومياً عند المغسلة", "صابون استحمام لطيف للجسم كله", "للعائلة كلها، الكبار والصغار"], "ben": ["زيت الزيتون يرطّب البشرة ويحافظ على زيوتها الطبيعية", "يترك اليدين ناعمتين بدون إحساس بالجفاف بعد الغسل", "تنظيف لطيف وعميق بمكونات طبيعية 100%"], "tip": "ضعي كمية صغيرة على يدين مبللتين، دلّكي حتى تتكون الرغوة ثم اشطفي. حجم 900 مل اقتصادي للحمّام، و300 مل مثالي للمغسلة."}, "en": {"what": "An authentic Nabulsi liquid soap made from pure olive oil in the traditional Nabulsi way, in a practical liquid form for everyday use.", "why": ["Daily hand washing at the sink", "A gentle shower soap for the whole body", "For the whole family, adults and kids"], "ben": ["Olive oil moisturizes and keeps the skin's natural oils", "Leaves hands soft with no tight, dry feeling", "Gentle, deep cleansing with 100% natural ingredients"], "tip": "Lather a little on wet hands, then rinse. The 900 ml size is great value for the shower; 300 ml is perfect by the sink."}}, "shea": {"ar": {"what": "صابون سائل غني بزبدة الشيا الطبيعية، من أكثر المكونات المعروفة بالترطيب العميق وحماية البشرة.", "why": ["للبشرة الجافة أو التي تتعرّض للجفاف في الشتاء", "غسول يومي لليدين وصابون استحمام", "لمن تحب إحساس النعومة الذي يدوم"], "ben": ["ترطيب عميق يحمي البشرة من الجفاف والتشقق", "نعومة وانتعاش يدومان طوال اليوم", "تركيبة لطيفة بمكونات طبيعية 100%"], "tip": "مثالي بعد يوم طويل: استخدميه في الاستحمام المسائي لتنامي ببشرة ناعمة ومرتاحة."}, "en": {"what": "A liquid soap rich in natural shea butter, one of the best-known ingredients for deep moisture and skin protection.", "why": ["Dry skin, or skin that gets dry in winter", "Daily hand wash and shower soap", "Anyone who loves long-lasting softness"], "ben": ["Deep moisture that protects against dryness and cracking", "Softness and freshness that last all day", "A gentle formula with 100% natural ingredients"], "tip": "Lovely in an evening shower, so you go to bed with soft, comfortable skin."}}, "laurel": {"ar": {"what": "صابون غار سائل بزيت الغار الأصيل، المعروف منذ القدم بخصائصه المطهّرة والمهدّئة للبشرة.", "why": ["تنظيف اليدين والجسم بإحساس النقاء", "للبشرة الدهنية أو المعرّضة للحبوب", "مناسب لجميع أنواع البشرة"], "ben": ["خصائص مطهّرة تنقّي البشرة بلطف", "يهدّئ البشرة ويخفف إحساس التهيّج", "يحافظ على توازن البشرة بمكونات طبيعية 100%"], "tip": "دلّكي الرغوة على البشرة لثوانٍ قبل الشطف لتستفيدي من زيت الغار أكثر."}, "en": {"what": "A liquid laurel soap with authentic laurel oil, known for centuries for its purifying and soothing properties.", "why": ["Cleansing hands and body with a pure, fresh feel", "Oily or blemish-prone skin", "Suitable for all skin types"], "ben": ["Purifying properties that gently cleanse the skin", "Soothes the skin and calms irritation", "Keeps the skin balanced with 100% natural ingredients"], "tip": "Massage the lather in for a few seconds before rinsing to get the most from the laurel oil."}}, "laundry": {"ar": {"what": "صابون نابلسي لغسيل الملابس، مستخلص من زيت الزيتون، بتركيبة لطيفة تنظّف بعمق وآمنة للبشرة الحساسة.", "why": ["غسيل ملابس الأطفال والرضّع", "ملابس من بشرتهم حساسة في العائلة", "الغسيل اليومي لكل أفراد العائلة"], "ben": ["يزيل البقع الصعبة بفعالية", "يحافظ على نعومة الأقمشة وألوانها", "لا يسبب تهيّجاً للبشرة الحساسة"], "tip": "للبقع الصعبة: افركي قليلاً منه مباشرة على البقعة واتركيه دقائق قبل الغسيل."}, "en": {"what": "A Nabulsi laundry soap made from olive oil, with a gentle formula that cleans deeply and is safe for sensitive skin.", "why": ["Washing baby and children's clothes", "Family members with sensitive skin", "Everyday laundry for the whole family"], "ben": ["Removes tough stains effectively", "Keeps fabrics soft and colors bright", "Does not irritate sensitive skin"], "tip": "For tough stains, rub a little directly on the stain and leave it a few minutes before washing."}}, "moroccan": {"ar": {"what": "صابون الحمّام المغربي التقليدي، غني بزيوت مغربية طبيعية ومستوحى من طقوس الجمال المغربي الأصيلة.", "why": ["طقس حمّام مغربي في البيت مرة أو مرتين أسبوعياً", "تنظيف عميق وتقشير للبشرة", "تحضير البشرة قبل المناسبات"], "ben": ["تنظيف عميق يزيل الخلايا الميتة مع الكيس", "ديتوكس للبشرة وإشراقة واضحة", "نعومة فاخرة ومكونات طبيعية 100%"], "tip": "افردي الصابون على بشرة رطبة بعد البخار، اتركيه 5 دقائق، ثم قشّري بالكيس المغربي واشطفي."}, "en": {"what": "Traditional Moroccan hammam soap, rich in natural Moroccan oils and inspired by authentic Moroccan beauty rituals.", "why": ["A Moroccan hammam ritual at home once or twice a week", "Deep cleansing and exfoliation", "Preparing your skin before special occasions"], "ben": ["Deep cleansing that lifts dead skin with a kessa glove", "Skin detox and visible radiance", "Luxurious softness with 100% natural ingredients"], "tip": "Spread on damp skin after steam, leave 5 minutes, then exfoliate with a kessa glove and rinse."}}, "shea-duo": {"ar": {"what": "ثنائي الشيا: عبوة 300 مل للمغسلة وعبوة 900 مل للاستحمام، طقس زبدة الشيا الكامل في مجموعة واحدة.", "why": ["هدية أنيقة لمن تحبين", "ترطيب متكامل لليدين والجسم", "تجهيز المغسلة والحمّام معاً"], "ben": ["ترطيب عميق وحماية من الجفاف في كل غسلة", "سعر أوفر من شراء العبوتين منفصلتين", "تقديم جميل يناسب الهدايا"], "tip": "ضعي الصغيرة بجانب المغسلة والكبيرة في الحمّام لتكتمل العناية اليومية."}, "en": {"what": "The Shea Ritual Duo: a 300 ml bottle for the sink and a 900 ml bottle for the shower, the full shea butter ritual in one set.", "why": ["An elegant gift for someone you love", "Complete moisture for hands and body", "Setting up the sink and shower together"], "ben": ["Deep moisture and protection from dryness with every wash", "Better value than buying both separately", "Beautiful presentation for gifting"], "tip": "Keep the small bottle by the sink and the large one in the shower for complete daily care."}}, "home-set": {"ar": {"what": "مجموعة أولغا للمنزل: ست عبوات من صابون أولغا السائل بزبدة الشيا، تكفي كل مغسلة وحمّام في البيت.", "why": ["العائلات الكبيرة", "تجهيز البيت كاملاً بعناية طبيعية", "المخزون الشهري بدل الشراء المتكرر"], "ben": ["الخيار الأوفر في المتجر", "ترطيب زبدة الشيا لكل أفراد العائلة", "عناية طبيعية 100% في كل غرفة"], "tip": "وزّعي العبوات على المطبخ والمغاسل والحمّامات، وما تبقى يكون مخزوناً جاهزاً."}, "en": {"what": "The Olga Home Set: six bottles of Olga shea butter liquid soap, enough for every sink and shower in your home.", "why": ["Larger families", "Stocking the whole home with natural care", "Monthly supply instead of repeat buying"], "ben": ["The best value in the store", "Shea butter moisture for the whole family", "100% natural care in every room"], "tip": "Place bottles in the kitchen, sinks and bathrooms, and keep the rest as ready stock."}}},OLH_LBL={"ar": {"what": "ما هو؟", "why": "لمن ولماذا يُستخدم؟", "ben": "ماذا ستستفيدين منه؟", "ing": "المكونات", "tip": "نصيحة شمس", "intro": "اخترتِ {n} 🌿 خليني أعرّفك عليه:", "price": "السعر يبدأ من"}, "en": {"what": "What is it?", "why": "Who it's for & why", "ben": "What you'll gain", "ing": "Ingredients", "tip": "Shams's tip", "intro": "You picked {n} 🌿 let me tell you about it:", "price": "From"}},XT=[],XG=0;
function xClear(){XG++;XT.forEach(clearTimeout);XT=[]}
var XV=null;function xvox(){if(!XV){try{XV=window.OLH_XVOX||{}}catch(e){XV={}}}return XV}
function playX(key,p,L){var b=xvox()[key];if(!b||!voiceOn)return speakText(p,L);stopAudio();var g=spkGen;
 var bin=atob(b),u=new Uint8Array(bin.length);for(var k=0;k<bin.length;k++)u[k]=bin.charCodeAt(k);
 if(AC){return new Promise(function(res){AC.decodeAudioData(u.buffer,function(buf){if(g!==spkGen)return res(false);var src=AC.createBufferSource();src.buffer=buf;src.connect(analyser);
   SPK={kind:"live",src:src,q:false};root.classList.add("is-talking");talkUi(true);src.onended=function(){if(g===spkGen){SPK=null;root.classList.remove("is-talking");talkUi(false)}res(g===spkGen)};src.start()},function(){res(false)})})}
 return new Promise(function(res){var a=new Audio("data:audio/mpeg;base64,"+b);a.onended=function(){res(true)};a.onerror=function(){res(false)};a.play().catch(function(){res(false)})})}
function explainProduct(id){var P=(window.OLGA_PRODUCTS||[]).filter(function(p){return p.id===id})[0],g=OLH_GUIDE[id];if(!P||!g)return;
 var L=lang==="en"?"en":"ar",G=g[L],B=OLH_LBL[L],nm=P.name[L],sep=L==="ar"?"، ":", ";
 var parts=[B.intro.replace("{n}",nm).replace(/ ?🌿.*$/,"")+". "+G.what,B.why+" "+G.why.join(sep)+".",B.ben+" "+G.ben.join(sep)+".",B.tip+": "+G.tip];
 xClear();var my=XG;interacted=true;setOpen(false);root.classList.add("olh-over3d");
 var go=function(){if(my!==XG)return;stopNarration();var i=0;
  var next=function(){if(my!==XG)return;if(i>=parts.length){XT.push(setTimeout(function(){if(my===XG){hideBubble();try{gesture("rest")}catch(e){}}},2500));return}
   var p=parts[i],t0=Date.now(),ms=Math.max(3500,p.length*(L==="ar"?80:65));showBubble(p,0,parts.length,i);i++;try{gesture(i===1?"present":(i%2?"open":"talk"),p)}catch(e){}
   playX(id+"."+L+"."+(i-1),p,L).then(function(ok){if(my!==XG)return;var left=ok?400:Math.max(300,ms-(Date.now()-t0));XT.push(setTimeout(next,left))})};
  next()};
 try{unlockAudio();if(AC&&AC.state==="suspended")AC.resume()}catch(e){}
 if(root.classList.contains("is-hidden")){root.classList.remove("is-hidden");seen={};enter();XT.push(setTimeout(go,reduced?50:1500))}else go()}
window.OLH_explain=explainProduct;
window.OLH_quiet=function(){if(!root.classList.contains("olh-over3d"))return;xClear();root.classList.remove("olh-over3d");stopNarration();stopSpeak();hideBubble()};
function send(text){text=String(text||"").trim().slice(0,1000);if(!text||busy)return;interacted=true;var L=detect(text);
 hist.push({r:"u",t:text,l:L});add("u",esc(text),L);inp.value="";grow();busyUi(true);
 var msgs=hist.slice(-16).map(function(h){return {role:h.r==="u"?"user":"assistant",content:h.r==="u"?h.t:(h.plain||h.t)}});
 var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},30000);
 fetch(OLH_API+"olga-chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs,lang:L}),signal:ctl?ctl.signal:undefined})
 .then(function(r){return r.ok?r.json():Promise.reject(r.status)})
 .then(function(d){if(!d||!d.reply)throw 0;d.reply=rename(d.reply);var ids=findProducts(d.reply).map(function(p){return p.id});
   hist.push({r:"b",t:d.reply,l:L,ids:ids});add("b",md(d.reply),L,ids);speakReply(d.reply,L,null)})
 .catch(function(){var a=localReply(text,L);var plain=a.h.replace(/<[^>]+>/g,"");hist.push({r:"b",t:a.h,plain:plain,l:L,ids:a.ids,local:true});add("b",a.h,L,a.ids);speakReply(plain,L,a.a)})
 .then(function(){clearTimeout(tm);busyUi(false);hist=hist.slice(-30)})}
function grow(){inp.style.height="auto";inp.style.height=Math.min(inp.scrollHeight,110)+"px"}
$("olh-form").addEventListener("submit",function(e){e.preventDefault();send(inp.value)});
inp.addEventListener("input",function(){grow();HB.listen=1;HB.typeT=now()});
inp.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();send(inp.value)}});
$("olh-min").onclick=function(){setOpen(false)};
$("olh-clear").onclick=function(){stopSpeak();hist=[];render()};
$("olh-lang").onclick=function(){lang=lang==="ar"?"en":"ar";ui();render()};
$("olh-voice").onclick=function(){voiceOn=!voiceOn;if(!voiceOn)stopSpeak();try{sessionStorage.setItem("olh-voice",voiceOn?"1":"0")}catch(e){}ui()};
$("olh-launch").onclick=function(){root.classList.remove("is-hidden");seen={};enter();setTimeout(function(){setOpen(true)},reduced?50:4000)};
/* "thank you": Shams says her goodbye, holds it for a breath, then leaves through the olive trees.
   Opening the chat while she is still talking means the visitor changed her mind, so she stays. */
var BYE=null,BYE_HOLD=450;
function byeLeave(tok){if(BYE!==tok)return;clearTimeout(tok.safety);clearTimeout(tok.hold);clearInterval(tok.wait);BYE=null;
 leave(function(){root.classList.add("is-hidden");bubble.classList.remove("is-bye")})}
function cancelBye(){if(!BYE)return;clearTimeout(BYE.safety);clearTimeout(BYE.hold);clearInterval(BYE.wait);BYE=null;bubble.classList.remove("is-bye")}
function farewell(){if(BYE||LEAVING||mode==="out"||root.classList.contains("is-hidden"))return;
 tourOff=true;try{sessionStorage.setItem("olh-tour","0")}catch(e){}
 interacted=true;unlockAudio();if(root.classList.contains("is-open"))setOpen(false);
 var tok={};BYE=tok;bubble.classList.add("is-bye");
 if(mode==="in"){tok.wait=setInterval(function(){if(BYE!==tok||mode!=="in"){clearInterval(tok.wait);sayBye(tok)}},60);return}
 sayBye(tok)}
function sayBye(tok){if(BYE!==tok)return;
 if(mode!=="on"||!LINES["x.thanks"]){byeLeave(tok);return}
 var d=clipDur("x.thanks",lang)||3.4;tok.safety=setTimeout(function(){byeLeave(tok)},(d+6)*1000);
 narrate([{id:"x.thanks",g:LINES["x.thanks"].g||"wave"}],null,function(){tok.hold=setTimeout(function(){byeLeave(tok)},BYE_HOLD)})}
function toggleFromGuide(){if(LEAVING||mode==="out")return;interacted=true;setOpen(!root.classList.contains("is-open"))}
/* Shams now stands over the banner from the first second, so a tap on the empty space around her
   reaches whatever is underneath (banner buttons, arrows, links) instead of being swallowed */
function passThrough(ev){var g=$("olh-guide"),pr=root.style.pointerEvents,pg=g.style.pointerEvents,pc=cv.style.pointerEvents;
 root.style.pointerEvents=g.style.pointerEvents=cv.style.pointerEvents="none";
 var t=document.elementFromPoint(ev.clientX,ev.clientY);
 root.style.pointerEvents=pr;g.style.pointerEvents=pg;cv.style.pointerEvents=pc;
 if(!t||root.contains(t))return;var a=t.closest("a,button,label,input,select,textarea,[role=button],[tabindex]")||t;
 if(a.focus&&a!==t)try{a.focus({preventScroll:true})}catch(_){}
 if(a.click)a.click()}
cv.addEventListener("click",function(ev){if(hitHala(ev))toggleFromGuide();else passThrough(ev)});
cv.addEventListener("pointermove",function(ev){if(ev.pointerType==="mouse")cv.style.cursor=hitHala(ev)?"pointer":"default"});
cv.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toggleFromGuide()}});
$("olh-bask").onclick=function(){interacted=true;setOpen(true)};
$("olh-bthx").onclick=function(e){e.stopPropagation();farewell()};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&root.classList.contains("is-open"))setOpen(false)});

/* follow the store's language switch */
new MutationObserver(function(){var l=curLang();if(l!==lang){lang=l;ui();render();spkUi();if(NQ.active){var it=NQ.items,i=NQ.i,s=NQ.sec;stopNarration();NQ.items=it;NQ.i=i;NQ.sec=s;NQ.active=true;nextLine()}}}).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});

/* microphone (speech recognition) */
var SR=window.SpeechRecognition||window.webkitSpeechRecognition,rec=null;
if(!SR)$("olh-mic").style.display="none";
$("olh-mic").onclick=function(){if(!SR)return;interacted=true;if(rec){rec.stop();return}stopSpeak();
 rec=new SR();rec.lang=lang==="ar"?"ar-JO":"en-US";rec.interimResults=true;rec.maxAlternatives=1;var fin="";
 rec.onresult=function(e){var s="";for(var i=0;i<e.results.length;i++){s+=e.results[i][0].transcript;if(e.results[i].isFinal)fin=s}inp.value=s;grow()};
 rec.onend=function(){$("olh-mic").classList.remove("is-on");rec=null;if(fin.trim())send(fin)};
 rec.onerror=function(){$("olh-mic").classList.remove("is-on");rec=null};
 $("olh-mic").classList.add("is-on");HB.listen=1;try{rec.start()}catch(e){rec=null;$("olh-mic").classList.remove("is-on")}};

/* =====================================================================================
   SHAMS LIVE · guided tour + voice + lip-sync engine
   - Every section has its own spoken explanation (recorded voice, Arabic & English).
   - Lips follow the real sound: each recording carries a per-frame mouth track
     (jaw opening + lip spreading/rounding) measured from the audio itself.
   - Gestures (wave, open arms, present, count, talk) are timed to the speech beats,
     the head nods on stressed syllables, eyebrows lift on questions, eyes blink.
   - Browsers only allow sound after the visitor's first tap: until then Shams shows
     the words and gestures silently, then replays the current sentence aloud.
   ===================================================================================== */
var VOX=null;
function vox(){if(VOX===null){try{VOX=window.OLH_VOX||{};window.OLH_VOX=null}catch(e){VOX={}}}return VOX}
function hasClip(id,L){return !!vox()[id+"."+L]}
function clipDur(id,L){var v=vox()[id+"."+L];return v?v.d:0}
var B36="0123456789abcdefghijklmnopqrstuvwxyz",TRK={};
function trk(s){if(TRK[s])return TRK[s];var a=new Float32Array(s.length);for(var i=0;i<s.length;i++)a[i]=B36.indexOf(s.charAt(i))/35;TRK[s]=a;return a}
function now(){return performance.now()/1000}

/* ---------- audio ---------- */
var AC=null,master=null,analyser=null,abuf=null,fbuf=null,unlocked=false,BUF={},ttsFail=0;
function unlockAudio(){var C=window.AudioContext||window.webkitAudioContext;if(!C)return;
 if(!AC){try{AC=new C();master=AC.createGain();analyser=AC.createAnalyser();analyser.fftSize=1024;analyser.connect(master);master.connect(AC.destination)}catch(e){AC=null;return}}
 if(AC.state==="suspended"){try{AC.resume()}catch(e){}}
 if(!unlocked){unlocked=true;try{var b=AC.createBuffer(1,1,22050),s=AC.createBufferSource();s.buffer=b;s.connect(AC.destination);s.start(0)}catch(e){}}}
function b64buf(b){var bin=atob(b),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer}
function decode(ab){return new Promise(function(res,rej){try{var p=AC.decodeAudioData(ab,res,rej);if(p&&p.then)p.then(res,rej)}catch(e){rej(e)}})}
function getBuf(key){if(BUF[key])return BUF[key];var v=vox()[key];BUF[key]=decode(b64buf(v.a));BUF[key].catch(function(){delete BUF[key]});return BUF[key]}
function preload(id,L){if(AC&&hasClip(id,L))getBuf(id+"."+L)}

/* SPK = what Shams is saying right now (drives lips, beats, head and gestures) */
var SPK=null,spkGen=0;
function audioLag(){return AC?((AC.outputLatency||0)+(AC.baseLatency||0)*.5):0}
function stopAudio(){spkGen++;if(SPK&&SPK.src){try{SPK.src.onended=null;SPK.src.stop()}catch(e){}}
 try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}SPK=null;root.classList.remove("is-talking");talkUi(false)}
/* play one recorded line; resolves true when finished, false if interrupted/failed */
function playClip(id,L){var key=id+"."+L,v=vox()[key];if(!v||!AC)return Promise.resolve(false);stopAudio();var g=spkGen;
 if(AC.state==="suspended"){try{AC.resume()}catch(e){}}
 return getBuf(key).then(function(buf){if(g!==spkGen)return false;
  return new Promise(function(res){var src=AC.createBufferSource();src.buffer=buf;src.connect(analyser);var t0=AC.currentTime+.06;
   SPK={kind:"clip",src:src,t0:t0,dur:buf.duration,O:trk(v.o),W:trk(v.w),B:v.b||[],bi:0,q:/[?؟]/.test((LINES[id]||{})[L]||"")};
   root.classList.add("is-talking");talkUi(true);
   src.onended=function(){if(g===spkGen){SPK=null;root.classList.remove("is-talking");talkUi(false)}res(g===spkGen)};
   try{src.start(t0)}catch(e){SPK=null;res(false)}})},function(){return false})}

/* ---------- mouth shape for the current moment: {o: jaw 0..1, w: 0 round … .5 … 1 wide} ---------- */
var VIS_AR={"ا":[.85,.5],"آ":[.9,.5],"ى":[.8,.5],"أ":[.7,.5],"إ":[.55,.65],"ع":[.7,.5],"ه":[.55,.5],"ح":[.6,.5],"ة":[.5,.55],"ء":[.4,.5],
 "و":[.45,.12],"ؤ":[.45,.15],"ي":[.35,.85],"ئ":[.35,.8],"م":[0,.45],"ب":[0,.45],"ف":[.12,.6],
 "س":[.22,.78],"ص":[.25,.72],"ش":[.25,.62],"ز":[.22,.78],"ث":[.2,.7],"ذ":[.2,.7],"ت":[.3,.7],"د":[.32,.62],"ط":[.35,.55],"ظ":[.3,.55],"ن":[.3,.6],"ل":[.38,.6],"ر":[.4,.55],
 "ك":[.45,.55],"ق":[.45,.5],"غ":[.5,.5],"خ":[.5,.5],"ج":[.35,.55]};
var VIS_EN={a:[.85,.55],e:[.55,.78],i:[.4,.85],o:[.62,.18],u:[.45,.12],y:[.4,.8],w:[.3,.1],m:[0,.45],b:[0,.45],p:[0,.45],f:[.12,.62],v:[.12,.62],
 s:[.22,.8],z:[.22,.8],t:[.3,.7],d:[.32,.65],n:[.3,.62],l:[.38,.6],r:[.4,.4],k:[.45,.55],g:[.45,.55],c:[.3,.7],j:[.35,.5],h:[.5,.5],q:[.4,.3],x:[.3,.7]};
function visOf(ch,L){if(!ch)return [0,.5];var v=(L==="ar"?VIS_AR[ch]:VIS_EN[ch.toLowerCase()])||(L==="ar"?VIS_EN[ch.toLowerCase()]:VIS_AR[ch]);return v||(/\s|[.,،!?؟:;]/.test(ch)?[0,.5]:[.3,.55])}
function mouthNow(){var S=SPK;if(!S)return null;
 if(S.kind==="clip"){var t=AC.currentTime-S.t0-audioLag()+.035;if(t<0)return {o:0,w:.5};var x=t*50,i=Math.floor(x),fr=x-i,O=S.O,W=S.W;
  if(i>=O.length-1)return {o:0,w:.5};
  while(S.bi<S.B.length&&S.B[S.bi]<=i){beat(.8+.2*(O[S.B[S.bi]]||0));S.bi++}
  return {o:O[i]+(O[i+1]-O[i])*fr,w:W[i]+(W[i+1]-W[i])*fr}}
 if(S.kind==="live"){if(!abuf)abuf=new Uint8Array(analyser.fftSize);if(!fbuf)fbuf=new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(abuf);var s=0;for(var k=0;k<abuf.length;k++){var v=(abuf[k]-128)/128;s+=v*v}var o=Math.min(1,Math.sqrt(s/abuf.length)*5.5);
  analyser.getByteFrequencyData(fbuf);var bw=AC.sampleRate/analyser.fftSize,num=0,den=0;for(var j=2;j<fbuf.length&&j*bw<6000;j++){num+=j*bw*fbuf[j];den+=fbuf[j]}
  var c=den?num/den:1500,w=.5+.45*cl((c-1500)/1800,0,1)-.4*cl((1100-c)/600,0,1);
  if(o-(S.po||0)>.22&&now()-(S.pb||0)>.28){beat(.8);S.pb=now()}S.po=o;return {o:o,w:o>.08?w:.5}}
 if(S.kind==="syn"){if(!S.on)return {o:0,w:.5};var tt=now(),dt=tt-(S.lt||tt);S.lt=tt;S.cp+=dt*S.cps;var ch=S.text.charAt(Math.floor(S.cp));
  var vv=visOf(ch,S.L),syl=.62+.38*Math.abs(Math.sin(S.cp*Math.PI*.9));return {o:vv[0]*syl,w:vv[1]}}
 return null}

/* browser voice (used for live chat answers that have no recording) */
function pickVoice(L){if(!window.speechSynthesis)return null;var vs=speechSynthesis.getVoices().filter(function(v){return v.lang&&v.lang.toLowerCase().indexOf(L)===0});
 return vs.filter(function(v){return /female|woman|zira|hoda|salma|laila|mariam|amira|zariyah|samantha|serena|google/i.test(v.name)})[0]||vs[0]||null}
function browserSpeak(s,L,g){return new Promise(function(res){if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!pickVoice(L))return res(false);
 var u=new SpeechSynthesisUtterance(s);u.lang=L==="ar"?"ar-SA":"en-GB";u.rate=L==="ar"?.95:1;u.pitch=1.08;u.voice=pickVoice(L);
 var S={kind:"syn",text:s,L:L,cp:0,cps:L==="ar"?12.5:14.5,on:false,q:/[?؟]/.test(s)};
 u.onstart=function(){if(g!==spkGen)return;S.on=true;S.lt=now();SPK=S;root.classList.add("is-talking");talkUi(true)};
 u.onboundary=function(e){if(g!==spkGen)return;if(typeof e.charIndex==="number"){S.cp=e.charIndex}beat(.75)};
 u.onend=u.onerror=function(){if(g===spkGen&&SPK===S){SPK=null;root.classList.remove("is-talking");talkUi(false)}res(g===spkGen)};
 try{speechSynthesis.speak(u)}catch(e){res(false)}})}
/* natural cloud voice (OLH_API) with live acoustic lip-sync; browser voice as fallback */
function speakText(text,L){var s=speakable(text);if(!s||!voiceOn||!interacted)return Promise.resolve(false);stopAudio();var g=spkGen;unlockAudio();
 if(AC&&ttsFail<2){
  return fetch(OLH_API+"olga-tts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:s,lang:L})})
  .then(function(r){if(!r.ok)throw r.status;return r.arrayBuffer()}).then(decode)
  .then(function(buf){if(g!==spkGen)return false;ttsFail=0;return new Promise(function(res){var src=AC.createBufferSource();src.buffer=buf;src.connect(analyser);
    SPK={kind:"live",src:src,q:/[?؟]/.test(s)};root.classList.add("is-talking");talkUi(true);
    src.onended=function(){if(g===spkGen){SPK=null;root.classList.remove("is-talking");talkUi(false)}res(g===spkGen)};src.start()})})
  .catch(function(){ttsFail++;return g===spkGen?browserSpeak(s,L,g):false})}
 return browserSpeak(s,L,g)}
function speakable(t){return String(t).replace(/<[^>]+>/g," ").replace(/https?:\/\/\S+/g,"").replace(/[•*#_]/g," ").replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu,"").replace(/\s+/g," ").trim().slice(0,560)}
function canVoice(){return voiceOn&&interacted&&!!AC}

/* ---------- bubble ---------- */
var bT=0,dots=$("olh-dots"),spk=$("olh-bspk");
function hilite(t){return esc(t).replace(/(^|[^\u0621-\u064A\u0671-\u06D3])(شمس|Shams)(?![\u0621-\u064A\u0671-\u06D3A-Za-z])/,"$1<b>$2</b>")}
function showBubble(text,ms,n,i){if(!guideReady){pendingB=[text,ms,n,i];return}var bt=$("olh-btext");bt.innerHTML=hilite(text);bt.dir=lang==="ar"?"rtl":"ltr";
 dots.innerHTML="";if(n>1){for(var k=0;k<n;k++){var d=document.createElement("i");if(k<i)d.className="is-done";if(k===i)d.className="is-on";dots.appendChild(d)}}
 bubble.classList.remove("is-pop");void bubble.offsetWidth;bubble.classList.add("is-on","is-pop");spkUi();clearTimeout(bT);if(ms)bT=setTimeout(hideBubble,ms)}
function hideBubble(){pendingB=null;clearTimeout(bT);bubble.classList.remove("is-on")}
function spkUi(){var t=T[lang];spk.classList.toggle("is-locked",!interacted);spk.classList.toggle("is-muted",interacted&&!voiceOn);
 spk.innerHTML=!interacted?'<span class="olh-ico">🔊</span><span>'+esc(t.hear)+'</span>':(voiceOn?'<span class="olh-ico">🔊</span><span class="olh-eq"><i></i><i></i><i></i><i></i><i></i></span>':'<span class="olh-ico">🔇</span>');
 spk.setAttribute("aria-label",!interacted?t.hear:(voiceOn?t.voiceOff:t.voiceOn))}
function talkUi(on){bubble.classList.toggle("is-talking",!!on)}
spk.onclick=function(e){e.stopPropagation();if(!interacted){interacted=true;unlockAudio();spkUi();restartLine();return}
 voiceOn=!voiceOn;try{sessionStorage.setItem("olh-voice",voiceOn?"1":"0")}catch(err){}ui();spkUi();if(!voiceOn)stopAudio();else restartLine()};

/* ---------- narration queue (one section = a few sentences) ---------- */
var NQ={items:[],i:0,gen:0,timer:0,sec:null,active:false,silent:false};
function lineText(it){return it.text||((LINES[it.id]||{})[lang])||""}
function narrate(items,sec,done){stopNarration();NQ.items=items;NQ.i=0;NQ.sec=sec||null;NQ.done=done||null;NQ.active=true;nextLine()}
function stopNarration(){NQ.gen++;clearTimeout(NQ.timer);NQ.active=false;NQ.sec=null;stopAudio()}
function restartLine(){if(!NQ.active)return;NQ.gen++;clearTimeout(NQ.timer);nextLine()}
function nextLine(){var g=++NQ.gen;clearTimeout(NQ.timer);
 if(NQ.i>=NQ.items.length){var dn=NQ.done;NQ.done=null;NQ.active=false;NQ.sec=null;if(dn){dn();return}gesture("rest");bT=setTimeout(hideBubble,4200);return}
 var it=NQ.items[NQ.i],L=lang,txt=lineText(it),info=LINES[it.id]||{};
 showBubble(txt,0,NQ.items.length,NQ.i);gesture(info.g||it.g||"open",txt);
 if(Math.random()<.5)blinkNow();
 var nx=NQ.items[NQ.i+1];if(nx)preload(nx.id,L);
 var done=function(){if(g!==NQ.gen)return;NQ.i++;NQ.timer=setTimeout(nextLine,420)};
 if(canVoice()&&hasClip(it.id,L)){NQ.silent=false;playClip(it.id,L).then(function(ok){if(g!==NQ.gen)return;if(ok)done();else silentLine(g,it,L,txt)})}
 else silentLine(g,it,L,txt)}
function silentLine(g,it,L,txt){NQ.silent=true;var d=clipDur(it.id,L)||Math.max(2.4,txt.length/(L==="ar"?13:15));
 NQ.timer=setTimeout(function(){if(g!==NQ.gen)return;NQ.i++;nextLine()},(d+1.1)*1000)}
function say(id,g){if(!LINES[id])return;narrate([{id:id,g:g}],null)}

/* ---------- section tour ---------- */
var seen={},secRatio={},curSec=null,secT=0,visits=0;
try{visits=+localStorage.getItem("olh-visits")||0;localStorage.setItem("olh-visits",String(visits+1))}catch(e){}
function tourItems(id){var arr=(TOUR[id]||[]).map(function(x,i){return {id:"t."+id+"."+i,g:x.g}});
 if(id==="hero"&&visits>0&&arr.length)arr[0]={id:"x.back",g:"wave"};return arr}
function guideFree(){return mode==="on"&&!root.classList.contains("olh-over3d")&&!tourOff&&!root.classList.contains("is-open")&&!root.classList.contains("is-hidden")}
function pickSection(){var best=null,bv=.18;ORDER.forEach(function(id){var r=secRatio[id]||0;if(r>bv){bv=r;best=id}});return best}
function onSectionChange(){var id=pickSection();if(!id||id===curSec)return;curSec=id;clearTimeout(secT);
 secT=setTimeout(function(){if(curSec!==id||seen[id]||!guideFree()||!TOUR[id])return;seen[id]=1;narrate(tourItems(id),id)},650)}
if(window.IntersectionObserver){var sio=new IntersectionObserver(function(es){es.forEach(function(e){
   var vh=window.innerHeight||800,r=e.intersectionRect.height/Math.min(vh,e.boundingClientRect.height||vh);secRatio[e.target.id]=e.isIntersecting?r:0});onSectionChange()},
  {threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});
 ORDER.forEach(function(id){var el=document.getElementById(id);if(el)sio.observe(el)})}
function tourKick(){if(!guideFree())return;curSec=null;onSectionChange()}

/* interaction unlocks the voice; the sentence on screen is then replayed aloud */
function firstTouch(e){if(!interacted&&e&&e.target&&e.target.closest&&e.target.closest("#olh-bspk"))return;var was=interacted;interacted=true;unlockAudio();if(was)return;
 var f=function(){spkUi();if(!BYE&&NQ.active&&NQ.silent&&voiceOn)restartLine()};
 var inRow=e&&e.type!=="keydown"&&e.target&&e.target.closest&&e.target.closest("#olh-bubble .olh-row");
 if(!inRow){f();return}var ran=false,once=function(){if(ran)return;ran=true;window.removeEventListener("click",once);clearTimeout(tm);f()},tm=setTimeout(once,900);window.addEventListener("click",once)}
["pointerdown","keydown","touchend"].forEach(function(ev){window.addEventListener(ev,firstTouch,{passive:true})});

/* reactions: adding to the bag, opening a product */
var addN=0;
document.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest("[data-add]");if(!t||root.contains(t))return;
 if(mode!=="on"||root.classList.contains("is-hidden"))return;HB.joy=1;beat(1);
 if(!NQ.active&&!root.classList.contains("is-open")){var id=(addN++%2)?"x.add2":"x.add1";say(id,LINES[id].g)}},true);
/* glances: she follows the visitor's pointer for a moment */
var PTR={x:0,y:0,t:-9};
window.addEventListener("pointermove",function(e){PTR.x=e.clientX;PTR.y=e.clientY;PTR.t=now()},{passive:true});
window.addEventListener("scroll",function(){HB.scrollT=now()},{passive:true});

/* ---------- gestures ---------- */
var HB={look:0,lookV:0,nod:0,nodV:0,tilt:0,tiltV:0,think:false,listen:0,joy:0,brow:0,scrollT:-9,typeT:-9};
var BEAT={v:0,n:0};
function beat(s){var tn=now();BEAT.v=Math.max(BEAT.v,s*.85);BEAT.n++;if((SPK||HB.listen)&&tn-(BEAT.lt||0)>.26){BEAT.lt=tn;HB.nodV+=1.15*s}}
var GS={name:"rest",t0:0,q:false},RIG={w:0};
/* NEU = the "hands low" pose; Shams only swaps between her rest photo and the rig while her hands are here */
var NEU={phi:.5,lift:-.62,ht:.12},LIFT_MIN=-.74,LIFT_MAX=.34;
function armState(){return {phi:NEU.phi,lift:NEU.lift,ht:NEU.ht,vp:0,vl:0,vh:0,o:0}}
var AR={L:armState(),R:armState()},TV={k:0,t:0};
function gesture(name,txt){GS.name=name;GS.t0=now();GS.q=/[?؟]/.test(txt||"");if(GS.q)HB.brow=1;PS.q=planFor(name);PS.until=0}
/* which hand points toward the page content: the one nearest the screen centre */
function contentSide(){var r=cv.getBoundingClientRect();return (r.left+r.width/2)>(window.innerWidth||1000)/2?"L":"R"}
function lookToContent(){return contentSide()==="L"?-1:1}
function P(l,phi,ht){return {lift:l,phi:phi,ht:ht,o:0}}
/* ---------- natural gestures ----------
   Shams moves between real hand poses the way a person explains something: palms open, a hand on her heart,
   presenting toward the page, a raised finger, fingertips together, hands at rest. One pose is held for
   1.5-3 s, strong words in her voice move her on a little sooner, and she never repeats the last two poses. */
var PS={prev:"clasp",cur:"clasp",k:1,w:1,tk:1,D:{L:0,R:0},pk:{L:1,R:1},lo:.3,hi:.7,sp:1,rel:1,then:null,amp:.12,until:0,q:[],last:[],bob:0,wa:0,ws:"R",ts:0,idleT:0,C:null};
function OS(c){return c==="L"?"R":"L"}
function planFor(n){var C=contentSide(),O=OS(C);
 switch(n){
  case "wave":return [["wave"+C,2.2],["heart"+C,1.6]];
  case "present":return [["present"+C,2.4],["explain"+C,1.7]];
  case "count":return [["point"+C,1.8],["palmsup",1.5]];
  case "open":return [["palmsup",1.9],["explain"+O,1.6]];
  case "joy":return [["heart"+C,1.7],["palmsup",1.4]];
  case "talk":return [];
  default:return [["clasp",.6]]}}
var TALK=[["palmsup",3],["steeple",2],["explainL",2.4],["explainR",2.4],["heart*",1.1],["heart#",.7],["present*",1.6],["point*",.9],["down",.7]];
function pickTalk(){var C=contentSide(),O=OS(C),tot=0,c=[];
 /* nearby poses are preferred, so one gesture flows into the next instead of jumping across the body */
 TALK.forEach(function(p){var n=p[0].replace("*",C).replace("#",O);if(n===PS.cur||PS.last.indexOf(n)>-1||!PI[n])return;var w=p[1]*Math.exp(-poseDist(PS.cur,n)/1.7);c.push([n,w]);tot+=w});
 var r=Math.random()*tot;for(var i=0;i<c.length;i++){r-=c[i][1];if(r<=0)return c[i][0]}return c.length?c[0][0]:"palmsup"}
/* ===================== skeletal arm motion =====================
   Between two gestures the arms really move: the shoulder, elbow and wrist angles of the old and the new pose are
   interpolated (minimum-jerk timing, the forearm and hand follow a beat later), and both photos are bent onto that
   same moving skeleton on the GPU. Because both images sit on the same arm at every instant, the hand-over between
   them reads as one arm in motion, not as two pictures fading. While a pose is held the arms keep breathing,
   follow the stress of her voice, and the waving hand turns at the wrist. */
var TAU=Math.PI*2;
function nrm(a,lo){while(a<=lo)a+=TAU;while(a>lo+TAU)a-=TAU;return a}
function toPar(sk,s){var m=s==="L"?1:-1,S=sk[0],E=sk[1],W=sk[2],T=sk[3];
 var a1=Math.atan2(E[1]-S[1],(E[0]-S[0])*m),a2=Math.atan2(W[1]-E[1],(W[0]-E[0])*m),a3=Math.atan2(T[1]-W[1],(T[0]-W[0])*m);
 return {a1:nrm(a1,-1.05),r2:nrm(a2-a1,-4.19),r3:nrm(a3-a2,-Math.PI),l1:Math.hypot(E[0]-S[0],E[1]-S[1]),l2:Math.hypot(W[0]-E[0],W[1]-E[1]),l3:Math.hypot(T[0]-W[0],T[1]-W[1]),S:S}}
function fromPar(p,s){var m=s==="L"?1:-1,S=p.S,A=p.a1,B=A+p.r2,C=B+p.r3;
 var E=[S[0]+Math.cos(A)*p.l1*m,S[1]+Math.sin(A)*p.l1],W=[E[0]+Math.cos(B)*p.l2*m,E[1]+Math.sin(B)*p.l2],T=[W[0]+Math.cos(C)*p.l3*m,W[1]+Math.sin(C)*p.l3];return [S,E,W,T]}
var PAR={};function initPar(){Object.keys(PI).forEach(function(n){PAR[n]={L:toPar(PI[n].sk.L,"L"),R:toPar(PI[n].sk.R,"R")}})}
function mj(x){x=cl(x,0,1);return x*x*x*(10+x*(6*x-15))}
function mixPar(A,B,k){var k1=mj(k),k2=mj((k-.07)/.93),k3=mj((k-.15)/.85);
 return {a1:A.a1+(B.a1-A.a1)*k1,r2:A.r2+(B.r2-A.r2)*k2,r3:A.r3+(B.r3-A.r3)*k3,l1:A.l1+(B.l1-A.l1)*k1,l2:A.l2+(B.l2-A.l2)*k2,l3:A.l3+(B.l3-A.l3)*k3,S:B.S}}
/* how alive each pose is while held (joined hands stay together) */
var AMP={clasp:.12,steeple:.18,down:.45};
function livePar(base,s,t,n){var p={a1:base.a1,r2:base.r2,r3:base.r3,l1:base.l1,l2:base.l2,l3:base.l3,S:base.S};if(reduced)return p;
 var A=PS.amp,ph=s==="L"?0:2.1,act=.25+.75*sstep(.3,.7,Math.abs(base.r2)),sp=PS.spk||0;
 p.a1+=A*.011*Math.sin(t*1.13+ph);
 p.r2+=A*(.026*Math.sin(t*.87+ph*1.3)+.012*Math.sin(t*2.3+ph))-A*act*sp*.075*BS.x;
 p.r3+=A*(.05*Math.sin(t*1.41+ph*.7))+A*act*sp*.09*BS.x;
 if(PS.wa>.001&&PS.ws===s)p.r3+=PS.wa*.25*Math.sin(t*12.2);
 return p}
function isUp(n){return /^(wave|point)/.test(n)}
/* ===================== motion core v3 =====================
   The arms are a real physical system: every joint (shoulder, elbow, wrist and the bone lengths) follows its
   target with a critically damped spring fed by a lightly smoothed target. So a gesture starts the moment it is
   asked for, accelerates and settles like a living arm, never overshoots, and a new gesture can take over in the
   middle of a movement with no jump in position or speed. The photo hand-over is driven by how far the arm has
   actually travelled (not by a clock), so it always happens while both photos sit on the same moving arm. */
var JK=["a1","r2","r3","l1","l2","l3"],JW={a1:8.6,r2:7.6,r3:6.4,l1:8.6,l2:7.6,l3:6.4},SKS=null;
var JOIN={clasp:1,steeple:1};
var BS={x:0,v:0};
var BODYP=null;function bodyPar(){if(BODYP)return BODYP;var o={};["L","R"].forEach(function(s){var k=PI.clasp.sk[s],q=[k[0].slice(),[k[1][0],k[1][1]+10],[k[2][0],k[2][1]+46],[k[3][0],k[3][1]+46]];o[s]=toPar(q,s)});return BODYP=o}
function skFrom(par){var o={};["L","R"].forEach(function(s){var p=par[s],q={S:p.S,v:{},y:{}};JK.forEach(function(k){q[k]=p[k];q.v[k]=0;q.y[k]=p[k]});o[s]=q});return o}
function pDist(A,B){return Math.abs(B.a1-A.a1)+Math.abs(B.r2-A.r2)*.9+Math.abs(B.r3-A.r3)*.5+(Math.abs(B.l1-A.l1)+Math.abs(B.l2-A.l2))/120}
function poseDist(a,b){if(!PAR[a]||!PAR[b])return 3;return Math.max(pDist(PAR[a].L,PAR[b].L),pDist(PAR[a].R,PAR[b].R))}
function goPose(n,via){if(!PI[n]||!PAR[n]||n===PS.cur)return;if(!SKS)SKS=skFrom(PAR[PS.cur]||PAR[n]);if(!via)PS.then=null;
 /* hands only join at the very end of a movement: from far away she flows through open palms (without stopping)
    and the clasp / steeple closes from there, so joined fingers are never pulled apart on screen */
 if(!via&&JOIN[n]&&!JOIN[PS.cur]&&PS.cur!=="palmsup"&&PI.palmsup&&PS.prev!=="body"&&Math.max(pDist(SKS.L,PAR[n].L),pDist(SKS.R,PAR[n].R))>1.1){goPose("palmsup",1);PS.then=n;return}
 /* the photo swap has not begun yet: simply steer the moving arm toward the new pose */
 var steer=PS.prev!=="body"&&PS.w<.02&&PS.k<1;
 if(!steer){PS.prev=PS.cur;PS.w=0}
 PS.cur=n;PS.ts=now();
 var B=PAR[n],tot=0;PS.D={};["L","R"].forEach(function(s){PS.D[s]=pDist(SKS[s],B[s]);tot+=PS.D[s]});PS.pk={L:0,R:0};PS.k=tot<.03?1:0;
 if(PS.prev===n){PS.w=1}
 /* joined hands (clasped / fingertips together) let go first and join last, so they never tear apart */
 var lo=.34,hi=.66;PS.rel=1;if(JOIN[PS.prev]&&!JOIN[n]){lo=0;hi=.2;if(!steer)PS.rel=0}else if(JOIN[n]&&!JOIN[PS.prev]){lo=.8;hi=1}PS.lo=lo;PS.hi=hi;
 /* a long sweep takes a little longer than a small one, like a real arm */
 PS.sp=(reduced?.8:1)*(1-.2*cl(Math.max(PS.D.L,PS.D.R)/3.4,0,1));
 PS.last.unshift(n);if(PS.last.length>2)PS.last.length=2}
function stepSkel(dt){if(!SKS)SKS=skFrom(PAR[PS.cur]);var B=PAR[PS.cur],sub=4,h=dt/sub,tf=1-Math.exp(-dt/.05),tot=0,acc=0;
 /* letting go of joined hands: the fingers unlock in place for a few frames, then the arms move off */
 var hold=false;if(PS.rel<1){PS.rel=Math.min(1,PS.rel+dt/.11);hold=PS.rel<.55}if(PS.frz&&now()<PS.frz)hold=true;
 ["L","R"].forEach(function(s){var q=SKS[s],b=B[s];q.S=b.S;
  JK.forEach(function(k){if(!hold)q.y[k]+=(b[k]-q.y[k])*tf;var w=JW[k]*PS.sp;for(var i=0;i<sub;i++){var a=w*w*(q.y[k]-q[k])-2*w*q.v[k];q.v[k]+=a*h;q[k]+=q.v[k]*h}});
  var D=PS.D[s]||0;if(D>.03){PS.pk[s]=Math.max(PS.pk[s],cl(1-pDist(q,b)/D,0,1));tot+=D;acc+=D*PS.pk[s]}});
 if(PS.k<1){PS.k=tot>0?acc/tot:1;if(PS.k>.975)PS.k=1}
 if(PS.prev==="body"){PS.tk=Math.min(1,(PS.tk||0)+dt/.28);PS.w=mj(PS.tk)}
 else PS.w=Math.max(PS.w,PS.k>=1?1:sstep(PS.lo,PS.hi,PS.k),PS.rel<1?sstep(0,1,PS.rel):0)}
function stepPose(dt,t){var sp=!!SPK||NQ.active,tn=now();PS.spk=(PS.spk||0)+((sp?1:0)-(PS.spk||0))*Math.min(1,dt*4);
 stepSkel(dt);
 if(PS.then&&PS.w>=1&&PS.k>=.4){var fin=PS.then;PS.then=null;goPose(fin,1)}
 var ready=PS.w>=1&&PS.k>=.8,steer=PS.w<.02&&PS.rel>=1&&PS.k<1&&PS.prev!=="body"&&PS.until===0&&PS.q.length>0;
 var big=cl(Math.max(PS.D.L||0,PS.D.R||0)/2,0,1);PS.bob=PS.k<1?Math.sin(Math.PI*PS.k)*big:0;
 /* a strong word while talking moves her on a little early (never before the pose has been seen) */
 if(sp&&ready&&!PS.q.length&&BEAT.v>.72&&tn>PS.until-.9&&tn-PS.ts>2)PS.until=tn;
 if(LEAVING){if((PS.cur===LEAVE_P&&!PS.then&&PS.w>=1&&PS.k>=.92)||tn-LEAVING.t>1.8){var lc=LEAVING.cb;LEAVING=null;leaveNow(lc)}}
 else if((ready||steer)&&tn>=PS.until){var nx=null,h=1;
  if(PS.q.length){var it=PS.q.shift();nx=it[0];h=it[1]}
  else if(sp){nx=pickTalk();h=2+Math.random()*1.4}
  else if(HB.think){nx="steeple";h=1.4}
  else if(PS.cur!=="clasp"&&PS.cur!=="down"){nx="clasp";h=1;PS.idleT=tn+14+Math.random()*10}
  else if(tn>PS.idleT){if(PS.idleT)nx=PS.cur==="clasp"?"down":"clasp";PS.idleT=tn+(PS.cur==="down"?5:14+Math.random()*10);h=1}
  if(nx&&nx!==PS.cur)goPose(nx);PS.until=tn+h+(PS.k<1?.45:0)}
 /* how alive the held pose is: joined hands calm down at once, open poses wake up gently */
 var at=AMP[PS.cur]!=null?AMP[PS.cur]:1;PS.amp+=(at-PS.amp)*Math.min(1,dt*(at<PS.amp?7:1.6));
 /* waving: the hand turns at the wrist, easing in and out */
 var wv=/^wave/.test(PS.cur)&&PS.k>.85;if(wv)PS.ws=PS.cur.slice(4);
 PS.wa+=((wv?1:0)-PS.wa)*Math.min(1,dt*(wv?5:7))}
/* ---------- GPU arm warping (falls back to a plain cross-fade if WebGL is unavailable) ----------
   Only the band where the arms live (y GY0..GY0+GH) is rendered on the GPU, in one pass per frame:
   sleeves behind -> torso -> hands in front, and during a hand-over both poses are mixed on the GPU too. */
var GLR=null,GY0=40,GH=520;
function initGL(){try{var c=mk(HW,GH),gl=c.getContext("webgl",{premultipliedAlpha:true,preserveDrawingBuffer:true,alpha:true,antialias:false,depth:false,stencil:false});if(!gl)return null;
 /* hand-over: both poses keep their full body while they swap, so nothing ever turns see-through */
 var fm="precision mediump float;uniform sampler2D ta;uniform sampler2D tb;uniform float w;varying vec2 v;void main(){vec4 A=texture2D(ta,v),B=texture2D(tb,v);"+
  "float aa=A.a*min(1.0,3.0-3.0*w),ba=B.a*min(1.0,3.0*w),al=1.0-(1.0-aa)*(1.0-ba),wa=aa*(1.0-w),wb=ba*w,s=wa+wb;"+
  "vec3 ca=A.rgb/max(A.a,0.0001),cb=B.rgb/max(B.a,0.0001);vec3 col=s>0.0001?(ca*wa+cb*wb)/s:vec3(0.0);gl_FragColor=vec4(col*al,al);}";
 var vs="attribute vec2 p;attribute vec2 u;uniform vec2 r;uniform float oy;varying vec2 v;void main(){v=u;gl_Position=vec4(p.x/r.x*2.0-1.0,1.0-(p.y-oy)/r.y*2.0,0.0,1.0);}";
 var fs="precision mediump float;uniform sampler2D t;uniform float a;varying vec2 v;void main(){gl_FragColor=texture2D(t,v)*a;}";
 function sh(ty,s){var o=gl.createShader(ty);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error("sh");return o}
 function prog(f){var o=gl.createProgram();gl.attachShader(o,sh(gl.VERTEX_SHADER,vs));gl.attachShader(o,sh(gl.FRAGMENT_SHADER,f));gl.bindAttribLocation(o,0,"p");gl.bindAttribLocation(o,1,"u");gl.linkProgram(o);if(!gl.getProgramParameter(o,gl.LINK_STATUS))throw new Error("ln");return o}
 var pr=prog(fs),pm=prog(fm);
 gl.useProgram(pm);gl.uniform2f(gl.getUniformLocation(pm,"r"),HW,GH);gl.uniform1f(gl.getUniformLocation(pm,"oy"),GY0);gl.uniform1i(gl.getUniformLocation(pm,"ta"),0);gl.uniform1i(gl.getUniformLocation(pm,"tb"),1);
 gl.useProgram(pr);
 var R={c:c,gl:gl,pr:pr,pm:pm,uw:gl.getUniformLocation(pm,"w"),pp:0,pu:1,ua:gl.getUniformLocation(pr,"a"),bp:gl.createBuffer(),bu:gl.createBuffer(),bi:gl.createBuffer(),qp:gl.createBuffer(),qu:gl.createBuffer(),qf:gl.createBuffer()};
 gl.uniform2f(gl.getUniformLocation(pr,"r"),HW,GH);gl.uniform1f(gl.getUniformLocation(pr,"oy"),GY0);gl.uniform1i(gl.getUniformLocation(pr,"t"),0);gl.uniform1f(R.ua,1);gl.viewport(0,0,HW,GH);
 gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
 gl.enableVertexAttribArray(R.pp);gl.enableVertexAttribArray(R.pu);
 function tex(){var t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t}
 R.tex=tex;
 /* two off-screen targets for the hand-over mix */
 R.fb=[0,1].map(function(){var t=tex();gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,HW,GH,0,gl.RGBA,gl.UNSIGNED_BYTE,null);var f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,t,0);return {t:t,f:f}});
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw new Error("fb");gl.bindFramebuffer(gl.FRAMEBUFFER,null);
 /* the torso band as a texture */
 var tc=mk(HW,GH);tc.getContext("2d").drawImage(TORSO,0,GY0,HW,GH,0,0,HW,GH);R.tt=tex();gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,tc);
 var q=new Float32Array([0,GY0,HW,GY0,0,GY0+GH,HW,GY0,HW,GY0+GH,0,GY0+GH]);gl.bindBuffer(gl.ARRAY_BUFFER,R.qp);gl.bufferData(gl.ARRAY_BUFFER,q,gl.STATIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,R.qu);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,0,1,1,0,1]),gl.STATIC_DRAW);
 gl.bindBuffer(gl.ARRAY_BUFFER,R.qf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,1,1,1,0,0,1,1,1,0,0,0]),gl.STATIC_DRAW);
 c.addEventListener("webglcontextlost",function(e){e.preventDefault();GLR=null},false);
 return R}catch(e){return null}}
function segD(px,py,A,B){var dx=B[0]-A[0],dy=B[1]-A[1],L=dx*dx+dy*dy||1,t=cl(((px-A[0])*dx+(py-A[1])*dy)/L,0,1),x=A[0]+t*dx-px,y=A[1]+t*dy-py;return Math.sqrt(x*x+y*y)}
function mkMesh(o,sk,w0k){w0k=w0k||1;var gl=GLR.gl,w=o.i.naturalWidth||o.i.width,h=o.i.naturalHeight||o.i.height,CS=11,nx=Math.max(2,Math.ceil(w/CS)+1),ny=Math.max(2,Math.ceil(h/CS)+1),n=nx*ny;
 var src=new Float32Array(n*2),uv=new Float32Array(n*2),wt=new Float32Array(n*3),idx=new Uint16Array((nx-1)*(ny-1)*6),q=0;
 for(var j=0;j<ny;j++)for(var i=0;i<nx;i++){var v=j*nx+i,px=o.x+w*i/(nx-1),py=o.y+h*j/(ny-1);src[v*2]=px;src[v*2+1]=py;uv[v*2]=i/(nx-1);uv[v*2+1]=j/(ny-1);
  var s=0,ww=[0,0,0];for(var b=0;b<3;b++){var d=segD(px,py,sk[b],sk[b+1]);ww[b]=(b?1:w0k)/Math.pow(d+8,4);s+=ww[b]}for(b=0;b<3;b++)wt[v*3+b]=ww[b]/s}
 for(j=0;j<ny-1;j++)for(i=0;i<nx-1;i++){var a=j*nx+i;idx[q++]=a;idx[q++]=a+1;idx[q++]=a+nx;idx[q++]=a+1;idx[q++]=a+nx+1;idx[q++]=a+nx}
 var tx=GLR.tex();
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,o.i);
 var ub=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,ub);gl.bufferData(gl.ARRAY_BUFFER,uv,gl.STATIC_DRAW);var ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,idx,gl.STATIC_DRAW);
 return {tx:tx,n:n,src:src,uv:uv,ub:ub,ib:ib,wt:wt,idx:idx,dst:new Float32Array(n*2)}}
function prepArms(){initPar();GLR=initGL();if(!GLR)return;try{Object.keys(PI).forEach(function(n){var p=PI[n];["L","R"].forEach(function(s){["b","f"].forEach(function(l){var o=p[s+l];if(o&&o.i.width)o.m=mkMesh(o,p.sk[s],l==="f"&&Math.abs(PAR[n][s].r2)>2.3?.03:1)})})})}catch(e){GLR=null}}
/* bone transform: rest bone (P0->P1) onto moving bone (Q0->Q1): rotate, and stretch only along the bone */
function boneM(P0,P1,Q0,Q1){var px=P1[0]-P0[0],py=P1[1]-P0[1],qx=Q1[0]-Q0[0],qy=Q1[1]-Q0[1],lp=Math.hypot(px,py)||1,lq=Math.hypot(qx,qy);
 var s=lp>14?cl(lq/lp,.6,1.7):1,ux=px/lp,uy=py/lp,an=Math.atan2(qy,qx)-Math.atan2(py,px),c=Math.cos(an),sn=Math.sin(an);
 var s00=s*ux*ux+uy*uy,s01=(s-1)*ux*uy,s11=s*uy*uy+ux*ux;
 var a=c*s00-sn*s01,b=c*s01-sn*s11,d=sn*s00+c*s01,e=sn*s01+c*s11;
 return [a,b,Q0[0]-a*P0[0]-b*P0[1],d,e,Q0[1]-d*P0[0]-e*P0[1]]}
function glQuad(tx,uvb,al){var R=GLR,gl=R.gl;gl.uniform1f(R.ua,al);gl.bindBuffer(gl.ARRAY_BUFFER,R.qp);gl.vertexAttribPointer(R.pp,2,gl.FLOAT,false,0,0);
 gl.bindBuffer(gl.ARRAY_BUFFER,uvb);gl.vertexAttribPointer(R.pu,2,gl.FLOAT,false,0,0);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tx);gl.drawArrays(gl.TRIANGLES,0,6);gl.uniform1f(R.ua,1)}
function glLayers(n,C,kind){var R=GLR,gl=R.gl,p=PI[n];
 ["L","R"].forEach(function(s){var o=p[s+kind];if(!o||!o.m)return;var m=o.m,rest=p.sk[s],Q=fromPar(C[s],s),M=[boneM(rest[0],rest[1],Q[0],Q[1]),boneM(rest[1],rest[2],Q[1],Q[2]),boneM(rest[2],rest[3],Q[2],Q[3])];
  /* near a joint the skin turns around that joint (by exactly the joint's own rotation) instead of being averaged,
     so elbows and wrists keep their thickness through big bends */
  var P0=PAR[n][s],mm=s==="L"?1:-1,d01=mm*(C[s].r2-P0.r2),d12=mm*(C[s].r3-P0.r3),E=Q[1],Wj=Q[2],src=m.src,wt=m.wt,dst=m.dst;
  for(var v=0;v<m.n;v++){var x=src[v*2],y=src[v*2+1],w0=wt[v*3],w1=wt[v*3+1],w2=wt[v*3+2],T=M[0],ax=T[0]*x+T[1]*y+T[2],ay=T[3]*x+T[4]*y+T[5],bx,by;
   var t1=w0+w1>1e-6?w1/(w0+w1):1;
   if(t1>.002){T=M[1];bx=T[0]*x+T[1]*y+T[2];by=T[3]*x+T[4]*y+T[5];if(t1>.998){ax=bx;ay=by}else{arc(ax,ay,bx,by,t1,E,d01);ax=AX;ay=AY}}
   if(w2>.002){T=M[2];bx=T[0]*x+T[1]*y+T[2];by=T[3]*x+T[4]*y+T[5];if(w2>.998){ax=bx;ay=by}else{arc(ax,ay,bx,by,w2,Wj,d12);ax=AX;ay=AY}}
   dst[v*2]=ax;dst[v*2+1]=ay}
  gl.bindBuffer(gl.ARRAY_BUFFER,R.bp);gl.bufferData(gl.ARRAY_BUFFER,m.dst,gl.DYNAMIC_DRAW);gl.vertexAttribPointer(R.pp,2,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,m.ub);gl.vertexAttribPointer(R.pu,2,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,m.ib);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,m.tx);gl.drawElements(gl.TRIANGLES,m.idx.length,gl.UNSIGNED_SHORT,0)})}
var AX=0,AY=0;
function arc(ax,ay,bx,by,t,J,ref){var ux=ax-J[0],uy=ay-J[1],vx=bx-J[0],vy=by-J[1],ra=Math.sqrt(ux*ux+uy*uy),rb=Math.sqrt(vx*vx+vy*vy);
 if(ra<.6||rb<.6){AX=ax+(bx-ax)*t;AY=ay+(by-ay)*t;return}
 var a=Math.atan2(uy,ux),d=Math.atan2(vy,vx)-a;d+=TAU*Math.round((ref-d)/TAU);var an=a+d*t,r=ra+(rb-ra)*t;AX=J[0]+Math.cos(an)*r;AY=J[1]+Math.sin(an)*r}
/* one complete upper figure on the GPU: pose n bent onto skeleton C (sleeves behind, torso, hands in front) */
function glFigure(n,C){var gl=GLR.gl;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);glLayers(n,C,"b");glQuad(GLR.tt,GLR.qu,1);glLayers(n,C,"f")}
function drawStatic(x,n){if(n==="body"||!PI[n]){x.drawImage(IM.body,0,0,HW,HH);return}var p=PI[n];
 ["Lb","Rb"].forEach(function(k){var o=p[k];if(o)x.drawImage(o.i,o.x,o.y)});x.drawImage(TORSO,0,0);["Lf","Rf"].forEach(function(k){var o=p[k];if(o)x.drawImage(o.i,o.x,o.y)})}
function glOK(){return GLR&&!GLR.gl.isContextLost()}
/* any full-figure picture -> the arm band as a texture (same orientation as the off-screen targets) */
function bandTex(key,src,keep){var R=GLR,gl=R.gl;if(keep&&R[key+"s"]===src)return R[key];
 var c=R.bc||(R.bc=mk(HW,GH)),x=c.getContext("2d");x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation="source-over";x.clearRect(0,0,HW,GH);x.drawImage(src,0,-GY0,HW,HH);
 var t=R[key]||(R[key]=R.tex());gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
 R[key+"s"]=keep?src:null;return t}
/* mix two band textures with the coverage-preserving shader straight onto the GL canvas */
function glMixTex(ta,tb,w){var R=GLR,gl=R.gl;gl.bindFramebuffer(gl.FRAMEBUFFER,null);
 gl.disable(gl.BLEND);gl.useProgram(R.pm);gl.uniform1f(R.uw,w);
 gl.bindBuffer(gl.ARRAY_BUFFER,R.qp);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,R.qf);gl.vertexAttribPointer(1,2,gl.FLOAT,false,0,0);
 gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tb);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,ta);gl.drawArrays(gl.TRIANGLES,0,6);
 gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,null);gl.activeTexture(gl.TEXTURE0);gl.useProgram(R.pr);gl.enable(gl.BLEND)}
/* two whole pictures of her swap without ever turning see-through (the arm band is mixed on the GPU) */
function mixPhotos(f,A,B,w,keepA){f.globalAlpha=1;f.globalCompositeOperation="source-over";
 if(w<=0){f.drawImage(A,0,0,HW,HH);return}if(w>=1){f.drawImage(B,0,0,HW,HH);return}
 f.globalAlpha=1-w;f.drawImage(A,0,0,HW,HH);f.globalCompositeOperation="lighter";f.globalAlpha=w;f.drawImage(B,0,0,HW,HH);f.globalCompositeOperation="source-over";f.globalAlpha=1;
 if(glOK()){try{var ta=bandTex("ma",A,keepA),tb=bandTex("mb",B,false);glMixTex(ta,tb,w);f.clearRect(0,GY0,HW,GH);f.drawImage(GLR.c,0,GY0)}catch(e){}}}
/* the whole figure while she is on stage: a = previous pose, b = current pose, kk = hand-over (0..1) */
function drawFigOn(x,a,b,C,kk){
 if(!glOK()||!PI[b]||(kk<1&&!PI[a]&&a!=="body")){if(kk>=1){drawStatic(x,b);return}
  [pa,pb].forEach(function(y){y.setTransform(1,0,0,1,0,0);y.globalAlpha=1;y.globalCompositeOperation="source-over";y.clearRect(0,0,HW,HH)});
  drawStatic(pa,a);drawStatic(pb,b);x.globalAlpha=1-kk;x.drawImage(PA,0,0);x.globalCompositeOperation="lighter";x.globalAlpha=kk;x.drawImage(PB,0,0);x.globalCompositeOperation="source-over";x.globalAlpha=1;return}
 var gl=GLR.gl;
 if(kk<1&&a==="body"){x.save();x.beginPath();x.rect(0,0,HW,GY0);x.rect(0,GY0+GH,HW,HH-GY0-GH);x.clip();
  x.globalAlpha=1-kk;x.drawImage(IM.body,0,0,HW,HH);x.globalCompositeOperation="lighter";x.globalAlpha=kk;x.drawImage(TORSO,0,0);x.restore()}
 else{x.drawImage(TORSO,0,0,HW,GY0,0,0,HW,GY0);x.drawImage(TORSO,0,GY0+GH,HW,HH-GY0-GH,0,GY0+GH,HW,HH-GY0-GH)}
 if(kk>=1){gl.bindFramebuffer(gl.FRAMEBUFFER,null);glFigure(b,C)}
 else if(a==="body"){gl.bindFramebuffer(gl.FRAMEBUFFER,GLR.fb[1].f);glFigure(b,C);glMixTex(bandTex("bt",IM.body,true),GLR.fb[1].t,kk)}
 else{gl.bindFramebuffer(gl.FRAMEBUFFER,GLR.fb[0].f);glFigure(a,C);gl.bindFramebuffer(gl.FRAMEBUFFER,GLR.fb[1].f);glFigure(b,C);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  /* hand-over of the two poses, both already sitting on the same moving arm; coverage is kept solid */
  gl.disable(gl.BLEND);gl.useProgram(GLR.pm);gl.uniform1f(GLR.uw,kk);
  gl.bindBuffer(gl.ARRAY_BUFFER,GLR.qp);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,GLR.qf);gl.vertexAttribPointer(1,2,gl.FLOAT,false,0,0);
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,GLR.fb[1].t);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,GLR.fb[0].t);gl.drawArrays(gl.TRIANGLES,0,6);
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,null);gl.activeTexture(gl.TEXTURE0);gl.useProgram(GLR.pr);gl.enable(gl.BLEND)}
 x.drawImage(GLR.c,0,GY0)}
function curSkel(t){if(!SKS)SKS=skFrom(PAR[PS.cur]);var C={};["L","R"].forEach(function(s){C[s]=livePar(SKS[s],s,t,PS.cur)});return C}
var PA,pa,PB,pb,SNAP,sn,SNAPON=0;

/* ---------- head, brows, blinks ---------- */
var blinkV=0,nextBlink=2;
function blinkNow(){if(blinkV<=0)blinkV=1}
function stepHead(dt,t){var H=HB,lt=0,tt=0,ny=0,sp=!!SPK||NQ.active;
 if(H.think){lt=.35*lookToContent()*-1;ny=-.9;tt=-.35}
 else if(H.listen>0){lt=panelSide()*.35;tt=.55;H.listen=Math.max(0,H.listen-dt*.25)}
 else if(sp){var n=GS.name,e=t-GS.t0;lt=(n==="present"&&e<3.4)?lookToContent()*.65:(n==="count"?lookToContent()*.25:0);lt+=Math.sin(t*.9)*.08;tt=Math.sin(t*.53)*.25+(GS.q?.35:0)}
 else if(t-PTR.t<1.8&&PTR.t>0){var r=cv.getBoundingClientRect();lt=cl((PTR.x-(r.left+r.width/2))/((window.innerWidth||1000)*.45),-1,1)*.75;ny=cl((PTR.y-(r.top+r.height*.2))/600,-1,1)*.4}
 else{if(t>idle.next){idle.next=t+5+Math.random()*6;idle.tg=(Math.random()<.5?-1:1)*(.45+Math.random()*.45);idle.until=t+1.3+Math.random()}
  if(t<idle.until)lt=idle.tg;if(t-H.scrollT<.8)ny=.35}
 H.lookV+=(38*(lt-H.look)-10*H.lookV)*dt;H.look+=H.lookV*dt;
 H.nodV+=(-90*H.nod-11*H.nodV)*dt;H.nod+=H.nodV*dt;H.nodBase=(H.nodBase||0)+(ny-(H.nodBase||0))*Math.min(1,dt*3);
 H.tiltV+=(30*(tt-H.tilt)-9*H.tiltV)*dt;H.tilt+=H.tiltV*dt;
 H.brow=Math.max(0,H.brow-dt*(SPK&&SPK.q?.25:.9));H.joy=Math.max(0,H.joy-dt*.8);BEAT.v=Math.max(0,BEAT.v-dt*3.2);
 if(t>nextBlink){blinkNow();nextBlink=t+2+Math.random()*3.6;if(Math.random()<.18)setTimeout(blinkNow,260)}
 blinkV=Math.max(0,blinkV-dt*7.5)}
var idle={next:4,tg:0,until:0};
function panelSide(){var p=$("olh-panel").getBoundingClientRect(),r=cv.getBoundingClientRect();if(!p.width)return 0;return (p.left+p.width/2)<(r.left+r.width/2)?-1:1}

function stopSpeak(){stopNarration()}
/* chat answers: recorded voice when the answer is one of Shams's own lines, otherwise live voice */
function speakReply(text,L,key){stopNarration();var g0=GS;
 if(key&&hasClip(key,L)&&canVoice()){gesture((LINES[key]||{}).g||"open",text);playClip(key,L).then(function(ok){if(ok)gesture("rest")});return}
 gesture(/\d/.test(text)?"count":"open",text);
 if(!canVoice()){setTimeout(function(){if(!SPK&&!NQ.active)gesture("rest")},3200);return}
 var arr=["present","talk","open","count","talk"],k=0,gi=setInterval(function(){if(SPK)gesture(arr[k++%arr.length],text)},3600);
 speakText(text,L).then(function(ok){clearInterval(gi);if(ok!==false||!SPK)gesture("rest")})}
function chatOpened(){stopNarration();hideBubble();HB.listen=1;
 if(mode==="on"&&canVoice()&&hasClip("x.chat",lang)){gesture("open");playClip("x.chat",lang).then(function(ok){if(ok)gesture("rest")})}}

/* ---------- living guide: Shams appears from between the olive trees (canvas scene) ---------- */
var FACE=K.face,g=cv.getContext("2d"),vis=true,skinC="#D7BC8E",lidC="#5A3A30";
var CW=cv.width,CH=cv.height,HX=142,HY=52,HW=476,HH=900;
var IM={body:new Image(),push:new Image(),branch:new Image()},left=3;
/* ---- Shams's gesture library: every pose has, per arm, the sleeve behind the shawl (b), the hand/forearm in front
   of it (f) and a skeleton (shoulder, elbow, wrist, fingertips). Her torso, shawl and face are never redrawn. ---- */
var PZ=JSON.parse($("olh-poses").textContent),PI={};
Object.keys(PZ).forEach(function(n){var r=PZ[n],o={sk:r.sk};["Lb","Lf","Rb","Rf"].forEach(function(k){if(!r[k])return;var i=new Image();left++;i.onload=onImg;i.onerror=onImg;i.src=r[k].d;o[k]={i:i,x:r[k].x,y:r[k].y}});PI[n]=o});
function onImg(){if(--left===0)start()}
IM.body.onload=IM.push.onload=IM.branch.onload=onImg;IM.body.src=IMG.body;IM.push.src=IMG.push;IM.branch.src=IMG.branch;
$("olh-fimg").src=IMG.face;$("olh-limg").src=IMG.face;
if(window.IntersectionObserver)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
/* ===================================================================================
   OLIVE GROVE REVEAL ENGINE
   Shams waits hidden behind a living hedge of olive branches. She steps up, her hands slip
   between the twigs and sweep them aside (each branch is a damped spring that bends along
   its length and follows her hands by contact), she steps through into the light, the
   branches recoil, react to her glances, then gracefully withdraw shedding a few leaves.
   Leaving plays the same story in reverse.
   =================================================================================== */
function mk(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c}
function cl(x,a,b){return x<a?a:x>b?b:x}
function ease(x){x=cl(x,0,1);return 1-Math.pow(1-x,3)}
function inout(x){x=cl(x,0,1);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}
function sstep(a,b,x){x=cl((x-a)/(b-a),0,1);return x*x*(3-2*x)}
var FILTER=(function(){try{var c=mk(2,2).getContext("2d");c.filter="blur(2px)";return c.filter==="blur(2px)"}catch(e){return false}})();
var headC=null;
function makeHead(){headC=mk(130,160);var x=headC.getContext("2d");
 x.drawImage(IM.body,FACE.head[0],FACE.head[1],130,160,0,0,130,160);x.globalCompositeOperation="destination-in";
 var gr=x.createRadialGradient(65,70,30,65,70,78);gr.addColorStop(0,"rgba(0,0,0,1)");gr.addColorStop(.72,"rgba(0,0,0,1)");gr.addColorStop(1,"rgba(0,0,0,0)");
 x.save();x.scale(1,1.12);x.fillStyle=gr;x.fillRect(0,0,130,160);x.restore();
 try{var c=mk(4,4);var y=c.getContext("2d");y.drawImage(IM.body,FACE.eyeL[0]-2,FACE.eyeL[1]-9,4,4,0,0,4,4);var p=y.getImageData(1,1,1,1).data;skinC="rgb("+p[0]+","+p[1]+","+p[2]+")"}catch(e){}}
/* ---- rig: Shams's arms are cut from the "push" pose so they can swing from the shoulder ---- */
/* ---- rig v2: two bones per arm. Shoulder joint (rotation + light foreshortening) and a wrist joint, so the
   palm stays natural while the arm moves, waves come from the wrist and nothing is ever squashed into a stub. ---- */
var ARMDEF={L:{s:-1,pv:[141,182],hand:[-119,-7],wr:[30,222],hp:[[-6,116],[46,116],[46,206],[44,208],[16,234],[-6,236]],hx:[[-6,116],[48,116],[52,212],[24,248],[-6,248]],poly:[[0,96],[125,96],[148,146],[145,153],[144,160],[145,166],[140,172],[139,178],[138,184],[137,196],[137,214],[138,226],[140,232],[142,238],[144,244],[140,248],[128,262],[100,294],[70,312],[0,312]]},
            R:{s:1,pv:[343,184],hand:[111,-9],wr:[449,229],hp:[[430,116],[482,116],[482,248],[463,243],[434,213],[430,209]],hx:[[426,116],[482,116],[482,260],[458,260],[424,220]],poly:[[476,96],[356,96],[320,146],[328,154],[335,160],[338,166],[343,172],[347,178],[351,184],[354,190],[355,196],[351,202],[348,208],[346,214],[344,220],[342,226],[340,232],[337,238],[335,244],[333,248],[345,262],[396,298],[412,312],[476,312]]}};
var PHI0=2.14; /* ~123deg: hands together in front of her chest */
var TORSO,ARM={},ARMF={},HAND={},BR={},FIG=mk(HW,HH),f=FIG.getContext("2d"),RIGC=mk(HW,HH),rg=RIGC.getContext("2d");
PA=mk(HW,HH);pa=PA.getContext("2d");PB=mk(HW,HH);pb=PB.getContext("2d");SNAP=mk(HW,HH);sn=SNAP.getContext("2d");
function poly(x,pts){x.beginPath();pts.forEach(function(p,i){i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath()}
function prepRig(){
 TORSO=mk(HW,HH);var t=TORSO.getContext("2d");t.drawImage(IM.push,0,0,HW,HH);t.globalCompositeOperation="destination-out";
 [[0,158,HW,HH],[0,0,120,158],[360,0,HW-360,158]].forEach(function(r){t.save();t.beginPath();t.rect(r[0],r[1],r[2],r[3]);t.clip();poly(t,ARMDEF.L.poly);t.fill();poly(t,ARMDEF.R.poly);t.fill();t.restore()});
 ["L","R"].forEach(function(k){var A=ARMDEF[k];
  var c=mk(HW,HH),x=c.getContext("2d");x.save();poly(x,A.poly);x.clip();x.drawImage(IM.push,0,0,HW,HH);x.restore();x.globalCompositeOperation="destination-out";var sg=x.createLinearGradient(0,132,0,170);sg.addColorStop(0,"rgba(0,0,0,1)");sg.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=sg;x.fillRect(0,0,HW,170);x.fillStyle="#000000";poly(x,A.hp);x.fill();x.globalCompositeOperation="source-over";ARM[k]=c;
  var hc=mk(HW,HH),hx=hc.getContext("2d");hx.save();poly(hx,A.hx);hx.clip();hx.drawImage(IM.push,0,0,HW,HH);hx.restore();HAND[k]=hc;
  /* feathered copy for when the arm crosses in front of her chest */
  var c2=mk(HW,HH),y=c2.getContext("2d");y.drawImage(c,0,0);y.globalCompositeOperation="destination-out";
  var x0=A.s<0?140:338,x1=A.s<0?112:368,gr=y.createLinearGradient(x0,0,x1,0);gr.addColorStop(0,"rgba(0,0,0,1)");gr.addColorStop(1,"rgba(0,0,0,0)");
  y.fillStyle=gr;y.fillRect(Math.min(x0,x1)-30,0,Math.abs(x1-x0)+60,HH);ARMF[k]=c2});
 /* branch looks: mid = crisp, near = soft focus foreground, back = shaded + out of focus */
 var bw=IM.branch.width,bh=IM.branch.height;
 function variant(pad,flt,tint){var c=mk(bw+pad*2,bh+pad*2),x=c.getContext("2d");if(FILTER&&flt)x.filter=flt;x.drawImage(IM.branch,pad,pad);x.filter="none";
  if(tint){x.globalCompositeOperation="source-atop";x.fillStyle=tint;x.fillRect(0,0,c.width,c.height)}return {c:c,p:pad}}
 BR.mid={c:IM.branch,p:0};
 BR.near=variant(6,"blur(1.6px) brightness(1.04) saturate(1.05)",null);
 BR.back=variant(8,"blur(2.4px) brightness(.62) saturate(.8)",FILTER?"rgba(30,42,24,.18)":"rgba(25,36,20,.5)");
}
/* ---- branches: [side, pivotY, restRotation, scale, tier(0 back · 1 mid · 2 near)] ---- */
var BDEF=[[-1,70,.26,.70,0],[1,96,-.22,.72,0],[-1,410,-.14,.66,0],[1,440,.18,.64,0],[-1,700,.10,.62,0],[1,730,-.12,.62,0],
 [-1,34,.16,.74,1],[1,58,-.12,.76,1],[-1,120,.10,.80,1],[1,150,-.06,.78,1],[-1,214,-.02,.92,1],[1,236,.04,.90,1],[-1,340,.08,.86,1],[1,362,-.08,.88,1],
 [-1,480,-.05,.84,1],[1,502,.06,.82,1],[-1,640,.07,.80,1],[1,662,-.04,.80,1],[-1,800,-.03,.74,1],[1,818,.05,.74,1],
 [1,282,.03,1.02,2],[-1,566,-.04,1.0,2]];
var SLIDE=215,ROT=.5,NS=12,TIP=[480,84];
var BRS=[];
function tipOut(b,o){var k=b.tier===0?.55:1,oo=Math.min(o,1.25),gx=o*SLIDE*k,r=b.r0+b.dir*oo*ROT*k;
 return CW/2-(-gx+b.sc*(Math.cos(r)*TIP[0]-Math.sin(r)*TIP[1]))}
function initBranches(){var fr=0,bk=0;BRS=BDEF.map(function(d,i){var b={s:d[0],py:d[1],r0:d[2],sc:d[3],tier:d[4],dir:d[1]<300?-1:1,ph:Math.random()*6.283,
  o:1.7,v:0,b:0,bv:0,a:0,away:0,act:0,awayT:0,latch:0,touched:0,shed:0,rank:d[4]===0?bk++:fr++};
  b.t0=tipOut(b,0);b.D=Math.max(60,tipOut(b,1)-b.t0);b.by=b.py+40*b.sc;return b});
 BRS.sort(function(a,c){return a.tier-c.tier})}
function resetBranches(open){BRS.forEach(function(b){b.o=1.7;b.v=0;b.b=0;b.bv=0;b.a=0;b.away=0;b.latch=0;b.touched=open?1:0;b.shed=0})}
/* ---- falling olive leaves: flutter, tumble (silver underside), drift ---- */
var LEAVES=[];
function leafAt(x,y,dir){LEAVES.push({x:x,y:y,vx:dir*(30+Math.random()*70),vy:-40-Math.random()*60,r:Math.random()*6.283,fl:Math.random()*6.283,vf:(Math.random()<.5?-1:1)*(4+Math.random()*5),
 sw:Math.random()*6.283,vs:2+Math.random()*1.6,s:.95+Math.random()*.5,a:1,life:2.4+Math.random()*1.4,age:0})}
function stepLeaves(dt){LEAVES=LEAVES.filter(function(l){l.age+=dt;if(l.age>l.life)return false;l.sw+=l.vs*dt;
 l.vy+=(120-l.vy)*Math.min(1,dt*1.8);l.vx+=(Math.sin(l.sw)*60-l.vx)*Math.min(1,dt*1.5);l.x+=l.vx*dt;l.y+=l.vy*dt;
 l.fl+=l.vf*dt;l.r+=Math.cos(l.sw)*dt*1.4;l.a=1-sstep(l.life-.7,l.life,l.age);return true})}
function drawLeaves(){LEAVES.forEach(function(l){var fy=Math.cos(l.fl),top=fy>0;g.save();g.globalAlpha=l.a;g.translate(l.x,l.y);g.rotate(l.r);g.scale(l.s,l.s*Math.max(.1,Math.abs(fy)));
 var lg=g.createLinearGradient(0,-8,0,8);if(top){lg.addColorStop(0,"#5A7F47");lg.addColorStop(1,"#365029")}else{lg.addColorStop(0,"#C4CAB2");lg.addColorStop(1,"#949D79")}
 g.fillStyle=lg;g.beginPath();g.moveTo(-24,0);g.bezierCurveTo(-12,-8.5,10,-7,25,0);g.bezierCurveTo(10,7,-12,8.5,-24,0);g.fill();
 g.strokeStyle=top?"rgba(195,204,168,.55)":"rgba(85,110,72,.55)";g.lineWidth=1;g.beginPath();g.moveTo(-27,0);g.lineTo(21,0);g.stroke();g.restore()})}
function tipWorld(b){var k=b.tier===0?.55:1,oo=Math.min(Math.max(b.o,0),1.25),gx=b.o*SLIDE*k+b.away*230,gy=b.dir*oo*22*k+b.away*50,r=b.r0+b.dir*oo*ROT*k+b.b*.6,
 lx=-gx+b.sc*(Math.cos(r)*(TIP[0]-60)-Math.sin(r)*TIP[1]),ly=b.py+gy+b.sc*(Math.sin(r)*(TIP[0]-60)+Math.cos(r)*TIP[1]);return [b.s<0?lx:CW-lx,ly]}
function shed(b,n){var p=tipWorld(b);for(var i=0;i<n;i++)leafAt(p[0]+(Math.random()-.5)*60,p[1]+(Math.random()-.5)*50,b.s)}
/* ---- draw one branch, bent along its length (sliced skeleton) ---- */
function drawBranch(b,t,trem,g){var alpha=b.a*(1-b.away);if(alpha<=.01)return;
 var k=b.tier===0?.55:1,oo=Math.min(Math.max(b.o,0),1.25);
 var gx=b.o*SLIDE*k+b.away*230,gy=b.dir*oo*22*k+b.away*50;
 var wind=(Math.sin(t*1.1+b.ph)*.016+Math.sin(t*.47+b.ph*2)*.011)*(b.tier===0?.7:1);
 var r=b.r0+b.dir*oo*ROT*k+wind+trem*(Math.sin(t*29+b.ph)*.045+Math.sin(t*17+b.ph*3)*.025)+b.away*b.dir*.2;
 var bend=b.b+Math.sin(t*1.7+b.ph)*.022+trem*Math.sin(t*23+b.ph)*.05;
 var src=b.tier===0?BR.back:(b.tier===2?BR.near:BR.mid),P=src.p,bw=IM.branch.width,bh=IM.branch.height,sw=bw/NS,st=bend/NS,sc=b.sc*(1-b.away*.14);
 g.save();g.globalAlpha=alpha*(b.tier===0?.92:1);
 if(b.s<0)g.translate(-gx,b.py+gy);else{g.translate(CW+gx,b.py+gy);g.scale(-1,1)}
 g.rotate(r);g.scale(sc,sc);g.translate(-40,0);
 var yo=-bh*.32-P,H=bh+P*2;
 for(var j=0;j<NS;j++){var sx=j===0?0:P+j*sw,dx=j===0?-P:0,w=j===0?sw+P+3:(j===NS-1?sw+P:sw+3);
  if(sx+w>src.c.width)w=src.c.width-sx;g.drawImage(src.c,sx,0,w,H,dx,yo,w,H);g.translate(sw,0);g.rotate(st)}
 g.restore()}
/* foliage is drawn on its own layer whose borders melt away, so no branch ever shows a hard canvas edge */
var FOL=mk(CW,CH),fo=FOL.getContext("2d"),FADE=null;
function makeFade(){FADE=mk(CW,CH);var x=FADE.getContext("2d");function band(x0,y0,x1,y1,rx,ry,rw,rh){var gr=x.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,"rgba(0,0,0,1)");gr.addColorStop(.55,"rgba(0,0,0,.45)");gr.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=gr;x.fillRect(rx,ry,rw,rh)}
 band(0,0,130,0,0,0,130,CH);band(CW,0,CW-130,0,CW-130,0,130,CH);band(0,0,0,90,0,0,CW,90);band(0,CH,0,CH-80,0,CH-80,CW,80)}
function foliage(tiers,t,trem){fo.globalCompositeOperation="source-over";fo.clearRect(0,0,CW,CH);
 BRS.forEach(function(b){if(tiers.indexOf(b.tier)>-1)drawBranch(b,t,b.tier===0?trem*.5:trem,fo)});
 fo.globalAlpha=1;fo.globalCompositeOperation="destination-out";fo.drawImage(FADE,0,0);fo.globalCompositeOperation="source-over";g.drawImage(FOL,0,0)}
/* ---- timeline state ---- */
var mode="off",mT=0,doneCb=null,guideReady=false,pendingB=null,revealedAt=0;
var t0=0,scripted={};
var ST={pose:1,phi:PHI0,lift:.16,d:1,pres:0,trem:0};
var ENTER_END=6.9,LEAVE_END=2.8;
function start(){makeHead();sampleSkin();prepRig();prepArms();makeFade();initBranches();requestAnimationFrame(loop);
 if(reduced){mode="on";ST.pose=0;ST.d=0;ST.pres=1;guideReady=true;setTimeout(tourKick,600);return}
 var waited=0;(function w(){if(document.body.classList.contains("is-ready")||waited>9000)setTimeout(enter,750);else{waited+=150;setTimeout(w,150)}})()}
function enter(){LEAVING=null;root.classList.remove("is-leaving");if(reduced){mode="on";ST.pose=0;ST.d=0;ST.pres=1;flushBubble();setTimeout(tourKick,400);return}
 mode="in";mT=now();LEAVES=[];scripted={};HB.look=0;resetBranches(false);RIG.w=0;
 var fo=0;BRS.forEach(function(b){if(b.tier===0)b.act=.05+b.rank*.07;else b.act=b.tier===2?.42+b.rank*.0:.08+(fo++)*.045;b.awayT=b.tier===0?5.05+b.rank*.06:5.2+b.rank*.05});
 ST.pose=1;ST.phi=PHI0;ST.lift=.16;ST.d=1;ST.pres=0;guideReady=false}
var LEAVING=null,LEAVE_P="palmsup";
function leave(cb){if(mode==="out"||LEAVING)return;
 if(mode==="on"&&!reduced&&glOK()&&PAR[LEAVE_P]&&!(PS.cur===LEAVE_P&&!PS.then&&PS.w>=1&&PS.k>=.92)){
  LEAVING={cb:cb,t:now()};stopNarration();hideBubble();PS.q=[];PS.until=0;goPose(LEAVE_P);return}
 leaveNow(cb)}
function leaveNow(cb){if(mode==="out")return;LEAVING=null;SNAPON=0;if(mode==="on"&&SNAP){sn.setTransform(1,0,0,1,0,0);sn.globalAlpha=1;sn.globalCompositeOperation="source-over";sn.clearRect(0,0,HW,HH);drawFigOn(sn,PS.cur,PS.cur,PS.C,1);SNAPON=1}doneCb=cb||null;stopNarration();hideBubble();root.classList.add("is-leaving");
 if(reduced){finishLeave();return}
 mode="out";mT=now();scripted={};resetBranches(true);guideReady=false;
 /* start the exit from whatever she is doing now */
 ST.pose=0;
 BRS.forEach(function(b){b.act=b.tier===0?.12+b.rank*.05:.0+b.rank*.03;b.awayT=b.tier===0?1.36+b.rank*.025:1.4+b.rank*.025});
 setTimeout(function(){if(mode==="out"&&now()-mT>LEAVE_END)finishLeave()},(LEAVE_END+.6)*1000)}
function finishLeave(){mode="off";ST.pres=0;root.classList.remove("is-leaving");var c=doneCb;doneCb=null;if(c)c()}
function flushBubble(){guideReady=true;if(pendingB){var p=pendingB;pendingB=null;showBubble(p[0],p[1],p[2],p[3])}}
window.__olhEnter=enter;window.__olhLeave=leave;
/* choreography of the entrance / exit (the olive-grove reveal) */
function choreo(e){var S=ST;
 if(mode==="in"){
  e-=.15;S.pres=ease((e-.85)/.75);
  S.d=e<1.45?1-.38*inout((e-.85)/.6):.62*(1-inout((e-1.7)/1.1));
  S.trem=sstep(1.05,1.25,e)*(1-sstep(1.5,1.75,e))*.9;
  var sweep=inout((e-1.45)/1.05);
  S.phi=PHI0*(1-sweep)+Math.sin(e*8)*.05*S.trem;
  S.lift=.16-.1*sweep+.05*Math.sin(Math.PI*sweep)-.72*inout((e-3.05)/.5);
  S.pose=1-inout((e-3.28)/.42);
  if(e>3.5&&!guideReady){revealedAt=e;flushBubble()}
 }else if(mode==="out"){
  var p0=Math.max(ST.pose,0);if(SNAPON){S.pose=inout(e/.26);S.lift=NEU.lift+.68*inout((e-.2)/.55)}else{S.pose=Math.max(p0,inout(e/.36));S.lift=NEU.lift+.68*inout((e-.12)/.55)}
  S.phi=PHI0*inout((e-.62)/.85);
  S.d=inout((e-.75)/.9);
  S.pres=1-inout((e-1.25)/.45);
  S.trem=sstep(1.5,1.65,e)*(1-sstep(1.85,2.05,e))*.8;
 }else if(mode==="on"){S.d=0;S.pres=1;S.trem=0}
 else{S.pres=0}}
function figToWorld(x,y,S){var ds=1-.075*S.d,lift=34*S.d;return [HX+HW/2+ds*(x-HW/2),HY+HH-lift+ds*(y-HH)]}
function armXf(k){var A=ARMDEF[k],a=AR[k],c0=Math.cos(a.phi),c=(c0<0?-1:1)*Math.max(.2,Math.abs(c0)),l=a.lift,rot=A.s<0?l:-l;var hx=A.hand[0]*c,hy=A.hand[1];
 /* wrist: counter-rotates the palm so it stays upright, plus the gesture's own tilt (and the wave) */
 var wr=(c>0?-rot*.8:0)+(mode==="on"?A.s*((a.ht||0)+(a.o||0)):0);
 return {c:c,rot:rot,wr:wr,hand:[A.pv[0]+Math.cos(rot)*hx-Math.sin(rot)*hy,A.pv[1]+Math.sin(rot)*hx+Math.cos(rot)*hy]}}

/* ===================================================================================
   FACE: lips (jaw drop + lip spread/round + teeth + tongue), eyelids, eyebrows, head motion.
   All of it works on the figure canvas in photo coordinates, so it follows every pose.
   =================================================================================== */
var MO={x:235.6,y:93.8},MS=mk(64,48),ms=MS.getContext("2d"),HDC=mk(130,160),hd=HDC.getContext("2d"),HMASK=null,BRW=mk(64,14),bw=BRW.getContext("2d");
function makeHeadMask(){HMASK=mk(130,160);var x=HMASK.getContext("2d");x.save();x.translate(65,74);x.scale(1,1.18);
 var gr=x.createRadialGradient(0,0,40,0,0,62);gr.addColorStop(0,"rgba(0,0,0,1)");gr.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=gr;x.fillRect(-65,-74,130,160);x.restore()}
function sampleSkin(){try{var c=mk(24,8),y=c.getContext("2d"),q=FACE.eyeL;y.drawImage(IM.body,q[0]-6,q[1]+6,12,4,0,0,12,4);q=FACE.eyeR;y.drawImage(IM.body,q[0]-6,q[1]+6,12,4,12,0,12,4);
 var p=y.getImageData(0,0,24,4).data,r=0,gg=0,bb=0,n=0;for(var i=0;i<p.length;i+=4){if(p[i+3]<200)continue;r+=p[i];gg+=p[i+1];bb+=p[i+2];n++}
 if(n){r/=n;gg/=n;bb/=n;skinC="rgb("+Math.round(r*.93)+","+Math.round(gg*.88)+","+Math.round(bb*.86)+")";lidC="rgba("+Math.round(r*.35)+","+Math.round(gg*.25)+","+Math.round(bb*.22)+",.9)"}}catch(e){}}
function lens(dx,hw){var u=dx/hw;return u*u>=1?0:Math.pow(1-u*u,.55)}
function drawMouth(o,w){if(o<.03&&Math.abs(w-.5)<.04)return;
 var X0=Math.round(MO.x)-32,Y0=Math.round(MO.y)-14,y0=MO.y-Y0;ms.clearRect(0,0,64,48);ms.drawImage(FIG,X0,Y0,64,48,0,0,64,48);
 var open=o*5.6,sx=1+(w-.5)*.3,hwL=15.5*sx,cx=MO.x-X0,dx,i;
 f.save();
 /* chin + jaw (drops a little less than the lower lip) */
 for(i=-26;i<=26;i++){var sC=open*.55*Math.pow(Math.cos(Math.PI/2*Math.min(1,Math.abs(i)/27)),2);if(sC<.05)continue;
  f.drawImage(MS,cx+i,y0+6,1,24,X0+cx+i,Y0+y0+6+sC,1,24)}
 /* mouth interior */
 if(open>.35){var hwI=hwL*.86;for(i=-Math.ceil(hwI);i<=Math.ceil(hwI);i++){var h=open*lens(i,hwI);if(h<.3)continue;var x=X0+cx+i,y=Y0+y0-.4;
   f.fillStyle="#2A0C0E";f.fillRect(x,y,1,h+.6);
   if(open>1.3&&Math.abs(i)<hwI*.72){f.fillStyle="rgba(245,238,227,.92)";f.fillRect(x,y,1,Math.min(1.7,h*.34))}
   if(open>3&&Math.abs(i)<hwI*.55){f.fillStyle="rgba(170,74,78,.75)";var th=h*.3;f.fillRect(x,y+h+.6-th,1,th)}}}
 /* lips: lower lip rides on the jaw, both lips stretch (wide) or pucker (round) */
 for(i=-21;i<=21;i++){var tap=1-sstep(13,21,Math.abs(i)),sxx=1+(sx-1)*tap,src=cx+i/sxx,sL=open*lens(i,hwL);
  f.drawImage(MS,src,y0,1,7,X0+cx+i,Y0+y0+sL,1,7);
  f.drawImage(MS,src,y0-7,1,7,X0+cx+i,Y0+y0-7,1,7)}
 f.restore()}
function drawLids(lid){if(lid<=.05)return;[FACE.eyeL,FACE.eyeR].forEach(function(q){var rx=FACE.ew/2+1.7,top=q[1]-FACE.eh*.62-1.2,bot=top+(FACE.eh*1.24+1.4)*lid;
 f.save();f.fillStyle=skinC;f.shadowColor=skinC;f.shadowBlur=2.2;f.beginPath();f.moveTo(q[0]-rx,q[1]-1);
 f.quadraticCurveTo(q[0]-rx*.2,top-2.2,q[0]+rx,q[1]-1.2);f.lineTo(q[0]+rx,Math.min(bot,q[1]+FACE.eh*.6));
 f.quadraticCurveTo(q[0],bot+FACE.eh*.38*lid,q[0]-rx,Math.min(bot,q[1]+FACE.eh*.6));f.closePath();f.fill();f.shadowBlur=0;
 if(lid>.45){f.globalAlpha=Math.min(1,(lid-.45)*2.2);f.strokeStyle=lidC;f.lineWidth=1.05;f.lineCap="round";f.beginPath();var yb=Math.min(bot,q[1]+FACE.eh*.6);
  f.moveTo(q[0]-rx+1.2,yb-.3);f.quadraticCurveTo(q[0],yb+FACE.eh*.38*lid-.2,q[0]+rx-1.2,yb-.3);f.stroke()}f.restore()})}
function drawBrows(b){if(b<.05)return;var up=b*1.4;bw.clearRect(0,0,64,14);bw.drawImage(FIG,203,49,64,14,0,0,64,14);f.drawImage(BRW,0,0,64,14,203,49-up,64,14)}
function headMove(hx,hy,hr){if(Math.abs(hx)<.05&&Math.abs(hy)<.05&&Math.abs(hr)<.002)return;var H=FACE.head,N=FACE.neck;
 hd.globalCompositeOperation="source-over";hd.clearRect(0,0,130,160);hd.drawImage(FIG,H[0],H[1],130,160,0,0,130,160);
 hd.globalCompositeOperation="destination-in";hd.drawImage(HMASK,0,0);
 f.save();f.translate(N[0]+hx,N[1]+hy);f.rotate(hr);f.translate(-N[0],-N[1]);f.drawImage(HDC,H[0],H[1]);f.restore()}
/* live faces: chat header + launcher show her talking face */
var FC=[$("olh-fcv"),$("olh-lcv")].filter(Boolean),fcT=0;
function liveFaces(t){if(t-fcT<.033)return;fcT=t;FC.forEach(function(c){if(!c.offsetParent)return;var x=c.getContext("2d"),s=c.width;x.clearRect(0,0,s,s);x.drawImage(FIG,190,18,92,92,0,0,s,s)});root.classList.add("has-live")}

var mouth={o:0,w:.5};
function loop(ts){requestAnimationFrame(loop);if(!vis||document.hidden){t0=0;return}if(window.OLGA_GOV&&!OLGA_GOV.allow(ts))return;var t=ts/1000,dt=Math.min(.05,t0?t-t0:.016);t0=t;var m0=mode;
 var e=mode==="in"||mode==="out"?now()-mT:99;
 if(mode==="in"&&e>ENTER_END){mode="on";RIG.w=0;AR.L=armState();AR.R=armState();PS.prev="body";PS.cur="clasp";PS.k=1;PS.w=0;PS.tk=0;PS.D={L:0,R:0};PS.pk={L:1,R:1};PS.amp=AMP.clasp;SKS=skFrom(bodyPar());PS.frz=now()+.3;PS.q=[];PS.until=now()+1.2;PS.idleT=now()+12;guideReady||flushBubble();setTimeout(tourKick,300)}
 if(mode==="out"&&e>LEAVE_END){finishLeave()}
 choreo(e);var S=ST;
 if(mode==="in"){if(e>4&&!scripted.a){scripted.a=1;idle.tg=1;idle.until=t+.85;idle.next=t+30}if(e>4.9&&!scripted.b){scripted.b=1;idle.tg=-1;idle.until=t+.8}}
 /* arms: entrance/exit choreography, or the live gesture engine */
 if(mode==="on"){stepPose(dt,t);S.pose=0}
 if(mode!==m0&&(mode==="in"||mode==="out")){e=now()-mT;choreo(e);S=ST;["L","R"].forEach(function(k){var a=AR[k];a.phi=S.phi;a.lift=S.lift;a.o=0;a.ht=0;a.vp=a.vl=a.vh=0})}
 else{["L","R"].forEach(function(k){var a=AR[k];a.phi=S.phi;a.lift=S.lift;a.o=0;a.ht=0;a.vp=a.vl=a.vh=0})}
 var pl=HB.look;stepHead(dt,t);
 /* the voice accent reaches arms and body through a spring, so syllables never make her twitch */
 BS.v+=(324*(BEAT.v-BS.x)-36*BS.v)*dt;BS.x+=BS.v*dt;
 var m=(mode==="on"&&canVoice())?mouthNow():null,tgO=m?m.o:0,tgW=m?m.w:.5;
 mouth.o+=(tgO-mouth.o)*(1-Math.exp(-dt*(tgO>mouth.o?34:20)));mouth.w+=(tgW-mouth.w)*(1-Math.exp(-dt*18));
 var lid=blinkV>0?Math.sin(blinkV*Math.PI):0;
 g.clearRect(0,0,CW,CH);
 if(S.pres<=0&&mode!=="in"&&mode!=="out"){LEAVES.length&&(stepLeaves(dt),drawLeaves());return}
 /* hands in world space -> drive the branches */
 var aL=armXf("L"),aR=armXf("R"),hL=figToWorld(aL.hand[0],aL.hand[1],S),hR=figToWorld(aR.hand[0],aR.hand[1],S);
 var gain=S.pose*cl((.8-S.d)/.2,0,1),bodyP=ease(cl((.62-S.d)/.62,0,1));
 var branchesOn=mode==="in"||mode==="out";
 if(branchesOn){
  if(mode==="in"&&e>1.35&&!scripted.r1){scripted.r1=1;BRS.forEach(function(b){if(b.tier&&b.by<420){b.v+=(Math.random()-.3)*.9;b.bv+=(Math.random()-.5)*1.2}})}
  if(mode==="in"&&e>1.57&&!scripted.r2){scripted.r2=1;BRS.forEach(function(b){if(b.tier&&b.by<460){b.v+=Math.random()*.7;b.bv+=(Math.random()-.5)*1}if(b.tier&&Math.random()<.25)shed(b,1)})}
  if(mode==="out"&&e>1.6&&!scripted.r3){scripted.r3=1;BRS.forEach(function(b){if(b.tier){b.v-=Math.random()*.6;b.bv+=(Math.random()-.5)*1.3}})}
  var dLook=HB.look-pl;
  BRS.forEach(function(b){var le=e-b.act;if(le<0){b.o=1.7;b.a=0;return}
   b.a=Math.min(1,b.a+dt/.38);
   var tgt=0;
   if(b.tier>0){var H=b.s<0?hL:hR,hx=b.s<0?H[0]:CW-H[0],out=CW/2-hx,req=cl((out+18-b.t0)/b.D,0,1.12),w=1-sstep(110,260,Math.abs(H[1]-b.by));
    var hand=gain*w*req,body=bodyP*(.62+.4*sstep(260,480,b.by));tgt=Math.max(hand,body);
    if(hand>.15&&!b.touched){b.touched=1;b.v+=.6;b.bv+=b.dir*.8;if(Math.random()<.6)shed(b,1+(Math.random()*2|0))}
    if(mode==="in"&&e>1.65)b.latch=Math.max(b.latch,.9*Math.min(tgt,1));if(mode==="in")tgt=Math.max(tgt,b.latch);
    if(Math.abs(dLook)>.002&&(dLook>0?b.s>0:b.s<0)){b.bv+=dLook*b.dir*-6;b.v+=Math.abs(dLook)*1.5}}
   else tgt=.45*bodyP;
   var pushing=tgt>b.o+.02&&b.tier>0&&le>.6,k=pushing?190:(b.tier===2?55:80),c=pushing?22:(b.tier===2?6.5:8.5);
   var n=3,h=dt/n;for(var j=0;j<n;j++){var acc=-k*(b.o-tgt)-c*b.v;b.v+=acc*h;b.o+=b.v*h;
    var bt=cl(-.085*b.dir*b.v,-.4,.4)+(pushing?-.1*b.dir:0);b.bv+=(-150*(b.b-bt)-8*b.bv)*h;b.b+=b.bv*h}
   var ae=e-b.awayT;if(ae>0&&ae<.6&&!b.shed){b.shed=1;if(b.tier&&Math.random()<.7)shed(b,1+(Math.random()*2|0))}b.away=ae>0?inout(ae/.95):0});
 }
 /* ground shadow */
 var sha=S.pres*(1-S.d*.55);if(sha>.01){g.save();g.globalAlpha=sha;var gr=g.createRadialGradient(CW/2,CH-14,4,CW/2,CH-14,200);gr.addColorStop(0,"rgba(31,46,24,.38)");gr.addColorStop(1,"rgba(31,46,24,0)");g.fillStyle=gr;g.scale(1,.18);g.fillRect(0,(CH-14)/.18-220,CW,440);g.restore()}
 if(branchesOn)foliage([0],t,S.trem);
 /* ---- Shams ---- */
 if(S.pres>0){
  f.setTransform(1,0,0,1,0,0);f.globalCompositeOperation="source-over";f.globalAlpha=1;f.clearRect(0,0,HW,HH);
  var arms=[["L",aL],["R",aR]],pw=S.pose<=.001?0:(S.pose>=.999?1:S.pose*S.pose*(3-2*S.pose));
  function drawArm(k,a,front){var A=ARMDEF[k],px=A.pv[0],py=A.pv[1],wx=A.wr[0]-px,wy=A.wr[1]-py;
   rg.save();rg.translate(px,py);rg.rotate(a.rot);rg.scale(a.c,1);
   rg.save();rg.translate(wx,wy);rg.scale(1/a.c,1);rg.rotate(a.wr);rg.scale(a.c,1);rg.translate(-wx,-wy);rg.drawImage(HAND[k],-px,-py);rg.restore();
   rg.drawImage(front?ARMF[k]:ARM[k],-px,-py);rg.restore()}
  if(pw>0){rg.setTransform(1,0,0,1,0,0);rg.globalCompositeOperation="source-over";rg.globalAlpha=1;rg.clearRect(0,0,HW,HH);
   arms.forEach(function(x){if(x[1].c>=0)drawArm(x[0],x[1],false)});rg.drawImage(TORSO,0,0);
   arms.forEach(function(x){if(x[1].c<0)drawArm(x[0],x[1],true)})}
  /* body*(1-w) + rig*w: an exact dissolve, so no ghost hands or double sleeves */
  if(mode==="on"){var C=curSkel(t),kk=PS.w>=1?1:PS.w;PS.C=C;
   /* both photos sit on the same moving arm, so the hand-over reads as motion, not as a fade */
   drawFigOn(f,PS.prev,PS.cur,C,kk);
  }else{var fromP=(mode==="out"&&SNAPON)?SNAP:IM.body;mixPhotos(f,fromP,RIGC,pw,fromP===IM.body)}
  f.globalAlpha=1;
  /* face: lips, eyelids, brows -> then the whole head moves (turn, nod, tilt) */
  if(S.d<.5){drawMouth(mouth.o,mouth.w);drawLids(lid);HB.bv=(HB.bv||0)+((HB.brow*.9+HB.joy*.4)-(HB.bv||0))*Math.min(1,dt*9);drawBrows(HB.bv)}
  var hx=HB.look*2.8,hy=HB.nod*1.6+(HB.nodBase||0)*1.4,hr=cl(HB.look*.028+HB.tilt*.032,-.04,.04);
  if(!reduced)headMove(hx,hy,hr);
  /* depth: in the shade behind the hedge she is darker, softer and a touch smaller */
  if(S.d>.01){f.globalCompositeOperation="source-atop";f.fillStyle="rgba(20,29,16,"+(.74*S.d).toFixed(3)+")";f.fillRect(0,0,HW,HH);f.globalCompositeOperation="source-over"}
  if(mode==="on")liveFaces(t);
  /* body: breathing, weight shifts, lean into the conversation */
  var talk=SPK?1:0;HB.lean=(HB.lean||0)+((talk?1:0)-(HB.lean||0))*Math.min(1,dt*2);
  /* every extra sway eases in and out, so a reaction never kicks the body */
  HB.ps=(HB.ps||0)+(((GS.name==="present"&&NQ.active)?lookToContent()*.006:0)-(HB.ps||0))*Math.min(1,dt*3);
  HB.je=(HB.je||0)+(HB.joy-(HB.je||0))*Math.min(1,dt*(HB.joy>(HB.je||0)?6:3));
  PS.bs=(PS.bs||0)+((mode==="on"?PS.bob:0)-(PS.bs||0))*Math.min(1,dt*8);
  var sway=reduced?0:Math.sin(t*.9)*.008+Math.sin(t*.37)*.006+HB.look*.007+HB.ps+HB.je*Math.sin(t*9)*.01;
  var br=reduced?1:1+Math.sin(t*1.6)*.0045,bob=reduced?0:Math.sin(t*1.6)*1.4-BS.x*1.2-4*pw*(1-pw)*2.4-PS.bs*.9,ds=(1-.075*S.d)*(1+HB.lean*.012),lift=34*S.d;
  g.save();g.globalAlpha=S.pres;g.translate(HX+HW/2,HY+HH-lift);g.rotate(sway);g.scale(ds*(1+(br-1)*.4),ds*br);g.translate(-HW/2,-HH+bob);
  if(FILTER&&S.d>.03)g.filter="blur("+(S.d*2.4).toFixed(2)+"px)";
  g.drawImage(FIG,0,0);g.restore()}
 if(branchesOn)foliage([1,2],t,S.trem);
 stepLeaves(dt);drawLeaves();
}
function hitHala(ev){var r=cv.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width*CW;return (mode==="on"||(mode==="in"&&guideReady))&&x>HX+90&&x<HX+HW-90}
/* debug / QA hooks (harmless in production) */
window.__olhDebug={blink:function(){blinkV=1},gesture:gesture,say:say,narrate:function(id){seen[id]=1;narrate(tourItems(id),id)},state:function(){return {mode:mode,ps:PS.cur,pk:PS.k,gl:!!GLR,rig:RIG.w,pose:ST.pose,g:GS.name,spk:SPK?SPK.kind:null,o:mouth.o,w:mouth.w,AR:AR,HB:HB,NQ:{active:NQ.active,i:NQ.i,sec:NQ.sec,silent:NQ.silent}}},unlock:firstTouch};
makeHeadMask();
ui();render();spkUi();
})();
;

/* ===== <script id="olga-v25-shop-guide"> — block 6, original order ===== */
(function(){
  if(!window.OLGA_GOV||!OLGA_GOV.mob||!window.IntersectionObserver) return;
  var r=document.getElementById("olh-root"), g=document.getElementById("grid"); if(!r||!g) return;
  var inGrid=false, quiet=false, qt=0;
  function upd(){ r.classList.toggle("olh-shop",inGrid); r.classList.toggle("olh-shop-quiet",inGrid&&quiet); }
  new IntersectionObserver(function(es){ inGrid=es[0].isIntersecting; clearTimeout(qt);
    if(inGrid&&!quiet) qt=setTimeout(function(){ quiet=true; upd(); },2600);   /* her line about the shop is seen, then she tucks away */
    upd(); },{rootMargin:"0px 0px -30% 0px"}).observe(g);
  document.addEventListener("touchstart",function(e){ if(inGrid&&!quiet&&!r.contains(e.target)){ quiet=true; upd(); } },{passive:true});
})();
;

/* ===== <script id="olga-responsive-js"> — block 7, original order ===== */
(function(){
 var r=document.getElementById("olh-root"),t=0;
 var es=document.getElementById("essence");
 if(r&&es&&window.IntersectionObserver){new IntersectionObserver(function(en){en.forEach(function(e){var vh=window.innerHeight||800;r.classList.toggle("olh-ess",e.isIntersecting&&e.intersectionRect.height/vh>.6)})},{threshold:[0,.2,.4,.5,.6,.7,.8,.9,1]}).observe(es);}
 if(r){window.addEventListener("scroll",function(){r.classList.add("olh-scroll");clearTimeout(t);t=setTimeout(function(){r.classList.remove("olh-scroll")},900)},{passive:true});}
 document.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest("#toCheckout,#backBtn");if(!b)return;
  setTimeout(function(){var d=document.querySelector(".drawer"),db=document.getElementById("drawerBody");if(d)d.scrollTop=0;if(db)db.scrollTop=0},40)});
})();
;

/* ===== <script> — block 8, original order ===== */
/* Olga lifestyle photos: gift-edit layout, parallax, poster tilt, lightbox */
(function(){
  "use strict";
  var IMG=(window.OLGA&&window.OLGA.IMG)||{}, $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var reduced=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  /* --- gift grid: 3 staggered columns on desktop, 2 on phones --- */
  var grid=$("#gfGrid");
  if(grid){
    var tiles=$$(".gtile",grid).sort(function(a,b){return a.getAttribute("data-gi")-b.getAttribute("data-gi")});
    var cols=$$(".gift__col",grid), mq=window.matchMedia("(max-width:760px)");
    var LAY={d:[[0,1],[2,3],[4,5]], m:[[0,3,5],[2,4,1]]}, PAR={d:["-1","1","-0.5"], m:["-0.6","0.6"]};
    var layout=function(){
      var k=mq.matches?"m":"d", L=LAY[k];
      while(cols.length<3){ var c=document.createElement("div"); c.className="gift__col"; grid.appendChild(c); cols.push(c); }
      cols.forEach(function(c,i){ c.style.display=i<L.length?"":"none"; c.className="gift__col"+(i===1?" gift__col--mid":""); c.setAttribute("data-gpar",PAR[k][i]||"0"); });
      L.forEach(function(ids,i){ ids.forEach(function(id){ cols[i].appendChild(tiles[id]); }); });
    };
    layout(); if(mq.addEventListener) mq.addEventListener("change",layout); else mq.addListener(layout);
    /* parallax drift per column */
    var sec=$("#gift"), on=false, raf=0;
    var tick=function(){ raf=0; if(!on||reduced) return; var r=sec.getBoundingClientRect(), vh=window.innerHeight, p=(vh-r.top)/(vh+r.height)-.5, amp=mq.matches?36:80;
      cols.forEach(function(c){ c.style.setProperty("--gy",(p*amp*parseFloat(c.getAttribute("data-gpar")||0)).toFixed(1)+"px"); }); };
    if("IntersectionObserver" in window) new IntersectionObserver(function(e){ on=e[0].isIntersecting; if(on) tick(); },{rootMargin:"200px 0px"}).observe(sec);
    window.addEventListener("scroll",function(){ if(on&&!raf) raf=requestAnimationFrame(tick); },{passive:true});
    window.addEventListener("resize",function(){ if(on&&!raf) raf=requestAnimationFrame(tick); });
  }
  /* --- poster tilt (mouse only) --- */
  var fr=$("#rtFrame");
  if(fr && !reduced && window.matchMedia("(hover:hover) and (pointer:fine)").matches){
    fr.addEventListener("pointermove",function(e){ var r=fr.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      fr.style.setProperty("--ry",(x*10).toFixed(2)+"deg"); fr.style.setProperty("--rx",(-y*8).toFixed(2)+"deg"); });
    fr.addEventListener("pointerleave",function(){ fr.style.setProperty("--ry","0deg"); fr.style.setProperty("--rx","0deg"); });
  }
  /* --- lightbox --- */
  var box=$("#lbx"), fig=$("#lbxFig"), im=$("#lbxImg"), cap=$("#lbxCap"), cnt=$("#lbxCount"), th=$("#lbxThumbs");
  if(!box) return;
  var list=[], idx=0, lastFocus=null, rtl=function(){return document.documentElement.dir==="rtl"};
  var capOf=function(el){ var k=el.getAttribute("data-lk-cap"), node=k&&document.querySelector('[data-i="'+k+'"]'); return node?node.textContent:""; };
  var show=function(i,dir){
    idx=(i+list.length)%list.length; var el=list[idx], k=el.getAttribute("data-lk");
    fig.classList.remove("is-on"); fig.style.setProperty("--sx",((dir||0)*40)+"px");
    var go=function(){ im.src=IMG[k]||""; cap.textContent=capOf(el); fig.style.setProperty("--sx","0px"); requestAnimationFrame(function(){ fig.classList.add("is-on"); }); };
    if(dir) setTimeout(go,160); else go();
    cnt.innerHTML=list.length>1? String(idx+1).padStart(2,"0")+' <span>/ '+String(list.length).padStart(2,"0")+'</span>' : "";
    $$("button",th).forEach(function(b,j){ b.classList.toggle("is-on",j===idx); if(j===idx && b.scrollIntoView) b.scrollIntoView({block:"nearest",inline:"center"}); });
  };
  var open=function(el){
    var g=el.getAttribute("data-lk-group");
    list=$$('[data-lk-group="'+g+'"]').sort(function(a,b){ return (+a.getAttribute("data-gi")||0)-(+b.getAttribute("data-gi")||0); });
    th.innerHTML=list.map(function(x,j){ return '<button type="button" data-lbx-i="'+j+'" aria-label="'+(j+1)+'"><img src="'+(IMG[x.getAttribute("data-lk")]||"")+'" alt=""></button>'; }).join("");
    box.classList.toggle("lbx--single",list.length<2);
    lastFocus=el; box.classList.add("is-open"); box.setAttribute("aria-hidden","false"); document.body.classList.add("is-locked");
    show(list.indexOf(el)); setTimeout(function(){ $("#lbxClose").focus({preventScroll:true}); },50);
  };
  var close=function(){ if(!box.classList.contains("is-open")) return; box.classList.remove("is-open"); fig.classList.remove("is-on"); box.setAttribute("aria-hidden","true");
    if(!document.querySelector(".modal.is-open,.o3d.is-open,.menu.is-open,#o3d.is-open")) document.body.classList.remove("is-locked");
    if(lastFocus) try{ lastFocus.focus({preventScroll:true}); }catch(e){} };
  var step=function(d){ if(list.length>1) show(idx+d,-d*(rtl()?-1:1)); };
  document.addEventListener("click",function(e){
    var t=e.target.closest("[data-lk]"); if(t && !box.contains(t)){ e.preventDefault(); open(t); return; }
    if(!box.classList.contains("is-open")) return;
    if(e.target.closest("[data-lbx-close]")){ close(); return; }
    if(e.target.closest("#lbxPrev")){ step(-1); return; }
    if(e.target.closest("#lbxNext")){ step(1); return; }
    var b=e.target.closest("[data-lbx-i]"); if(b){ var j=+b.getAttribute("data-lbx-i"); if(j!==idx) show(j,j>idx?(rtl()?1:-1):(rtl()?-1:1)); return; }
    if(e.target===$("#lbxStage")) close();
  });
  window.addEventListener("keydown",function(e){ if(!box.classList.contains("is-open")) return;
    if(e.key==="Escape"){ e.stopImmediatePropagation(); close(); }
    else if(e.key==="ArrowRight"){ step(rtl()?-1:1); } else if(e.key==="ArrowLeft"){ step(rtl()?1:-1); } },true);
  /* swipe */
  var sx=0, sy=0, drag=false, stage=$("#lbxStage");
  stage.addEventListener("pointerdown",function(e){ if(list.length<2||e.target.closest("button")) return; drag=true; sx=e.clientX; sy=e.clientY; fig.classList.add("is-drag"); });
  stage.addEventListener("pointermove",function(e){ if(!drag) return; fig.style.setProperty("--sx",(e.clientX-sx)+"px"); });
  var end=function(e){ if(!drag) return; drag=false; fig.classList.remove("is-drag"); var dx=e.clientX-sx, dy=e.clientY-sy;
    if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)){ var d=dx<0?1:-1; if(rtl()) d=-d; show(idx+d,dx<0?-1:1); } else fig.style.setProperty("--sx","0px"); };
  stage.addEventListener("pointerup",end); stage.addEventListener("pointercancel",end);
})();
;
