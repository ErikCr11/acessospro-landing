// Old proof-section links now open at the top of the landing page.
if(location.hash==='#clientes'){history.replaceState(null,'',location.pathname+location.search);scrollTo({top:0,left:0,behavior:'instant'});}
(()=>{const root=document.getElementById('main');function responsive(){root.classList.remove('framer-a5femu','framer-aj1dkf','framer-13uas0h','framer-1pbrz1');root.classList.add(innerWidth>=1620?'framer-a5femu':innerWidth>=1200?'framer-aj1dkf':innerWidth>=810?'framer-13uas0h':'framer-1pbrz1')}responsive();addEventListener('resize',responsive);})();
(()=>{const button=document.querySelector('.ap-menu-toggle');const menu=document.createElement('nav');menu.className='ap-menu';menu.setAttribute('aria-label','Menu móvel');menu.innerHTML=document.querySelector('.ap-nav nav').innerHTML;document.body.append(menu);button.addEventListener('click',()=>{const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');button.textContent=open?'×':'☰';document.body.style.overflow=open?'hidden':''});function close(){menu.classList.remove('open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menu');button.textContent='☰';document.body.style.overflow=''}menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.querySelectorAll('video').forEach(v=>{v.muted=true;const play=v.play();if(play)play.catch(()=>{})});if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('video').forEach(v=>v.pause());})();

(()=>{
 const gallery=document.querySelector('.ap-proof-gallery');
 const dialog=document.querySelector('.ap-proof-dialog');
 const pause=document.querySelector('[data-proof-autoplay]');
 if(!gallery||!dialog||!pause)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=reduced.matches, visible=false, hovered=false, manualUntil=0;
 function updatePause(){pause.textContent=paused?'Continuar':'Pausar';pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Continuar passagem automática dos prints':'Pausar passagem automática dos prints');}
 function move(direction,automatic=false){
  const card=gallery.querySelector('.ap-proof-card');
  const step=card.getBoundingClientRect().width+parseFloat(getComputedStyle(gallery).gap);
  const max=gallery.scrollWidth-gallery.clientWidth;
  const next=automatic&&max-gallery.scrollLeft<=3?0:Math.min(max,Math.max(0,gallery.scrollLeft+direction*step));
  gallery.scrollTo({left:next,behavior:reduced.matches?'instant':'smooth'});
 }
 updatePause();
 pause.addEventListener('click',()=>{paused=!paused;updatePause();});
 reduced.addEventListener('change',event=>{if(event.matches){paused=true;updatePause();}});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.2}).observe(gallery);
 gallery.addEventListener('mouseenter',()=>{hovered=true;});
 gallery.addEventListener('mouseleave',()=>{hovered=false;});
 ['pointerdown','touchstart','wheel','keydown'].forEach(event=>gallery.addEventListener(event,()=>{manualUntil=Date.now()+8000;},{passive:true}));
 document.querySelectorAll('[data-proof-scroll]').forEach(button=>button.addEventListener('click',()=>{manualUntil=Date.now()+8000;move(Number(button.dataset.proofScroll));}));
 setInterval(()=>{
  if(paused||!visible||hovered||document.hidden||dialog.open||gallery.contains(document.activeElement)||Date.now()<manualUntil)return;
  move(1,true);
 },5000);
 gallery.querySelectorAll('[data-proof]').forEach(button=>button.addEventListener('click',()=>{
  const src=button.dataset.proof;
  dialog.querySelector('img').src=src;
  dialog.querySelector('.ap-proof-original').href=src;
  dialog.showModal();
 }));
 dialog.querySelector('.ap-proof-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
})();
