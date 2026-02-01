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

// --- PRODUCT DATA ---
const defaultProducts = [
  { name:"Clownfish", price:"₱500", category:"fish", images:["images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg","images/product1.jpg"] },
  { name:"Angelfish", price:"₱600", category:"fish", images:["images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg","images/product2.jpg"] },
  { name:"Betta", price:"₱700", category:"fish", images:["images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg","images/product3.jpg"] },
  { name:"Guppy", price:"₱800", category:"fish", images:["images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg","images/product4.jpg"] },
  { name:"Goldfish", price:"₱900", category:"fish", images:["images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg","images/product5.jpg"] }
];

let categoryProducts = [];
let displayedProducts = [];

// --- LOAD PRODUCTS ---
function loadProducts(products){
  shopGrid.innerHTML='';
  displayedProducts = products;
  products.forEach((prod,i)=>renderProduct(prod,i));
}

// --- RENDER PRODUCT ---
function renderProduct(product,index){
  const div = document.createElement('div');
  div.className='product-card';

  div.innerHTML = `
    <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
    <button class="buy-btn">Buy via Messenger</button>
  `;

  div.querySelector('img').addEventListener('click',()=>openPopup(product));
  div.querySelector('.buy-btn').addEventListener('click',e=>{
    e.stopPropagation();
    window.open("https://m.me/ExoTropicAquarium","_blank");
  });

  shopGrid.appendChild(div);
}

// --- PRODUCT POPUP ---
const popup = document.getElementById('productPopup');
const popupTitle = document.getElementById('popupTitle');
const popupImages = document.getElementById('popupImages');
const popupPrice = document.getElementById('popupPrice');
const popupClose = document.getElementById('popupClose');
const prevBtn = popup.querySelector('.prev');
const nextBtn = popup.querySelector('.next');
const thumbnailGallery = document.getElementById('thumbnailGallery');

let currentIndex = 0;
let imagesArray = [];

function openPopup(product){
  popupTitle.textContent = product.name;
  popupPrice.textContent = product.price;
  imagesArray = product.images;
  currentIndex = 0;

  popupImages.innerHTML='';
  imagesArray.forEach(src=>{
    const img=document.createElement('img');
    img.src=src;
    popupImages.appendChild(img);
  });

  thumbnailGallery.innerHTML='';
  imagesArray.forEach((src,i)=>{
    const thumb=document.createElement('img');
    thumb.src=src;
    if(i===0) thumb.classList.add('active');
    thumb.onclick=()=>{
      currentIndex=i;
      scrollToSlide();
    };
    thumbnailGallery.appendChild(thumb);
  });

  popup.style.display='flex';
  scrollToSlide();
}

// --- NATIVE SCROLL (iOS SAFE) ---
function scrollToSlide(){
  const slide = popupImages.children[currentIndex];
  slide.scrollIntoView({ behavior:'smooth', inline:'start' });
  updateThumbnails();
}

function updateThumbnails(){
  thumbnailGallery.querySelectorAll('img').forEach((t,i)=>{
    t.classList.toggle('active', i===currentIndex);
  });
}

// --- ARROWS ---
nextBtn.onclick=()=>{
  currentIndex=(currentIndex+1)%imagesArray.length;
  scrollToSlide();
};
prevBtn.onclick=()=>{
  currentIndex=(currentIndex-1+imagesArray.length)%imagesArray.length;
  scrollToSlide();
};

popupClose.onclick=()=>popup.style.display='none';

// --- SEARCH (FIXED) ---
searchInput.addEventListener('input',()=>{
  const q=searchInput.value.toLowerCase();
  if(!q){ loadProducts(categoryProducts); return; }
  loadProducts(categoryProducts.filter(p=>p.name.toLowerCase().includes(q)));
});
