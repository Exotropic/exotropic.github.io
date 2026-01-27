// ================= MENU =================
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
  contactLabel.textContent =
    contactInfo.classList.contains('visible') ? 'Contact ▲' : 'Contact ▼';
});

// ================= PRODUCTS =================
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

fetch('products.json')
  .then(response => {
    if (!response.ok) throw new Error('JSON not found');
    return response.json();
  })
  .then(data => {
    shopGrid.innerHTML = '';
    if (!data.products || data.products.length === 0) {
      shopGrid.innerHTML = '<p>No products available.</p>';
      return;
    }
    data.products.forEach(url => renderProduct(url));
  })
  .catch(error => {
    console.error(error);
    shopGrid.innerHTML = '<p>Failed to load products.</p>';
  });
