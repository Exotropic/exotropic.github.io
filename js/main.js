// ================= ELEMENTS =================
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

// ================= HAMBURGER MENU =================
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});

// Close menu on overlay click
overlay.addEventListener('click', () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// ================= CONTACT MENU =================
contactToggle.addEventListener('click', () => {
  const isVisible = contactInfo.classList.toggle('visible');
  contactLabel.textContent = isVisible ? "Contact ▲" : "Contact ▼";
});

// ================= PRODUCTS =================
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];

const catalogJSON = "https://res.cloudinary.com/dgmg1cubi/raw/upload/v1/products.json";

// Render single product
function renderProduct(url, index) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.style.transitionDelay = `${index * 0.15}s`;
  div.innerHTML = `
    <img src="${url}" alt="Product" loading="lazy">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>
  `;
  shopGrid.appendChild(div);
}

// Load all products
async function loadProducts() {
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';
  try {
    let uploadedImages = [];
    const res = await fetch(catalogJSON + '?t=' + new Date().getTime());
    if (res.ok) uploadedImages = await res.json();
    const allProducts = [...defaultProducts, ...uploadedImages];
    allProducts.forEach((url, index) => renderProduct(url, index));
    loadingText.textContent = '';
    fadeInProducts();
  } catch (err) {
    console.error(err);
    defaultProducts.forEach((url, index) => renderProduct(url, index));
    loadingText.textContent = 'Showing default products.';
    fadeInProducts();
  }
}

// Animate products
function fadeInProducts() {
  const cards = shopGrid.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ================= SECTION TOGGLE =================
function showShop() {
  homeSection.style.opacity = '0';
  setTimeout(() => {
    homeSection.style.display = 'none';
    shopSection.style.display = 'block';
    shopSection.style.opacity = '1';
    shopSection.scrollIntoView({ behavior: 'smooth' });
    loadProducts();
  }, 300);
}

function showHome() {
  shopSection.style.opacity = '0';
  setTimeout(() => {
    shopSection.style.display = 'none';
    homeSection.style.display = 'block';
    homeSection.style.opacity = '1';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
}

// ================= BUTTON EVENTS =================
shopBtn.addEventListener('click', showShop);
backBtn.addEventListener('click', showHome);

// Hamburger menu links
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
