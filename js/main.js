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

// ================= HAMBURGER =================
hamburger.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// ================= CONTACT =================
contactToggle.addEventListener('click',()=>{
  const isVisible = contactInfo.classList.toggle('visible');
  contactLabel.textContent = isVisible ? "Contact ▲" : "Contact ▼";
});

// ================= PRODUCTS =================
const defaultProducts=[
  {name:"Product 1",price:"₱500",images:["images/product1.jpg","images/product1-2.jpg","images/product1-3.jpg"]},
  {name:"Product 2",price:"₱600",images:["images/product2.jpg","images/product2-2.jpg","images/product2-3.jpg"]},
  {name:"Product 3",price:"₱700",images:["images/product3.jpg","images/product3-2.jpg","images/product3-3.jpg"]}
];

function renderProduct(product,index){
  const div=document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay=`${index*0.15}s`;
  div.innerHTML=`<img src="${product.images[0]}" alt="${product.name}"><div class="buy-btn">Buy via Messenger</div>`;
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
  const cards=shopGrid.querySelectorAll('.product-card');
  cards.forEach((card,i)=>setTimeout(()=>{ card.style.opacity='1'; card.style.transform='translateY(0)'; },i*100));
}

// ================= POPUP =================
const popup=document.getElementById('productPopup');
const popupTitle=document.getElementById('popupTitle');
const popupImages=document.getElementById('popupImages');
const popupPrice=document.getElementById('popupPrice');
const popupClose=document.getElementById('popupClose');
const prevBtn=popup.querySelector('.prev');
const nextBtn=popup.querySelector('.next');
const thumbnailGallery=document.getElementById('thumbnailGallery');
const swipeArea=document.getElementById('swipeArea');

let currentIndex=0;
let imagesArray=[];

function openPopup(product){
  popupTitle.textContent=product.name;
  popupPrice.textContent=product.price;
  imagesArray=product.images;
  currentIndex=0;

  popupImages.innerHTML='';
  thumbnailGallery.innerHTML='';

  imagesArray.forEach((src,index)=>{
    const img=document.createElement('img');
    img.src=src;
    popupImages.appendChild(img);

    const thumb=document.createElement('img');
    thumb.src=src;
    if(index===0) thumb.classList.add('active');
    thumb.addEventListener('click',()=>setImage(index));
    thumbnailGallery.appendChild(thumb);
  });

  updateCarousel();
  popup.style.display='flex';
}

function setImage(index){
  currentIndex=index;
  popupImages.style.transform=`translateX(${-currentIndex*100}%)`;
  document.querySelectorAll('.thumbnail-gallery img').forEach(img=>img.classList.remove('active'));
  thumbnailGallery.children[index].classList.add('active');
}

nextBtn.addEventListener('click',()=>setImage((currentIndex+1)%imagesArray.length));
prevBtn.addEventListener('click',()=>setImage((currentIndex-1+imagesArray.length)%imagesArray.length));
popupClose.addEventListener('click',()=>popup.style.display='none');
popup.addEventListener('click',e=>{if(e.target===popup)popup.style.display='none';});

// ================= SWIPE =================
let startX=0;
swipeArea.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;});
swipeArea.addEventListener('touchend',e=>{
  let endX=e.changedTouches[0].clientX;
  if(startX-endX>50) nextBtn.click();
  if(endX-startX>50) prevBtn.click();
});

// ================= SECTION TOGGLE =================
function showShop(){homeSection.classList.remove('visible');shopSection.classList.add('visible');loadProducts();document.body.classList.remove('no-scroll');}
function showHome(){shopSection.classList.remove('visible');homeSection.classList.add('visible');document.body.classList.add('no-scroll');window.scrollTo(0,0);}
shopBtn.addEventListener('click',showShop);
backBtn.addEventListener('click',showHome);
shopMenu.addEventListener('click',()=>{navLinks.classList.remove('open');overlay.classList.remove('active');showShop();});
homeMenu.addEventListener('click',()=>{navLinks.classList.remove('open');overlay.classList.remove('active');showHome();});
document.addEventListener('DOMContentLoaded',()=>{document.body.classList.add('no-scroll');});
