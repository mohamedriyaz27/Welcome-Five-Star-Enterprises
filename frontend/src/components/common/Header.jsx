import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import logoImg from "../../assets/logo.png";

export function Header() {
  const { t, lang, toggleLanguage, theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = [
    { href: "/", key: "nav_home", id: "home" },
    { href: "/about", key: "nav_about", id: "about" },
    { href: "/services", key: "nav_services", id: "services" },
    { href: "/properties", key: "nav_properties", id: "properties" },
    { href: "/legal-services", key: "nav_legal", id: "legal" },
    { href: "/online-services", key: "nav_online", id: "online" },
    { href: "/hajj-umrah", key: "nav_hajj", id: "hajj" },
    { href: "/contact", key: "nav_contact", id: "contact" },
  ];

  const activePage = pages.find((p) => p.href === location.pathname)?.id || "";

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo" aria-label="WELCOME ENTERPRISES – Home">
          <img src={logoImg} alt="Welcome Enterprises Logo" className="logo-img" width="56" height="48" />
          <div className="logo-text">
            <h1>WELCOME ENTERPRISES</h1>
            <p>TAJ REAL ESTATE</p>
          </div>
        </Link>
        
        <nav className={`nav-links ${isOpen ? "open" : ""}`} id="nav-links">
          {pages.map((p) => (
            <Link
              key={p.href}
              to={p.href}
              className={location.pathname === p.href ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              {t(p.key)}
            </Link>
          ))}
          <div className="nav-drawer-settings">
            <button className="lang-toggle" type="button" onClick={() => { toggleLanguage(); setIsOpen(false); }}>
              {lang === "en" ? "தமிழ்" : "EN"}
            </button>
            <button className="theme-toggle" type="button" title="Toggle theme" onClick={() => { toggleTheme(); setIsOpen(false); }}>
              {theme === "dark" ? "☀" : "🌙"}
            </button>
          </div>
          <a href="tel:9003088794" className="btn btn-primary btn-sm nav-drawer-call no-print" onClick={() => setIsOpen(false)}>
            {t("btn_call")}
          </a>
        </nav>

        <div className="nav-actions">
          <button className="lang-toggle nav-header-toggle" type="button" onClick={toggleLanguage}>
            {lang === "en" ? "தமிழ்" : "EN"}
          </button>
          <button className="theme-toggle nav-header-toggle" type="button" title="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? "☀" : "🌙"}
          </button>
          <a href="tel:9003088794" className="btn btn-primary btn-sm nav-header-call no-print">
            {t("btn_call")}
          </a>
          <button 
            className="menu-toggle" 
            aria-label="Menu" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
