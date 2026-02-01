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
const shopTitle = document.getElementById('shopTitle');

const categoryPopup = document.getElementById('categoryPopup');
const categoryClose = document.getElementById('categoryClose');
const categoryBtns = document.querySelectorAll('.category-btn');

const searchInput = document.getElementById('searchInput');

const popup = document.getElementById('productPopup');
const popupTitle = document.getElementById('popupTitle');
const popupImages = document.getElementById('popupImages');
const popupPrice = document.getElementById('popupPrice');
const popupClose = document.getElementById('popupClose');
const prevBtn = popup.querySelector('.prev');
const nextBtn = popup.querySelector('.next');
const thumbnailGallery = document.getElementById('thumbnailGallery');

// --- REVIEWS ELEMENTS ---
const reviewsSection = document.getElementById('reviews');
const reviewsMenu = document.getElementById('reviewsMenu');
const backReviewsBtn = document.getElementById('backReviewsBtn');
const reviewName = document.getElementById('reviewName');
const reviewText = document.getElementById('reviewText');
const submitReview = document.getElementById('submitReview');
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
  { name:"Clownfish", price:"₱500", category:"fish", images:[
    "images/product1.jpg","images/product1.jpg","images/product1.jpg",
    "images/product1.jpg","images/product1.jpg","images/product1.jpg"
  ]},
  { name:"Angelfish", price:"₱600", category:"fish", images:[
    "images/product2.jpg","images/product2.jpg","images/product2.jpg",
    "images/product2.jpg","images/product2.jpg","images/product2.jpg"
  ]},
  { name:"Betta", price:"₱700", category:"fish", images:[
    "images/product3.jpg","images/product3.jpg","images/product3.jpg",
    "images/product3.jpg","images/product3.jpg","images/product3.jpg"
  ]},
  { name:"Guppy", price:"₱800", category:"fish", images:[
    "images/product4.jpg","images/product4.jpg","images/product4.jpg",
    "images/product4.jpg","images/product4.jpg","images/product4.jpg"
  ]},
  { name:"Goldfish", price:"₱900", category:"fish", images:[
    "images/product5.jpg","images/product5.jpg","images/product5.jpg",
    "images/product5.jpg","images/product5.jpg","images/product5.jpg"
  ]}
];

// --- CURRENT CATEGORY & DISPLAYED PRODUCTS ---
let categoryProducts = [];
let displayedProducts = [];
let currentCategory = null;

// --- RENDER PRODUCTS ---
function renderProduct(product,index){
  const div = document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay=`${index*0.15}s`;

  if(product.comingSoon){
    div.innerHTML = `<div style="padding:20px; text-align:center; font-weight:bold; font-size:18px;">${product.name}<br>Coming Soon</div>`;
    div.style.cursor='default';
  } else {
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
      <button class="buy-btn">Buy via Messenger</button>
    `;
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

// --- PRODUCT POPUP ---
let currentIndex=0;
let imagesArray=[];

function openPopup(product){
  if(!product.images || !product.images.length) return;
  popupTitle.textContent = product.name;
  popupPrice.textContent = product.price;
  imagesArray = product.images;

  // MAIN IMAGE CAROUSEL
  popupImages.innerHTML='';
  imagesArray.forEach(src=>{
    const img = document.createElement('img');
    img.src = src;
    popupImages.appendChild(img);
  });
  currentIndex = 0;
  updateCarousel();

  // THUMBNAILS
  thumbnailGallery.innerHTML='';
  imagesArray.forEach((src,i)=>{
    const thumb=document.createElement('img');
    thumb.src=src;
    thumb.classList.toggle('active', i===currentIndex);
    thumbnailGallery.appendChild(thumb);
    thumb.addEventListener('click', ()=>{ 
      currentIndex=i; 
      updateCarousel(); 
      updateThumbnails(); 
    });
  });

  popup.style.display='flex';
}

// --- CAROUSEL NAVIGATION ---
function updateCarousel(){ 
  const slideWidth = popupImages.querySelector('img') ? popupImages.querySelector('img').clientWidth : 0;
  popupImages.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
  updateThumbnails();
}
function updateThumbnails(){
  const thumbs = thumbnailGallery.querySelectorAll('img');
  thumbs.forEach((t,i)=>t.classList.toggle('active', i===currentIndex));
}
nextBtn.addEventListener('click',()=>{ 
  currentIndex = (currentIndex+1) % imagesArray.length; 
  updateCarousel(); 
});
prevBtn.addEventListener('click',()=>{ 
  currentIndex = (currentIndex-1 + imagesArray.length) % imagesArray.length; 
  updateCarousel(); 
});
popupClose.addEventListener('click',()=>popup.style.display='none');
popup.addEventListener('click',e=>{ if(e.target===popup) popup.style.display='none'; });

// --- CATEGORY POPUP ---
shopBtn.addEventListener('click',()=>{ categoryPopup.style.display='flex'; });
categoryClose.addEventListener('click',()=>{ categoryPopup.style.display='none'; });
categoryBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const selected = btn.dataset.category;
    currentCategory = selected;

    let filtered=[];
    if(selected==='fish') filtered = defaultProducts;
    else filtered=[{ name: btn.textContent, comingSoon:true, images:[] }];

    categoryPopup.style.display='none';
    showShop();
    categoryProducts = filtered;
    loadProducts(filtered);
    shopTitle.textContent = `🛒 Our Products – ${btn.textContent}`;
    localStorage.setItem('lastCategory', selected);
    sessionStorage.setItem('shopOpen','true');
  });
});

// --- SEARCH ---
searchInput.addEventListener('input', ()=>{
  const query = searchInput.value.toLowerCase();
  if(query === ''){
    loadProducts(categoryProducts);
    return;
  }
  const filtered = categoryProducts.filter(p => !p.comingSoon && p.name.toLowerCase().includes(query));
  loadProducts(filtered);
});

// --- SECTION TOGGLE ---
function showShop(){ 
  homeSection.classList.remove('visible'); 
  reviewsSection.classList.remove('visible');
  shopSection.classList.add('visible'); 
  document.body.classList.remove('no-scroll'); 
}
function showHome(){ 
  shopSection.classList.remove('visible'); 
  reviewsSection.classList.remove('visible');
  homeSection.classList.add('visible'); 
  document.body.classList.add('no-scroll'); 
  window.scrollTo(0,0); 
}
function showReviews() {
  homeSection.classList.remove('visible');
  shopSection.classList.remove('visible');
  reviewsSection.classList.add('visible');
  document.body.classList.remove('no-scroll');
  window.scrollTo(0,0);
}

// --- MENU BUTTONS ---
backBtn.addEventListener('click',showHome);
shopMenu.addEventListener('click',()=>{ 
  navLinks.classList.remove('open'); 
  overlay.classList.remove('active'); 
  categoryPopup.style.display='flex';
});
homeMenu.addEventListener('click',()=>{ 
  navLinks.classList.remove('open'); 
  overlay.classList.remove('active'); 
  showHome(); 
});
reviewsMenu.addEventListener('click',()=>{
  navLinks.classList.remove('open'); 
  overlay.classList.remove('active'); 
  showReviews();
});
backReviewsBtn.addEventListener('click', showHome);

// --- DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded',()=>{

  document.body.classList.add('no-scroll');

  // Restore last category if shop was open before refresh
  const lastCategory = localStorage.getItem('lastCategory');
  if(lastCategory && sessionStorage.getItem('shopOpen') === 'true'){
    currentCategory = lastCategory;
    let filtered = [];
    if(currentCategory==='fish') filtered = defaultProducts;
    else filtered=[{ name: capitalize(currentCategory), comingSoon:true, images:[] }];

    showShop();
    categoryProducts = filtered;
    loadProducts(filtered);
    shopTitle.textContent = `🛒 Our Products – ${capitalize(currentCategory)}`;
  }

  // Load reviews from localStorage
  const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
  savedReviews.forEach(r => addReviewCard(r.name, r.text));
});

// --- UTILITY ---
function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }

// --- DRAG / SWIPE SUPPORT ---
let isDragging=false, startPos=0;
popupImages.addEventListener('mousedown', dragStart);
popupImages.addEventListener('touchstart', dragStart);
popupImages.addEventListener('mouseup', dragEnd);
popupImages.addEventListener('touchend', dragEnd);
popupImages.addEventListener('mouseleave', dragEnd);
popupImages.addEventListener('mousemove', dragMove);
popupImages.addEventListener('touchmove', dragMove);
function dragStart(e){ isDragging=true; startPos=e.type.includes('mouse')? e.pageX : e.touches[0].clientX; popupImages.style.transition='none'; popupImages.style.cursor='grabbing'; }
function dragMove(e){ if(!isDragging) return; const currentPosition=e.type.includes('mouse')? e.pageX:e.touches[0].clientX; const delta=currentPosition-startPos; const slideWidth=popupImages.querySelector('img')?popupImages.querySelector('img').clientWidth:0; popupImages.style.transform=`translateX(${-currentIndex*slideWidth+delta}px)`; }
function dragEnd(e){ if(!isDragging) return; isDragging=false; const endPos=e.type.includes('mouse')? e.pageX:e.changedTouches[0].clientX; const delta=endPos-startPos; const slideWidth=popupImages.querySelector('img')?popupImages.querySelector('img').clientWidth:0; if(delta<-50) currentIndex=(currentIndex+1)%imagesArray.length; else if(delta>50) currentIndex=(currentIndex-1+imagesArray.length)%imagesArray.length; popupImages.style.transition='transform 0.3s ease'; popupImages.style.transform=`translateX(${-currentIndex*slideWidth}px)`; popupImages.style.cursor='grab'; updateThumbnails(); }

// --- THUMBNAIL DRAG SUPPORT ---
let isThumbDragging=false, thumbStartX=0, scrollStart=0;
thumbnailGallery.addEventListener('mousedown', thumbDragStart);
thumbnailGallery.addEventListener('touchstart', thumbDragStart);
thumbnailGallery.addEventListener('mouseup', thumbDragEnd);
thumbnailGallery.addEventListener('touchend', thumbDragEnd);
thumbnailGallery.addEventListener('mouseleave', thumbDragEnd);
thumbnailGallery.addEventListener('mousemove', thumbDragMove);
thumbnailGallery.addEventListener('touchmove', thumbDragMove);
function thumbDragStart(e){ isThumbDragging=true; thumbStartX=e.type.includes('mouse')?e.pageX:e.touches[0].clientX; scrollStart=thumbnailGallery.scrollLeft; }
function thumbDragMove(e){ if(!isThumbDragging) return; const currentX=e.type.includes('mouse')?e.pageX:e.touches[0].clientX; const delta=thumbStartX-currentX; thumbnailGallery.scrollLeft=scrollStart+delta; }
function thumbDragEnd(){ isThumbDragging=false; }

// --- REVIEW FORM SUBMISSION ---
submitReview.addEventListener('click', () => {
  const name = reviewName.value.trim();
  const text = reviewText.value.trim();
  if(!name || !text) return alert("Please enter your name and review.");

  addReviewCard(name, text);

  // Save to localStorage
  const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
  savedReviews.unshift({ name, text });
  localStorage.setItem('reviews', JSON.stringify(savedReviews));

  // Clear form
  reviewName.value = '';
  reviewText.value = '';
});

function addReviewCard(name, text){
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
  reviewList.prepend(card);
}
