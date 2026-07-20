(function(){
  var credits=+(localStorage.getItem('romance-quest_cr')||10);
  var root=document.getElementById('app');
  var step=+(localStorage.getItem('rq_step')||0);
  var lines=['카페 앞에서 마주친다.','비가 오기 시작한다.','상대가 우산을 내민다.','엘리베이터에 단둘이.','옥상에서 도시 불빛.'];
  function save(){localStorage.setItem('romance-quest_cr',credits);localStorage.setItem('rq_step',step);}
  function render(){
    root.innerHTML='<div class="card" style="border-color:#f472b6"><b>18+</b> Fictional · 실관계 아님</div>'
      +'<div class="card">크레딧 <b style="color:var(--gold)">'+credits+'</b> · 장면 '+(step+1)+'/'+lines.length
      +'<p style="margin:12px 0;font-size:16px">'+(lines[step]||'끝')+'</p>'
      +'<div class="row"><button id="a">다가간다 (-1)</button><button class="sec" id="b">기다린다 (-1)</button></div>'
      +'<div id="log" class="sub" style="margin-top:10px"></div></div>';
    function go(ch){
      if(credits<=0){document.getElementById('log').textContent='크레딧 없음';return;}
      credits--; step=Math.min(lines.length-1, step+1); save();
      document.getElementById('log').textContent='선택: '+ch; if(step>=lines.length-1){try{legionTrack('share_peak_shown',{end:1})}catch(e){}} render();
      try{legionTrack('activate',{ch:ch,step:step})}catch(e){}
    }
    document.getElementById('a').onclick=function(){go('다가감');};
    document.getElementById('b').onclick=function(){go('대기');};
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
