// Hamburger and Overlay
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

// Contact toggle
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

contactToggle.addEventListener('click', () => {
  contactInfo.classList.toggle('visible');
  contactLabel.textContent = contactInfo.classList.contains('visible') ? "Contact ▲" : "Contact ▼";
});

// Products
const shopGrid = document.getElementById('shopGrid');
const loadingText = document.getElementById('loadingText');

// Default products
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];

// Cloudinary JSON catalog URL
const catalogJSON = "https://res.cloudinary.com/dgmg1cubi/raw/upload/v1/products.json";

// Render a single product
function renderProduct(url){
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `<img src="${url}" alt="Product">
                   <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>`;
  shopGrid.appendChild(div);
}

// Load products from Cloudinary JSON + default products
async function loadProducts(){
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';

  try {
    const res = await fetch(catalogJSON + '?t=' + new Date().getTime()); // cache-buster
    let uploadedImages = [];
    if(res.ok){
      uploadedImages = await res.json();
    }

    const allProducts = [...defaultProducts, ...uploadedImages];
    const uniqueProducts = [...new Set(allProducts)];

    if(uniqueProducts.length > 0){
      uniqueProducts.forEach(url => renderProduct(url));
      loadingText.textContent = '';
    } else {
      loadingText.textContent = 'No products available.';
    }
  } catch(err){
    console.error("Error loading products:", err);
    loadingText.textContent = 'Failed to load products.';
  }
}

// Optional: refresh every X seconds to reflect admin changes instantly
const REFRESH_INTERVAL = 15000; // 15 seconds
setInterval(loadProducts, REFRESH_INTERVAL);

window.addEventListener('DOMContentLoaded', loadProducts);
