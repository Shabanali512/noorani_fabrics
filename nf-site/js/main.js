/* NOORANI FABRICS — main.js v2 */
window.API_BASE = (location.protocol === "file:" || location.port === "5500" || location.port === "3000") ? "http://127.0.0.1:8000/api/" : "/api/";

window.PRODUCTS = [];
window.CATEGORIES = [];

/* ---- Utility Functions (Always available) ---- */
window.fmtPrice = window.fmtPrice || function(n) {
  if (n === null || n === undefined) return "Rs. 0.00";
  return "Rs. " + parseInt(n).toLocaleString() + ".00";
};
window.discPct = window.discPct || function(p, o) {
  return o ? Math.round(((o - p) / o) * 100) : 0;
};
window.getCat = window.getCat || function(c) {
  return {
    "3piece": "3Pc Collection",
    "2piece": "2Pc Collection",
    "embroidery": "Embroidery",
    "casual": "Casual Wear",
    "new": "New Arrivals"
  } [c] || c;
};

async function fetchData() {
  // Ensure we have a default starting point
  if (typeof PRODUCTS_FALLBACK !== 'undefined') {
    window.PRODUCTS = PRODUCTS_FALLBACK;
  }

  try {
    const resP = await fetch(window.API_BASE + "products/");
    if (resP.ok) {
      const dataP = await resP.json();
      if (dataP && dataP.length > 0) {
        window.PRODUCTS = dataP;
        console.log("Loaded from API");
      }
    }
  } catch (err) {
    console.warn("API Fetch failed, using fallback:", err);
  }
  return true;
}

/* ---- Toast ---- */
function showToast(msg,dur=3000){
  const t=document.getElementById("toast");if(!t)return;
  t.innerHTML=msg;t.classList.add("show");
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),dur);
}

/* ---- Scroll Reveal ---- */
function initReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}});
  },{threshold:0.07});
  document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
}

/* ---- Sticky Navbar ---- */
function initNavbar(){
  const nav=document.getElementById("navbar");
  if(!nav)return;
  window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>50));
}

/* ---- Hamburger ---- */
function initHamburger(){
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("navbar");
  if (!btn || !nav) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    let m = document.getElementById("mob-nav");
    if (!m) {
      m = document.createElement("div");
      m.id = "mob-nav";
      m.className = "nav-mob-open";
      const base = location.pathname.includes("/pages/") ? "" : "pages/";
      m.innerHTML = `
        <a href="${base}shop.html">New Arrivals</a>
        <a href="${base}shop.html?cat=embroidery">Embroidery</a>
        <a href="${base}shop.html?cat=2piece">2Pc Collection</a>
        <a href="${base}shop.html?cat=3piece">3Pc Collection</a>
        <a href="${base}shop.html?sale=1" style="color:var(--maroon);font-weight:700">Sale</a>
        <a href="${base}contact.html">Contact Us</a>`;
      nav.appendChild(m);
      
      // Close on link click
      m.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => m.style.display = "none");
      });
    }
    const isFlex = m.style.display === "flex";
    m.style.display = isFlex ? "none" : "flex";
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const m = document.getElementById("mob-nav");
    if (m && m.style.display === "flex" && !m.contains(e.target) && e.target !== btn) {
      m.style.display = "none";
    }
  });
}

/* ---- Search ---- */
function toggleSearch(){
  document.getElementById("search-overlay")?.classList.toggle("open");
  if(document.getElementById("search-overlay")?.classList.contains("open"))
    setTimeout(()=>document.getElementById("search-input")?.focus(),100);
}
function liveSearch(q){
  const el=document.getElementById("search-results");if(!el)return;
  if(q.length<2){el.innerHTML="";return;}
  const base=location.pathname.includes("/pages/")?"":"pages/";
  const res=window.PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).slice(0,6);
  el.innerHTML=res.length?res.map(p=>`
    <div class="s-result-item" onclick="location.href='${base}product.html?id=${p.id}'">
      <img src="${p.img}" alt="${p.name}"/>
      <div><div style="font-weight:700;font-size:13px">${p.name}</div>
      <div style="color:var(--maroon);font-weight:700;font-size:12px">${fmtPrice(p.price)}</div></div>
    </div>`).join(""):`<p style="text-align:center;color:#999;padding:20px">No products found</p>`;
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.getElementById("search-overlay")?.classList.remove("open");});

/* ---- FAQ ---- */
function toggleFaq(btn){
  const item=btn.parentElement;const was=item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(i=>i.classList.remove("open"));
  if(!was)item.classList.add("open");
}

/* ---- Countdown ---- */
function initCountdown(){
  const target=new Date(Date.now()+3*24*3600*1000);
  function update(){
    const diff=target-new Date();if(diff<=0)return;
    const h=Math.floor(diff/3600000),m=Math.floor(diff%3600000/60000),s=Math.floor(diff%60000/1000);
    const pad=n=>String(n).padStart(2,"0");
    ["cd-h","cd-m","cd-s"].forEach((id,i)=>{const e=document.getElementById(id);if(e)e.textContent=pad([h,m,s][i]);});
  }
  update();setInterval(update,1000);
}

/* ---- Purchase Notif ---- */
function initPurchaseNotif(){
  if(typeof PURCHASE_NOTIFS==="undefined")return;
  let idx=0;
  function show(){
    const n=PURCHASE_NOTIFS[idx%PURCHASE_NOTIFS.length];idx++;
    const mins=Math.floor(Math.random()*9)+1;
    const el=document.getElementById("purchase-notif");if(!el)return;
    document.getElementById("notif-img").src=n.img;
    document.getElementById("notif-name").textContent=n.name+" ("+n.city+") purchased";
    document.getElementById("notif-product").textContent=n.product;
    document.getElementById("notif-time").textContent=mins+" minutes ago";
    el.style.display="flex";
    setTimeout(()=>{el.style.display="none";},7000);
  }
  setTimeout(()=>{show();setInterval(show,14000);},3500);
}

/* ---- Newsletter ---- */
function subscribeNewsletter(e){
  e.preventDefault();e.target.querySelector("input").value="";
  showToast("Shukriya! Aap newsletter mein subscribe ho gaye ✓");
}

/* ================================================================
   PRODUCT CARD RENDERER (with Quick View)
================================================================ */
function renderProductCard(p, basePath=""){
  try {
    if(!p) return "";
    const disc=discPct(p.price,p.oldPrice);
    return `
    <div class="product-card reveal" data-id="${p.id}">
      <a href="${basePath}product.html?id=${p.id}" class="product-card-link" aria-label="${p.name}"></a>
      <div class="product-card-img">
        <img class="img-front" src="${p.img}" alt="${p.name}" width="300" height="400" loading="lazy"/>
        <img class="img-back" src="${p.img2||p.img}" alt="${p.name}" width="300" height="400" loading="lazy"/>
        ${disc>0?`<span class="discount-badge">-${disc}%</span>`:""}
        <button class="qv-trigger" onclick="event.stopPropagation();openQuickView(${p.id})">Quick View</button>
        <div class="quick-shop-wrap">
          <button class="quick-shop-btn" onclick="event.stopPropagation();Cart.add(${p.id},'m')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            QUICK SHOP
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-prices">
          <span class="price-orig">${fmtPrice(p.oldPrice)}</span>
          <span class="price-sale">${fmtPrice(p.price)}</span>
        </div>
      </div>
    </div>`;
  } catch(e) {
    console.error("Error rendering product card:", e);
    return "";
  }
}

/* Sale card with stock bar */
function renderSaleCard(p, basePath=""){
  try {
    if(!p) return "";
    const disc=discPct(p.price,p.oldPrice);
    const pct=Math.min(Math.round(p.sold/(p.sold+p.stock)*100),100);
    return `
    <div class="sale-card reveal">
      <a href="${basePath}product.html?id=${p.id}" class="product-card-link" aria-label="${p.name}"></a>
      <div class="sale-card-img">
        <img class="img-front" src="${p.img}" alt="${p.name}" width="300" height="400" loading="lazy"/>
        <img class="img-back" src="${p.img2||p.img}" alt="${p.name}" width="300" height="400" loading="lazy"/>
        ${disc>0?`<span class="discount-badge">-${disc}%</span>`:""}
      </div>
      <div class="stock-bar-wrap">
        <div class="stock-row"><span>Sold: ${p.sold}</span><span>Available: ${p.stock}</span></div>
        <div class="stock-bar"><div class="stock-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="sale-card-name">${p.name}</div>
      <div class="sale-card-prices">
        <span class="price-orig">${fmtPrice(p.oldPrice)}</span>
        <span class="price-sale">${fmtPrice(p.price)}</span>
      </div>
    </div>`;
  } catch(e) {
    console.error("Error rendering sale card:", e);
    return "";
  }
}

/* ================================================================
   QUICK VIEW
================================================================ */
let qvQty=1, qvSize="s", qvProdId=null;

function openQuickView(id){
  const p=window.PRODUCTS.find(x=>x.id===id);if(!p)return;
  qvProdId=id; qvQty=1; qvSize=p.sizes[0] || "s";
  const disc=discPct(p.price,p.oldPrice);
  const base=location.pathname.includes("/pages/")?"":"pages/";
  const thumbImgs = [p.img];
  if(p.img2) thumbImgs.push(p.img2);
  if(p.img3) thumbImgs.push(p.img3);
  if(p.img4) thumbImgs.push(p.img4);
  if(p.img5) thumbImgs.push(p.img5);
  

  
  document.getElementById("qv-body").innerHTML=`
    <div class="qv-img-side">
      <div class="qv-main-img-wrap">
        <img id="qv-main-img" src="${p.img}" alt="${p.name}"/>
        <button class="qv-nav-btn prev" onclick="navigateQVImg(-1)">&#10094;</button>
        <button class="qv-nav-btn next" onclick="navigateQVImg(1)">&#10095;</button>
        ${disc>0?`<span class="qv-discount-tag">-${disc}%</span>`:""}
      </div>
      <div class="qv-thumbs">
        ${thumbImgs.map((img,i)=>`<img class="qv-thumb ${i===0?'active':''}" src="${img}" onclick="switchQVImg('${img}',this)"/>`).join("")}
      </div>
    </div>
    <div class="qv-info">
      <div class="qv-urgency-bar">
        <span>HURRY! ONLY ${p.stock || 29} LEFT IN STOCK.</span>
      </div>
      
      <div class="qv-viewers">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>${Math.floor(Math.random() * 40) + 20} People are viewing this right now</span>
      </div>

      <div class="qv-title-row">
        <h2 class="qv-name">${p.name}</h2>
      </div>
      
      <div class="qv-prices">
        <span class="qv-price-orig">${fmtPrice(p.oldPrice)}</span>
        <span class="qv-price-sale">${fmtPrice(p.price)}</span>
        ${disc>0?`<span class="qv-discount-tag-text" style="background:var(--maroon);color:#fff;padding:2px 8px;font-size:11px;font-weight:700;border-radius:2px">SAVE-${disc}%</span>`:""}
      </div>

      <div class="qv-shipping-notice">
        Shipping calculated at checkout.
      </div>

      <div style="font-size:13px;color:var(--maroon);line-height:1.6;margin-bottom:5px">
        Order Any <strong>2 Dresses</strong> And Enjoy <strong>Free Home Delivery</strong><br>
        Get <strong>Free Shipping</strong> On Orders Above <strong>Rs. 7,999</strong>
      </div>

      <div class="qv-selection-area">
        <div class="qv-sizes-header">
          <strong>SIZE: <span id="qv-size-lbl">${qvSize.toUpperCase()}</span></strong>
          <a href="#" class="qv-size-guide-link">Size Guide</a>
        </div>
        <div class="qv-sizes-pills">
          ${p.sizes.map(s=>`<button class="qv-size-pill ${s===qvSize?'active':''}" onclick="selectQVSize(this,'${s}')">${s.toUpperCase()}</button>`).join("")}
        </div>

        <div class="qv-actions-row">
          <div class="qv-qty-pill">
            <button onclick="changeQVQty(-1)">−</button>
            <span id="qv-qty-val">1</span>
            <button onclick="changeQVQty(1)">+</button>
          </div>
          
          <button class="qv-add-btn-premium" onclick="addQVToCart()">
            ADD TO CART
          </button>

          <button class="qv-icon-btn" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          
          <button class="qv-icon-btn" aria-label="Expand" onclick="location.href='${base}product.html?id=${p.id}'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </button>
        </div>

        <button class="qv-buy-now-btn" onclick="Cart.add(${p.id}, qvSize); location.href='${base}checkout.html'">
          BUY IT NOW
        </button>

        <button class="qv-pay-advance-btn" onclick="Cart.add(${p.id}, qvSize); location.href='${base}checkout.html'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-13h-2v5h5v-2h-3z"/></svg>
          Pay in Advance & Continue to Checkout
        </button>

        <div class="qv-happy-bar">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          1,000,000+ HAPPY CUSTOMERS
        </div>
      </div>

      <div class="qv-extra-links">
        <a href="#" class="qv-ask-link">Ask a Question</a>
      </div>

      <div class="qv-meta-info">
        <div class="qv-meta-item"><strong>Size:</strong> ${p.sizes.join(', ').toUpperCase()}</div>
        <div class="qv-meta-item"><strong>SKU:</strong> NF-${p.id}${p.cat.substring(0,2).toUpperCase()}</div>
        <div class="qv-meta-item"><strong>Availability:</strong> <span style="color:#27ae60">In Stock</span></div>
        <div class="qv-meta-item"><strong>Category:</strong> ${typeof getCat !== 'undefined' ? getCat(p.cat) : p.cat}</div>
      </div>

      <div class="qv-social-share">
        <a href="#" class="qv-social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" class="qv-social-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
      </div>
    </div>`;
  document.getElementById("qv-overlay").classList.add("open");
  document.body.style.overflow="hidden";
  initMouseZoom(".qv-main-img-wrap", "#qv-main-img");
}

let qvCurrentImgIdx = 0;
function navigateQVImg(dir){
  const thumbs = document.querySelectorAll(".qv-thumb");
  qvCurrentImgIdx = (qvCurrentImgIdx + dir + thumbs.length) % thumbs.length;
  thumbs[qvCurrentImgIdx].click();
}


function closeQuickView(){
  document.getElementById("qv-overlay")?.classList.remove("open");
  document.body.style.overflow="";
}

function switchQVImg(src,thumb){
  document.getElementById("qv-main-img").src=src;
  const thumbs = document.querySelectorAll(".qv-thumb");
  thumbs.forEach((t, i) => {
    t.classList.remove("active");
    if (t === thumb) qvCurrentImgIdx = i;
  });
  thumb.classList.add("active");
}
function selectQVSize(btn,sz){
  document.querySelectorAll(".qv-size-pill").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); qvSize=sz;
  document.getElementById("qv-size-lbl").textContent=sz.toUpperCase();
}
function changeQVQty(d){ qvQty=Math.max(1,qvQty+d); document.getElementById("qv-qty-val").textContent=qvQty; }
function addQVToCart(){
  const items=Cart.get();
  const idx=items.findIndex(i=>i.id===qvProdId&&i.size===qvSize);
  if(idx>=0)items[idx].qty+=qvQty; else items.push({id:qvProdId,size:qvSize,qty:qvQty});
  Cart.save(items);
  const p=window.PRODUCTS.find(x=>x.id===qvProdId);
  showToast('"'+p?.name+'" cart mein add ho gaya ✓');
  animBadge("cart-count");
  setTimeout(closeQuickView, 800);
}

/* ---- Helpers ---- */
function initMouseZoom(containerSelector, imgSelector) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const img = container.querySelector(imgSelector);
    if (!img) return;
    
    // Smooth reset on leave
    container.onmouseleave = () => {
      img.style.transformOrigin = "center center";
      img.style.transform = "scale(1)";
    };

    container.onmousemove = (e) => {
      // Don't zoom if hovering over nav buttons or close button
      if (e.target.closest('.qv-nav-btn') || e.target.closest('.qv-close')) {
        img.style.transform = "scale(1)";
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = "scale(1.8)"; // Slightly reduced scale for better control
    };
  });
}

function animBadge(id){
  const e=document.getElementById(id);if(!e)return;
  e.style.transform="scale(1.5)";setTimeout(()=>e.style.transform="",300);
}

/* ---- Init ---- */
document.addEventListener("DOMContentLoaded",()=>{
  initNavbar(); initHamburger(); initReveal();
  Cart.badge(); Wishlist.badge();
  if(typeof PURCHASE_NOTIFS!=="undefined") initPurchaseNotif();
});
