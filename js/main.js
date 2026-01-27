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
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${url}" alt="Product">
    <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">
      Buy via Messenger
    </a>
  `;
  shopGrid.appendChild(div);
}

fetch('./products.json')
  .then(res => res.json())
  .then(data => {
    shopGrid.innerHTML = '';
    data.products.forEach(renderProduct);
  })
  .catch(err => {
    console.error(err);
    shopGrid.innerHTML = '<p>Products failed to load</p>';
  });
