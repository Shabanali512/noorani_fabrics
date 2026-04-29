/* NOORANI FABRICS — Cart & Wishlist */
const Cart={
  _k:"nf_cart",
  get(){return JSON.parse(localStorage.getItem(this._k)||"[]")},
  save(d){localStorage.setItem(this._k,JSON.stringify(d));this.badge()},
  add(id,size){
    const d=this.get();const i=d.findIndex(x=>x.id===id&&x.size===size);
    if(i>=0)d[i].qty+=1;else d.push({id,size,qty:1});
    this.save(d);
    const p=PRODUCTS.find(x=>x.id===id);
    showToast('"'+(p?.name||"Item")+'" cart mein add ho gaya ✓');
    animBadge("cart-count");
  },
  remove(id,size){this.save(this.get().filter(x=>!(x.id===id&&x.size===size)))},
  updateQty(id,size,qty){const d=this.get();const i=d.findIndex(x=>x.id===id&&x.size===size);if(i>=0){if(qty<=0)d.splice(i,1);else d[i].qty=qty;}this.save(d)},
  total(){return this.get().reduce((s,x)=>{const p=PRODUCTS.find(y=>y.id===x.id);return s+(p?p.price*x.qty:0)},0)},
  count(){return this.get().reduce((s,x)=>s+x.qty,0)},
  clear(){localStorage.removeItem(this._k);this.badge()},
  badge(){const e=document.getElementById("cart-count");if(e)e.textContent=this.count()}
};
const Wishlist={
  _k:"nf_wish",
  get(){return JSON.parse(localStorage.getItem(this._k)||"[]")},
  save(d){localStorage.setItem(this._k,JSON.stringify(d));this.badge()},
  toggle(id){const d=this.get();const i=d.indexOf(id);if(i>=0)d.splice(i,1);else d.push(id);this.save(d);return i<0},
  has(id){return this.get().includes(id)},
  count(){return this.get().length},
  badge(){const e=document.getElementById("wish-count");if(e)e.textContent=this.count()}
};
function animBadge(id){const e=document.getElementById(id);if(!e)return;e.style.transform="scale(1.4)";setTimeout(()=>e.style.transform="",300)}

function updateCartQty(id,size,qty){Cart.updateQty(id,size,qty);renderCart()}
function removeCartItem(id,size){Cart.remove(id,size);renderCart()}

function renderCart(){
  const container=document.getElementById("cart-content");
  if(!container) return;
  const items=Cart.get();
  if(!items.length){
    container.innerHTML=`<div class="cart-empty-state">
      <div class="cart-empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Kuch products add karein, aur premium outfits ka experience shuru karein.</p>
      <a href="shop.html" class="btn-maroon" style="width:auto;padding:12px 32px">Continue Shopping</a>
    </div>`;
    return;
  }
  const subtotal=Cart.total();
  const shipping=subtotal>=4999?0:200;
  const remaining=Math.max(0,4999-subtotal);
  const total=subtotal+shipping;
  container.innerHTML=`<div class="cart-layout">
      <div class="cart-items-box">
        <div class="cart-header-row">
          <div>
            <h2>Your Items</h2>
            <p>Review your order before checkout</p>
          </div>
          <a href="shop.html" class="btn-maroon" style="width:auto;padding:12px 26px;font-size:12px">Continue Shopping</a>
        </div>
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item=>{
              const p=PRODUCTS.find(x=>x.id===item.id);
              if(!p) return "";
              return `<tr>
                <td data-label="Product">
                  <div class="cart-product-cell">
                    <img class="cart-product-img" src="${p.img}" alt="${p.name}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer"/>
                    <div class="cart-item-meta">
                      <div class="cart-item-name">${p.name}</div>
                      <div class="cart-item-size">Size: ${item.size.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td data-label="Price"><span class="cart-item-price">${fmtPrice(p.price)}</span></td>
                <td data-label="Qty">
                  <div class="cart-qty-control">
                    <button class="cart-qty-btn" onclick="updateCartQty(${item.id},'${item.size}',${item.qty-1})">−</button>
                    <span class="cart-qty-val">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateCartQty(${item.id},'${item.size}',${item.qty+1})">+</button>
                  </div>
                </td>
                <td data-label="Total"><span class="cart-item-price">${fmtPrice(p.price*item.qty)}</span></td>
                <td data-label="Remove"><button class="cart-remove-btn" onclick="removeCartItem(${item.id},'${item.size}')">✕</button></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
      <aside class="cart-summary-box">
        <h3>Order summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${fmtPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping===0?'<span style="color:green">FREE</span>':fmtPrice(shipping)}</span></div>
        <div class="summary-highlight">${remaining>0?`Add ${fmtPrice(remaining)} more for free shipping`:`Free shipping unlocked — great choice!`}</div>
        <div class="summary-row"><span>Total</span><span>${fmtPrice(total)}</span></div>
        <a href="checkout.html" class="btn-maroon">Proceed to Checkout</a>
        <p class="summary-note">🔒 Secure checkout with trusted payment options</p>
      </aside>
    </div>`;
}

// document.addEventListener("DOMContentLoaded",renderCart);
