import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { useApp } from "../../context/AppContext";
import logoImg from "../../assets/logo.png";

export function Footer() {
  const { t, business } = useApp();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo" style={{ marginBottom: "1rem" }}>
                <img src={logoImg} alt="Welcome Enterprises Logo" className="logo-img logo-img--footer" width="56" height="44" />
                <div className="logo-text">
                  <h1 style={{ fontSize: "1rem" }}>WELCOME ENTERPRISES</h1>
                  <p>TAJ REAL ESTATE</p>
                </div>
              </div>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>
                Premium real estate, legal documentation, online government services, and Hajj & Umrah assistance.
              </p>
              <p style={{ marginTop: "0.75rem", color: "var(--gold-400)", fontSize: "0.9rem" }}>
                <strong>S.T. Syed Imran, M.A.</strong>
              </p>
            </div>
            <div>
              <h4 data-i18n="footer_quick">{t("footer_quick")}</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 data-i18n="footer_services">{t("footer_services")}</h4>
              <ul>
                <li><Link to="/legal-services">Legal Services</Link></li>
                <li><a href="https://wa.me/919003088794?text=Hello%20Advocate" target="_blank" rel="noopener noreferrer">Advocates List</a></li>
                <li><Link to="/online-services">Online Services</Link></li>
                <li><Link to="/hajj-umrah">Hajj & Umrah</Link></li>
                <li><Link to="/admin/login">Admin Panel</Link></li>
              </ul>
            </div>
            <div>
              <h4 data-i18n="footer_contact">{t("footer_contact")}</h4>
              <ul style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>
                {business.phones.map((p, index) => (
                  <li key={index}>📞 {p.slice(0, 5)} {p.slice(5)}</li>
                ))}
                <li style={{ marginTop: "0.5rem" }}>Tamil Nadu, India</li>
              </ul>
              <div className="social-links" style={{ marginTop: "1rem" }}>
                <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle style={{ width: 18, height: 18 }} />
                </a>
                <a href={`tel:${business.phones[0]}`} aria-label="Phone">
                  <Phone style={{ width: 18, height: 18 }} />
                </a>
                <a href={`mailto:${business.email}`} aria-label="Email">
                  <Mail style={{ width: 18, height: 18 }} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} WELCOME ENTERPRISES – TAJ REAL ESTATE. All rights reserved.</span>
            <span>Designed for premium business excellence</span>
          </div>
        </div>
      </footer>
      
      <a 
        href={`https://wa.me/${business.whatsapp}?text=Hello%2C%20I%20need%20assistance%20from%20Welcome%20Enterprises`} 
        className="whatsapp-float no-print" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="WhatsApp"
      >
        <MessageCircle style={{ width: 28, height: 28 }} />
      </a>
    </>
  );
}

export default Footer;
