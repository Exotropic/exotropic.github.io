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

const categoryPopup = document.getElementById('categoryPopup');
const categoryClose = document.getElementById('categoryClose');
const categoryBtns = document.querySelectorAll('.category-btn');

const searchInput = document.getElementById('searchInput');

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
  { name:"Clownfish", price:"₱500", category:"fish", images:["images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg"] },
  { name:"Angelfish", price:"₱600", category:"fish", images:["images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg"] },
  { name:"Betta", price:"₱700", category:"fish", images:["images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg"] },
  { name:"Guppy", price:"₱800", category:"fish", images:["images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg"] },
  { name:"Goldfish", price:"₱900", category:"fish", images:["images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg"] }
];

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
function showHome(){ hideAll(); homeSection.classList.add('visible'); window.scrollTo(0,0); }
function showShop(){ hideAll(); shopSection.classList.add('visible'); }
function showReview(){ hideAll(); reviewSection.classList.add('visible'); }
function hideAll(){ homeSection.classList.remove('visible'); shopSection.classList.remove('visible'); reviewSection.classList.remove('visible'); }

// --- BACK BUTTONS ---
backBtn.addEventListener('click', showHome);
backBtnReview.addEventListener('click', showHome);

// --- MENU NAVIGATION ---
homeMenu.addEventListener('click', showHome);
shopMenu.addEventListener('click', ()=>{
  loadProducts(defaultProducts); showShop();
});
reviewMenu.addEventListener('click', showReview);

// --- SHOP BTN ---
shopBtn.addEventListener('click',()=>{ loadProducts(defaultProducts); showShop(); });

// --- CATEGORY POPUP ---
categoryBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const selected = btn.dataset.category;
    let filtered=[];
    if(selected==='fish') filtered = defaultProducts;
    else filtered=[{ name: btn.textContent, comingSoon:true, images:[] }];
    categoryPopup.style.display='none';
    loadProducts(filtered);
    showShop();
  });
});
categoryClose.addEventListener('click', ()=>categoryPopup.style.display='none');

// --- SEARCH FUNCTIONALITY ---
searchInput.addEventListener('input', ()=>{
  const val = searchInput.value.toLowerCase();
  const filtered = defaultProducts.filter(p=>p.name.toLowerCase().includes(val));
  loadProducts(filtered);
});

// --- PRODUCT POPUP ---
const productPopup = document.getElementById('productPopup');
const popupClose = document.getElementById('popupClose');
const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupTitle');
const popupPrice = document.getElementById('popupPrice');
let currentIndex = 0;
let currentImages = [];

function openPopup(product){
  currentImages = product.images;
  currentIndex=0;
  popupTitle.textContent = product.name;
  popupPrice.textContent = product.price;
  popupImg.src = currentImages[currentIndex];
  productPopup.style.display='flex';
}
popupClose.addEventListener('click', ()=> productPopup.style.display='none');

document.getElementById('prev').addEventListener('click', ()=>{
  if(currentImages.length===0) return;
  currentIndex = (currentIndex-1+currentImages.length)%currentImages.length;
  popupImg.src = currentImages[currentIndex];
});
document.getElementById('next').addEventListener('click', ()=>{
  if(currentImages.length===0) return;
  currentIndex = (currentIndex+1)%currentImages.length;
  popupImg.src = currentImages[currentIndex];
});

// --- INITIALIZE ---
showHome();
