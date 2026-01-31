// ================= HAMBURGER & OVERLAY =================
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

// ================= CONTACT SUBMENU =================
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

contactToggle.addEventListener('click', () => {
  contactInfo.classList.toggle('visible');
  contactLabel.textContent = contactInfo.classList.contains('visible') ? "Contact ▲" : "Contact ▼";
});

// ================= SECTIONS =================
const shopBtn = document.getElementById('shopBtn');
const backBtn = document.getElementById('backBtn');
const shopSection = document.getElementById('shop');
const shopGrid = document.getElementById('shopGrid');
const loadingText = document.getElementById('loadingText');
const homeSection = document.getElementById('home');
const shopMenu = document.getElementById('shopMenu');
const homeMenu = document.getElementById('homeMenu');

// ================= DEFAULT PRODUCTS =================
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];
const catalogJSON = "https://res.cloudinary.com/dgmg1cubi/raw/upload/v1/products.json";

// ================= RENDER PRODUCT =================
function renderProduct(url, index) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.style.transitionDelay = `${index*0.15}s`;
  div.innerHTML = `
    <img src="${url}" alt="Product" loading="lazy">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>
  `;
  shopGrid.appendChild(div);
}

// ================= LOAD PRODUCTS =================
async function loadProducts() {
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';
  try {
    let uploadedImages = [];
    const res = await fetch(catalogJSON + '?t=' + new Date().getTime());
    if(res.ok) uploadedImages = await res.json();
    const allProducts = [...defaultProducts, ...uploadedImages];
    allProducts.forEach((url,index) => renderProduct(url,index));
    loadingText.textContent = '';
    fadeInProducts();
  } catch(err) {
    console.error(err);
    loadingText.textContent = 'Failed to load products.';
  }
}

// ================= FADE-IN PRODUCTS =================
function fadeInProducts() {
  const productCards = shopGrid.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index*150);
  });
}

// ================= SHOW/HIDE SECTIONS =================
async function showShop() {
  homeSection.style.display = 'none';
  shopSection.classList.add('visible');
  shopSection.scrollIntoView({behavior:'smooth'});
  await loadProducts();
}

function showHome() {
  shopSection.classList.remove('visible');
  homeSection.style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});
}

// ================= BUTTON EVENTS =================
shopBtn.addEventListener('click', showShop);
backBtn.addEventListener('click', showHome);

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

// ================= FLOATING CORALS & FISH =================
const numFloating = 7; // number of floating images
const floatingImages = [
  'images/coral1.png',
  'images/coral2.png',
  'images/fish1.png',
  'images/fish2.png',
  'images/fish3.png',
  'images/coral3.png',
  'images/fish4.png'
];

floatingImages.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'floating-img';
  img.style.top = `${Math.random() * 80 + 10}%`;
  img.style.left = `${Math.random() * 80 + 10}%`;
  img.style.setProperty('--anim-duration', `${Math.random()*10+8}s`);
  document.body.appendChild(img);
});
