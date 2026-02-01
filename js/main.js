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
const shopSearch = document.getElementById('searchInput');
const shopTitle = document.getElementById('shopTitle');

// ================= CATEGORY POPUP =================
const categoryPopup = document.getElementById('categoryPopup');
const categoryClose = document.getElementById('categoryClose');
const categoryButtons = document.querySelectorAll('.category-btn');

const categoryNames = {
  fish: "Fish",
  plant: "Plant",
  misc: "Miscellaneous"
};

let activeProducts = [];

// ================= HAMBURGER MENU =================
hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', function() {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// ================= CONTACT TOGGLE =================
contactToggle.addEventListener('click', function() {
  var visible = contactInfo.classList.toggle('visible');
  contactLabel.textContent = visible ? "Contact ▲" : "Contact ▼";
});

// ================= PRODUCT DATA =================
const productsByCategory = {
  fish: [
    { name:"Fish 1", price:"₱500", images:Array(6).fill("images/product1.jpg") },
    { name:"Fish 2", price:"₱650", images:Array(6).fill("images/product2.jpg") }
  ],
  plant: [
    { name:"Plant 1", price:"₱300", images:Array(6).fill("images/product3.jpg") },
    { name:"Plant 2", price:"₱350", images:Array(6).fill("images/product4.jpg") }
  ],
  misc: [
    { name:"Accessory 1", price:"₱900", images:Array(6).fill("images/product5.jpg") }
  ]
};

// ================= CATEGORY LOGIC =================
function openCategoryPopup() {
  categoryPopup.style.display = 'flex';
}

categoryClose.addEventListener('click', function() {
  categoryPopup.style.display = 'none';
});

categoryButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var key = btn.dataset.category;
    activeProducts = productsByCategory[key] || [];
    shopTitle.textContent = "🛒 Our Products – " + categoryNames[key];
    categoryPopup.style.display = 'none';
    showShop();
    loadProducts(activeProducts);
  });
});

// ================= RENDER PRODUCTS =================
function renderProduct(product, index) {
  var div = document.createElement('div');
  div.className = 'product-card';
  div.style.transitionDelay = (index * 0.15) + 's';

  div.innerHTML = '<img src="' + product.images[0] + '" alt="' + product.name + '" loading="lazy">' +
    '<a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn" onclick="event.stopPropagation()">Buy via Messenger</a>';

  div.addEventListener('click', function() { openPopup(product); });
  shopGrid.appendChild(div);
}

// ================= LOAD PRODUCTS =================
function loadProducts(list) {
  list = list || [];
  shopGrid.innerHTML = '';
  loadingText.textContent = 'Loading products...';

  list.forEach(function(prod, i) { renderProduct(prod, i); });

  loadingText.textContent = '';
  fadeInProducts();
}

// ================= FADE IN =================
function fadeInProducts() {
  var cards = shopGrid.querySelectorAll('.product-card');
  cards.forEach(function(card, i) {
    setTimeout(function() {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 100);
  });
}

// ================= POPUP =================
var popup = document.getElementById('productPopup');
var popupTitle = document.getElementById('popupTitle');
var popupPrice = document.getElementById('popupPrice');
var popupImages = document.getElementById('popupImages');
var popupClose = document.getElementById('popupClose');
var prevBtn = popup.querySelector('.prev');
var nextBtn = popup.querySelector('.next');
var thumbnailGallery = document.getElementById('thumbnailGallery');

var currentIndex = 0;
var imagesArray = [];

function openPopup(product) {
  popupTitle.textContent = product.name;
  popupPrice.textContent = product.price;
  imagesArray = product.images;

  popupImages.innerHTML = '';
  imagesArray.forEach(function(src) {
    var img = document.createElement('img');
    img.src = src;
    popupImages.appendChild(img);
  });

  thumbnailGallery.innerHTML = '';
  imagesArray.forEach(function(src, i) {
    var thumb = document.createElement('img');
    thumb.src = src;
    if(i === currentIndex) thumb.classList.add('active');
    thumb.addEventListener('click', function() {
      currentIndex = i;
      updateCarousel();
    });
    thumbnailGallery.appendChild(thumb);
  });

  currentIndex = 0;
  updateCarousel();
  popup.style.display = 'flex';
}

function updateCarousel() {
  popupImages.style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
  var thumbs = thumbnailGallery.querySelectorAll('img');
  thumbs.forEach(function(t, i) {
    if(i === currentIndex) t.classList.add('active');
    else t.classList.remove('active');
  });
}

nextBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % imagesArray.length;
  updateCarousel();
});
prevBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
  updateCarousel();
});
popupClose.addEventListener('click', function() { popup.style.display = 'none'; });
popup.addEventListener('click', function(e) {
  if(e.target === popup) popup.style.display = 'none';
});

// ================= SWIPE =================
var startX = 0;
popupImages.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; });
popupImages.addEventListener('touchend', function(e) {
  var endX = e.changedTouches[0].clientX;
  if(startX - endX > 50) nextBtn.click();
  if(endX - startX > 50) prevBtn.click();
});

// ================= SECTIONS =================
function showShop() {
  homeSection.classList.remove('visible');
  shopSection.classList.add('visible');
  document.body.classList.remove('no-scroll');
}

function showHome() {
  shopSection.classList.remove('visible');
  homeSection.classList.add('visible');
  document.body.classList.add('no-scroll');
  shopTitle.textContent = "🛒 Our Products";
  window.scrollTo(0, 0);
}

shopBtn.addEventListener('click', openCategoryPopup);
shopMenu.addEventListener('click', openCategoryPopup);
backBtn.addEventListener('click', showHome);
homeMenu.addEventListener('click', showHome);

// ================= SEARCH =================
shopSearch.addEventListener('input', function() {
  var q = shopSearch.value.toLowerCase();
  var filtered = activeProducts.filter(function(p) {
    return p.name.toLowerCase().includes(q);
  });
  loadProducts(filtered);
});

// ================= INIT =================
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('no-scroll');
});
