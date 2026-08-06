// Mobile menu toggle and navbar scroll effect
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
const siteHeader = document.getElementById('site-header');

navToggle && navToggle.addEventListener('click', () => {
  nav && nav.classList.toggle('open');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) siteHeader.classList.add('scrolled'); else siteHeader.classList.remove('scrolled');
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    if(href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
  });
});

// Loader: wait until images are loaded
const loader = document.getElementById('loader');
function imagesLoaded(){
  const imgs = Array.from(document.images);
  return Promise.all(imgs.map(img => {
    if(img.complete) return Promise.resolve();
    return new Promise(res => img.addEventListener('load', res));
  }));
}

window.addEventListener('load', async () => {
  try{
    await imagesLoaded();
  }catch(e){}
  loader.style.opacity = '0';
  loader.style.visibility = 'hidden';
  setTimeout(()=> loader.remove(),700);
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(img=>{
  img.addEventListener('click', ()=>{
    const src = img.dataset.full || img.src;
    lightboxImg.src = src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});

lightboxClose.addEventListener('click', ()=>{
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
});

lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); }
});

window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') lightbox.classList.remove('open'); });

// Chicken blinking animation (toggle eye opacity)
const leftEye = document.getElementById('eye-left');
const rightEye = document.getElementById('eye-right');
function blink(){
  if(!leftEye||!rightEye) return;
  leftEye.style.transition = 'opacity .12s';
  rightEye.style.transition = 'opacity .12s';
  leftEye.style.opacity = '0';
  rightEye.style.opacity = '0';
  setTimeout(()=>{ leftEye.style.opacity='1'; rightEye.style.opacity='1'; },140);
}
setInterval(blink,3500);

const cards = document.querySelectorAll(
".section, .feature-card, .review-card, .contact-card, .gallery-item, .menu-column"
);


const cardObserver = new IntersectionObserver(
(entries)=>{

entries.forEach((entry,index)=>{

if(entry.isIntersecting){

setTimeout(()=>{

entry.target.classList.add("scroll-card","show");

}, index * 120);


}

});

},
{
threshold:0.15
});


cards.forEach(card=>{
card.classList.add("scroll-card");
cardObserver.observe(card);
});