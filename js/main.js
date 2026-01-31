// Hamburger & overlay
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', ()=>{
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', ()=>{
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// Contact toggle
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

// Ensure hidden by default
contactInfo.classList.remove('visible');

contactToggle.addEventListener('click', ()=>{
  contactInfo.classList.toggle('visible');
  contactLabel.textContent = contactInfo.classList.contains('visible') ? "Contact ▲" : "Contact ▼";
});

// Sections
const shopBtn = document.getElementById('shopBtn');
const backBtn = document.getElementById('backBtn');
const shopSection = document.getElementById('shop');
const homeSection = document.getElementById('home');
const shopGrid = document.getElementById('shopGrid');
const loadingText = document.getElementById('loadingText');
const shopMenu = document.getElementById('shopMenu');
const homeMenu = document.getElementById('homeMenu');

// Products
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];
const catalogJSON = "https://res.cloudinary.com/dgmg1cubi/raw/upload/v1/products.json";

function renderProduct(url,index){
  const div = document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay=`${index*0.15}s`;
  div.innerHTML=`<img src="${url}" alt="Product" loading="lazy">
                 <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>`;
  shopGrid.appendChild(div);
}

async function loadProducts(){
  shopGrid.innerHTML='';
  loadingText.textContent='Loading products...';
  try{
    let uploadedImages=[];
    const res=await fetch(catalogJSON+'?t='+new Date().getTime());
    if(res.ok) uploadedImages=await res.json();
    const allProducts=[...defaultProducts,...uploadedImages];
    allProducts.forEach((url,index)=>renderProduct(url,index));
    loadingText.textContent='';
    fadeInProducts();
  }catch(err){
    console.error(err);
    loadingText.textContent='Failed to load products.';
  }
}

function fadeInProducts(){
  const cards=shopGrid.querySelectorAll('.product-card');
  cards.forEach((card,index)=>{
    setTimeout(()=>{
      card.style.opacity='1';
      card.style.transform='translateY(0)';
    },index*150);
  });
}

function showShop(){
  homeSection.style.display='none';
  shopSection.classList.add('visible');
  shopSection.scrollIntoView({behavior:'smooth'});
  loadProducts();
}

function showHome(){
  shopSection.classList.remove('visible');
  homeSection.style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

// Button events
shopBtn.addEventListener('click',showShop);
backBtn.addEventListener('click',showHome);

// Menu links
shopMenu.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  showShop();
});
homeMenu.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  showHome();
});
