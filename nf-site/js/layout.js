/* Shared navbar HTML - injected by pages */
const NAV_HTML = `
<div class="announce-bar">Get Free Shipping On Orders Above Rs. 4,999 !</div>
<nav class="navbar" id="navbar">
  <div class="nav-wrap container">
    <div class="nav-logo">
      <a href="../index.html"><img src="../images/logo.jpeg" alt="Noorani Fabrics"/></a>
    </div>
    <div class="nav-links" id="nav-links">
      <a href="shop.html?cat=new" class="new-link">New Arrivals<span class="new-badge">New</span></a>
      <a href="shop.html?cat=embroidery">Embroidery</a>
      <a href="shop.html?sale=1" class="sale-link">Sale</a>
      <a href="shop.html?cat=3piece">3Pc Collection</a>
      <a href="contact.html">Contact Us</a>
    </div>
    <div class="nav-icons">
      <button class="nav-icon" onclick="toggleSearch()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>

      <a href="wishlist.html" class="nav-icon" style="position:relative">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="icon-badge" id="wish-count">0</span>
      </a>
      <a href="cart.html" class="nav-icon" style="position:relative">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="icon-badge" id="cart-count">0</span>
      </a>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
<div class="search-overlay" id="search-overlay">
  <button class="search-close" onclick="toggleSearch()">&#10005;</button>
  <input type="text" placeholder="Search products..." id="search-input" oninput="liveSearch(this.value)"/>
  <div class="search-results" id="search-results"></div>
</div>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-bg">
    <div class="footer-inner container">
      <div class="footer-grid">
        <div>
          <ul class="footer-contact">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Lahore, Pakistan</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>nooranifabrics444@gmail.com</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+92 308-4085453</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Menu</h4>
          <ul>
            <li><a href="shop.html?cat=3piece">3Pc Collection</a></li>
            <li><a href="shop.html">All Products</a></li>
            <li><a href="shop.html?cat=embroidery">Embroidery</a></li>
            <li><a href="shop.html?cat=new">New Arrivals</a></li>
            <li><a href="shop.html?sale=1">Sale</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legals</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div class="footer-col footer-newsletter">
          <h4>Signup</h4>
          <p>Subscribe to our newsletter and get 10% off your first purchase</p>
          <form class="newsletter-form" onsubmit="subscribeNewsletter(event)">
            <input type="email" placeholder="Your email address" required/>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Noorani Fabrics. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
<div class="toast" id="toast"></div>
`;

function injectLayout(){
  const nb=document.getElementById("nav-placeholder");
  const ft=document.getElementById("footer-placeholder");
  if(nb)nb.innerHTML=NAV_HTML;
  if(ft)ft.innerHTML=FOOTER_HTML;
}
document.addEventListener("DOMContentLoaded", injectLayout);
