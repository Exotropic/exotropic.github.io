// ===== ELEMENTS =====
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

// ===== MENU FUNCTIONS =====
function closeMenu(){
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  contactInfo.classList.remove('visible');
  contactLabel.textContent = "Contact ▼";
}

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  overlay.classList.toggle('active', isOpen);
  if(!isOpen) closeMenu();
});

// Overlay click
overlay.addEventListener('click', closeMenu);

// Contact submenu
contactToggle.addEventListener('click', (e)=>{
  e.stopPropagation();
  const visible = contactInfo.classList.toggle('visible');
  contactLabel.textContent = visible ? "Contact ▲" : "Contact ▼";
});

// ===== PRODUCTS =====
const defaultProducts = [
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449399/jtwtzk0egjizvomclm1w.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449385/nomumjmwxipfh0ril8oc.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449369/ntxanaboykolmf2cxioi.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449352/zfndhypfmvsr7u7gjbdf.jpg",
  "https://res.cloudinary.com/dgmg1cubi/image/upload/v1769449335/phndllj2guzhcrzujvk4.jpg"
];
const catalogJSON = "https://res.cloudinary.com/dgmg1cubi/raw/upload/v1/products.json";

function renderProduct(url,index){
  const div = document.createElement('div');
  div.className='product-card';
  div.style.transitionDelay = `${index*0.15}s`;
  div.innerHTML = `<img src="${url}" alt="Product" loading="lazy">
                   <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">Buy via Messenger</a>`;
  shopGrid.appendChild(div);
}

async function loadProducts(){
  shopGrid.innerHTML='';
  loadingText.textContent='Loading products...';
  try {
    let uploadedImages=[];
    const res = await fetch(catalogJSON+'?t='+new Date().getTime());
    if(res.ok) uploadedImages = await res.json();
    const allProducts = [...defaultProducts, ...uploadedImages];
    allProducts.forEach((url,index)=>renderProduct(url,index));
    loadingText.textContent='';
  } catch(err){
    console.error(err);
    loadingText.textContent='Failed to load products.';
  }
}

function fadeInProducts(){
  const productCards = shopGrid.querySelectorAll('.product-card');
  productCards.forEach((card,index)=>{
    setTimeout(()=>{
      card.style.opacity='1';
      card.style.transform='translateY(0)';
    }, index*150);
  });
}

// ===== SHOW SHOP =====
async function showShop(){
  homeSection.classList.add('hidden');
  await new Promise(r=>setTimeout(r,300));
  homeSection.style.display='none';
  shopSection.classList.add('visible');
  shopSection.scrollIntoView({behavior:'smooth'});
  await loadProducts();
  fadeInProducts();
}

// ===== SHOW HOME =====
function showHome(){
  shopSection.classList.remove('visible');
  homeSection.style.display='block';
  setTimeout(()=> homeSection.classList.remove('hidden'),50);
  window.scrollTo({top:0, behavior:'smooth'});
}

// ===== BUTTON EVENTS =====
shopBtn.addEventListener('click', showShop);
backBtn.addEventListener('click', showHome);
shopMenu.addEventListener('click', ()=>{ closeMenu(); showShop(); });
homeMenu.addEventListener('click', ()=>{ closeMenu(); showHome(); });
