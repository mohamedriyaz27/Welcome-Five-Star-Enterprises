function renderNavbar(activePage = "") {
  const nav = document.getElementById("navbar-root");
  if (!nav) return;
  const pages = [
    { href: "index.html", key: "nav_home", id: "home" },
    { href: "about.html", key: "nav_about", id: "about" },
    { href: "services.html", key: "nav_services", id: "services" },
    { href: "properties.html", key: "nav_properties", id: "properties" },
    { href: "legal-services.html", key: "nav_legal", id: "legal" },
    { href: "online-services.html", key: "nav_online", id: "online" },
    { href: "hajj-umrah.html", key: "nav_hajj", id: "hajj" },
    { href: "contact.html", key: "nav_contact", id: "contact" },
  ];
  const prefix = window.location.pathname.includes("/admin/") ? "../" : "";
  nav.innerHTML = `
  <header class="navbar">
    <div class="container nav-inner">
      <a href="${prefix}index.html" class="logo" aria-label="WELCOME ENTERPRISES – Home">
        <img src="${prefix}assets/logo.png" alt="" class="logo-img" width="56" height="48" />
        <div class="logo-text">
          <h1>WELCOME ENTERPRISES</h1>
          <p>TAJ REAL ESTATE</p>
        </div>
      </a>
      <nav class="nav-links" id="nav-links">
        ${pages.map((p) => `<a href="${prefix}${p.href}" class="${activePage === p.id ? "active" : ""}" data-i18n="${p.key}">${typeof t === "function" ? t(p.key) : p.key}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <button class="lang-toggle" type="button">தமிழ்</button>
        <button class="theme-toggle" type="button" title="Toggle theme">☀</button>
        <a href="tel:9003088794" class="btn btn-primary btn-sm no-print" data-i18n="btn_call">Call Now</a>
        <button class="menu-toggle" aria-label="Menu"><i data-lucide="menu"></i></button>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  const footer = document.getElementById("footer-root");
  if (!footer) return;
  const prefix = window.location.pathname.includes("/admin/") ? "../" : "";
  footer.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="logo" style="margin-bottom:1rem">
            <img src="${prefix}assets/logo.png" alt="" class="logo-img logo-img--footer" width="56" height="44" />
            <div class="logo-text">
              <h1 style="font-size:1rem">WELCOME ENTERPRISES</h1>
              <p>TAJ REAL ESTATE</p>
            </div>
          </div>
          <p style="color:var(--gray-400);font-size:0.9rem">Premium real estate, legal documentation, online government services, and Hajj & Umrah assistance.</p>
          <p style="margin-top:0.75rem;color:var(--gold-400);font-size:0.9rem"><strong>S.T. Syed Imran, M.A.</strong></p>
        </div>
        <div>
          <h4 data-i18n="footer_quick">Quick Links</h4>
          <ul>
            <li><a href="${prefix}index.html">Home</a></li>
            <li><a href="${prefix}about.html">About Us</a></li>
            <li><a href="${prefix}services.html">Services</a></li>
            <li><a href="${prefix}properties.html">Properties</a></li>
            <li><a href="${prefix}contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer_services">Services</h4>
          <ul>
            <li><a href="${prefix}legal-services.html">Legal Services</a></li>
            <li><a href="${prefix}advocate/index.html">Adv. Farook Ahamed, B.A., B.L.,</a></li>
            <li><a href="${prefix}online-services.html">Online Services</a></li>
            <li><a href="${prefix}hajj-umrah.html">Hajj & Umrah</a></li>
            <li><a href="${prefix}admin/login.html">Admin Panel</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer_contact">Contact Us</h4>
          <ul style="color:var(--gray-400);font-size:0.9rem">
            <li>📞 90030 88794</li>
            <li>📞 80562 56133</li>
            <li>📞 </li>
            <li style="margin-top:0.5rem">${prefix ? "" : ""}Tamil Nadu, India</li>
          </ul>
          <div class="social-links" style="margin-top:1rem">
            <a href="https://wa.me/919003088794" target="_blank" rel="noopener" aria-label="WhatsApp"><i data-lucide="message-circle"></i></a>
            <a href="tel:9003088794" aria-label="Phone"><i data-lucide="phone"></i></a>
            <a href="mailto:welcomeenterprises.taj@gmail.com" aria-label="Email"><i data-lucide="mail"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} WELCOME ENTERPRISES – TAJ REAL ESTATE. All rights reserved.</span>
        <span>Designed for premium business excellence</span>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/919003088794?text=Hello%2C%20I%20need%20assistance%20from%20Welcome%20Enterprises" class="whatsapp-float" target="_blank" rel="noopener" aria-label="WhatsApp">
    <i data-lucide="message-circle" style="width:28px;height:28px"></i>
  </a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "";
  renderNavbar(page);
  renderFooter();
  if (typeof applyTranslations === "function") applyTranslations();
  if (typeof lucide !== "undefined") lucide.createIcons();
});
