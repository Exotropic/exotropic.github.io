// --- ELEMENTS ---
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

// --- PRODUCT DATA (GitHub safe: real product1.jpg → product5.jpg) ---
const defaultProducts = [
  { name:"Product 1", price:"₱500", images:[
    "images/product1-1.jpg","images/product1-2.jpg","images/product1-3.jpg",
    "images/product1-4.jpg","images/product1-5.jpg","images/product1-6.jpg"
  ]},
  { name:"Product 2", price:"₱600", images:[
    "images/product2-1.jpg","images/product2-2.jpg","images/product2-3.jpg",
    "images/product2-4.jpg","images/product2-5.jpg","images/product2-6.jpg"
  ]},
  { name:"Product 3", price:"₱700", images:[
    "images/product3-1.jpg","images/product3-2.jpg","images/product3-3.jpg",
    "images/product3-4.jpg","images/product3-5.jpg","images/product3-6.jpg"
  ]},
  { name:"Product 4", price:"₱800", images:[
    "images/product4-1.jpg","images/product4-2.jpg","images/product4-3.jpg",
    "images/product4-4.jpg","images/product4-5.jpg","images/product4-6.jpg"
  ]},
  { name:"Product 5", price:"₱900", images:[
    "images/product5-1.jpg","images/product5-2.jpg","images/product5-3.jpg",
    "images/product5-4.jpg","images/product5-5.jpg","images/product5-6.jpg"
  ]}
];

// --- RENDER PRODUCTS ---
function renderProduct(product,index){
  const div=document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay=`${index*0.15}s`;
  div.innerHTML=`<img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                 <div class="buy-btn">Buy via Messenger</div>`;
  div.addEventListener('click',()=>openPopup(product));
  shopGrid.appendChild(div);
}

function loadProducts(){
  shopGrid.innerHTML='';
  loadingText.textContent='Loading products...';
  defaultProducts.forEach((prod,i)=>renderProduct(prod,i));
  loadingText.textContent='';
  fadeInProducts();
}

function fadeInProducts(){
  const cards = shopGrid.querySelectorAll('.product-card');
  cards.forEach((card,i)=>setTimeout(()=>{
    card.style.opacity='1';
    card.style.transform='translateY(0)';
  },i*100));
}

// --- POPUP LOGIC ---
const popup=document.getElementById('productPopup');
const popupTitle=document.getElementById('popupTitle');
const popupImages=document.getElementById('popupImages');
const popupPrice=document.getElementById('popupPrice');
const popupClose=document.getElementById('popupClose');
const prevBtn=popup.querySelector('.prev');
const nextBtn=popup.querySelector('.next');

let currentIndex=0;
let imagesArray=[];

function openPopup(product){
  popupTitle.textContent=product.name;
  popupPrice.textContent=product.price;
  imagesArray=product.images;
  popupImages.innerHTML='';
  imagesArray.forEach(src=>{
    const img=document.createElement('img');
    img.src=src;
    popupImages.appendChild(img);
  });
  currentIndex=0;
  updateCarousel();
  popup.style.display='flex';
}

function updateCarousel(){
  const offset=-currentIndex*100;
  popupImages.style.transform=`translateX(${offset}%)`;
}

nextBtn.addEventListener('click',()=>{currentIndex=(currentIndex+1)%imagesArray.length;updateCarousel();});
prevBtn.addEventListener('click',()=>{currentIndex=(currentIndex-1+imagesArray.length)%imagesArray.length;updateCarousel();});
popupClose.addEventListener('click',()=>popup.style.display='none');
popup.addEventListener('click',e=>{if(e.target===popup)popup.style.display='none';});

// --- SECTION TOGGLE ---
function showShop(){
  homeSection.classList.remove('visible');
  shopSection.classList.add('visible');
  loadProducts();
  document.body.classList.remove('no-scroll');
}
function showHome(){
  shopSection.classList.remove('visible');
  homeSection.classList.add('visible');
  document.body.classList.add('no-scroll');
  window.scrollTo(0,0);
}

shopBtn.addEventListener('click',showShop);
backBtn.addEventListener('click',showHome);
shopMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showShop(); });
homeMenu.addEventListener('click',()=>{ navLinks.classList.remove('open'); overlay.classList.remove('active'); showHome(); });

document.addEventListener('DOMContentLoaded',()=>{ document.body.classList.add('no-scroll'); });
