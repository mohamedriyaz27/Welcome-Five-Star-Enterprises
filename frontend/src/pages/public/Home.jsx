import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, MessageCircle, Calendar, FileText, Scale, Building2, 
  Globe, Plane, Printer, Landmark, Gavel, Home as HomeIcon, 
  Heart, Stamp, FileSignature, Briefcase, GraduationCap, Award, 
  Baby, Shield, FileCheck, Languages, ClipboardCheck, Lightbulb, 
  Zap, Lock, Clock, Wallet, Eye, Route, ChevronDown, MapPin 
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useAlert } from "../../context/AlertContext";
import propertyService from "../../services/propertyService";
import inquiryService from "../../services/inquiryService";

export function Home() {
  const { t, business } = useApp();
  const { showAlert } = useAlert();
  
  // States
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  
  // Property Modal States
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", message: "" });
  const [enquiryStatus, setEnquiryStatus] = useState({ success: null, message: "" });

  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [contactErrors, setContactErrors] = useState({ name: false, phone: false });
  const [contactStatus, setContactStatus] = useState({ success: null, message: "" });

  // Counter States (Animate once on mount/viewport trigger)
  const [counters, setCounters] = useState({ clients: 0, years: 0, services: 0, properties: 0 });
  const statsRef = useRef(null);

  // Fetch Featured Properties
  useEffect(() => {
    async function loadFeatured() {
      const data = await propertyService.getFeaturedProperties();
      setFeaturedProperties(data.slice(0, 3));
    }
    loadFeatured();
  }, []);

  // Testimonials Auto Rotation
  const testimonials = [
    { text: "Excellent documentation and property services. Very professional and trustworthy team.", author: "Property Client, Chennai" },
    { text: "Got my Sale Deed and legal verification done smoothly. Highly recommended for legal work.", author: "Legal Services Client" },
    { text: "Adv. Farook Ahamed, B.A., B.L., handled my property dispute with utmost professionalism. Clear guidance throughout.", author: "Civil Case Client" },
    { text: "UAE embassy attestation completed smoothly for my employment visa. Fast and reliable service.", author: "Attestation Client" },
    { text: "PAN, Aadhaar and insurance services completed quickly. Great customer support.", author: "Online Services Client" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Animate Stats Counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startClients = 0;
          let startYears = 0;
          let startServices = 0;
          let startProperties = 0;
          
          const interval = setInterval(() => {
            let completed = true;
            if (startClients < 2500) {
              startClients += 50;
              completed = false;
            } else startClients = 2500;

            if (startYears < 15) {
              startYears += 1;
              completed = false;
            } else startYears = 15;

            if (startServices < 50) {
              startServices += 2;
              completed = false;
            } else startServices = 50;

            if (startProperties < 500) {
              startProperties += 10;
              completed = false;
            } else startProperties = 500;

            setCounters({
              clients: startClients,
              years: startYears,
              services: startServices,
              properties: startProperties,
            });

            if (completed) clearInterval(interval);
          }, 30);
          
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // FAQ Accordion Handler
  const toggleFaq = (index) => {
    setFaqOpen((prev) => (prev === index ? null : index));
  };

  // Format price helper
  const formatPrice = (n) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  // Property Enquiry Submit Handler
  const handlePropertyEnquiry = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      setEnquiryStatus({ success: false, message: "Name and Phone are required" });
      return;
    }
    const payload = {
      customerName: enquiryForm.name,
      mobile: enquiryForm.phone,
      message: enquiryForm.message,
      propertyId: selectedProperty.id,
      serviceType: "real-estate",
    };
    try {
      const res = await inquiryService.submitInquiry(payload);
      if (res.success) {
        showAlert("Enquiry submitted! We will contact you soon.", "success");
        setSelectedProperty(null);
        setEnquiryForm({ name: "", phone: "", message: "" });
        setEnquiryStatus({ success: null, message: "" });
      } else {
        setEnquiryStatus({ success: false, message: res.message || "Failed to submit enquiry" });
      }
    } catch (err) {
      setEnquiryStatus({ success: false, message: err.message || "Something went wrong" });
    }
  };

  // Contact Form Submit Handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const nameErr = !contactForm.name.trim();
    const phoneErr = !contactForm.phone.trim() || !/^[6-9]\d{9}$/.test(contactForm.phone.replace(/\D/g, "").slice(-10));
    
    setContactErrors({ name: nameErr, phone: phoneErr });
    if (nameErr || phoneErr) return;

    const payload = {
      customerName: contactForm.name,
      mobile: contactForm.phone,
      email: contactForm.email || null,
      message: contactForm.message || "",
      serviceType: contactForm.service || "general",
    };

    try {
      const res = await inquiryService.submitInquiry(payload);
      if (res.success) {
        showAlert("Thank you! Your inquiry has been submitted. We will contact you shortly.", "success");
        setContactForm({ name: "", phone: "", email: "", service: "", message: "" });
        setContactStatus({ success: true, message: "" });
      } else {
        setContactStatus({ success: false, message: res.message || "Failed to send inquiry" });
      }
    } catch (err) {
      setContactStatus({ success: false, message: err.message || "Something went wrong" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <span className="hero-badge" data-i18n="hero_badge">{t("hero_badge")}</span>
          <h1>
            <span data-i18n="hero_title">{t("hero_title")}</span><br />
            <span className="highlight" data-i18n="hero_title_highlight">{t("hero_title_highlight")}</span>
          </h1>
          <p data-i18n="hero_desc">{t("hero_desc")}</p>
          <div className="hero-cta">
            <a href={`tel:${business.phones[0]}`} className="btn btn-primary">
              <Phone style={{ width: 16, height: 16, marginRight: 6 }} /> <span data-i18n="btn_call">{t("btn_call")}</span>
            </a>
            <a href={`https://wa.me/${business.whatsapp}`} className="btn btn-green" target="_blank" rel="noopener noreferrer">
              <MessageCircle style={{ width: 16, height: 16, marginRight: 6 }} /> <span data-i18n="btn_whatsapp">{t("btn_whatsapp")}</span>
            </a>
            <a href="#contact-form-section" className="btn btn-outline">
              <Calendar style={{ width: 16, height: 16, marginRight: 6 }} /> <span data-i18n="btn_consult">{t("btn_consult")}</span>
            </a>
          </div>
          <div className="hero-owner">
            <span data-i18n="owner_label">{t("owner_label")}</span>: <strong>{business.owner}</strong> · {business.phones[0].slice(0,5)} {business.phones[0].slice(5)} · {business.phones[1].slice(0,5)} {business.phones[1].slice(5)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-gradient">
        <div className="container">
          <h2 className="section-title fade-in visible">Our <span>Services</span></h2>
          <p className="section-subtitle fade-in visible" data-i18n="services_sub">{t("services_sub")}</p>
          <div className="card-grid" id="home-services">
            <div className="service-card fade-in visible">
              <div className="icon"><FileText /></div>
              <h3>Documentation</h3>
              <p>EC (Encumbrance Certificate), Document Copy, Marriage Registration, Legal Heir, Online TP, Patta Chitta, Notary</p>
              <Link to="/services" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>Learn More</Link>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Scale /></div>
              <h3>Legal Services</h3>
              <p>Sale Deed, GPA, Trust Deed, Agreements, Legal Opinion</p>
              <Link to="/advocate" className="btn btn-outline btn-sm" style={{ marginTop: "0.5rem" }}>Adv. Farook Ahamed, B.A., B.L.,</Link>
              <Link to="/legal-services" className="btn btn-outline btn-sm" style={{ marginTop: "0.5rem" }}>Learn More</Link>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Building2 /></div>
              <h3>Real Estate</h3>
              <p>Land, House, Commercial properties, legal verification</p>
              <Link to="/properties" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>View Properties</Link>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Globe /></div>
              <h3>Online Services</h3>
              <p>PAN, Aadhaar, Passport, Motor & Health Insurance</p>
              <Link to="/online-services" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>Learn More</Link>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Plane /></div>
              <h3>Hajj & Umrah</h3>
              <p>Hajj booking, Umrah packages, visa & travel assistance</p>
              <Link to="/hajj-umrah" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>Learn More</Link>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Printer /></div>
              <h3>DTP & Print</h3>
              <p>Bill print, online print, documentation & translation</p>
              <Link to="/contact" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advocates Hero Section */}
      <section className="section section-gradient-alt" id="advocate">
        <div className="container advocate-hero-grid">
          <div className="fade-in visible">
            <span className="hero-badge" style={{ display: "inline-block", marginBottom: "1rem" }}>Advocate · High Court · District Court</span>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Adv. Farook Ahamed, B.A., B.L.,</h2>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Adv. K. Venkatesh MBA., L.L.B.,</h2>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Adv. A. Mohammed Ansarullah M.B.A., ML.</h2>
            <p style={{ color: "var(--gold-400)", fontWeight: 600, marginBottom: "0.5rem" }}>Advocate | High Court | District Court</p>
            <p style={{ fontStyle: "italic", color: "var(--gray-300)", marginBottom: "1rem", fontSize: "1.15rem" }}>"Committed to Justice. Dedicated to You."</p>
            <p style={{ color: "var(--gray-300)", marginBottom: "1rem" }}>
              Dedicated advocates providing legal services in civil, criminal, property, documentation, family matters, attestation services, embassy services, and legal consultancy with a commitment to justice, transparency, and client satisfaction.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a href="#contact-form-section" className="btn btn-primary"><Calendar style={{ width: 16, height: 16, marginRight: 6 }} /> Book Consultation</a>
              <a href={`https://wa.me/${business.whatsapp}?text=Hello%20Advocate%2C%20I%20need%20legal%20consultation.`} className="btn btn-green" target="_blank" rel="noopener noreferrer">
                <MessageCircle style={{ width: 16, height: 16, marginRight: 6 }} /> WhatsApp Now
              </a>
              <a href={`tel:${business.phones[0]}`} className="btn btn-outline"><Phone style={{ width: 16, height: 16, marginRight: 6 }} /> Call Now</a>
            </div>
          </div>
          <div className="advocate-hero-img fade-in visible">
            <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=85" alt="Advocates Office" loading="lazy" />
          </div>
        </div>
      </section>

      {/* About Advocate */}
      <section className="section" id="about-advocate">
        <div className="container contact-grid">
          <div className="fade-in visible">
            <h2 className="section-title">About <span>The Advocate</span></h2>
            <p style={{ color: "var(--gray-300)", marginBottom: "1rem" }}>Dedicated legal professionals providing reliable legal guidance and representation across civil, criminal, family, property, and documentation matters.</p>
            <p style={{ color: "var(--gray-400)" }}>Focused on delivering practical legal solutions while protecting client rights and interests.</p>
          </div>
          <div className="why-mini fade-in visible">
            <div className="why-mini-item"><Landmark /><strong>High Court</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>Experienced practice</p></div>
            <div className="why-mini-item"><Shield /><strong>District Court</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>Full representation</p></div>
            <div className="why-mini-item"><Globe /><strong>Embassy Services</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>GCC & international</p></div>
            <div className="why-mini-item"><Stamp /><strong>Attestation</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>HRD & MEA</p></div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="section section-gradient" id="practice">
        <div className="container">
          <h2 className="section-title fade-in visible">Practice <span>Areas</span></h2>
          <p className="section-subtitle fade-in visible">Comprehensive legal services across all major domains</p>
          <div className="card-grid" style={{ marginTop: "2rem" }}>
            <article className="service-card fade-in visible"><div className="icon"><Landmark /></div><h3>Civil Cases</h3><ul className="service-list"><li>Property disputes</li><li>Recovery suits</li><li>Injunction matters</li><li>Contract disputes</li><li>Consumer cases</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Gavel /></div><h3>Criminal Cases</h3><ul class="service-list"><li>Bail petitions</li><li>Criminal defense</li><li>Quash petitions</li><li>Trial matters</li><li>Legal representation</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><HomeIcon /></div><h3>Property Registration</h3><ul class="service-list"><li>Sale deed registration</li><li>Settlement deeds</li><li>Gift deeds</li><li>Property verification</li><li>Legal opinions</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><FileText /></div><h3>Documentation Work</h3><ul class="service-list"><li>Affidavits</li><li>Agreements</li><li>Power of Attorney</li><li>Legal notices</li><li>Will preparation</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Heart /></div><h3>Family & Divorce Cases</h3><ul class="service-list"><li>Divorce petitions</li><li>Child custody</li><li>Maintenance cases</li><li>Mutual consent divorce</li><li>Family settlements</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Stamp /></div><h3>Notary Services</h3><ul class="service-list"><li>Notary attestation</li><li>Oath administration</li><li>Affidavit notarization</li><li>Document certification</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><FileSignature /></div><h3>Sale Deed & Legal Deeds</h3><ul class="service-list"><li>Sale Deed · Trust Deed</li><li>GPA · Settlement Deed</li><li>Release · Partition Deed</li><li>Partnership Deed · Will</li><li>Bank MOD Documentation</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Briefcase /></div><h3>Legal Consultancy</h3><ul class="service-list"><li>Legal opinion & advice</li><li>Court case consultation</li><li>Property legal verification</li><li>Marriage registration assistance</li><li>End-to-end legal support</li></ul></article>
          </div>
        </div>
      </section>

      {/* Attestations */}
      <section className="section premium-block" id="attestation">
        <div className="container">
          <h2 className="section-title fade-in visible">N.Gopinath<br/>Certificate Attestation & <span>HRD Services</span></h2>
          <p className="section-subtitle fade-in visible">Complete assistance for educational, personal, and professional certificates</p>
          <div className="attest-grid fade-in visible">
            <div className="attest-chip"><GraduationCap /> SSLC Certificates</div>
            <div className="attest-chip"><GraduationCap /> HSC Certificates</div>
            <div className="attest-chip"><GraduationCap /> CBSE Certificates</div>
            <div className="attest-chip"><Award /> ITI Certificates</div>
            <div className="attest-chip"><Award /> Diploma Certificates</div>
            <div className="attest-chip"><Award /> Degree Certificates</div>
            <div className="attest-chip"><Award /> PG Certificates</div>
            <div className="attest-chip"><Heart /> Marriage Certificates</div>
            <div className="attest-chip"><Baby /> Birth Certificates</div>
            <div className="attest-chip"><Briefcase /> Experience Certificates</div>
            <div className="attest-chip"><Shield /> PCC Certificates</div>
            <div className="attest-chip"><FileText /> Transfer Certificates</div>
            <div className="attest-chip"><FileText /> Mark Sheets</div>
            <div className="attest-chip"><Shield /> Fingerprint Attestation</div>
            <div className="attest-chip"><FileCheck /> Private Diploma Certificates</div>
          </div>
          <h3 style={{ marginTop: "2.5rem", color: "var(--gold-400)", fontSize: "1.05rem" }}>Government Departments</h3>
          <div className="attest-grid" style={{ maxWidth: "720px" }}>
            <div className="attest-chip"><Building2 /> HRD</div>
            <div className="attest-chip"><Building2 /> Home Department</div>
            <div className="attest-chip"><Globe /> External Affairs</div>
            <div className="attest-chip"><Shield /> Embassy Attestation</div>
          </div>
          <h3 style={{ marginTop: "2rem", color: "var(--gold-400)", fontSize: "1.05rem" }}>Coverage States</h3>
          <div className="state-tags">
            <span className="state-tag">Tamil Nadu</span><span class="state-tag">Kerala</span><span class="state-tag">Karnataka</span>
            <span className="state-tag">Andhra Pradesh</span><span class="state-tag">Puducherry</span><span class="state-tag">Maharashtra</span>
          </div>
        </div>
      </section>

      {/* Embassy Services */}
      <section className="section section-gradient-alt" id="embassy">
        <div className="container">
          <h2 className="section-title fade-in visible">Embassy & <span>International Services</span></h2>
          <p className="section-subtitle fade-in visible">Embassy attestation, visa documentation, and certified translation</p>
          <div className="card-grid" style={{ marginTop: "2rem" }}>
            <article className="service-card fade-in visible"><div className="icon"><Shield /></div><h3>Embassy Attestation</h3><ul className="service-list"><li>UAE · Saudi Arabia · Kuwait</li><li>Oman · Bahrain · Qatar</li><li>Europe</li><li>Other GCC Countries</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Plane /></div><h3>Visa Documentation</h3><ul className="service-list"><li>Employment Visa Documents</li><li>Family Visa Documents</li><li>Educational Documents</li><li>Commercial Documents</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Languages /></div><h3>Translation Services</h3><ul className="service-list"><li>Arabic Translation</li><li>English Translation</li><li>Multilingual Translation</li><li>Certified Translation</li></ul></article>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="section" id="business">
        <div className="container">
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>CA Ahmed kabeer ACA, B.Com</h2>
          <h2 className="section-title fade-in visible">Business & <span>Registration Services</span></h2>
          <p className="section-subtitle fade-in visible">Business registration, compliance, and consultancy services</p>
          <div className="card-grid" style={{ marginTop: "2rem" }}>
            <article className="service-card fade-in visible"><div className="icon"><Building2 /></div><h3>Business Registration</h3><ul className="service-list"><li>Proprietorship Registration</li><li>Partnership Registration</li><li>LLP Registration</li><li>Company Registration</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><ClipboardCheck /></div><h3>Compliance Services</h3><ul className="service-list"><li>MSME Registration</li><li>Trade License</li><li>Professional Tax</li><li>Business Documentation</li></ul></article>
            <article className="service-card fade-in visible"><div className="icon"><Lightbulb /></div><h3>Consultancy Services</h3><ul className="service-list"><li>Overseas Education Consultancy</li><li>Marriage Registration Assistance</li><li>Certificate Verification</li><li>Legal Documentation Support</li></ul></article>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-gradient">
        <div className="container">
          <h2 className="section-title fade-in visible" style={{ textAlign: "center" }}>Why <span>Choose Us</span></h2>
          <div className="why-mini fade-in visible" style={{ marginTop: "2rem" }}>
            <div className="why-mini-item"><Award /><strong>Experienced Legal Guidance</strong></div>
            <div className="why-mini-item"><Eye /><strong>Transparent Process</strong></div>
            <div className="why-mini-item"><Lock /><strong>Confidential Services</strong></div>
            <div className="why-mini-item"><Clock /><strong>Timely Updates</strong></div>
            <div className="why-mini-item"><Wallet /><strong>Affordable Consultation</strong></div>
            <div className="why-mini-item"><FileCheck /><strong>Trusted Documentation Support</strong></div>
            <div className="why-mini-item"><Zap /><strong>Fast Attestation Process</strong></div>
            <div className="why-mini-item"><Route /><strong>End-to-End Assistance</strong></div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="section section-gradient-alt">
        <div className="container">
          <h2 className="section-title fade-in visible" style={{ textAlign: "center" }}>Our Working <span>Process</span></h2>
          <div className="process-grid fade-in visible">
            <div className="process-item"><div className="step-num">01</div><h4>Initial Consultation</h4><p>Understand your legal needs</p></div>
            <div className="process-item"><div className="step-num">02</div><h4>Document Verification</h4><p>Review all relevant papers</p></div>
            <div className="process-item"><div className="step-num">03</div><h4>Legal Review</h4><p>Expert analysis & strategy</p></div>
            <div className="process-item"><div className="step-num">04</div><h4>Filing & Processing</h4><p>Court or department filing</p></div>
            <div className="process-item"><div className="step-num">05</div><h4>Updates & Follow-up</h4><p>Regular case status updates</p></div>
            <div className="process-item"><div className="step-num">06</div><h4>Successful Completion</h4><p>Matter resolved successfully</p></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="section-title fade-in visible" style={{ textAlign: "center" }}>Frequently Asked <span>Questions</span></h2>
          <div className="fade-in visible" style={{ marginTop: "2rem" }} id="home-faq">
            {[
              { q: "How long does certificate attestation take?", a: "Processing time depends on the certificate type and destination country." },
              { q: "Do you provide embassy attestation?", a: "Yes, we provide complete embassy attestation assistance for GCC and other countries." },
              { q: "Can you assist with property registration?", a: "Yes, complete legal support is provided for registration and verification." },
              { q: "Do you handle family court matters?", a: "Yes, including divorce, maintenance, custody, and settlement cases." }
            ].map((faq, index) => (
              <div key={index} className={`faq-home-item ${faqOpen === index ? "open" : ""}`}>
                <button className="faq-home-q" type="button" onClick={() => toggleFaq(index)}>
                  {faq.q} <ChevronDown style={{ width: 16, height: 16, transform: faqOpen === index ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                <div className="faq-home-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--gold-400)", fontSize: "1.2rem", fontFamily: "var(--font-display)" }}>Your Rights. Our Responsibility.</p>
          <p style={{ textAlign: "center", color: "var(--gray-400)", fontSize: "0.9rem" }}>Advocate | Legal Consultant | Documentation & Attestation Services</p>
          <p style={{ textAlign: "center", marginTop: "0.75rem" }}>
            Phone: <a href={`tel:${business.phones[0]}`} style={{ color: "var(--gold-400)" }}>{business.phones[0].slice(0,5)} {business.phones[0].slice(5)}</a> · WhatsApp: <a href={`https://wa.me/${business.whatsapp}`} style={{ color: "var(--gold-400)" }}>{business.phones[0].slice(0,5)} {business.phones[0].slice(5)}</a>
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="section stats-section section-gradient-alt" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card fade-in visible">
              <div className="number">{counters.clients}+</div>
              <div className="label" data-i18n="stats_clients">{t("stats_clients")}</div>
            </div>
            <div className="stat-card fade-in visible">
              <div className="number">{counters.years}+</div>
              <div className="label" data-i18n="stats_years">{t("stats_years")}</div>
            </div>
            <div className="stat-card fade-in visible">
              <div className="number">{counters.services}+</div>
              <div className="label" data-i18n="stats_services">{t("stats_services")}</div>
            </div>
            <div className="stat-card fade-in visible">
              <div className="number">{counters.properties}+</div>
              <div className="label" data-i18n="stats_properties">{t("stats_properties")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="section">
        <div className="container">
          <h2 className="section-title fade-in visible">Featured <span>Properties</span></h2>
          <p className="section-subtitle fade-in visible">Browse our latest listings</p>
          <div className="card-grid" id="home-property-grid">
            {featuredProperties.map((p) => (
              <article key={p.id} className="property-card fade-in visible">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="body">
                  <div className="price">{formatPrice(p.price)}</div>
                  <h3>{p.title}</h3>
                  <div className="location">
                    <MapPin style={{ width: 14, height: 14, marginRight: 4 }} /> {p.location} · {p.area}
                  </div>
                  <div className="property-tags">
                    <span className="tag">{p.type}</span>
                    {p.featured && <span className="tag" style={{ background: "rgba(201,162,39,0.2)", color: "var(--gold-400)" }}>Featured</span>}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-400)", marginBottom: "1rem" }}>{p.description}</p>
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedProperty(p)}>View Details</button>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/properties" className="btn btn-primary">View All Properties</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="section section-gradient-alt">
        <div className="container">
          <h2 className="section-title fade-in visible" data-i18n="testimonials_title">{t("testimonials_title")}</h2>
          <div className="testimonial-slider fade-in visible">
            {testimonials.map((test, index) => (
              <div key={index} className={`testimonial-slide ${activeTestimonial === index ? "active" : ""}`}>
                <p>"{test.text}"</p>
                <div className="author">— {test.author}</div>
              </div>
            ))}
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={activeTestimonial === index ? "active" : ""} 
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title" data-i18n="cta_title">{t("cta_title")}</h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2rem" }} data-i18n="cta_sub">{t("cta_sub")}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={`tel:${business.phones[0]}`} className="btn btn-primary"><Phone style={{ width: 16, height: 16, marginRight: 6 }} /> {business.phones[0].slice(0,5)} {business.phones[0].slice(5)}</a>
            <a href={`https://wa.me/${business.whatsapp}`} className="btn btn-green" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            <a href="#contact-form-section" className="btn btn-outline">Contact Form</a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section section-gradient" id="contact-form-section">
        <div className="container contact-grid">
          <div>
            <h2 className="section-title">Get in <span>Touch</span></h2>
            <p className="section-subtitle">Send us your inquiry — legal, property, or attestation services</p>
            <form id="contact-form" onSubmit={handleContactSubmit}>
              <div className={`form-group ${contactErrors.name ? "invalid" : ""}`}>
                <label data-i18n="form_name">{t("form_name")}</label>
                <input 
                  name="name" 
                  value={contactForm.name} 
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Your name" 
                />
                <span className="error">Name is required</span>
              </div>
              <div className={`form-group ${contactErrors.phone ? "invalid" : ""}`}>
                <label data-i18n="form_phone">{t("form_phone")}</label>
                <input 
                  name="phone" 
                  value={contactForm.phone} 
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="10-digit mobile" 
                />
                <span className="error">Valid phone required</span>
              </div>
              <div className="form-group">
                <label data-i18n="form_email">{t("form_email")}</label>
                <input 
                  name="email" 
                  type="email" 
                  value={contactForm.email} 
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="email@example.com" 
                />
              </div>
              <div className="form-group">
                <label>Service Required</label>
                <select 
                  name="service" 
                  value={contactForm.service}
                  onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                >
                  <option value="">Select a service</option>
                  <option value="civil">Civil Cases</option>
                  <option value="criminal">Criminal Cases</option>
                  <option value="property-registration">Property Registration</option>
                  <option value="family">Family & Divorce</option>
                  <option value="certificate-attestation">Certificate Attestation</option>
                  <option value="embassy-attestation">Embassy Attestation</option>
                  <option value="business-registration">Business Registration</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="documentation">Documentation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label data-i18n="form_message">{t("form_message")}</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" data-i18n="form_submit">{t("form_submit")}</button>
              {contactStatus.success === false && <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>{contactStatus.message}</p>}
            </form>
          </div>
          <div>
            <h3 style={{ marginBottom: "1rem", color: "var(--gold-400)" }}>Our Location</h3>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.702204749426!2d80.10190037128653!3d12.99088908204286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52613126e7ec65%3A0x3fd801522cc1bdef!2sWelcome%20Enterprises!5e0!3m2!1sen!2sin!4v1780416238825!5m2!1sen!2sin" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Welcome Enterprises Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Property Modal */}
      {selectedProperty && (
        <div className="modal-overlay active" onClick={() => setSelectedProperty(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProperty(null)} aria-label="Close">&times;</button>
            <h3 id="modal-title">{selectedProperty.title}</h3>
            <div id="modal-body">
              <img src={selectedProperty.image} alt={selectedProperty.title} style={{ borderRadius: "12px", marginBottom: "1rem", width: "100%" }} />
              <p><strong>Price:</strong> {formatPrice(selectedProperty.price)}</p>
              <p><strong>Location:</strong> {selectedProperty.location}</p>
              <p><strong>Area:</strong> {selectedProperty.area}</p>
              <p><strong>Type:</strong> {selectedProperty.type}</p>
              <p style={{ marginTop: "0.75rem" }}>{selectedProperty.description}</p>
              
              <form id="property-enquiry" style={{ marginTop: "1.5rem" }} onSubmit={handlePropertyEnquiry}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    name="name" 
                    value={enquiryForm.name} 
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    pattern="[6-9][0-9]{9}" 
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    required 
                    placeholder="10-digit mobile number" 
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    name="message" 
                    rows="2"
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  >
                    Interested in: {selectedProperty.title}
                  </textarea>
                </div>
                <button type="submit" className="btn btn-green" style={{ width: "100%" }}>Send Enquiry</button>
                {enquiryStatus.success === false && <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>{enquiryStatus.message}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
