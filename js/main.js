// ELEMENTS
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

const shopBtn = document.getElementById('shopBtn');
const backBtn = document.getElementById('backBtn');
const shopSection = document.getElementById('shop');
const shopGrid = document.getElementById('shopGrid');
const loadingText = document.getElementById('loadingText');
const homeSection = document.getElementById('home');

const shopMenu = document.getElementById('shopMenu');
const homeMenu = document.getElementById('homeMenu');

// HAMBURGER MENU
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// CONTACT TOGGLE
contactToggle.addEventListener('click', () => {
  const isVisible = contactInfo.classList.toggle('visible');
  contactLabel.textContent = isVisible ? "Contact ▲" : "Contact ▼";
});

// PRODUCTS
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];

const catalogJSON = "https://res.cloudinary.com/dgmg1cubi/raw/upload/v1/products.json";

function renderProduct(url, index){
  const div = document.createElement('div');
  div.className = 'product-card';
  div.style.transitionDelay = `${index*0.15}s`;
  div.innerHTML = `<img src="${url}" alt="Product" loading="lazy"><a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>`;
  shopGrid.appendChild(div);
}

async function loadProducts(){
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';
  try{
    let uploadedImages = [];
    const res = await fetch(catalogJSON+'?t='+new Date().getTime());
    if(res.ok) uploadedImages = await res.json();
    const allProducts = [...defaultProducts, ...uploadedImages];
    allProducts.forEach((url,i)=>renderProduct(url,i));
    loadingText.textContent='';
    fadeInProducts();
  }catch(err){
    console.error(err);
    defaultProducts.forEach((url,i)=>renderProduct(url,i));
    loadingText.textContent='Showing default products.';
    fadeInProducts();
  }
}

function fadeInProducts(){
  const cards = shopGrid.querySelectorAll('.product-card');
  cards.forEach((card,i)=>setTimeout(()=>{card.style.opacity='1'; card.style.transform='translateY(0)';},i*100));
}

// --- SECTION TOGGLE WITH HOME LOGO & SCROLL FIX ---
function showShop(){
  homeSection.classList.remove('visible');
  shopSection.classList.add('visible');
  shopSection.scrollIntoView({behavior:'smooth'});
  loadProducts();

  // Enable scrolling for shop page
  document.body.classList.remove('no-scroll');

  // Remove any homepage hero fixes
  document.querySelector('.hero').style.position = '';
  document.querySelector('.hero').style.top = '';
}

function showHome(){
  shopSection.classList.remove('visible');
  homeSection.classList.add('visible');

  // Lock homepage scroll
  document.body.classList.add('no-scroll');
  window.scrollTo({top:0, behavior:'auto'});

  // Reset hero to fixed layout
  const hero = document.querySelector('.hero');
  hero.style.position = 'absolute';
  hero.style.top = '0';
}

// BUTTON EVENTS
shopBtn.addEventListener('click', showShop);
backBtn.addEventListener('click', showHome);
shopMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showShop(); });
homeMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showHome(); });

// --- INIT: lock homepage scroll on first load ---
document.addEventListener('DOMContentLoaded', ()=>{
  document.body.classList.add('no-scroll');
});
