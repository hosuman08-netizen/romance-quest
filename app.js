
try{var _dk=new Date().toDateString();var _o=JSON.parse(localStorage.getItem('lw_p38_romance__today_counter')||'{}');if(_o.d!==_dk)_o={d:_dk,n:0};_o.n=(_o.n||0)+1;localStorage.setItem('lw_p38_romance__today_counter',JSON.stringify(_o));}catch(e){}
(function(){
  var credits=+(localStorage.getItem('romance-quest_cr')||10);
  var root=document.getElementById('app');
  var step=+(localStorage.getItem('rq_step')||0);
  var FADE_MS=220;
  var fading=false;
  var LI={name:'세하', line:'말수는 적고, 우산을 먼저 내민다.'};
  var SCENE_N=8;
  var SHARED='카페 앞에서 '+LI.name+'와 마주친다.';
  var BRANCH={
    '다가감':[
      '먼저 손을 흔든다. '+LI.name+'가 짧게 고개만 끄덕인다.',
      '처마를 벗어나 우산 쪽으로 붙는다. 빗소리가 가까워진다.',
      '우산 손잡이를 같이 잡는다. '+LI.name+'의 손가락이 잠깐 멈춘다.',
      '"몇 층이요?" '+LI.name+'가 숫자를 말하고, 네가 버튼을 누른다.',
      '"오늘 빛 예쁘다." '+LI.name+'가 잠깐 웃고 다시 정면을 본다.',
      '막차 문을 손으로 잡아 둔다. '+LI.name+'가 먼저 탄다.',
      '따뜻한 캔을 건넨다. '+LI.name+'가 "…고마워" 하고 받는다.',
      '문이 열리기 전, '+LI.name+'가 네 쪽을 한 번 더 본다.'
    ],
    '대기':[
      '먼저 말하지 않는다. '+LI.name+'가 지나칠 듯 멈춘다.',
      '처마 밑에서 비를 본다. '+LI.name+'가 우산을 살짝 기울인다.',
      '우산을 받을지 한 박자 늦춘다. '+LI.name+'가 기다린다.',
      '엘리베이터 거울만 본다. '+LI.name+'가 버튼을 누른다.',
      '난간에 손을 올린다. '+LI.name+'가 같은 방향으로 선다.',
      '문이 닫히기 직전, '+LI.name+'가 네 쪽 빈자리를 비워 둔다.',
      '영수증을 접는다. '+LI.name+'가 아무것도 묻지 않는다.',
      '문 앞에서 '+LI.name+'가 돌아본다. 그 시선을 끝까지 받는다.'
    ]
  };
  function currentLine(){
    var path=pathLog();
    var br=loopN()===2?BRANCH2:BRANCH;
    var sh=loopN()===2?SHARED2:SHARED;
    if(step<=0) return sh;
    var prev=path[Math.min(step-1, Math.max(0,path.length-1))];
    var ch=(prev && prev.ch) || '다가감';
    var set=br[ch]||br['다가감'];
    return set[Math.min(step, set.length-1)]||sh;
  }
  var MSG=[
    '…여기야. 비 오는데.',
    '우산 있는데. 같이 가도 돼.',
    '손 시려. 잠깐만.',
    '몇 층… 됐어. 네가 눌러.',
    '오늘 빛, 이상하게 맑다.',
    '문 잡아줘서. 다음엔 내가.',
    '따뜻해. 잘 마셨어.',
    '내일도… 여기.'
  ];
  var SHARED2='빗소리가 먼저 들린다. '+LI.name+'가 처마 밑에 서 있다.';
  var BRANCH2={
    '다가감':[
      '빗줄기가 굵어진다. '+LI.name+'가 우산을 네 쪽으로 밀어 준다.',
      '횡단보도에서 잠깐 멈춘다. '+LI.name+'의 구두가 물에 잠긴다.',
      '편의점 처마 밑. '+LI.name+'가 수건 하나를 꺼낸다.',
      '버스 정류장. '+LI.name+'가 시간표를 보고 네 쪽을 본다.',
      '골목 가로등. '+LI.name+'가 "이 길이 더 짧아" 하고 앞장선다.',
      '자판기 앞에서 온음료를 고른다. '+LI.name+'가 네 잔을 먼저 집는다.',
      '건물 앞에서 우산을 턴다. '+LI.name+'가 네 어깨를 본다.',
      '문이 열리기 전, 빗소리가 잠깐 멈춘 것처럼 들린다.'
    ],
    '대기':[
      '우산을 받지 않는다. '+LI.name+'가 한 발 옆에 선다.',
      '횡단보도 버튼을 누르지 않는다. '+LI.name+'가 같이 기다린다.',
      '편의점 문을 열지 않는다. '+LI.name+'가 먼저 들어간다.',
      '버스가 온다. '+LI.name+'가 타지 않고 네 쪽을 본다.',
      '골목에서 한 박자 늦춘다. '+LI.name+'가 속도를 맞춘다.',
      '자판기 버튼을 고르지 않는다. '+LI.name+'가 같은 음료를 뽑는다.',
      '우산을 흔들지 않는다. '+LI.name+'가 대신 턴다.',
      '문 손잡이를 잡지 않는다. '+LI.name+'가 뒤를 돌아본다.'
    ]
  };
  var MSG2=[
    '비 더 세졌어. 우산 이쪽.',
    '신발 젖었어. 괜찮아.',
    '수건. 받아.',
    '다음 버스… 같이 기다릴래.',
    '이 골목이 더 나아.',
    '따뜻하게. 네 거.',
    '어깨… 젖었다.',
    '빗소리, 잠깐 멈춘 것 같아.'
  ];
  function loopN(){var n=+(localStorage.getItem('rq_loop')||1); return n===2?2:1;}
  function setLoop(n){try{localStorage.setItem('rq_loop',String(n===2?2:1));}catch(e){}}
  function currentMsg(){
    var m=loopN()===2?MSG2:MSG;
    return m[Math.min(Math.max(0,step), m.length-1)]||m[0];
  }
  var SHARE_BASE='https://hosuman08-netizen.github.io/romance-quest/';
  function save(){localStorage.setItem('romance-quest_cr',credits);localStorage.setItem('rq_step',step);}
  function dayKey(off){var d=new Date();d.setDate(d.getDate()+(off||0));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function kId(){try{var id=localStorage.getItem('rq_k_id');if(!id){id='r'+Math.random().toString(36).slice(2,8);localStorage.setItem('rq_k_id',id);}return id;}catch(e){return 'share';}}
  function shareUrl(){return SHARE_BASE+'?utm_source=share&utm_medium=app&ref='+encodeURIComponent(kId());}
  function pathLog(){try{return JSON.parse(localStorage.getItem('rq_path')||'[]');}catch(e){return[];}}
  function pushPath(ch){
    try{
      var p=pathLog(); p.push({s:step,ch:ch,t:Date.now()});
      localStorage.setItem('rq_path',JSON.stringify(p.slice(-16)));
    }catch(e){}
  }
  function endingLabel(path){
    var approach=path.filter(function(x){return x.ch==='다가감';}).length;
    var wait=path.filter(function(x){return x.ch==='대기';}).length;
    if(approach>=wait+2) return '적극 루트';
    if(wait>=approach+2) return '여운 루트';
    return '균형 루트';
  }
  function endingMeta(path){
    var label=endingLabel(path);
    if(label==='적극 루트') return {t:'적극 루트',s:'먼저 손을 내민 오늘',c:'#f472b6',bg:'#2a121c'};
    if(label==='여운 루트') return {t:'여운 루트',s:'기다림이 남긴 오늘',c:'#c4b5fd',bg:'#1a1428'};
    return {t:'균형 루트',s:'서로 맞춰 선 오늘',c:'#67e8f9',bg:'#102428'};
  }
  function pathArrowHtml(path){
    if(!path.length) return '';
    return '<div style="margin:8px 0 0;display:flex;flex-wrap:wrap;align-items:center;gap:4px;justify-content:center">'
      +path.map(function(x,i){
        var on=x.ch==='다가감';
        return (i?'<span style="opacity:.4;font-size:12px">→</span>':'')
          +'<span class="chip" style="border:1px solid '+(on?'#f472b6':'#67e8f9')+';color:'+(on?'#f472b6':'#67e8f9')+'">'+x.ch+'</span>';
      }).join('')+'</div>';
  }
  function endCardHtml(path){
    var m=endingMeta(path);
    return '<div id="endCard" style="margin:8px 0 16px;padding:16px;border:1px solid '+m.c+'66;border-radius:16px;background:linear-gradient(180deg,'+m.c+'22,'+m.bg+');text-align:center">'
      +'<div style="font-size:1.25rem;font-weight:800;line-height:1.3;color:'+m.c+'">'+m.t+'</div>'
      +'<div class="sub" style="margin:8px 0 0">'+m.s+'</div>'
      +pathArrowHtml(path)+'</div>';
  }
  function bumpStreak(){
    try{
      var st=JSON.parse(localStorage.getItem('rq_streak')||'{}');
      if(!st||typeof st!=='object')st={last:null,count:0};
      var t=dayKey(0); if(st.last===t) return st;
      var y=dayKey(-1),y2=dayKey(-2),froze=false;
      if(st.last&&st.last!==y&&st.last===y2&&(st.count||0)>=3){
        var ready=!st.shieldLast||((new Date(t)-new Date(st.shieldLast))/86400000)>=7;
        if(ready){st.shieldLast=t;st.last=y;froze=true;try{legionTrack('streak_freeze',{count:st.count})}catch(e){}}
      }
      st.count=(st.last===y)?(st.count||0)+1:1; st.last=t;
      localStorage.setItem('rq_streak',JSON.stringify(st));
      try{legionTrack('streak',{count:st.count,froze:froze})}catch(e){}
      return st;
    }catch(e){return {count:0};}
  }
  function paint(){
    if(step>SCENE_N-1){step=SCENE_N-1; save();}
    var atEnd=step>=SCENE_N-1;
    var path=pathLog();
    var endL=atEnd?endingLabel(path):'';
    var canPlay=!atEnd && credits>0;
    var showRestart=step>0 || credits<=0 || atEnd;
    var html='<div class="card">'
      +'<div style="margin:0 0 8px"><b style="color:#f472b6;font-size:1.15rem">'+LI.name+'</b> · <span class="sub">'+LI.line+'</span></div>'
      +'<p style="margin:8px 0;font-size:16px;line-height:1.6">'+currentLine()+'</p>'
      +'<div id="msgCard" style="margin:0 0 16px;padding:16px;border-radius:12px 12px 12px 4px;background:#241821;border:1px solid #f472b644">'
      +'<div class="sub" style="margin:0 0 8px">'+LI.name+'</div>'
      +'<p style="margin:0;font-size:15px">'+currentMsg()+'</p></div>'
      +(atEnd?endCardHtml(path):'')
      +(canPlay?'<div class="row"><button type="button" id="a">다가간다</button><button type="button" class="sec" id="b">기다린다</button></div>':'')
      +'<p class="sub" style="margin:8px 0 0">남은 선택 '+credits+'</p>'
      +(step>0?'<div class="bar" aria-hidden="true"><i style="width:'+Math.round((step+1)/SCENE_N*100)+'%"></i></div>':'')
      +'<div class="row" style="margin-top:8px">'
      +(step>0 && credits>0?'<button type="button" class="sec" id="undo">한 장면 되돌리기</button>':'')
      +(showRestart?'<button type="button" class="sec" id="restart">처음부터</button>':'')
      +'</div>'
      +'<div id="log" class="sub" style="margin-top:8px"></div>'
      +(atEnd?'<div id="sharePeak" style="margin-top:16px;padding:16px;border:1px solid #f472b644;border-radius:16px"><p style="margin:0 0 8px;font-size:13px">지금 공유</p><div class="row"><button type="button" class="sec" id="shareBtn">이야기 공유</button>'
        +(loopN()===1 && credits>0?'<button type="button" class="sec" id="loop2">비 오는 밤, 한 번 더</button>':'')
        +'</div></div>':'')
      +'</div>';
    root.innerHTML=html;
    function go(ch){
      if(fading) return;
      if(credits<=0 || atEnd) return;
      credits--; step=Math.min(SCENE_N-1, step+1); pushPath(ch); save(); bumpStreak();
      render({fade:true});
      try{legionTrack('activate',{ch:ch,step:step})}catch(e){}
      if(step>=SCENE_N-1){try{legionTrack('share_peak_shown',{end:1})}catch(e){} try{legionTrack('money_pipe_shown',{app:'romance'})}catch(e){}}
    }
    var a=document.getElementById('a');
    var b=document.getElementById('b');
    if(a) a.onclick=function(){go('다가감');};
    if(b) b.onclick=function(){go('대기');};
    var undo=document.getElementById('undo');
    if(undo) undo.onclick=function(){
      if(fading||step<=0)return;
      step=Math.max(0,step-1);
      try{var p=pathLog(); p.pop(); localStorage.setItem('rq_path',JSON.stringify(p));}catch(e){}
      save(); render({fade:true}); try{legionTrack('undo',{})}catch(e){}
    };
    function doRestartLoop1(){
      step=0; setLoop(1); try{localStorage.setItem('rq_path','[]');}catch(e){}
      save(); render({fade:true});
    }
    var restart=document.getElementById('restart');
    if(restart) restart.onclick=function(){
      if(fading) return;
      if(!confirm('처음부터 다시 볼까요?'))return;
      doRestartLoop1(); try{legionTrack('restart',{})}catch(e){}
    };
    var l2=document.getElementById('loop2');
    if(l2) l2.onclick=function(){
      if(fading) return;
      step=0; setLoop(2); try{localStorage.setItem('rq_path','[]');}catch(e){}
      save(); render({fade:true}); try{legionTrack('activate',{loop:2})}catch(e){}
    };
    var sb=document.getElementById('shareBtn');
    if(sb) sb.onclick=function(){
      var text=LI.name+'와 오늘 · '+endL+'\n픽션 · 18+';
      if(navigator.share)navigator.share({title:LI.name+'와 오늘',text:text,url:shareUrl()}).catch(function(){});
      else if(navigator.clipboard)navigator.clipboard.writeText(text+'\n'+shareUrl());
      try{legionTrack('share_peak',{end:endL})}catch(e){}
    };
  }
  function render(opts){
    var doFade=opts&&opts.fade;
    if(!doFade || !root.firstChild){
      fading=false;
      paint();
      root.style.opacity='1';
      return;
    }
    if(fading) return;
    fading=true;
    root.style.opacity='0';
    setTimeout(function(){
      paint();
      requestAnimationFrame(function(){
        root.style.opacity='1';
        setTimeout(function(){ fading=false; }, FADE_MS);
      });
    }, FADE_MS);
  }
  try{var q=new URLSearchParams(location.search||'');var ref=q.get('ref');if(ref&&ref!=='share'&&ref!==kId()&&!localStorage.getItem('rq_k_from')){localStorage.setItem('rq_k_from',ref);try{legionTrack('k_link',{from:ref})}catch(e){}}}catch(e){}
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
