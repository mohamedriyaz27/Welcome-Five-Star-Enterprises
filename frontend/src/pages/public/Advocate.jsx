import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Menu, Scale, Calendar, MessageCircle, Phone, ShieldCheck, FileCheck, Globe, Users,
  Landmark, Gavel, Home as HomeIcon, FileText, Heart, Stamp, Briefcase, GraduationCap,
  Award, Baby, Shield, Fingerprint, Building, Flag, Plane, Languages, Building2,
  ClipboardCheck, Lightbulb, Eye, Lock, Clock, Wallet, Zap, Route, ChevronDown, Mail,
  MapPin, Send
} from "lucide-react";
import { useAlert } from "../../context/AlertContext";
import "../../styles/advocate.css";

export function Advocate() {
  const { showAlert } = useAlert();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const totalTestimonials = 4;

  // Handle navbar styling on scroll and track active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ["home", "about", "practice", "attestation", "embassy", "business", "faq", "contact"];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          if (window.scrollY >= (el.offsetTop - 150)) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Testimonials auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % totalTestimonials);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle smooth scroll to section with offset
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Form submission handler using local storage and common alert system
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const name = fd.get("name")?.toString().trim();
    const phone = fd.get("phone")?.toString().trim();

    if (!name || !phone) {
      showAlert("Please fill in name and phone number.", "error");
      return;
    }

    const inquiries = JSON.parse(localStorage.getItem("advocate_inquiries") || "[]");
    inquiries.push({
      id: Date.now(),
      name,
      phone,
      email: fd.get("email") || "",
      service: fd.get("service") || "",
      message: fd.get("message") || "",
      date: new Date().toISOString(),
    });

    localStorage.setItem("advocate_inquiries", JSON.stringify(inquiries));
    showAlert("Thank you! Your consultation request has been received. We will contact you shortly.", "success");
    form.reset();
  };

  const toggleFaq = (idx) => {
    setFaqOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="advocate-page">
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <Link to="/" className="back-home-btn" title="Back to Welcome Enterprises">
              <ArrowLeft size={20} />
            </Link>
            <a href="#home" className="logo" onClick={(e) => handleNavLinkClick(e, "home")}>
              <div className="logo-mark">SI</div>
              <div className="logo-text">
                <span>Adv. Farook Ahamed<span className="logo-degrees">, B.A., B.L.,</span></span>
                <small>Advocate & Legal Consultant</small>
              </div>
            </a>
          </div>
          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "home")}>Home</a>
            <a href="#about" className={activeSection === "about" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "about")}>About</a>
            <a href="#practice" className={activeSection === "practice" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "practice")}>Practice Areas</a>
            <a href="#attestation" className={activeSection === "attestation" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "attestation")}>Attestation</a>
            <a href="#embassy" className={activeSection === "embassy" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "embassy")}>Embassy</a>
            <a href="#business" className={activeSection === "business" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "business")}>Business</a>
            <a href="#faq" className={activeSection === "faq" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "faq")}>FAQ</a>
            <a href="#contact" className={activeSection === "contact" ? "active" : ""} onClick={(e) => handleNavLinkClick(e, "contact")}>Contact</a>
          </nav>
          <div className="nav-cta">
            <a href="tel:9003088794" className="btn btn-outline btn-sm">Call Now</a>
            <a href="#contact" className="btn btn-gold btn-sm" onClick={(e) => handleNavLinkClick(e, "contact")}>Consultation</a>
            <button className="menu-toggle" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <Scale size={16} /> Advocate · High Court · District Court
            </div>
            <h1>Adv. Farook Ahamed, B.A., B.L.,</h1>
            <h1>Adv. K. Venkatesh MBA., L.L.B.,</h1>
            <h1>Adv. A. Mohammed Ansarullah M.B.A., ML.</h1>
            <p className="credentials">Advocate | High Court | District Court</p>
            <p className="tagline">"Committed to Justice. Dedicated to You."</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-gold" onClick={(e) => handleNavLinkClick(e, "contact")}>
                <Calendar size={18} /> Book Consultation
              </a>
              <a href="https://wa.me/919003088794?text=Hello%20Adv.%20Syed%20Imran%2C%20I%20need%20legal%20consultation." className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> WhatsApp Now
              </a>
              <a href="tel:9003088794" className="btn btn-outline">
                <Phone size={18} /> Call Now
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>15+</strong><span>Years Experience</span></div>
              <div className="stat"><strong>5000+</strong><span>Cases Handled</span></div>
              <div className="stat"><strong>100%</strong><span>Client Focus</span></div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=85" alt="Adv. Farook Ahamed, B.A., B.L., – Advocate and Legal Consultant" width="600" height="750" loading="eager" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section-alt" id="about">
        <div className="container about-grid">
          <div className="about-image reveal">
            <img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&q=80" alt="About Adv. Farook Ahamed, B.A., B.L.," loading="lazy" />
            <div className="accent"></div>
          </div>
          <div className="reveal">
            <span className="section-label">About The Advocate</span>
            <h2 className="section-title">Trusted Legal Professional</h2>
            <p className="section-desc" style={{ marginBottom: "1rem" }}>Dedicated advocate providing legal services in civil, criminal, property, documentation, family matters, attestation services, embassy services, and legal consultancy with a commitment to justice, transparency, and client satisfaction.</p>
            <p style={{ color: "var(--gray-300)", marginBottom: "1rem" }}>Dedicated legal professional providing reliable legal guidance and representation across civil, criminal, family, property, and documentation matters.</p>
            <p style={{ color: "var(--gray-400)" }}>Focused on delivering practical legal solutions while protecting client rights and interests.</p>
            <div className="about-features">
              <div className="about-feature">
                <ShieldCheck size={24} />
                <div>
                  <strong>High Court Practice</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>Experienced representation</p>
                </div>
              </div>
              <div className="about-feature">
                <FileCheck size={24} />
                <div>
                  <strong>Documentation Expert</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>End-to-end legal docs</p>
                </div>
              </div>
              <div className="about-feature">
                <Globe size={24} />
                <div>
                  <strong>Embassy Services</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>GCC & international</p>
                </div>
              </div>
              <div className="about-feature">
                <Users size={24} />
                <div>
                  <strong>Client Centric</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>Transparent process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="section" id="practice">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Practice Areas</span>
            <h2 className="section-title">Legal Services We Provide</h2>
            <p className="section-desc">Comprehensive legal representation and consultancy across multiple domains</p>
          </div>
          <div className="cards-grid" style={{ marginTop: "3rem" }}>
            <article className="service-card reveal">
              <div className="icon"><Landmark size={24} /></div>
              <h3>Civil Cases</h3>
              <ul>
                <li>Property disputes</li>
                <li>Recovery suits</li>
                <li>Injunction matters</li>
                <li>Contract disputes</li>
                <li>Consumer cases</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Gavel size={24} /></div>
              <h3>Criminal Cases</h3>
              <ul>
                <li>Bail petitions</li>
                <li>Criminal defense</li>
                <li>Quash petitions</li>
                <li>Trial matters</li>
                <li>Legal representation</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><HomeIcon size={24} /></div>
              <h3>Property Registration</h3>
              <ul>
                <li>Sale deed registration</li>
                <li>Settlement deeds</li>
                <li>Gift deeds</li>
                <li>Property verification</li>
                <li>Legal opinions</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><FileText size={24} /></div>
              <h3>Documentation Work</h3>
              <ul>
                <li>Affidavits</li>
                <li>Agreements</li>
                <li>Power of Attorney</li>
                <li>Legal notices</li>
                <li>Will preparation</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Heart size={24} /></div>
              <h3>Family & Divorce Cases</h3>
              <ul>
                <li>Divorce petitions</li>
                <li>Child custody</li>
                <li>Maintenance cases</li>
                <li>Mutual consent divorce</li>
                <li>Family settlements</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Stamp size={24} /></div>
              <h3>Notary Services</h3>
              <ul>
                <li>Notary attestation</li>
                <li>Oath administration</li>
                <li>Affidavit notarization</li>
                <li>Document certification</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Briefcase size={24} /></div>
              <h3>Legal Consultancy</h3>
              <ul>
                <li>Legal opinion & advice</li>
                <li>Court case consultation</li>
                <li>Property legal verification</li>
                <li>Marriage registration assistance</li>
                <li>End-to-end legal support</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* CERTIFICATE ATTESTATION */}
      <section className="section premium-section" id="attestation">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Premium Service</span>
            <h2 className="section-title">Certificate Attestation & HRD Services</h2>
            <p className="section-desc">Complete assistance for educational, personal, and professional certificate attestation through all government departments</p>
          </div>

          <div className="attestation-grid reveal">
            <div className="attest-item"><GraduationCap size={18} /> SSLC Certificates</div>
            <div className="attest-item"><GraduationCap size={18} /> HSC Certificates</div>
            <div className="attest-item"><GraduationCap size={18} /> CBSE Certificates</div>
            <div className="attest-item"><Award size={18} /> ITI Certificates</div>
            <div className="attest-item"><Award size={18} /> Diploma Certificates</div>
            <div className="attest-item"><Award size={18} /> Degree Certificates</div>
            <div className="attest-item"><Award size={18} /> PG Certificates</div>
            <div className="attest-item"><Heart size={18} /> Marriage Certificates</div>
            <div className="attest-item"><Baby size={18} /> Birth Certificates</div>
            <div className="attest-item"><Briefcase size={18} /> Experience Certificates</div>
            <div className="attest-item"><Shield size={18} /> PCC Certificates</div>
            <div className="attest-item"><FileText size={18} /> Transfer Certificates</div>
            <div className="attest-item"><FileText size={18} /> Mark Sheets</div>
            <div className="attest-item"><Fingerprint size={18} /> Fingerprint Attestation</div>
            <div className="attest-item"><FileCheck size={18} /> Private Diploma Certificates</div>
          </div>

          <div className="text-center reveal" style={{ marginTop: "3rem" }}>
            <span className="section-label">Government Departments</span>
            <div className="attestation-grid" style={{ maxWidth: "700px", margin: "1.5rem auto 0" }}>
              <div className="attest-item"><Building size={18} /> HRD</div>
              <div className="attest-item"><Building size={18} /> Home Department</div>
              <div className="attest-item"><Globe size={18} /> External Affairs</div>
              <div className="attest-item"><Flag size={18} /> Embassy Attestation</div>
            </div>
            <div className="coverage-tags" style={{ marginTop: "2rem" }}>
              <span className="coverage-tag">Tamil Nadu</span>
              <span className="coverage-tag">Kerala</span>
              <span className="coverage-tag">Karnataka</span>
              <span className="coverage-tag">Andhra Pradesh</span>
              <span className="coverage-tag">Puducherry</span>
              <span className="coverage-tag">Maharashtra</span>
            </div>
          </div>
        </div>
      </section>

      {/* EMBASSY & INTERNATIONAL */}
      <section className="section section-alt" id="embassy">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">International Services</span>
            <h2 className="section-title">Embassy & International Services</h2>
            <p className="section-desc">Complete embassy attestation, visa documentation, and certified translation services</p>
          </div>

          <div className="cards-grid" style={{ marginTop: "3rem" }}>
            <article className="service-card reveal">
              <div className="icon"><Flag size={24} /></div>
              <h3>Embassy Attestation</h3>
              <ul>
                <li>UAE</li>
                <li>Saudi Arabia</li>
                <li>Kuwait</li>
                <li>Oman</li>
                <li>Bahrain</li>
                <li>Qatar</li>
                <li>Europe</li>
                <li>Other GCC Countries</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Plane size={24} /></div>
              <h3>Visa Documentation</h3>
              <ul>
                <li>Employment Visa Documents</li>
                <li>Family Visa Documents</li>
                <li>Educational Documents</li>
                <li>Commercial Documents</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Languages size={24} /></div>
              <h3>Translation Services</h3>
              <ul>
                <li>Arabic Translation</li>
                <li>English Translation</li>
                <li>Multilingual Translation</li>
                <li>Certified Translation</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* BUSINESS & REGISTRATION */}
      <section className="section" id="business">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Business Solutions</span>
            <h2 className="section-title">Business & Registration Services</h2>
            <p className="section-desc">Professional business registration, compliance, and consultancy services</p>
          </div>

          <div className="cards-grid" style={{ marginTop: "3rem" }}>
            <article className="service-card reveal">
              <div className="icon"><Building2 size={24} /></div>
              <h3>Business Registration</h3>
              <ul>
                <li>Proprietorship Registration</li>
                <li>Partnership Registration</li>
                <li>LLP Registration</li>
                <li>Company Registration</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><ClipboardCheck size={24} /></div>
              <h3>Compliance Services</h3>
              <ul>
                <li>MSME Registration</li>
                <li>Trade License</li>
                <li>Professional Tax</li>
                <li>Business Documentation</li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="icon"><Lightbulb size={24} /></div>
              <h3>Consultancy Services</h3>
              <ul>
                <li>Overseas Education Consultancy</li>
                <li>Marriage Registration Assistance</li>
                <li>Certificate Verification</li>
                <li>Legal Documentation Support</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Your Trusted Legal Partner</h2>
          </div>
          <div className="why-grid" style={{ marginTop: "2.5rem" }}>
            <div className="why-card reveal"><div className="icon"><Award size={24} /></div><h4>Experienced Legal Guidance</h4><p>Seasoned advocate with court expertise</p></div>
            <div className="why-card reveal"><div className="icon"><Eye size={24} /></div><h4>Transparent Process</h4><p>Clear communication at every step</p></div>
            <div className="why-card reveal"><div className="icon"><Lock size={24} /></div><h4>Confidential Services</h4><p>Your matters handled with discretion</p></div>
            <div className="why-card reveal"><div className="icon"><Clock size={24} /></div><h4>Timely Updates</h4><p>Regular case status reporting</p></div>
            <div className="why-card reveal"><div className="icon"><Wallet size={24} /></div><h4>Affordable Consultation</h4><p>Fair and competitive fees</p></div>
            <div className="why-card reveal"><div className="icon"><FileCheck size={24} /></div><h4>Trusted Documentation Support</h4><p>Accurate legal document preparation</p></div>
            <div className="why-card reveal"><div className="icon"><Zap size={24} /></div><h4>Fast Attestation</h4><p>Quick certificate processing</p></div>
            <div className="why-card reveal"><div className="icon"><Route size={24} /></div><h4>End-to-End Assistance</h4><p>From consultation to completion</p></div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">How We Work</span>
            <h2 className="section-title">Our Working Process</h2>
          </div>
          <div className="process-steps">
            <div className="process-step reveal"><div className="num">01</div><h4>Initial Consultation</h4><p>Understand your legal needs</p></div>
            <div className="process-step reveal"><div className="num">02</div><h4>Document Verification</h4><p>Review all relevant papers</p></div>
            <div className="process-step reveal"><div className="num">03</div><h4>Legal Review</h4><p>Expert analysis & strategy</p></div>
            <div className="process-step reveal"><div className="num">04</div><h4>Filing & Processing</h4><p>Court or department filing</p></div>
            <div className="process-step reveal"><div className="num">05</div><h4>Updates & Follow-up</h4><p>Regular case status updates</p></div>
            <div className="process-step reveal"><div className="num">06</div><h4>Successful Completion</h4><p>Matter resolved successfully</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Client Reviews</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="testimonial-wrap reveal">
            <div className={`testimonial-card ${testimonialIdx === 0 ? "active" : ""}`}>
              <div className="stars">★★★★★</div>
              <p className="quote">"Adv. Farook Ahamed, B.A., B.L., handled my property dispute with utmost professionalism. Clear guidance and timely updates throughout the case."</p>
              <div className="author">Property Dispute Client</div>
              <div className="role">Civil Matter – Chennai</div>
            </div>
            <div className={`testimonial-card ${testimonialIdx === 1 ? "active" : ""}`}>
              <div className="stars">★★★★★</div>
              <p className="quote">"Excellent embassy attestation service for my employment visa to UAE. All documents processed smoothly without any hassle."</p>
              <div className="author">Attestation Client</div>
              <div className="role">UAE Embassy Attestation</div>
            </div>
            <div className={`testimonial-card ${testimonialIdx === 2 ? "active" : ""}`}>
              <div className="stars">★★★★★</div>
              <p className="quote">"Got my sale deed registered and legal opinion completed efficiently. Highly trustworthy advocate for property matters."</p>
              <div className="author">Property Registration Client</div>
              <div className="role">Sale Deed & Registration</div>
            </div>
            <div className={`testimonial-card ${testimonialIdx === 3 ? "active" : ""}`}>
              <div className="stars">★★★★★</div>
              <p className="quote">"Handled my family court matter with sensitivity and expertise. Mutual consent divorce completed professionally."</p>
              <div className="author">Family Law Client</div>
              <div className="role">Divorce & Family Settlement</div>
            </div>
            <div className="testimonial-nav">
              <button className={testimonialIdx === 0 ? "active" : ""} onClick={() => setTestimonialIdx(0)} aria-label="Testimonial 1"></button>
              <button className={testimonialIdx === 1 ? "active" : ""} onClick={() => setTestimonialIdx(1)} aria-label="Testimonial 2"></button>
              <button className={testimonialIdx === 2 ? "active" : ""} onClick={() => setTestimonialIdx(2)} aria-label="Testimonial 3"></button>
              <button className={testimonialIdx === 3 ? "active" : ""} onClick={() => setTestimonialIdx(3)} aria-label="Testimonial 4"></button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list reveal">
            <div className={`faq-item ${faqOpenIndex === 0 ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(0)}>
                How long does certificate attestation take? <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>Processing time depends on the certificate type and destination country.</p>
              </div>
            </div>
            <div className={`faq-item ${faqOpenIndex === 1 ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(1)}>
                Do you provide embassy attestation? <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>Yes, we provide complete embassy attestation assistance for GCC and other countries.</p>
              </div>
            </div>
            <div className={`faq-item ${faqOpenIndex === 2 ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(2)}>
                Can you assist with property registration? <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>Yes, complete legal support is provided for registration and verification.</p>
              </div>
            </div>
            <div className={`faq-item ${faqOpenIndex === 3 ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(3)}>
                Do you handle family court matters? <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>Yes, including divorce, maintenance, custody, and settlement cases.</p>
              </div>
            </div>
            <div className={`faq-item ${faqOpenIndex === 4 ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(4)}>
                What documents are needed for initial consultation? <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>Bring any relevant documents related to your case – agreements, notices, certificates, or court papers. For general consultation, your ID proof and a brief written summary of the matter is helpful.</p>
              </div>
            </div>
            <div className={`faq-item ${faqOpenIndex === 5 ? "open" : ""}`}>
              <button className="faq-question" onClick={() => toggleFaq(5)}>
                Do you offer business registration services? <ChevronDown size={20} />
              </button>
              <div className="faq-answer">
                <p>Yes, we assist with proprietorship, partnership, LLP, and company registration along with MSME, trade license, and compliance documentation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-alt" id="contact">
        <div className="container">
          <div className="text-center reveal">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Contact Us</h2>
            <p className="section-desc">Book your consultation today – we're here to protect your rights</p>
          </div>
          <div className="contact-grid" style={{ marginTop: "3rem" }}>
            <div className="reveal">
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="icon"><Phone size={20} /></div>
                  <div><strong>Phone</strong><p><a href="tel:9003088794">90030 88794</a></p></div>
                </div>
                <div className="contact-card">
                  <div className="icon"><MessageCircle size={20} /></div>
                  <div><strong>WhatsApp</strong><p><a href="https://wa.me/919003088794" target="_blank" rel="noopener noreferrer">90030 88794</a></p></div>
                </div>
                <div className="contact-card">
                  <div className="icon"><Mail size={20} /></div>
                  <div><strong>Email</strong><p><a href="mailto:adv.syedimran@gmail.com">adv.syedimran@gmail.com</a></p></div>
                </div>
                <div className="contact-card">
                  <div className="icon"><MapPin size={20} /></div>
                  <div><strong>Office</strong><p>Tamil Nadu, India</p></div>
                </div>
              </div>
              <div className="map-wrap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.6600757985!2d77.35152645!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971eb1%3A0x2fcd670f3830b805!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" allowFullScreen loading="lazy" title="Office Location"></iframe>
              </div>
            </div>
            <form className="reveal" id="advocate-contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group"><label>Full Name *</label><input name="name" required placeholder="Your name" /></div>
              <div className="form-group"><label>Phone Number *</label><input name="phone" required placeholder="10-digit mobile" /></div>
              <div className="form-group"><label>Email</label><input name="email" type="email" placeholder="your@email.com" /></div>
              <div className="form-group"><label>Service Required</label>
                <select name="service">
                  <option value="">Select a service</option>
                  <option>Civil Cases</option>
                  <option>Criminal Cases</option>
                  <option>Property Registration</option>
                  <option>Family & Divorce</option>
                  <option>Certificate Attestation</option>
                  <option>Embassy Attestation</option>
                  <option>Business Registration</option>
                  <option>Legal Consultancy</option>
                  <option>Notary Services</option>
                  <option>Translation Services</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group"><label>Message</label><textarea name="message" rows={4} placeholder="Brief description of your legal matter"></textarea></div>
              <button type="submit" className="btn btn-gold" style={{ width: "100%" }}><Send size={18} /> Book Consultation</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo" style={{ marginBottom: "1rem" }}>
                <div className="logo-mark">SI</div>
                <div className="logo-text"><span>Adv. Farook Ahamed, B.A., B.L.,</span><small>Advocate & Legal Consultant</small></div>
              </div>
              <p className="footer-tagline">Your Rights. Our Responsibility.</p>
              <p style={{ color: "var(--gray-500)", fontSize: "0.9rem" }}>Advocate | Legal Consultant | Documentation & Attestation Services</p>
              <div className="social-links" style={{ marginTop: "1.25rem" }}>
                <a href="https://wa.me/919003088794" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
                <a href="tel:9003088794" aria-label="Phone"><Phone size={18} /></a>
                <a href="mailto:adv.syedimran@gmail.com" aria-label="Email"><Mail size={18} /></a>
              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={(e) => handleNavLinkClick(e, "home")}>Home</a></li>
                <li><a href="#about" onClick={(e) => handleNavLinkClick(e, "about")}>About</a></li>
                <li><a href="#practice" onClick={(e) => handleNavLinkClick(e, "practice")}>Practice Areas</a></li>
                <li><a href="#attestation" onClick={(e) => handleNavLinkClick(e, "attestation")}>Attestation Services</a></li>
                <li><a href="#embassy" onClick={(e) => handleNavLinkClick(e, "embassy")}>Embassy Services</a></li>
                <li><a href="#contact" onClick={(e) => handleNavLinkClick(e, "contact")}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#practice" onClick={(e) => handleNavLinkClick(e, "practice")}>Civil & Criminal Law</a></li>
                <li><a href="#practice" onClick={(e) => handleNavLinkClick(e, "practice")}>Property Registration</a></li>
                <li><a href="#attestation" onClick={(e) => handleNavLinkClick(e, "attestation")}>HRD Attestation</a></li>
                <li><a href="#embassy" onClick={(e) => handleNavLinkClick(e, "embassy")}>Embassy Services</a></li>
                <li><a href="#business" onClick={(e) => handleNavLinkClick(e, "business")}>Business Registration</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:9003088794">90030 88794</a></li>
                <li><a href="https://wa.me/919003088794">WhatsApp</a></li>
                <li><a href="/">Welcome Enterprises</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Adv. Farook Ahamed, B.A., B.L.,. All Rights Reserved.</span>
            <span>Committed to Justice. Dedicated to You.</span>
          </div>
        </div>
      </footer>

      {/* FLOAT BUTTONS */}
      <a href="tel:9003088794" className="call-float" aria-label="Call Now"><Phone size={24} /></a>
      <a href="https://wa.me/919003088794?text=Hello%20Adv.%20Syed%20Imran%2C%20I%20need%20legal%20assistance." className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={26} style={{ width: 26, height: 26 }} /></a>
    </div>
  );
}

export default Advocate;
