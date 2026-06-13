import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, MessageCircle, Phone, Landmark, Gavel, Home as HomeIcon,
  FileText, Heart, Stamp, FileSignature, Briefcase, GraduationCap,
  Award, Baby, Shield, Building2, Globe, ChevronDown, FileCheck, Plane,
  Languages, ClipboardCheck, Lightbulb, Eye, Lock, Clock, Wallet, Zap, Route
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Seo from "../../components/common/Seo";

export function LegalServices() {
  const { business } = useApp();
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen((prev) => (prev === index ? null : index));
  };

  const legalServicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://welcomefivestarenterprises.in/legal-services/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://welcomefivestarenterprises.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Legal Services",
            "item": "https://welcomefivestarenterprises.in/legal-services"
          }
        ]
      },
      {
        "@type": "LegalService",
        "name": "Advocate Farook Ahamed & Associates Legal Consultancy",
        "description": "Professional advocates representing clients in civil, criminal, family disputes, notary attestation, and property documentation.",
        "url": "https://welcomefivestarenterprises.in/legal-services",
        "telephone": "+91-9003088794",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Taj Real Estate Office, Kundrathur Road",
          "addressLocality": "Chennai",
          "addressRegion": "TN",
          "postalCode": "600075",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <>
      <Seo 
        title="Legal Services & Advocates"
        description="Consult Adv. Farook Ahamed, B.A., B.L. & associates for civil cases, criminal defense, property registration, family court matters, and notary services."
        canonical="/legal-services"
        schema={legalServicesSchema}
      />
      <header className="advocate-banner">
        <div className="container advocate-banner-grid">
          <div>
            <span className="advocate-badge">Advocate · High Court · District Court</span>
            <h1 style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0 }}>
              <span style={{ display: "block", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, margin: "0.67em 0" }}>Adv. Farook Ahamed, B.A., B.L.,</span>
              <span style={{ display: "block", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, margin: "0.67em 0" }}>Adv. K. Venkatesh MBA., L.L.B.,</span>
              <span style={{ display: "block", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, margin: "0.67em 0" }}>Adv. A. Mohammed Ansarullah M.B.A., ML.,</span>
            </h1>
            <p className="sub">Advocate | High Court | District Court</p>
            <p className="quote">"Committed to Justice. Dedicated to You."</p>
            <p style={{ color: "var(--gray-300)", maxWidth: "600px", marginBottom: "1.5rem" }}>
              Dedicated advocates providing legal services in civil, criminal, property, documentation, family matters, attestation services, embassy services, and legal consultancy with a commitment to justice, transparency, and client satisfaction.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link to="/contact" className="btn btn-primary"><Calendar style={{ width: 16, height: 16, marginRight: 6 }} /> Book Consultation</Link>
              <a href={`https://wa.me/${business.whatsapp}`} className="btn btn-green" target="_blank" rel="noopener noreferrer">
                <MessageCircle style={{ width: 16, height: 16, marginRight: 6 }} /> WhatsApp Now
              </a>
              <a href={`tel:${business.phones[0]}`} className="btn btn-outline"><Phone style={{ width: 16, height: 16, marginRight: 6 }} /> Call Now</a>
              <a href="https://wa.me/919003088794?text=Hello%20Advocate" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Full Advocate Details</a>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "180px", height: "180px", border: "2px solid var(--gold-400)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: "3rem", color: "var(--gold-400)", background: "rgba(201,162,39,0.1)" }}>⚖</div>
            <p style={{ marginTop: "1rem", color: "var(--gray-400)", fontSize: "0.9rem" }}>{business.phones[0].slice(0, 5)} {business.phones[0].slice(5)}</p>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="section-block" id="about-advocate">
        <div className="container contact-grid">
          <div>
            <h2 className="section-title">About <span>The Advocate</span></h2>
            <p style={{ color: "var(--gray-300)", marginBottom: "1rem" }}>Dedicated legal professional providing reliable legal guidance and representation across civil, criminal, family, property, and documentation matters.</p>
            <p style={{ color: "var(--gray-400)" }}>Focused on delivering practical legal solutions while protecting client rights and interests.</p>
          </div>
          <div className="why-mini">
            <div className="why-mini-item"><Landmark /><strong>High Court</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>Experienced practice</p></div>
            <div className="why-mini-item"><Shield /><strong>District Court</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>Full representation</p></div>
            <div className="why-mini-item"><Globe /><strong>Embassy Services</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>GCC & international</p></div>
            <div className="why-mini-item"><Stamp /><strong>Attestation</strong><p style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>HRD & MEA</p></div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="section-block alt" id="practice">
        <div className="container">
          <h2 className="section-title">Practice <span>Areas</span></h2>
          <p className="section-subtitle">Comprehensive legal services across all major domains</p>
          <div className="card-grid" style={{ marginTop: "2rem" }}>
            <div className="service-card fade-in visible">
              <div className="icon"><Landmark /></div>
              <h3>Civil Cases</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Property disputes", "Recovery suits", "Injunction matters", "Contract disputes", "Consumer cases"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Gavel /></div>
              <h3>Criminal Cases</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Bail petitions", "Criminal defense", "Quash petitions", "Trial matters", "Legal representation"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><HomeIcon /></div>
              <h3>Property Registration</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Sale deed registration", "Settlement deeds", "Gift deeds", "Property verification", "Legal opinions"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><FileText /></div>
              <h3>Documentation Work</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Affidavits", "Agreements", "Power of Attorney", "Legal notices", "Will preparation"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Heart /></div>
              <h3>Family & Divorce Cases</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Divorce petitions", "Child custody", "Maintenance cases", "Mutual consent divorce", "Family settlements"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Stamp /></div>
              <h3>Notary Services</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Notary attestation", "Oath administration", "Affidavit notarization", "Document certification"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><FileSignature /></div>
              <h3>Sale Deed & Legal Deeds</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Sale Deed", "Trust Deed", "GPA / Settlement / Release", "Partition & Partnership Deed", "Bank MOD & Will"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Briefcase /></div>
              <h3>Legal Consultancy</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Legal opinion & advice", "Court case consultation", "Property legal verification", "Marriage registration", "End-to-end legal support"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATE ATTESTATION */}
      <section className="section-block" id="attestation">
        <div className="container">
          <h2 className="section-title">Certificate Attestation & <span>HRD Services</span></h2>
          <p className="section-subtitle">Complete assistance for educational, personal, and professional certificates</p>
          <div className="attest-grid">
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
          <h3 style={{ marginTop: "2.5rem", color: "var(--gold-400)", fontSize: "1.1rem" }}>Government Departments</h3>
          <div className="attest-grid" style={{ maxWidth: "700px" }}>
            <div className="attest-chip"><Building2 /> HRD</div>
            <div className="attest-chip"><Building2 /> Home Department</div>
            <div className="attest-chip"><Globe /> External Affairs</div>
            <div className="attest-chip"><Shield /> Embassy Attestation</div>
          </div>
          <h3 style={{ marginTop: "2rem", color: "var(--gold-400)", fontSize: "1.1rem" }}>Coverage States</h3>
          <div className="state-tags">
            <span className="state-tag">Tamil Nadu</span><span class="state-tag">Kerala</span><span class="state-tag">Karnataka</span>
            <span className="state-tag">Andhra Pradesh</span><span class="state-tag">Puducherry</span><span class="state-tag">Maharashtra</span>
          </div>
        </div>
      </section>

      {/* EMBASSY */}
      <section className="section-block alt" id="embassy">
        <div className="container">
          <h2 className="section-title">Embassy & <span>International Services</span></h2>
          <div className="card-grid" style={{ marginTop: "2rem" }}>
            <div className="service-card fade-in visible">
              <div className="icon"><Shield /></div>
              <h3>Embassy Attestation</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["UAE · Saudi Arabia · Kuwait", "Oman · Bahrain · Qatar", "Europe", "Other GCC Countries"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Plane /></div>
              <h3>Visa Documentation</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Employment Visa Documents", "Family Visa Documents", "Educational Documents", "Commercial Documents"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Languages /></div>
              <h3>Translation Services</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Arabic Translation", "English Translation", "Multilingual Translation", "Certified Translation"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section className="section-block" id="business">
        <div className="container">
          <h2 className="section-title">Business & <span>Registration Services</span></h2>
          <div className="card-grid" style={{ marginTop: "2rem" }}>
            <div className="service-card fade-in visible">
              <div className="icon"><Building2 /></div>
              <h3>Business Registration</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Proprietorship Registration", "Partnership Registration", "LLP Registration", "Company Registration"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><ClipboardCheck /></div>
              <h3>Compliance Services</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["MSME Registration", "Trade License", "Professional Tax", "Business Documentation"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="service-card fade-in visible">
              <div className="icon"><Lightbulb /></div>
              <h3>Consultancy Services</h3>
              <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0 }}>
                {["Overseas Education Consultancy", "Marriage Registration Assistance", "Certificate Verification", "Legal Documentation Support"].map((li, idx) => (
                  <li key={idx} style={{ color: "var(--gray-400)", fontSize: "0.88rem", padding: "0.2rem 0" }}>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-block alt">
        <div className="container">
          <h2 className="section-title text-center" style={{ textAlign: "center" }}>Why <span>Choose Us</span></h2>
          <div className="why-mini" style={{ marginTop: "2rem" }}>
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

      {/* PROCESS */}
      <section className="section-block">
        <div className="container">
          <h2 className="section-title text-center" style={{ textAlign: "center" }}>Our Working <span>Process</span></h2>
          <div className="stats-grid" style={{ marginTop: "2rem" }}>
            <div className="stat-card"><div className="number" style={{ fontSize: "1.5rem" }}>01</div><div className="label">Initial Consultation</div></div>
            <div className="stat-card"><div className="number" style={{ fontSize: "1.5rem" }}>02</div><div className="label">Document Verification</div></div>
            <div className="stat-card"><div className="number" style={{ fontSize: "1.5rem" }}>03</div><div className="label">Legal Review</div></div>
            <div className="stat-card"><div className="number" style={{ fontSize: "1.5rem" }}>04</div><div className="label">Filing & Processing</div></div>
            <div className="stat-card"><div className="number" style={{ fontSize: "1.5rem" }}>05</div><div className="label">Updates & Follow-up</div></div>
            <div className="stat-card"><div className="number" style={{ fontSize: "1.5rem" }}>06</div><div className="label">Successful Completion</div></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-block alt" id="faq">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="section-title text-center" style={{ textAlign: "center" }}>Frequently Asked <span>Questions</span></h2>
          <div style={{ marginTop: "2rem" }} id="faq-list">
            {[
              { q: "How long does certificate attestation take?", a: "Processing time depends on the certificate type and destination country." },
              { q: "Do you provide embassy attestation?", a: "Yes, we provide complete embassy attestation assistance for GCC and other countries." },
              { q: "Can you assist with property registration?", a: "Yes, complete legal support is provided for registration and verification." },
              { q: "Do you handle family court matters?", a: "Yes, including divorce, maintenance, custody, and settlement cases." }
            ].map((faq, index) => (
              <div key={index} className={`faq-item-l ${faqOpen === index ? "open" : ""}`}>
                <button className="faq-q" onClick={() => toggleFaq(index)}>
                  {faq.q} <ChevronDown style={{ width: 16, height: 16, transform: faqOpen === index ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section-block">
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--gold-400)", marginBottom: "0.5rem" }}>Your Rights. Our Responsibility.</p>
          <p style={{ color: "var(--gray-400)", marginBottom: "1.5rem" }}>Advocate | Legal Consultant | Documentation & Attestation Services</p>
          <p style={{ marginBottom: "1.5rem" }}><strong>Phone:</strong> <a href={`tel:${business.phones[0]}`} style={{ color: "var(--gold-400)" }}>{business.phones[0].slice(0, 5)} {business.phones[0].slice(5)}</a> · <strong>WhatsApp:</strong> <a href={`https://wa.me/${business.whatsapp}`} style={{ color: "var(--gold-400)" }}>{business.phones[0].slice(0, 5)} {business.phones[0].slice(5)}</a></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <a href="https://wa.me/919003088794?text=Hello%20Advocate" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Advocate Details</a>
          </div>
          <div className="map-container" style={{ marginTop: "2.5rem", maxWidth: "800px", marginInline: "auto" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.702223026542!2d80.0993153735894!3d12.990887914458124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52613126e7ec65%3A0x3fd801522cc1bdef!2sWelcome%20Enterprises!5e0!3m2!1sen!2sin!4v1780422949730!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Welcome Enterprises Map Detail"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default LegalServices;
