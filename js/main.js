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
const shopSearch = document.getElementById('shopSearch');

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
  { name:"Product 1", price:"₱500", images:["images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg"]},
  { name:"Product 2", price:"₱600", images:["images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg"]},
  { name:"Product 3", price:"₱700", images:["images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg"]},
  { name:"Product 4", price:"₱800", images:["images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg"]},
  { name:"Product 5", price:"₱900", images:["images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg"]}
];

// --- RENDER PRODUCTS ---
function renderProduct(product,index){
  const div=document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay=`${index*0.15}s`;
  div.innerHTML=`<img src="${product.images[0]}" alt="${product.name}" loading="lazy"><div class="buy-btn">Buy via Messenger</div>`;
  div.addEventListener('click',()=>openPopup(product));
  shopGrid.appendChild(div);
}

// --- LOAD PRODUCTS ---
function loadProducts(filtered=[]){
  shopGrid.innerHTML='';
  loadingText.textContent='Loading products...';
  const productsToShow = filtered.length ? filtered : defaultProducts;
  productsToShow.forEach((prod,i)=>renderProduct(prod,i));
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

// --- POPUP LOGIC ---
const popup=document.getElementById('productPopup');
const popupTitle=document.getElementById('popupTitle');
const popupImages=document.getElementById('popupImages');
const popupPrice=document.getElementById('popupPrice');
const popupClose=document.getElementById('popupClose');
const prevBtn=popup.querySelector('.prev');
const nextBtn=popup.querySelector('.next');
const thumbnailGallery = document.getElementById('thumbnailGallery');

let currentIndex=0;
let imagesArray=[];

// --- OPEN POPUP ---
function openPopup(product){
  popupTitle.textContent = product.name;
  popupPrice.textContent = product.price;
  imagesArray = product.images;

  popupImages.innerHTML = '';
  imagesArray.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    popupImages.appendChild(img);
  });
  currentIndex = 0;
  updateCarousel();

  // Thumbnail gallery
  thumbnailGallery.innerHTML = '';
  imagesArray.forEach((src,i)=>{
    const thumb = document.createElement('img');
    thumb.src = src;
    thumb.classList.toggle('active', i===currentIndex);
    thumb.addEventListener('click',()=>{
      currentIndex=i; updateCarousel(); updateThumbnails();
    });
    thumbnailGallery.appendChild(thumb);
  });

  popup.style.display='flex';
}

function updateCarousel(){ 
  popupImages.style.transform=`translateX(${-currentIndex*100}%)`; 
  updateThumbnails();
}

function updateThumbnails(){
  const thumbs = thumbnailGallery.querySelectorAll('img');
  thumbs.forEach((t,i)=>t.classList.toggle('active', i===currentIndex));
}

// --- POPUP BUTTONS ---
nextBtn.addEventListener('click',()=>{ 
  currentIndex=(currentIndex+1)%imagesArray.length; 
  updateCarousel(); 
});
prevBtn.addEventListener('click',()=>{ 
  currentIndex=(currentIndex-1+imagesArray.length)%imagesArray.length; 
  updateCarousel(); 
});
popupClose.addEventListener('click',()=>popup.style.display='none');
popup.addEventListener('click',e=>{ if(e.target===popup) popup.style.display='none'; });

// --- SWIPE SUPPORT ---
let startX=0, endX=0;
popupImages.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; });
popupImages.addEventListener('touchmove', e=>{ endX=e.touches[0].clientX; });
popupImages.addEventListener('touchend', ()=>{
  if(startX-endX>50){ currentIndex=(currentIndex+1)%imagesArray.length; updateCarousel(); }
  else if(endX-startX>50){ currentIndex=(currentIndex-1+imagesArray.length)%imagesArray.length; updateCarousel(); }
});

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

// --- SEARCH FUNCTIONALITY ---
shopSearch.addEventListener('input', ()=>{
  const query = shopSearch.value.toLowerCase();
  const filtered = defaultProducts.filter(p=>p.name.toLowerCase().includes(query));
  loadProducts(filtered);
});

// --- INITIAL SETUP ---
document.addEventListener('DOMContentLoaded',()=>{ 
  document.body.classList.add('no-scroll'); 
});
