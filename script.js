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
  nav.innerHTML=`<a class="nav-link" href="./index.html#home" data-section="home">Home</a>`+CHAPTERS.map(ch=>{
    const active=file===ch.page;
    const links=ch.modules.map(([id,label])=>`<a href="./${ch.page}#${id}">${label}</a>`).join('');
    return `<div class="nav-group"><a class="nav-link${active?' active':''}" href="./${ch.page}"${active?' aria-current="page"':''}>${ch.label}</a><div class="dropdown">${links}</div></div>`;
  }).join('');
}

function initEditorialGalleries(){
  if(!document.body.classList.contains('detail-page'))return;
  ['calligraphy-club','bpa','china-camping-club','volunteer-teaching','soccer'].forEach(id=>{
    const module=document.getElementById(id);if(!module)return;
    module.querySelectorAll('[data-carousel]').forEach(gallery=>{
      gallery.classList.add('editorial-gallery');
    });
  });
}

function initModuleFocus(){
  if(!document.body.classList.contains('detail-page'))return;
  initEditorialGalleries();
  document.body.classList.add('full-stories');
  let scrollFrame;
  const cancelScroll=()=>cancelAnimationFrame(scrollFrame);
  ['wheel','touchstart','pointerdown'].forEach(type=>window.addEventListener(type,cancelScroll,{passive:true}));
  window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End','Escape',' '].includes(event.key))cancelScroll()});
  const scrollToModule=(hash=location.hash)=>{
    cancelScroll();
    let id;try{id=decodeURIComponent(hash.slice(1))}catch{return}
    const target=document.getElementById(id);if(!target)return;
    const header=document.querySelector('.site-header')?.getBoundingClientRect().height||72;
    const destination=()=>Math.max(0,target.getBoundingClientRect().top+window.scrollY-header-20);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){window.scrollTo({top:destination(),behavior:'instant'});return}
    const from=window.scrollY,start=performance.now();
    const duration=Math.min(1300,Math.max(650,Math.abs(destination()-from)*.12));
    const step=now=>{
      const progress=Math.min(1,(now-start)/duration);
      const eased=progress<.5?4*progress**3:1-(-2*progress+2)**3/2;
      // Recalculate during the journey so lazy media never leaves the anchor behind.
      window.scrollTo({top:from+(destination()-from)*eased,behavior:'instant'});
      if(progress<1)scrollFrame=requestAnimationFrame(step);
    };
    scrollFrame=requestAnimationFrame(step);
  };
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||url.pathname!==location.pathname||!url.hash)return;
    let target;try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)))}catch{return}
    if(!target)return;
    event.preventDefault();
    if(location.hash!==url.hash)history.pushState(null,'',url.hash);
    scrollToModule(url.hash);
    document.querySelectorAll('.nav-group.open').forEach(group=>group.classList.remove('open'));
  });
  if(location.hash){
    const hash=location.hash;
    history.replaceState(null,'',location.pathname+location.search);
    window.scrollTo({top:0,behavior:'instant'});
    requestAnimationFrame(()=>{history.replaceState(null,'',hash);scrollToModule(hash)});
  }
  window.addEventListener('hashchange',()=>scrollToModule());
  window.addEventListener('popstate',()=>scrollToModule());
}

function initReadingSizes(){
  const paragraphs=[...document.querySelectorAll('.detail-module-copy p,.kettle-product p,.detail-hero>p,.bio-copy>p,.home-feature-copy>p')].filter(p=>!p.matches('.sub-label,.chapter-no,.kicker'));
  const originals=paragraphs.map(p=>p.style.fontSize);
  const resize=()=>{
    paragraphs.forEach((p,i)=>p.style.fontSize=originals[i]);
    const sizes=paragraphs.map(p=>parseFloat(getComputedStyle(p).fontSize));
    paragraphs.forEach((p,i)=>p.style.fontSize=`calc(${sizes[i]}px + ${document.body.classList.contains('detail-page')?'4':'2'}pt)`);
  };
  resize();
  let timer;
  window.addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(resize,150)});
}

function initDropdowns(){
  document.querySelectorAll('.nav-trigger').forEach(trigger=>{
    trigger.addEventListener('click',()=>{
      const group=trigger.closest('.nav-group');const open=group.classList.toggle('open');
      trigger.setAttribute('aria-expanded',String(open));
      document.querySelectorAll('.nav-group').forEach(other=>{if(other!==group){other.classList.remove('open');other.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')}});
    });
  });
  document.addEventListener('click',event=>{if(!event.target.closest('.nav-group'))document.querySelectorAll('.nav-group').forEach(group=>{group.classList.remove('open');group.querySelector('.nav-trigger')?.setAttribute('aria-expanded','false')})});
}

function initSmoothScroll(){
  if(document.body.classList.contains('detail-page'))return;
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
    let timer;const interval=2400;
    const restart=()=>{clearInterval(timer);const sports=document.body.classList.contains('sports-detail-page');if(sports&&(carousel.closest('#figure-skating')||carousel.classList.contains('editorial-gallery')))return;if(document.body.classList.contains('full-stories')&&(carousel.classList.contains('editorial-gallery')||carousel.classList.contains('cooking-topic-gallery')))return;if(interval>0&&!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>showSlide(carousel,Number(carousel.dataset.index)+1),interval)};
    window.addEventListener('hashchange',restart);
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
  const dialog=document.querySelector('.lightbox');if(!dialog)return;
  const image=dialog.querySelector('img');const caption=dialog.querySelector('figcaption');const allItems=[...document.querySelectorAll('.zoom')];let items=allItems;let index=0;
  const openAt=value=>{index=(value+items.length)%items.length;const source=items[index].querySelector('img');if(!source)return;image.src=source.currentSrc||source.src;image.alt=source.alt;caption.textContent=items[index].closest('figure')?.querySelector('figcaption')?.textContent||source.alt};
  allItems.forEach(item=>item.addEventListener('click',()=>{items=allItems.filter(button=>button.getClientRects().length>0);openAt(items.indexOf(item));dialog.showModal()}));
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
  videos.forEach(video=>{video.playsInline=true});
  wrappers.forEach(wrapper=>{
    const video=wrapper.querySelector('video');if(!video)return;
    let button=wrapper.querySelector('.feature-video-toggle');
    if(!button){button=document.createElement('button');button.type='button';button.className='feature-video-toggle';button.setAttribute('aria-label','Play video');button.innerHTML='<span aria-hidden="true">▶</span>';wrapper.appendChild(button)}
    let hideTimer;
    const showTemporarily=()=>{clearTimeout(hideTimer);wrapper.classList.remove('controls-hidden');if(!video.paused&&!video.ended)hideTimer=setTimeout(()=>wrapper.classList.add('controls-hidden'),2000)};
    const sync=()=>{const playing=!video.paused&&!video.ended;wrapper.classList.toggle('is-playing',playing);wrapper.classList.toggle('is-muted',video.muted);button.hidden=playing;button.setAttribute('aria-label',playing?'Pause video':'Play video');button.querySelector('span').textContent=playing?'❚❚':'▶';if(playing)showTemporarily();else{clearTimeout(hideTimer);wrapper.classList.remove('controls-hidden')}};
    const startWithSound=()=>{video.muted=false;video.removeAttribute('muted');video.volume=1;const attempt=video.play();if(attempt)attempt.catch(()=>{})};
    button.addEventListener('click',()=>video.paused?startWithSound():video.pause());
    wrapper.addEventListener('pointermove',()=>{if(!video.paused)showTemporarily()});
    video.addEventListener('play',()=>{videos.forEach(other=>{if(other!==video&&!other.paused)other.pause()});sync()});video.addEventListener('pause',sync);video.addEventListener('ended',sync);video.addEventListener('volumechange',sync);sync();
  });
  const firstVideo=videos[0];if(!firstVideo)return;
  const firstWrapper=firstVideo.closest('[data-feature-video]')||firstVideo;
  let autoplayVisible=false;
  firstVideo.autoplay=true;firstVideo.defaultMuted=true;firstVideo.muted=true;firstVideo.loop=true;firstVideo.playsInline=true;
  const unmute=()=>{if(!firstVideo.muted)return;firstVideo.muted=false;firstVideo.removeAttribute('muted');firstVideo.volume=1;firstWrapper.classList.remove('is-muted')};
  const armGestureUnmute=()=>{['pointerdown','keydown','touchstart'].forEach(type=>window.addEventListener(type,unmute,{once:true,capture:true}))};
  const autoplay=()=>{
    firstVideo.muted=true;firstVideo.setAttribute('muted','');firstVideo.volume=1;firstWrapper.classList.add('is-muted');
    const attempt=firstVideo.play();
    if(attempt)attempt.then(()=>{firstWrapper.classList.add('is-playing');const button=firstWrapper.querySelector('.feature-video-toggle');if(button)button.hidden=true}).catch(()=>{if(firstVideo.readyState<2)firstVideo.load()});
    armGestureUnmute();
  };
  if(!firstWrapper.querySelector('.feature-video-sound')){
    const sound=document.createElement('button');sound.type='button';sound.className='feature-video-sound';sound.setAttribute('aria-label','Turn on video sound');sound.textContent='Tap for sound';
    sound.addEventListener('click',unmute);firstWrapper.appendChild(sound);
  }
  firstVideo.addEventListener('loadeddata',()=>{if(autoplayVisible)autoplay()});
  firstVideo.addEventListener('canplay',()=>{if(autoplayVisible&&firstVideo.paused)autoplay()});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    autoplayVisible=entry.isIntersecting&&entry.intersectionRatio>=.1;
    if(autoplayVisible)autoplay();
    else firstVideo.pause();
  }),{threshold:[0,.1,.35],rootMargin:'-5% 0px -5%'});
  observer.observe(firstWrapper);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)firstVideo.pause();else if(autoplayVisible)autoplay()});
}

function loadYouTubeAPI(){
  if(window.YT?.Player)return Promise.resolve(window.YT);
  return new Promise((resolve,reject)=>{
    const timeout=setTimeout(()=>reject(new Error('YouTube API loading timed out')),15000);
    const previous=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=()=>{clearTimeout(timeout);if(typeof previous==='function')previous();resolve(window.YT)};
    if(!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')){
      const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.referrerPolicy='strict-origin-when-cross-origin';script.addEventListener('error',()=>{clearTimeout(timeout);reject(new Error('YouTube API unavailable'))},{once:true});document.head.appendChild(script);
    }
  });
}

function showYouTubeFallback(wrapper,videoId,errorCode){
  if(wrapper.querySelector('.youtube-fallback'))return;
  wrapper.querySelector('.feature-video-toggle')?.setAttribute('hidden','');
  const fallback=document.createElement('div');fallback.className='youtube-fallback';
  const link=document.createElement('a');link.href=`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open this video on YouTube ↗';
  const retry=document.createElement('button');retry.type='button';retry.textContent='Retry YouTube';retry.style.cssText='color:inherit;background:transparent;border:1px solid currentColor;padding:6px 12px;margin-right:12px;cursor:pointer';
  retry.addEventListener('click',()=>location.reload());
  const reason=errorCode===153?'YouTube could not verify this page (153). ':errorCode===101||errorCode===150?'YouTube embedding is disabled for this video ('+errorCode+'). ':errorCode===100?'This YouTube video is unavailable (100). ':'YouTube playback error ('+errorCode+'). ';
  fallback.append(reason,retry,link);wrapper.appendChild(fallback);
}

function initYouTubeVideos(){
  const wrappers=[...document.querySelectorAll('[data-youtube-video]')];if(!wrappers.length)return;
  if(!document.querySelector('meta[name="referrer"]')){const meta=document.createElement('meta');meta.name='referrer';meta.content='strict-origin-when-cross-origin';document.head.appendChild(meta)}
  const pageOrigin=/^https?:$/.test(location.protocol)?location.origin:'https://eleanorzhang.com.cn';
  const pageReferrer=/^https?:$/.test(location.protocol)?location.origin+location.pathname:pageOrigin;
  // Create playable native embeds before waiting for the optional control API.
  wrappers.forEach(wrapper=>{
    const mount=wrapper.querySelector('.youtube-player');if(!mount)return;
    wrapper.dataset.youtubeId=mount.dataset.youtubeId;
    const params=new URLSearchParams({enablejsapi:'1',autoplay:'0',controls:'1',playsinline:'1',rel:'0',origin:pageOrigin,widget_referrer:pageReferrer});
    const iframe=document.createElement('iframe');iframe.src=`https://www.youtube.com/embed/${encodeURIComponent(mount.dataset.youtubeId)}?${params}`;iframe.title=mount.getAttribute('aria-label')||'YouTube video';iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';mount.replaceWith(iframe);
    const button=wrapper.querySelector('.feature-video-toggle');if(button)button.hidden=true;
  });
  loadYouTubeAPI().then(YT=>{
    const players=[];let activePlayer=null;
    const update=(wrapper,playing)=>{wrapper.classList.toggle('is-playing',playing);if(playing)wrapper.classList.add('has-started');const button=wrapper.querySelector('.feature-video-toggle');if(!button)return;button.hidden=playing;button.setAttribute('aria-label',playing?'Pause video':'Play video');button.querySelector('span').textContent=playing?'❚❚':'▶'};
    const pauseOthers=current=>{players.forEach(({player,ready})=>{if(ready&&player!==current)player.pauseVideo()});document.querySelectorAll('video').forEach(video=>{if(!video.paused)video.pause()})};
    const playWithSound=(wrapper,player)=>{
      activePlayer=player;pauseOthers(player);player.unMute();player.setVolume(100);wrapper.classList.remove('is-muted');wrapper.querySelector('.youtube-sound-toggle')?.remove();player.playVideo();
    };
    const selectVisiblePlayer=()=>{
      const visible=item=>item.ready&&!item.failed&&!item.manual&&item.ratio>=.35;
      if(document.hidden){players.filter(item=>item.ready).forEach(item=>item.player.pauseVideo());activePlayer=null;return}
      const current=players.find(item=>item.player===activePlayer);
      if(current?.manual&&current.ready&&!current.failed&&current.ratio>=.35)return;
      const next=players.find(visible);
      if(current===next)return;
      if(current)current.player.pauseVideo();
      activePlayer=next?.player||null;
      if(next)playWithSound(next.wrapper,next.player);
    };
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{const item=players.find(item=>item.wrapper===entry.target);if(item)item.ratio=entry.isIntersecting?entry.intersectionRatio:0});
      selectVisiblePlayer();
    },{threshold:[0,.35,.6,1]});
    wrappers.forEach(wrapper=>{
      const iframe=wrapper.querySelector('iframe');const button=wrapper.querySelector('.feature-video-toggle');if(!iframe||!button)return;
      const videoId=wrapper.dataset.youtubeId;
      const item={wrapper,player:null,ready:false,failed:false,ratio:0,manual:Boolean(wrapper.closest('#marketing-intern'))};players.push(item);
      const player=new YT.Player(iframe,{events:{
        onReady:event=>{
          item.player=event.target;item.ready=true;update(wrapper,false);observer.observe(wrapper);
        },
        onStateChange:event=>{
          if(event.data===YT.PlayerState.PLAYING){
            if(activePlayer!==player&&document.activeElement!==iframe){player.pauseVideo();return}
            if(activePlayer!==player){activePlayer=player;pauseOthers(player)}
            update(wrapper,true);
          }else if([YT.PlayerState.UNSTARTED,YT.PlayerState.ENDED,YT.PlayerState.PAUSED,YT.PlayerState.CUED].includes(event.data))update(wrapper,false);
        },
        onAutoplayBlocked:()=>{
          if(activePlayer!==player||item.ratio<.35)return;
          update(wrapper,false);
          if(player.isMuted())return;
          player.mute();wrapper.classList.add('is-muted');
          if(!wrapper.querySelector('.youtube-sound-toggle')){const sound=document.createElement('button');sound.type='button';sound.className='youtube-sound-toggle';sound.textContent='Tap for sound';sound.addEventListener('click',()=>playWithSound(wrapper,player));wrapper.appendChild(sound)}
          player.playVideo();
        },
        onError:event=>{item.failed=true;update(wrapper,false);wrapper.dataset.youtubeError=event.data;showYouTubeFallback(wrapper,videoId,event.data);selectVisiblePlayer();console.warn('YouTube player error',event.data,videoId)}
      }});
      item.player=player;button.addEventListener('click',()=>{if(!item.ready)return;player.getPlayerState()===YT.PlayerState.PLAYING?player.pauseVideo():playWithSound(wrapper,player)});
    });
    document.addEventListener('visibilitychange',selectVisiblePlayer);
  }).catch(()=>wrappers.forEach(wrapper=>{
    // Native iframe controls still work when an extension or network blocks the API.
    wrapper.querySelector('.feature-video-toggle')?.setAttribute('hidden','');
    wrapper.querySelector('.youtube-poster')?.remove();
  }));
}

document.addEventListener('DOMContentLoaded',()=>{initContentOrder();initDetailLinks();initDetailNavigation();initModuleFocus();initReadingSizes();initNavigation();initDropdowns();initSmoothScroll();initScrollSpy();initRevealAnimations();initCarousels();initLightbox();initMobileMenu();initLazyVideos();initBpaCertificatePreviews();initFeatureVideos();initYouTubeVideos()});
