// --- ELEMENTS ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const contactToggle = document.getElementById('contact-toggle');
const contactInfo = document.getElementById('contact-info');
const contactLabel = document.getElementById('contact-label');

const shopBtn = document.getElementById('shopBtn');
const backBtn = document.getElementById('backBtn');
const backBtnReview = document.getElementById('backBtnReview');
const shopSection = document.getElementById('shop');
const homeSection = document.getElementById('home');
const reviewSection = document.getElementById('review');
const shopGrid = document.getElementById('shopGrid');
const loadingText = document.getElementById('loadingText');

const shopMenu = document.getElementById('shopMenu');
const homeMenu = document.getElementById('homeMenu');
const reviewMenu = document.getElementById('reviewMenu');
const shopTitle = document.getElementById('shopTitle');

const categoryPopup = document.getElementById('categoryPopup');
const categoryClose = document.getElementById('categoryClose');
const categoryBtns = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('searchInput');

const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');

// --- HAMBURGER MENU ---
hamburger.addEventListener('click', () => { 
  navLinks.classList.toggle('open'); 
  overlay.classList.toggle('active'); 
});
overlay.addEventListener('click', () => { 
  navLinks.classList.remove('open'); 
  overlay.classList.remove('active'); 
});

// --- CONTACT TOGGLE ---
contactToggle.addEventListener('click', () => {
  const isVisible = contactInfo.classList.toggle('visible');
  contactLabel.textContent = isVisible ? "Contact ▲" : "Contact ▼";
});

// --- PRODUCT DATA ---
const defaultProducts = [
  { name:"Clownfish", price:"₱500", category:"fish", images:["images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg"] },
  { name:"Angelfish", price:"₱600", category:"fish", images:["images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg"] },
  { name:"Betta", price:"₱700", category:"fish", images:["images/product3.jpg","images/product3.jpg","images/product3.jpg"] },
  { name:"Guppy", price:"₱800", category:"fish", images:["images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg"] },
  { name:"Goldfish", price:"₱900", category:"fish", images:["images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg"] }
];

// --- CURRENT CATEGORY & DISPLAYED PRODUCTS ---
let categoryProducts = [];
let displayedProducts = [];

// --- RENDER PRODUCTS ---
function renderProduct(product,index){
  const div = document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay=`${index*0.15}s`;
  if(product.comingSoon){
    div.innerHTML = `<div style="padding:20px; text-align:center; font-weight:bold; font-size:18px;">${product.name}<br>Coming Soon</div>`;
    div.style.cursor='default';
  } else {
    div.innerHTML = `<img src="${product.images[0]}" alt="${product.name}" loading="lazy">
    <button class="buy-btn">Buy via Messenger</button>`;
    div.querySelector('img').addEventListener('click', ()=>openPopup(product));
    div.querySelector('.buy-btn').addEventListener('click', e=>{
      e.stopPropagation();
      window.open("https://m.me/ExoTropicAquarium","_blank");
    });
  }
  shopGrid.appendChild(div);
}

// --- LOAD PRODUCTS ---
function loadProducts(products){
  shopGrid.innerHTML='';
  loadingText.textContent='Loading products...';
  displayedProducts = products;
  products.forEach((prod,i)=>renderProduct(prod,i));
  loadingText.textContent='';
  fadeInProducts();
}

// --- FADE-IN ANIMATION ---
function fadeInProducts(){
  const cards = shopGrid.querySelectorAll('.product-card');
  cards.forEach((card,i)=>setTimeout(()=>{ 
    card.style.opacity='1'; 
    card.style.transform='translateY(0)'; 
  },i*100));
}

// --- SECTION TOGGLE ---
function showHome(){ 
  homeSection.classList.add('visible'); 
  shopSection.classList.remove('visible'); 
  reviewSection.classList.remove('visible');
  document.body.classList.add('no-scroll'); 
  window.scrollTo(0,0); 
}
function showShop(){ 
  shopSection.classList.add('visible'); 
  homeSection.classList.remove('visible'); 
  reviewSection.classList.remove('visible');
  document.body.classList.remove('no-scroll'); 
}
function showReview(){ 
  reviewSection.classList.add('visible'); 
  homeSection.classList.remove('visible'); 
  shopSection.classList.remove('visible'); 
  document.body.classList.remove('no-scroll'); 
}

// --- MENU NAVIGATION ---
shopMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showShop(); categoryProducts=defaultProducts; loadProducts(defaultProducts); });
homeMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showHome(); });
reviewMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showReview(); });

backBtn.addEventListener('click',showHome);
backBtnReview.addEventListener('click',showHome);
shopBtn.addEventListener('click',()=>{ categoryPopup.style.display='flex'; });

// --- CATEGORY POPUP ---
categoryClose.addEventListener('click',()=>{ categoryPopup.style.display='none'; });
categoryBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const selected = btn.dataset.category;
    let filtered=[];
    if(selected==='fish') filtered=defaultProducts;
    else filtered=[{ name: btn.textContent, comingSoon:true, images:[] }];
    categoryPopup.style.display='none';
    showShop();
    categoryProducts = filtered;
    setTimeout(()=>loadProducts(filtered),50);
    shopTitle.textContent = `🛒 Our Products – ${btn.textContent}`;
  });
});

// --- SEARCH ---
searchInput.addEventListener('input', ()=>{
  const query = searchInput.value.toLowerCase();
  if(query===''){ loadProducts(categoryProducts); return; }
  const filtered = categoryProducts.filter(p=>!p.comingSoon && p.name.toLowerCase().includes(query));
  loadProducts(filtered);
});

// --- REVIEW FORM SUBMISSION ---
reviewForm.addEventListener('submit', e=>{
  e.preventDefault();
  const name = reviewForm.name.value.trim();
  const rating = reviewForm.rating.value;
  const comment = reviewForm.comment.value.trim();
  if(!name || !rating || !comment) return;

  const div = document.createElement('div');
  div.innerHTML = `<strong>${name}</strong> (${rating}⭐)<br>${comment}`;
  reviewList.prepend(div);
  reviewForm.reset();
});

// --- INITIAL SETUP ---
document.addEventListener('DOMContentLoaded',()=>{
  document.body.classList.add('no-scroll');

  // Floating Messenger Button
  if(!document.querySelector('.messenger-btn')){
    const floatMessenger = document.createElement('a');
    floatMessenger.href = "https://m.me/ExoTropicAquarium";
    floatMessenger.target="_blank";
    floatMessenger.className = "messenger-btn";
    floatMessenger.textContent = "Buy via Messenger";
    document.body.appendChild(floatMessenger);
  }
});
