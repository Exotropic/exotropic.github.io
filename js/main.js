// Hamburger & Overlay
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// Contact submenu
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

contactToggle.addEventListener('click', () => {
  contactInfo.classList.toggle('visible');
  contactLabel.textContent = contactInfo.classList.contains('visible') ? "Contact ▲" : "Contact ▼";
});

// Sections
const shopBtn = document.getElementById('shopBtn');
const shopSection = document.getElementById('shop');
const shopGrid = document.getElementById('shopGrid');
const loadingText = document.getElementById('loadingText');
const homeSection = document.getElementById('home');
const backBtn = document.getElementById('backBtn');
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

// Render product
function renderProduct(url,index){
  const div = document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay = `${index*0.15}s`;
  div.innerHTML = `<img src="${url}" alt="Product" loading="lazy">
                   <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>`;
  shopGrid.appendChild(div);
}

// Load products
async function loadProducts(){
  shopGrid.innerHTML='';
  loadingText.textContent='Loading products...';
  try {
    let uploadedImages=[];
    const res = await fetch(catalogJSON+'?t='+new Date().getTime());
    if(res.ok) uploadedImages = await res.json();
    const allProducts = [...defaultProducts, ...uploadedImages];
    allProducts.forEach((url,index)=>renderProduct(url,index));
    loadingText.textContent='';
  } catch(err){
    console.error(err);
    loadingText.textContent='Failed to load products.';
  }
}

// Fade-in products
function fadeInProducts(){
  const productCards = shopGrid.querySelectorAll('.product-card');
  productCards.forEach((card,index)=>{
    setTimeout(()=>{
      card.style.opacity='1';
      card.style.transform='translateY(0)';
    }, index*150);
  });
}

// Show shop section
async function showShop(){
  homeSection.style.display='none';
  shopSection.classList.add('visible');
  shopSection.scrollIntoView({behavior:'smooth'});
  await loadProducts();
  fadeInProducts();
}

// Show home section
function showHome(){
  shopSection.classList.remove('visible');
  homeSection.style.display='block';
  window.scrollTo({top:0, behavior:'smooth'});
}

// Button events
shopBtn.addEventListener('click', showShop);
backBtn.addEventListener('click', showHome);

// Hamburger menu events
shopMenu.addEventListener('click', () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  showShop();
});
homeMenu.addEventListener('click', () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  showHome();
});
