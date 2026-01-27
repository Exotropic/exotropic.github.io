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

// Default products (in case nothing uploaded yet)
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];

function renderProduct(url) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${url}" alt="Product">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>
  `;
  shopGrid.appendChild(div);
}

function loadProducts() {
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';

  try {
    let uploadedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');

    const productsToShow = uploadedImages.length > 0 ? uploadedImages : defaultProducts;

    if (productsToShow.length > 0) {
      productsToShow.forEach(url => renderProduct(url));
      loadingText.textContent = '';
    } else {
      loadingText.textContent = 'No products available.';
    }
  } catch (error) {
    console.error('Error loading products:', error);
    loadingText.textContent = 'Failed to load products.';
  }
}

window.addEventListener('DOMContentLoaded', loadProducts);
