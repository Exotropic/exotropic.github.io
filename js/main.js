// =====================
// Hamburger & Overlay
// =====================
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

// =====================
// Contact Toggle
// =====================
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

contactToggle.addEventListener('click', () => {
  contactInfo.classList.toggle('visible');
  contactLabel.textContent = contactInfo.classList.contains('visible')
    ? 'Contact ▲'
    : 'Contact ▼';
});

// =====================
// Products from JSON
// =====================
const shopGrid = document.getElementById('shopGrid');

function renderProduct(url) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${url}" alt="Product">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">
      Buy via Messenger
    </a>
  `;
  shopGrid.appendChild(card);
}

async function loadProducts() {
  shopGrid.innerHTML = '<p>Loading products...</p>';

  try {
    const response = await fetch('data/products.json');
    const data = await response.json();

    shopGrid.innerHTML = '';

    if (!data.products || data.products.length === 0) {
      shopGrid.innerHTML = '<p>No products available.</p>';
      return;
    }

    data.products.forEach(url => renderProduct(url));

  } catch (error) {
    console.error('Product load error:', error);
    shopGrid.innerHTML = '<p>Failed to load products.</p>';
  }
}

window.addEventListener('DOMContentLoaded', loadProducts);
