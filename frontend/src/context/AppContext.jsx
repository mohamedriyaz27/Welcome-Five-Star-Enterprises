import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext(null);

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_properties: "Properties",
    nav_legal: "Legal",
    nav_online: "Online",
    nav_hajj: "Hajj & Umrah",
    nav_contact: "Contact",
    hero_badge: "Trusted Since Years — Premium Services",
    hero_title: "Your Complete Solution for",
    hero_title_highlight: "Real Estate & Legal Services",
    hero_desc: "Documentation, property deals, government online services, insurance, Hajj & Umrah — all under one roof.",
    btn_call: "Call Now",
    btn_whatsapp: "WhatsApp",
    btn_consult: "Book Consultation",
    owner_label: "Proprietor",
    services_title: "Our Services",
    services_sub: "Comprehensive business, legal, and property solutions",
    stats_clients: "Happy Clients",
    stats_years: "Years Experience",
    stats_services: "Services Offered",
    stats_properties: "Properties Sold",
    testimonials_title: "Client Testimonials",
    cta_title: "Need Assistance Today?",
    cta_sub: "Contact us for documentation, property, or legal consultation",
    footer_quick: "Quick Links",
    footer_services: "Services",
    footer_contact: "Contact Us",
    form_name: "Full Name",
    form_phone: "Phone Number",
    form_email: "Email",
    form_message: "Message",
    form_submit: "Send Inquiry",
    view_details: "View Details",
    enquire: "Enquire Now",
    filter_location: "Location",
    filter_budget: "Max Budget",
    filter_type: "Property Type",
    all: "All",
  },
  ta: {
    nav_home: "முகப்பு",
    nav_about: "எங்களைப் பற்றி",
    nav_services: "சேவைகள்",
    nav_properties: "சொத்துக்கள்",
    nav_legal: "சட்டம்",
    nav_online: "ஆன்லைன்",
    nav_hajj: "ஹஜ் & உம்ரா",
    nav_contact: "தொடர்பு",
    hero_badge: "நம்பகமான சேவை — பிரீமியம் தரம்",
    hero_title: "உங்கள் முழுமையான தீர்வு",
    hero_title_highlight: "ரியல் எஸ்டேட் & சட்ட சேவைகள்",
    hero_desc: "ஆவணங்கள், சொத்து விற்பனை, அரசு ஆன்லைன் சேவைகள், காப்பீடு, ஹஜ் & உம்ரா.",
    btn_call: "இப்போது அழைக்கவும்",
    btn_whatsapp: "வாட்ஸ்அப்",
    btn_consult: "ஆலொசனை பதிவு",
    owner_label: "உரிமையாளர்",
    services_title: "எங்கள் சேவைகள்",
    services_sub: "வணிக, சட்ட மற்றும் சொத்து தீர்வுகள்",
    stats_clients: "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
    stats_years: "அனுபவ ஆண்டுகள்",
    stats_services: "சேவைகள்",
    stats_properties: "விற்கப்பட்ட சொத்துக்கள்",
    testimonials_title: "வாடிக்கையாளர் கருத்துகள்",
    cta_title: "இன்று உதவி தேவையா?",
    cta_sub: "ஆவணம், சொத்து அல்லது சட்ட ஆலோசனைக்கு தொடர்பு கொள்ளுங்கள்",
    footer_quick: "விரைவு இணைப்புகள்",
    footer_services: "சேவைகள்",
    footer_contact: "தொடர்பு",
    form_name: "முழு பெயர்",
    form_phone: "தொலைபேசி",
    form_email: "மின்னஞ்சல்",
    form_message: "செய்தி",
    form_submit: "விசாரணை அனுப்பு",
    view_details: "விவரங்கள்",
    enquire: "விசாரணை",
    filter_location: "இடம்",
    filter_budget: "பட்ஜெட்",
    filter_type: "வகை",
    all: "அனைத்தும்",
  },
};

export const BUSINESS = {
  name: "WELCOME ENTERPRISES – TAJ REAL ESTATE",
  owner: "S.T. Syed Imran, M.A.",
  phones: ["9003088794", "8056256133"],
  whatsapp: "919003088794",
  email: "welcomeenterprises.taj@gmail.com",
  address: "Taj Real Estate Office, Tamil Nadu, India",
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Sync theme with DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync lang with DOM
  useEffect(() => {
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ta" : "en"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const t = useCallback(
    (key) => {
      return translations[lang]?.[key] || translations.en[key] || key;
    },
    [lang]
  );

  const value = {
    lang,
    toggleLanguage,
    t,
    theme,
    toggleTheme,
    business: BUSINESS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
export default AppContext;
