import React, { useState } from "react";
import { User, Phone, MessageCircle, MapPin } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useAlert } from "../../context/AlertContext";
import inquiryService from "../../services/inquiryService";
import Seo from "../../components/common/Seo";

export function Contact() {
  const { business } = useApp();
  const { showAlert } = useAlert();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Documentation", message: "" });
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [status, setStatus] = useState({ success: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = !form.name.trim();
    const phoneErr = !form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10));

    setErrors({ name: nameErr, phone: phoneErr });
    if (nameErr || phoneErr) return;

    const payload = {
      customerName: form.name,
      mobile: form.phone,
      email: form.email || null,
      message: form.message || "",
      serviceType: form.service.toLowerCase().replace(" & ", "-").replace(" ", "-"),
    };

    try {
      const res = await inquiryService.submitInquiry(payload);
      if (res.success) {
        showAlert("Thank you! Your inquiry has been submitted. We will contact you shortly.", "success");
        setForm({ name: "", phone: "", email: "", service: "Documentation", message: "" });
        setStatus({ success: true, message: "" });
      } else {
        setStatus({ success: false, message: res.message || "Failed to submit inquiry" });
      }
    } catch (err) {
      setStatus({ success: false, message: err.message || "Something went wrong" });
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://welcomefivestarenterprises.in/contact/#breadcrumb",
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
            "name": "Contact Us",
            "item": "https://welcomefivestarenterprises.in/contact"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://welcomefivestarenterprises.in/#localbusiness",
        "name": "Welcome Enterprises & Taj Real Estate",
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
        title="Contact Us - Support & Inquiries"
        description="Get in touch with Welcome Enterprises & Taj Real Estate in Chennai for registration advice, legal assistance, property deals, or attestation inquiries."
        canonical="/contact"
        schema={contactSchema}
      />
      <header className="page-header">
        <div className="container">
          <h1>Contact <span style={{ color: "var(--gold-400)" }}>Us</span></h1>
          <p>தொடர்பு கொள்ளுங்கள் – We're here to help</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="contact-info-card fade-in visible">
              <div className="icon"><User /></div>
              <div>
                <strong>Proprietor</strong>
                <p>{business.owner}</p>
              </div>
            </div>
            
            <div className="contact-info-card fade-in visible">
              <div className="icon"><Phone /></div>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={`tel:${business.phones[0]}`}>{business.phones[0].slice(0,5)} {business.phones[0].slice(5)}</a> ·{" "}
                  <a href={`tel:${business.phones[1]}`}>{business.phones[1].slice(0,5)} {business.phones[1].slice(5)}</a>
                </p>
              </div>
            </div>

            <div className="contact-info-card fade-in visible">
              <div className="icon"><MessageCircle /></div>
              <div>
                <strong>WhatsApp</strong>
                <p>
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </p>
              </div>
            </div>

            <div className="contact-info-card fade-in visible">
              <div className="icon"><MapPin /></div>
              <div>
                <strong>Location</strong>
                <p>{business.address}</p>
              </div>
            </div>

            <form id="contact-form" style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
              <div className={`form-group ${errors.name ? "invalid" : ""}`}>
                <label htmlFor="contact-name">Name *</label>
                <input 
                  id="contact-name"
                  name="name" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required 
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                <span className="error">Required</span>
              </div>
              
              <div className={`form-group ${errors.phone ? "invalid" : ""}`}>
                <label htmlFor="contact-phone">Phone *</label>
                <input 
                  id="contact-phone"
                  name="phone" 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required 
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                <span className="error">Valid phone required</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input 
                  id="contact-email"
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-service">Service Needed</label>
                <select 
                  id="contact-service"
                  name="service" 
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="Documentation">Documentation</option>
                  <option value="Legal Services">Legal Services</option>
                  <option value="Property">Property</option>
                  <option value="Online Services">Online Services</option>
                  <option value="Hajj & Umrah">Hajj & Umrah</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea 
                  id="contact-message"
                  name="message" 
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Send Inquiry</button>
              {status.success === false && <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>{status.message}</p>}
            </form>
          </div>

          <div>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.702223026542!2d80.0993153735894!3d12.990887914458124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52613126e7ec65%3A0x3fd801522cc1bdef!2sWelcome%20Enterprises!5e0!3m2!1sen!2sin!4v1780422949730!5m2!1sen!2sin" 
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Welcome Enterprises Main Map"
              ></iframe>
            </div>
            
            <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href={`tel:${business.phones[0]}`} className="btn btn-primary"><Phone style={{ width: 16, height: 16, marginRight: 6 }} /> Call Now</a>
              <a href={`https://wa.me/${business.whatsapp}`} className="btn btn-green" target="_blank" rel="noopener noreferrer">
                <MessageCircle style={{ width: 16, height: 16, marginRight: 6 }} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
