
/* LEGION_WAVE_32_today_counter */
try{var _dk=new Date().toDateString();var _o=JSON.parse(localStorage.getItem('lw_p38_romance__today_counter')||'{}');if(_o.d!==_dk)_o={d:_dk,n:0};_o.n=(_o.n||0)+1;localStorage.setItem('lw_p38_romance__today_counter',JSON.stringify(_o));}catch(e){}
(function(){
  var credits=+(localStorage.getItem('romance-quest_cr')||10);
  var root=document.getElementById('app');
  var step=+(localStorage.getItem('rq_step')||0);
  /* GOLD50 TOP1: LADS/Ikemen — named LI. Fictional 1. 실인물 0 */
  var LI={name:'세하', line:'말수는 적고, 우산을 먼저 내민다.'};
  var SCENE_N=8;
  var SHARED='카페 앞에서 '+LI.name+'와 마주친다.';
  /* GOLD50 TOP2: Romance Club — 다가감/대기 각 8줄=16. 엔진 없이 배열. 실인물 0 */
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
  /* GOLD50 TOP3: Mystic/LADS 리추얼 — 장면마다 메시지 1줄. 고정카피. LLM 0 */
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
  /* GOLD50 TOP5: Love365 분량갭 — 루프2 비 오는 밤 8장면만. 장편 CMS 0. LLM 0 */
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
  function fomoLeft(){var e=new Date();e.setHours(24,0,0,0);var ms=Math.max(0,e-Date.now());return Math.floor(ms/3600000)+'h '+Math.floor((ms%3600000)/60000)+'m';}
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
    if(approach>=wait+2) return '엔딩 A · 적극 루트';
    if(wait>=approach+2) return '엔딩 B · 여운 루트';
    return '엔딩 C · 균형 루트';
  }
  /* GOLD50 TOP4: LADS CG — 엔딩 A/B/C 색카드 + 경로 화살표. 엔진/LLM 0 */
  function endingMeta(path){
    var label=endingLabel(path);
    if(label.indexOf('엔딩 A')===0) return {k:'A',t:'적극 루트',c:'#f472b6',bg:'#2a121c'};
    if(label.indexOf('엔딩 B')===0) return {k:'B',t:'여운 루트',c:'#c4b5fd',bg:'#1a1428'};
    return {k:'C',t:'균형 루트',c:'#67e8f9',bg:'#102428'};
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
    return '<div id="endCard" style="margin:10px 0 8px;padding:18px 14px;border:1px solid '+m.c+'66;border-radius:16px;background:linear-gradient(180deg,'+m.c+'22,'+m.bg+');text-align:center">'
      +'<div class="sub" style="margin:0 0 4px;letter-spacing:.14em">ENDING CARD</div>'
      +'<div style="font-size:52px;font-weight:800;line-height:1;color:'+m.c+'">'+m.k+'</div>'
      +'<div style="margin:8px 0 0;font-weight:700;color:'+m.c+'">엔딩 '+m.k+' · '+m.t+'</div>'
      +'<div class="sub" style="margin:6px 0 0">픽션 · 실관계 아님 · LLM 0</div>'
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
  function render(){
    var st=JSON.parse(localStorage.getItem('rq_streak')||'{}');
    var sc=st.count||0;
    var ready=!st.shieldLast||((new Date(dayKey(0))-new Date(st.shieldLast))/86400000)>=7;
    var atEnd=step>=SCENE_N-1;
    var path=pathLog();
    var endL=atEnd?endingLabel(path):'';
    var pathHtml=atEnd?'':pathArrowHtml(path);
    if(step>SCENE_N-1){step=SCENE_N-1; save();}
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실관계 아님</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b> · 장면 '+(step+1)+'/'+SCENE_N+' · '+Math.round((step+1)/SCENE_N*100)+'% · 🔥 '+sc+'일'+(sc>=3&&ready?' · 🛡️':'')
      +' · 창 '+fomoLeft()+' · <span class="chip">'+(loopN()===2?'루프2 · 비 오는 밤':'루프1 · 낮')+'</span>'
      +'<div class="bar" style="height:6px;background:#2a2438;border-radius:4px;margin:8px 0;overflow:hidden"><i style="display:block;height:100%;width:'+Math.round((step+1)/SCENE_N*100)+'%;background:#f472b6"></i></div>'
      +'<div style="margin:8px 0 4px"><b style="color:#f472b6">'+LI.name+'</b> · <span class="sub">'+LI.line+' · 픽션 1명 · 실인물 0</span></div>'
      +'<p style="margin:12px 0;font-size:16px">'+currentLine()+'</p>'
      +'<div id="msgCard" style="margin:0 0 12px;padding:10px 12px;border-radius:12px 12px 12px 4px;background:#241821;border:1px solid #f472b644">'
      +'<div class="sub" style="margin:0 0 4px">💬 '+LI.name+' · 메시지 · 고정 1줄 · LLM 0</div>'
      +'<p style="margin:0;font-size:15px">'+currentMsg()+'</p></div>'
      +(atEnd?endCardHtml(path):'')
      +'<div class="row"><button id="a">다가간다 (-1)</button><button class="sec" id="b">기다린다 (-1)</button></div>'
      +'<div class="row" style="margin-top:8px"><button class="sec" id="undo" '+(step<=0?'disabled':'')+'>↩ 한 장면 되돌리기</button>'
      +'<button class="sec" id="restart">처음부터</button><button class="sec" id="free">무료 +2 (일1)</button></div>'
      +pathHtml
      +'<div id="log" class="sub" style="margin-top:10px"></div>'
      +(atEnd?'<div id="sharePeak" style="margin-top:12px;padding:10px;border:1px solid #f472b644;border-radius:12px"><p style="margin:0 0 6px;font-size:13px">✨ 엔딩 직후 — 공유</p><button class="sec" id="shareBtn">📤 스토리 공유</button>'
        +(loopN()===1?'<button class="sec" id="loop2" style="margin-top:8px;width:100%">루프2 · 비 오는 밤</button>':'<p class="sub" style="margin:8px 0 0">루프2 끝 · 장편 CMS 없음 · 처음부터=루프1</p>')
        +'</div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 크레딧 · 후원 (18+ 엔터)</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BRomance%5D%20support">☕ 후원</a>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/ai-companion/?utm_source=romance&utm_medium=pipe">💋 Companion</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=romance&utm_medium=pipe">🎮 Arcade</a></div></div>';
    function go(ch){
      if(credits<=0){document.getElementById('log').textContent='크레딧 없음 · 후원 문의';try{legionTrack('money_pipe_shown',{app:'romance',empty:1})}catch(e){}return;}
      if(atEnd){document.getElementById('log').textContent='엔딩 완료 · 처음부터 또는 공유';return;}
      credits--; step=Math.min(SCENE_N-1, step+1); pushPath(ch); save(); bumpStreak();
      render();
      document.getElementById('log').textContent='선택: '+ch;
      if(step>=SCENE_N-1){try{legionTrack('share_peak_shown',{end:1})}catch(e){} try{legionTrack('money_pipe_shown',{app:'romance'})}catch(e){}}
      try{legionTrack('activate',{ch:ch,step:step})}catch(e){}
    }
    document.getElementById('a').onclick=function(){go('다가감');};
    document.getElementById('b').onclick=function(){go('대기');};
    document.getElementById('undo').onclick=function(){
      if(step<=0)return;
      step=Math.max(0,step-1);
      try{var p=pathLog(); p.pop(); localStorage.setItem('rq_path',JSON.stringify(p));}catch(e){}
      save(); render(); try{legionTrack('undo',{})}catch(e){}
    };
    document.getElementById('restart').onclick=function(){
      if(!confirm('처음부터? 크레딧은 유지'))return;
      step=0; setLoop(1); try{localStorage.setItem('rq_path','[]');}catch(e){}
      save(); render(); try{legionTrack('restart',{})}catch(e){}
    };
    var l2=document.getElementById('loop2');
    if(l2) l2.onclick=function(){
      step=0; setLoop(2); try{localStorage.setItem('rq_path','[]');}catch(e){}
      save(); render(); try{legionTrack('activate',{loop:2})}catch(e){}
    };
    document.getElementById('free').onclick=function(){
      var k='rq_free_'+dayKey(0);
      if(localStorage.getItem(k)){document.getElementById('log').textContent='오늘 무료 충전 완료';return;}
      credits+=2; localStorage.setItem(k,'1'); save(); render(); try{legionTrack('activate',{free:1})}catch(e){}
    };
    var sb=document.getElementById('shareBtn');
    if(sb) sb.onclick=function(){
      var text='Romance Quest '+LI.name+' · '+endL+' (fictional 18+) · path '+path.map(function(x){return x.ch;}).join('/')+'\n'+shareUrl();
      if(navigator.share)navigator.share({text:text,url:shareUrl()}).catch(function(){});
      else if(navigator.clipboard)navigator.clipboard.writeText(text);
      try{legionTrack('share_peak',{end:endL})}catch(e){}
    };
  }
  try{var q=new URLSearchParams(location.search||'');var ref=q.get('ref');if(ref&&ref!=='share'&&ref!==kId()&&!localStorage.getItem('rq_k_from')){localStorage.setItem('rq_k_from',ref);try{legionTrack('k_link',{from:ref})}catch(e){}}}catch(e){}
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
