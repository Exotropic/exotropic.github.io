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

function renderProduct(url) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${url}" alt="Product">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>
  `;
  shopGrid.appendChild(div);
}

async function loadProducts() {
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';
  try {
    // Fetch JSON from raw GitHub URL
    const response = await fetch('https://raw.githubusercontent.com/krazyniel30-sudo/exotropic/main/products.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    // Make sure your JSON has a "products" array
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
window.addEventListener('DOMContentLoaded', loadProducts);
