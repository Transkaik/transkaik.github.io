function initNavigation(){
  const header=document.querySelector('[data-header]');
  const updateHeader=()=>header.classList.toggle('scrolled',window.scrollY>20);
  updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
}

function initContentOrder(){
  const appendInOrder=(parent,ids)=>{if(!parent)return;ids.forEach(id=>{const item=document.getElementById(id);if(item)parent.appendChild(item)})};
  appendInOrder(document.getElementById('ventures'),['storage-platform','healthy-bowl','kettle-recipe','bpa','china-camping-club','marketing-intern']);
  appendInOrder(document.querySelector('.leadership-list'),['head-prefect','head-ambassador','writing-center-tutor','calligraphy-club','assistance-coach','volunteer-teaching','cooking-club']);
  appendInOrder(document.getElementById('visual'),['photography','documentary']);
  appendInOrder(document.querySelector('.sports-pair'),['dancing','soccer']);
}

function initDetailLinks(){
  if(!document.body.classList.contains('home-page'))return;
  const pages={
    'storage-platform':'ventures.html','healthy-bowl':'ventures.html','kettle-recipe':'ventures.html','bpa':'ventures.html','china-camping-club':'ventures.html','marketing-intern':'ventures.html',
    'head-prefect':'leadership.html','head-ambassador':'leadership.html','writing-center-tutor':'leadership.html','calligraphy-club':'leadership.html','assistance-coach':'leadership.html','volunteer-teaching':'leadership.html','cooking-club':'leadership.html',
    'photography':'visual.html','documentary':'visual.html','figure-skating':'sports.html','dancing':'sports.html','soccer':'sports.html'
  };
  Object.entries(pages).forEach(([id,page])=>{
    const module=document.getElementById(id);if(!module)return;const url=`./${page}#${id}`;
    const title=module.querySelector('h3');if(title&&!title.querySelector('a')){const link=document.createElement('a');link.href=url;link.className='module-title-link';link.innerHTML=title.innerHTML;title.replaceChildren(link)}
    const found=module.querySelector('.media-carousel,.collage,.photo-grid,.video-placeholder,.zoom,img');const media=found?.tagName==='IMG'?found.parentElement:found;if(media&&!media.querySelector(':scope > .browse-more')){media.classList.add('detail-media');const link=document.createElement('a');link.href=url;link.className='browse-more';link.setAttribute('aria-label',`Browse more about ${title?.textContent.trim()||id}`);link.innerHTML='<span>Click to browse more</span><b aria-hidden="true">↗</b>';media.appendChild(link)}
  });
}

const CHAPTERS=[
  {label:'Ventures',page:'ventures.html',modules:[['storage-platform','Storage Platform &amp; Secondhand Trading'],['healthy-bowl','Healthy Bowl'],['kettle-recipe','Kettle Recipe'],['bpa','BPA'],['china-camping-club','China Camping Club'],['marketing-intern','Marketing Intern']]},
  {label:'Leadership',page:'leadership.html',modules:[['head-prefect','Head Prefect'],['head-ambassador','Head Ambassador'],['writing-center-tutor','Writing Center Tutor'],['calligraphy-club','Calligraphy Club'],['assistance-coach','Assistance Coach'],['volunteer-teaching','Volunteer Teaching'],['cooking-club','Cooking Club']]},
  {label:'Visual',page:'visual.html',modules:[['photography','Photography'],['documentary','Documentary']]},
  {label:'Sports',page:'sports.html',modules:[['figure-skating','Figure Skating'],['dancing','Dancing'],['soccer','Soccer']]}
];

function initDetailNavigation(){
  if(!document.body.classList.contains('detail-page'))return;
  const nav=document.getElementById('primary-nav');if(!nav)return;
  nav.setAttribute('aria-label','Primary navigation');
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const preview=`<div class="dropdown-jump">`+CHAPTERS.map(ch=>`<a href="./index.html#${ch.page.replace('.html','')}">${ch.label} <span>Preview</span></a>`).join('')+`</div>`;
  nav.innerHTML=`<div class="nav-group"><a class="nav-link" href="./index.html#home" data-section="home">Home</a><div class="dropdown">${preview}</div></div>`+CHAPTERS.map(ch=>{
    const active=file===ch.page;
    const links=ch.modules.map(([id,label])=>`<a href="./${ch.page}#${id}">${label}</a>`).join('');
    return `<div class="nav-group"><a class="nav-link${active?' active':''}" href="./${ch.page}"${active?' aria-current="page"':''}>${ch.label}</a><div class="dropdown">${links}</div></div>`;
  }).join('');
}

function initModuleFocus(){
  if(!document.body.classList.contains('detail-page'))return;
  const modules=[...document.querySelectorAll('.detail-module')];
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const chapter=CHAPTERS.find(item=>item.page===file);
  const smooth=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
  const render=()=>{
    const id=decodeURIComponent(location.hash.replace('#',''));
    const next=id?modules.find(module=>module.id===id):null;
    modules.forEach(module=>{module.classList.remove('is-focused');module.querySelector('.module-focus-bar')?.remove()});
    document.body.classList.toggle('module-focus',Boolean(next));
    if(!next)return;
    next.classList.add('is-focused');
    const bar=document.createElement('p');
    bar.className='module-focus-bar';
    bar.innerHTML=`<a class="module-back" href="./${file}"><span aria-hidden="true">←</span> Back to all ${chapter?chapter.label:'stories'}</a>`;
    next.prepend(bar);
    next.scrollIntoView({block:'start',behavior:smooth()});
  };
  render();
  window.addEventListener('hashchange',render);
}

function initDropdowns(){
  document.querySelectorAll('.nav-trigger').forEach(trigger=>{
    trigger.addEventListener('click',()=>{
      const group=trigger.closest('.nav-group');const open=group.classList.toggle('open');
      trigger.setAttribute('aria-expanded',String(open));
      document.querySelectorAll('.nav-group').forEach(other=>{if(other!==group){other.classList.remove('open');other.querySelector('.nav-trigger').setAttribute('aria-expanded','false')}});
    });
  });
  document.addEventListener('click',event=>{if(!event.target.closest('.nav-group'))document.querySelectorAll('.nav-group').forEach(group=>{group.classList.remove('open');group.querySelector('.nav-trigger').setAttribute('aria-expanded','false')})});
}

function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const href=link.getAttribute('href');if(!href||href==='#')return;
    const target=document.querySelector(href);if(!target)return;
    event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    history.replaceState(null,'',href);
  }));
}

function initScrollSpy(){
  const byPage=name=>document.querySelector('a.nav-link[href$="'+name+'.html"]');
  const map={home:document.querySelector('[data-section="home"]'),ventures:byPage('ventures'),leadership:byPage('leadership'),visual:byPage('visual'),sports:byPage('sports')};
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){Object.values(map).forEach(item=>item?.classList.remove('active'));map[entry.target.dataset.spy]?.classList.add('active')}}),{rootMargin:'-30% 0px -60% 0px'});
  document.querySelectorAll('[data-spy]').forEach(section=>observer.observe(section));
}

function initRevealAnimations(){
  const items=document.querySelectorAll('.reveal,.reveal-group,.reveal-media');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(item=>item.classList.add('is-visible'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'});
  items.forEach(item=>observer.observe(item));
}

function pauseMedia(root){root.querySelectorAll('video').forEach(video=>video.pause())}

function showSlide(carousel,index){
  const slides=[...carousel.querySelectorAll('.slide')];if(!slides.length)return;
  pauseMedia(carousel);const next=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===next));carousel.dataset.index=String(next);
  const count=carousel.querySelector('.carousel-count');if(count)count.textContent=`${next+1} / ${slides.length}`;
}

function initCarousels(){
  document.querySelectorAll('[data-carousel]').forEach(carousel=>{
    carousel.dataset.index='0';
    let timer;const interval=Number(carousel.dataset.autoplay||3000);
    const restart=()=>{clearInterval(timer);if(interval>0&&!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>showSlide(carousel,Number(carousel.dataset.index)+1),interval)};
    carousel.querySelector('.carousel-prev')?.addEventListener('click',()=>{showSlide(carousel,Number(carousel.dataset.index)-1);restart()});
    carousel.querySelector('.carousel-next')?.addEventListener('click',()=>{showSlide(carousel,Number(carousel.dataset.index)+1);restart()});
    let startX=0;carousel.addEventListener('touchstart',event=>startX=event.changedTouches[0].clientX,{passive:true});
    carousel.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-startX;if(Math.abs(distance)>45){showSlide(carousel,Number(carousel.dataset.index)+(distance<0?1:-1));restart()}},{passive:true});
    carousel.addEventListener('mouseenter',()=>clearInterval(timer));carousel.addEventListener('mouseleave',restart);
    carousel.addEventListener('focusin',()=>clearInterval(timer));carousel.addEventListener('focusout',restart);
    document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):restart());restart();
  });
}

function initLightbox(){
  const dialog=document.querySelector('.lightbox');const image=dialog.querySelector('img');const caption=dialog.querySelector('figcaption');const items=[...document.querySelectorAll('.zoom')];let index=0;
  const openAt=value=>{index=(value+items.length)%items.length;const source=items[index].querySelector('img');if(!source)return;image.src=source.currentSrc||source.src;image.alt=source.alt;caption.textContent=items[index].closest('figure')?.querySelector('figcaption')?.textContent||source.alt};
  items.forEach((item,itemIndex)=>item.addEventListener('click',()=>{openAt(itemIndex);dialog.showModal()}));
  dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.lightbox-prev').addEventListener('click',()=>openAt(index-1));dialog.querySelector('.lightbox-next').addEventListener('click',()=>openAt(index+1));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')openAt(index-1);if(event.key==='ArrowRight')openAt(index+1)});
}

function initMobileMenu(){
  const button=document.querySelector('.menu-toggle');const nav=document.querySelector('#primary-nav');
  const close=()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')};
  button.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));window.addEventListener('resize',()=>{if(innerWidth>=768)close()});
}

function initLazyVideos(){
  const videos=document.querySelectorAll('video[data-src]');if(!videos.length)return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const video=entry.target;video.src=video.dataset.src;video.removeAttribute('data-src');video.load();observer.unobserve(video)}}),{rootMargin:'300px'});videos.forEach(video=>observer.observe(video));
}

function initBpaCertificatePreviews(){
  document.querySelectorAll('#bpa .resource-links a[download]').forEach(link=>{link.removeAttribute('download');link.target='_blank';link.rel='noopener noreferrer'});
}

function initFeatureVideos(){
  const wrappers=[...document.querySelectorAll('[data-feature-video]')];
  const videos=wrappers.map(wrapper=>wrapper.querySelector('video')).filter(Boolean);
  videos.forEach(video=>{video.muted=false;video.removeAttribute('muted');video.volume=1;video.playsInline=true});
  wrappers.forEach(wrapper=>{
    const video=wrapper.querySelector('video');const button=wrapper.querySelector('.feature-video-toggle');if(!video||!button)return;
    let hideTimer;
    const showTemporarily=()=>{clearTimeout(hideTimer);wrapper.classList.remove('controls-hidden');if(!video.paused&&!video.ended)hideTimer=setTimeout(()=>wrapper.classList.add('controls-hidden'),2000)};
    const sync=()=>{const playing=!video.paused&&!video.ended;wrapper.classList.toggle('is-playing',playing);wrapper.classList.toggle('is-muted',video.muted);button.setAttribute('aria-label',playing?'Pause video':'Play video');button.querySelector('span').textContent=playing?'❚❚':'▶';if(playing)showTemporarily();else{clearTimeout(hideTimer);wrapper.classList.remove('controls-hidden')}};
    const startWithSound=()=>{video.muted=false;video.removeAttribute('muted');video.volume=1;const attempt=video.play();if(attempt)attempt.catch(()=>{})};
    button.addEventListener('click',()=>video.paused?startWithSound():video.pause());
    wrapper.addEventListener('pointermove',()=>{if(!video.paused)showTemporarily()});
    video.addEventListener('play',()=>{videos.forEach(other=>{if(other!==video&&!other.paused)other.pause()});sync()});video.addEventListener('pause',sync);video.addEventListener('ended',sync);video.addEventListener('volumechange',sync);sync();
  });
  const firstVideo=videos[0];if(!firstVideo)return;
  const firstWrapper=firstVideo.closest('[data-feature-video]')||firstVideo;
  let autoplayVisible=false;
  const unmute=()=>{if(!firstVideo.muted)return;firstVideo.muted=false;firstVideo.removeAttribute('muted');firstVideo.volume=1;firstWrapper.classList.remove('is-muted');if(firstVideo.paused){const attempt=firstVideo.play();if(attempt)attempt.catch(()=>{})}};
  const armGestureUnmute=()=>{['pointerdown','keydown','touchstart'].forEach(type=>window.addEventListener(type,unmute,{once:true,capture:true}))};
  const autoplay=()=>{
    firstVideo.muted=false;firstVideo.removeAttribute('muted');firstVideo.volume=1;firstWrapper.classList.remove('is-muted');
    const attempt=firstVideo.play();
    if(attempt)attempt.catch(()=>{firstVideo.muted=true;firstVideo.setAttribute('muted','');firstWrapper.classList.add('is-muted');const retry=firstVideo.play();if(retry)retry.catch(()=>{});armGestureUnmute()});
  };
  if(!firstWrapper.querySelector('.feature-video-sound')){
    const sound=document.createElement('button');sound.type='button';sound.className='feature-video-sound';sound.setAttribute('aria-label','Turn on video sound');sound.textContent='Tap for sound';
    sound.addEventListener('click',unmute);firstWrapper.appendChild(sound);
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    autoplayVisible=entry.isIntersecting;
    if(autoplayVisible)autoplay();
    else firstVideo.pause();
  }),{threshold:.35});
  observer.observe(firstWrapper);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)firstVideo.pause();else if(autoplayVisible)autoplay()});
}

function loadYouTubeAPI(){
  if(window.YT?.Player)return Promise.resolve(window.YT);
  return new Promise(resolve=>{
    const previous=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{if(typeof previous==='function')previous();resolve(window.YT)};
    if(!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')){
      const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';document.head.appendChild(script);
    }
  });
}

function initYouTubeVideos(){
  const wrappers=[...document.querySelectorAll('[data-youtube-video]')];if(!wrappers.length)return;
  if(!document.querySelector('meta[name="referrer"]')){const meta=document.createElement('meta');meta.name='referrer';meta.content='strict-origin-when-cross-origin';document.head.appendChild(meta)}
  loadYouTubeAPI().then(YT=>{
    const players=[];let autoplayPlayer=null;let autoplayVisible=false;let observerStarted=false;
    const firstMedia=document.querySelector('[data-feature-video]');
    const pageOrigin=/^https?:$/.test(location.protocol)?location.origin:'https://transkaik.github.io';
    const pageReferrer=/^https?:$/.test(location.protocol)?location.href:pageOrigin;
    const update=(wrapper,playing)=>{wrapper.classList.toggle('is-playing',playing);const button=wrapper.querySelector('.feature-video-toggle');if(!button)return;button.hidden=playing;button.setAttribute('aria-label',playing?'Pause video':'Play video');button.querySelector('span').textContent=playing?'❚❚':'▶'};
    const pauseOthers=current=>{players.forEach(({player})=>{if(player!==current&&player.getPlayerState?.()===YT.PlayerState.PLAYING)player.pauseVideo()});document.querySelectorAll('video').forEach(video=>{if(!video.paused)video.pause()})};
    const playWithSound=(wrapper,player)=>{
      pauseOthers(player);player.unMute();player.setVolume(100);wrapper.classList.remove('is-muted');update(wrapper,true);player.playVideo();
    };
    wrappers.forEach(wrapper=>{
      const mount=wrapper.querySelector('.youtube-player');const button=wrapper.querySelector('.feature-video-toggle');if(!mount||!button)return;
      const videoId=mount.dataset.youtubeId;
      const player=new YT.Player(mount,{videoId,host:'https://www.youtube.com',playerVars:{autoplay:0,controls:1,playsinline:1,rel:0,modestbranding:1,origin:pageOrigin,widget_referrer:pageReferrer},events:{
        onReady:()=>{
          if(wrapper===firstMedia){autoplayPlayer=player;if(!observerStarted){observerStarted=true;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{autoplayVisible=entry.isIntersecting;if(autoplayVisible)playWithSound(wrapper,player);else player.pauseVideo()}),{threshold:.35});observer.observe(wrapper)}}
        },
        onStateChange:event=>{if(event.data===YT.PlayerState.PLAYING){update(wrapper,true);pauseOthers(player)}else if([YT.PlayerState.UNSTARTED,YT.PlayerState.ENDED,YT.PlayerState.PAUSED,YT.PlayerState.CUED].includes(event.data))update(wrapper,false)},
        onAutoplayBlocked:()=>update(wrapper,false)
      }});
      players.push({wrapper,player});button.addEventListener('click',()=>player.getPlayerState()===YT.PlayerState.PLAYING?player.pauseVideo():playWithSound(wrapper,player));
    });
    document.addEventListener('visibilitychange',()=>{if(!autoplayPlayer)return;if(document.hidden)autoplayPlayer.pauseVideo();else if(autoplayVisible){const item=players.find(({player})=>player===autoplayPlayer);if(item)playWithSound(item.wrapper,autoplayPlayer)}});
  });
}

document.addEventListener('DOMContentLoaded',()=>{initContentOrder();initDetailLinks();initDetailNavigation();initModuleFocus();initNavigation();initDropdowns();initSmoothScroll();initScrollSpy();initRevealAnimations();initCarousels();initLightbox();initMobileMenu();initLazyVideos();initBpaCertificatePreviews();initFeatureVideos();initYouTubeVideos()});
