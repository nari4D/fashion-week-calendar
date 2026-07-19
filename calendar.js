/* 世界のファッションウィークカレンダー — 埋め込み描画スクリプト
   Shopify等に <div id="fw-calendar"></div> を置き、このJSを読み込むだけ。
   data.json と map.png を同じ配信元(BASE)から読み込みます。 */
(function () {
  var BASE = (typeof window.FW_CAL_BASE === 'string') ? window.FW_CAL_BASE : 'https://cdn.jsdelivr.net/gh/nari4D/fashion-week-calendar@main';
  var DATA_URL = BASE + '/data.json';
  var MAP_URL  = BASE + '/map.png';
  var STLABEL = { open: 'アクレディ受付中', amber: 'アクレディ受付前', tbd: '次回日程 未発表' };

  var CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap');
  #fw-calendar{--ink:#1b2029;--sub:#5f6672;--line:#e6e8ec;--accent:#e0345f;--blue:#2f6fed;--green:#12a56a;--amber:#e08a12;--gray:#8a909c;--ig:#c13584;--sea:#eef3f9;--panel:#f6f7f9;
    font-family:"Noto Sans JP",-apple-system,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;color:var(--ink);max-width:940px;margin:0 auto;font-size:16px;line-height:1.8;-webkit-font-smoothing:antialiased;}
  #fw-calendar *{box-sizing:border-box;}
  #fw-calendar .fw-h1{font-size:26px;font-weight:800;margin:0 0 2px;}
  #fw-calendar .fw-date{color:var(--accent);font-weight:800;font-size:14px;letter-spacing:.04em;}
  #fw-calendar .fw-tag{color:var(--sub);font-size:13px;margin-bottom:12px;}
  #fw-calendar .fw-mapbox{position:relative;width:100%;background:var(--sea);border:1px solid var(--line);border-radius:16px;padding:6px;}
  #fw-calendar .fw-mapwrap{position:relative;width:100%;}
  #fw-calendar .fw-mapimg{width:100%;display:block;border-radius:12px;}
  #fw-calendar .fw-ov{position:absolute;inset:0;width:100%;height:100%;}
  #fw-calendar .fw-dot{stroke:#fff;stroke-width:2;}
  #fw-calendar .fw-dot.open{fill:var(--green);}#fw-calendar .fw-dot.amber{fill:var(--amber);}#fw-calendar .fw-dot.tbd{fill:var(--gray);}
  #fw-calendar .fw-ring{fill:none;stroke-width:2;}#fw-calendar .fw-ring.open{stroke:var(--green);}#fw-calendar .fw-ring.amber{stroke:var(--amber);}
  #fw-calendar .fw-lbl{font-size:13px;font-weight:800;fill:var(--ink);paint-order:stroke;stroke:#fff;stroke-width:3.5px;stroke-linejoin:round;cursor:pointer;}
  #fw-calendar .fw-pin,#fw-calendar .fw-hit,#fw-calendar .fw-lbl{cursor:pointer;}
  #fw-calendar .fw-pin:hover .fw-dot{stroke:var(--blue);}#fw-calendar .fw-pin:hover .fw-lbl{fill:var(--blue);}
  #fw-calendar .fw-pin.active .fw-dot{stroke:var(--blue);stroke-width:3;}
  #fw-calendar .fw-legend{display:flex;gap:18px;flex-wrap:wrap;justify-content:center;font-size:13px;color:var(--sub);margin:10px 0 14px;}
  #fw-calendar .fw-legend span{display:inline-flex;align-items:center;gap:6px;}
  #fw-calendar .fw-dl{width:11px;height:11px;border-radius:50%;display:inline-block;}
  #fw-calendar .fw-card{background:var(--panel);border:1px solid var(--line);border-left:4px solid var(--blue);border-radius:12px;padding:14px 16px;margin:6px 0 20px;min-height:60px;}
  #fw-calendar .fw-card .n{font-weight:800;font-size:16px;}#fw-calendar .fw-card .m{font-size:14px;color:#3b4150;margin-top:4px;}#fw-calendar .fw-hint{color:var(--sub);font-size:14px;}
  #fw-calendar .fw-sec{font-size:19px;font-weight:800;margin:22px 0 12px;}
  #fw-calendar #fw-tl{max-height:360px;overflow-y:auto;border:1px solid var(--line);border-radius:14px;padding:4px 12px;background:#fff;}
  #fw-calendar #fw-tl::-webkit-scrollbar{width:10px;}
  #fw-calendar #fw-tl::-webkit-scrollbar-thumb{background:#d3d8e0;border-radius:8px;border:2px solid #fff;}
  #fw-calendar #fw-tl::-webkit-scrollbar-track{background:transparent;}
  #fw-calendar .fw-item{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0;box-shadow:0 1px 2px rgba(20,24,40,.04);cursor:pointer;}
  #fw-calendar .fw-item.est{background:#fafbfc;opacity:.92;}
  #fw-calendar .fw-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;}
  #fw-calendar .fw-d{font-weight:800;font-size:17px;color:var(--blue);}#fw-calendar .fw-item.est .fw-d{color:var(--gray);font-size:15px;}
  #fw-calendar .fw-nm{font-weight:800;font-size:16px;margin-top:4px;}#fw-calendar .fw-item.est .fw-nm{color:#6b7280;}
  #fw-calendar .fw-ct{color:var(--sub);font-size:13px;margin:1px 0 4px;}
  #fw-calendar .fw-ac{font-size:14px;color:#3b4150;}
  #fw-calendar .fw-lk{font-size:13px;margin-top:6px;display:flex;gap:14px;flex-wrap:wrap;}
  #fw-calendar a{color:var(--blue);text-decoration:none;}#fw-calendar a:hover{text-decoration:underline;}
  #fw-calendar .fw-ig{color:var(--ig);font-weight:700;}
  #fw-calendar .fw-bd{font-size:12px;font-weight:800;padding:3px 10px;border-radius:999px;white-space:nowrap;}
  #fw-calendar .fw-bd.open{background:#e5f6ee;color:var(--green);}#fw-calendar .fw-bd.amber{background:#fbf0dc;color:var(--amber);}#fw-calendar .fw-bd.tbd{background:#eef0f3;color:var(--gray);}
  `;

  function h(tag, cls, html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
  function ig(url){ return url ? '<a class="fw-ig" href="'+url+'" target="_blank" rel="noopener">📷 Instagram</a>' : ''; }

  function boot(){
    var root=document.getElementById('fw-calendar'); if(!root) return;
    var style=document.createElement('style'); style.textContent=CSS; document.head.appendChild(style);
    root.innerHTML='<div class="fw-mapbox"><div class="fw-mapwrap"><img class="fw-mapimg" alt="世界のファッションウィーク地図" src="'+MAP_URL+'"><svg class="fw-ov" viewBox="185 0 815 548"></svg></div></div>'
      +'<div class="fw-legend"><span><i class="fw-dl" style="background:var(--green)"></i>アクレディ受付中</span><span><i class="fw-dl" style="background:var(--amber)"></i>アクレディ受付前（会期は確定）</span><span><i class="fw-dl" style="background:var(--gray)"></i>次回日程 未発表（前年から推定）</span></div>'
      +'<div class="fw-card" id="fw-card"><span class="fw-hint">▲ 地図の都市ピンをクリックすると、会期・アクレディ状況・公式サイト／Instagram が表示されます。</span></div>'
      +'<div class="fw-sec">時系列リスト（開催が近い順）</div><div id="fw-tl"></div>';

    fetch(DATA_URL,{cache:'no-cache'}).then(function(r){return r.json();}).then(function(data){ render(root,data); })
      .catch(function(){ document.getElementById('fw-card').innerHTML='<span class="fw-hint">データを読み込めませんでした。時間をおいて再読み込みしてください。</span>'; });
  }

  function render(root,data){
    var NS='http://www.w3.org/2000/svg';
    var byKey={}; data.events.forEach(function(e){ byKey[e.key]=e; });
    var ov=root.querySelector('.fw-ov'); var card=document.getElementById('fw-card');

    function select(k){
      root.querySelectorAll('.fw-pin').forEach(function(x){x.classList.remove('active');});
      var pin=root.querySelector('.fw-pin[data-k="'+k+'"]'); if(pin)pin.classList.add('active');
      var e=byKey[k]; if(!e)return; var html;
      if(e.kind==='confirmed'){
        html='<div class="n">'+e.city+'（'+e.country+'）— '+e.name+'</div>'
          +'<div class="m">📅 会期：<b>'+e.dateJP+'</b>　｜　'+STLABEL[e.status]+'</div>'
          +'<div class="m">📷 アクレディ／撮影：'+e.acc+'</div>'
          +'<div class="m">🔗 <a href="'+e.link+'" target="_blank" rel="noopener">公式サイト</a>　'+ig(e.ig)+'</div>';
      } else {
        html='<div class="n">'+e.city+'（'+e.country+'）— '+e.name+'</div>'
          +'<div class="m">🟠 推定会期：<b>'+e.est+'</b>（公式未発表・あくまで推定）</div>'
          +'<div class="m">📎 '+e.ref+'</div>'
          +'<div class="m" style="color:var(--sub)">状況：'+e.reason+'</div>'
          +'<div class="m">🔗 <a href="'+e.link+'" target="_blank" rel="noopener">公式サイト</a>　'+ig(e.ig)+'</div>';
      }
      card.innerHTML=html;
      var li=document.getElementById('fw-tl-'+k); if(li){li.style.outline='2px solid var(--blue)';setTimeout(function(){li.style.outline='none';},1500);}
    }

    // pins overlay
    data.pins.forEach(function(p){
      var g=document.createElementNS(NS,'g'); g.setAttribute('class','fw-pin'); g.setAttribute('data-k',p.k);
      g.addEventListener('click',function(){select(p.k);});
      function c(a){var n=document.createElementNS(NS,'circle');for(var k in a)n.setAttribute(k,a[k]);return n;}
      g.appendChild(c({class:'fw-hit',cx:p.x,cy:p.y,r:14,fill:'transparent'}));
      if(p.s==='open'||p.s==='amber') g.appendChild(c({class:'fw-ring '+p.s,cx:p.x,cy:p.y,r:10}));
      g.appendChild(c({class:'fw-dot '+p.s,cx:p.x,cy:p.y,r:6.5}));
      var t=document.createElementNS(NS,'text'); t.setAttribute('class','fw-lbl'); t.setAttribute('x',p.lx); t.setAttribute('y',p.ly); t.setAttribute('text-anchor',p.a); t.textContent=p.c;
      g.appendChild(t); ov.appendChild(g);
    });

    // timeline
    var tl=document.getElementById('fw-tl');
    data.events.slice().sort(function(a,b){return a.sort-b.sort;}).forEach(function(e){
      var div=h('div','fw-item'+(e.kind==='estimate'?' est':'')); div.id='fw-tl-'+e.key;
      var links='<div class="fw-lk"><a href="'+e.link+'" target="_blank" rel="noopener">🔗 公式サイト</a>'+ig(e.ig)+'</div>';
      if(e.kind==='estimate'){
        div.innerHTML='<div class="fw-top"><span class="fw-d">'+e.est+'</span><span class="fw-bd tbd">推定</span></div>'
          +'<div class="fw-nm">'+e.name+'</div><div class="fw-ct">'+e.city+'・'+e.country+'</div>'
          +'<div class="fw-ac">📎 '+e.ref+'</div><div class="fw-ac" style="color:var(--sub)">状況：'+e.reason+'</div>'+links;
      } else {
        div.innerHTML='<div class="fw-top"><span class="fw-d">'+e.dateJP+'</span><span class="fw-bd '+e.status+'">'+STLABEL[e.status]+'</span></div>'
          +'<div class="fw-nm">'+e.name+'</div><div class="fw-ct">'+e.city+'・'+e.country+'</div>'
          +'<div class="fw-ac">📷 '+e.acc+'</div>'+links;
      }
      div.addEventListener('click',function(ev){ if(ev.target.tagName!=='A') select(e.key); });
      tl.appendChild(div);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
