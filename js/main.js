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

// Render a single product card
function renderProduct(url) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${url}" alt="Product">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>
  `;
  shopGrid.appendChild(div);
}

// Load products from JSON
async function loadProducts() {
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';

  try {
    const response = await fetch('data/products.json');
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      data.products.forEach(url => renderProduct(url));
      loadingText.textContent = '';
    } else {
      loadingText.textContent = 'No products available.';
    }
  } catch (error) {
    console.error('Error loading products:', error);
    loadingText.textContent = 'Failed to load products.';
  }
}

// Load products on page load
loadProducts();
