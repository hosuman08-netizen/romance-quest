(function(){
  var credits=+(localStorage.getItem('romance-quest_cr')||10);
  var root=document.getElementById('app');
  var step=+(localStorage.getItem('rq_step')||0);
  var lines=['카페 앞에서 마주친다.','비가 오기 시작한다.','상대가 우산을 내민다.','엘리베이터에 단둘이.','옥상에서 도시 불빛.'];
  var SHARE_BASE='https://hosuman08-netizen.github.io/romance-quest/';
  function save(){localStorage.setItem('romance-quest_cr',credits);localStorage.setItem('rq_step',step);}
  function dayKey(off){var d=new Date();d.setDate(d.getDate()+(off||0));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function kId(){try{var id=localStorage.getItem('rq_k_id');if(!id){id='r'+Math.random().toString(36).slice(2,8);localStorage.setItem('rq_k_id',id);}return id;}catch(e){return 'share';}}
  function shareUrl(){return SHARE_BASE+'?utm_source=share&utm_medium=app&ref='+encodeURIComponent(kId());}
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
    var atEnd=step>=lines.length-1;
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실관계 아님</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b> · 장면 '+(step+1)+'/'+lines.length+' · '+Math.round((step+1)/lines.length*100)+'%'+' · 🔥 '+sc+'일'+(sc>=3&&ready?' · 🛡️':'')
      +'<p style="margin:12px 0;font-size:16px">'+(lines[step]||'끝')+'</p>'
      +'<div class="row"><button id="a">다가간다 (-1)</button><button class="sec" id="b">기다린다 (-1)</button></div>'
      +'<div id="log" class="sub" style="margin-top:10px"></div>'
      +(atEnd?'<div id="sharePeak" style="margin-top:12px;padding:10px;border:1px solid #f472b644;border-radius:12px"><p style="margin:0 0 6px;font-size:13px">✨ 엔딩 직후 — 공유</p><button class="sec" id="shareBtn">📤 스토리 공유</button></div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">'
      +'<div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 크레딧 · 후원 (18+ 엔터)</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BRomance%5D%20support">☕ 후원</a>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/ai-companion/?utm_source=romance&utm_medium=pipe">💋 Companion</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=romance&utm_medium=pipe">🎮 Arcade</a></div></div>';
    function go(ch){
      if(credits<=0){document.getElementById('log').textContent='크레딧 없음 · 후원 문의';try{legionTrack('money_pipe_shown',{app:'romance',empty:1})}catch(e){}return;}
      credits--; step=Math.min(lines.length-1, step+1); save(); bumpStreak();
      render();
      document.getElementById('log').textContent='선택: '+ch;
      if(step>=lines.length-1){try{legionTrack('share_peak_shown',{end:1})}catch(e){} try{legionTrack('money_pipe_shown',{app:'romance'})}catch(e){}}
      try{legionTrack('activate',{ch:ch,step:step})}catch(e){}
    }
    document.getElementById('a').onclick=function(){go('다가감');};
    document.getElementById('b').onclick=function(){go('대기');};
    var sb=document.getElementById('shareBtn');
    if(sb) sb.onclick=function(){
      var text='Romance Quest ending (fictional 18+)\n'+shareUrl();
      if(navigator.share)navigator.share({text:text,url:shareUrl()}).catch(function(){});
      else if(navigator.clipboard)navigator.clipboard.writeText(text);
      try{legionTrack('share_peak',{})}catch(e){}
    };
  }
  try{var q=new URLSearchParams(location.search||'');var ref=q.get('ref');if(ref&&ref!=='share'&&ref!==kId()&&!localStorage.getItem('rq_k_from')){localStorage.setItem('rq_k_from',ref);try{legionTrack('k_link',{from:ref})}catch(e){}}}catch(e){}
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
