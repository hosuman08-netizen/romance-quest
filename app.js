
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
    if(step<=0) return SHARED;
    var prev=path[Math.min(step-1, Math.max(0,path.length-1))];
    var ch=(prev && prev.ch) || '다가감';
    var set=BRANCH[ch]||BRANCH['다가감'];
    return set[Math.min(step, set.length-1)]||SHARED;
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
  function currentMsg(){
    return MSG[Math.min(Math.max(0,step), MSG.length-1)]||MSG[0];
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
    var pathHtml=path.length?'<div class="sub" style="margin-top:8px">경로: '+path.map(function(x){return x.ch;}).join(' → ')+'</div>':'';
    if(step>SCENE_N-1){step=SCENE_N-1; save();}
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실관계 아님</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b> · 장면 '+(step+1)+'/'+SCENE_N+' · '+Math.round((step+1)/SCENE_N*100)+'% · 🔥 '+sc+'일'+(sc>=3&&ready?' · 🛡️':'')
      +' · 창 '+fomoLeft()
      +'<div class="bar" style="height:6px;background:#2a2438;border-radius:4px;margin:8px 0;overflow:hidden"><i style="display:block;height:100%;width:'+Math.round((step+1)/SCENE_N*100)+'%;background:#f472b6"></i></div>'
      +'<div style="margin:8px 0 4px"><b style="color:#f472b6">'+LI.name+'</b> · <span class="sub">'+LI.line+' · 픽션 1명 · 실인물 0</span></div>'
      +'<p style="margin:12px 0;font-size:16px">'+currentLine()+'</p>'
      +'<div id="msgCard" style="margin:0 0 12px;padding:10px 12px;border-radius:12px 12px 12px 4px;background:#241821;border:1px solid #f472b644">'
      +'<div class="sub" style="margin:0 0 4px">💬 '+LI.name+' · 메시지 · 고정 1줄 · LLM 0</div>'
      +'<p style="margin:0;font-size:15px">'+currentMsg()+'</p></div>'
      +(atEnd?'<p style="color:#e0b552;font-weight:700;margin:0 0 8px">'+endL+'</p>':'')
      +'<div class="row"><button id="a">다가간다 (-1)</button><button class="sec" id="b">기다린다 (-1)</button></div>'
      +'<div class="row" style="margin-top:8px"><button class="sec" id="undo" '+(step<=0?'disabled':'')+'>↩ 한 장면 되돌리기</button>'
      +'<button class="sec" id="restart">처음부터</button><button class="sec" id="free">무료 +2 (일1)</button></div>'
      +pathHtml
      +'<div id="log" class="sub" style="margin-top:10px"></div>'
      +(atEnd?'<div id="sharePeak" style="margin-top:12px;padding:10px;border:1px solid #f472b644;border-radius:12px"><p style="margin:0 0 6px;font-size:13px">✨ 엔딩 직후 — 공유</p><button class="sec" id="shareBtn">📤 스토리 공유</button></div>':'')
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
      step=0; try{localStorage.setItem('rq_path','[]');}catch(e){}
      save(); render(); try{legionTrack('restart',{})}catch(e){}
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
