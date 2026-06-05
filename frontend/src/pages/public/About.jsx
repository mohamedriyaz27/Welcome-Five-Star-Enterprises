import React from "react";
import { Link } from "react-router-dom";
import { Award, Target, CheckCircle, Scale, Briefcase, Gavel } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function About() {
  const { t } = useApp();

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>About <span style={{ color: "var(--gold-400)" }}>Us</span></h1>
          <p>Your trusted partner for real estate, legal & documentation excellence</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div className="fade-in visible">
            <h2 className="section-title">WELCOME ENTERPRISES – <span>TAJ REAL ESTATE</span></h2>
            <p style={{ color: "var(--gray-300)", marginBottom: "1rem" }}>
              We are a premier business enterprise offering integrated services across real estate, legal documentation, government online services, insurance, and Hajj & Umrah travel assistance.
            </p>
            <p style={{ color: "var(--gray-400)", marginBottom: "1rem" }}>
              Under the leadership of <strong style={{ color: "var(--gold-400)" }}>S.T. Syed Imran, M.A.</strong>, we have built a reputation for integrity, accuracy, and customer-first service delivery across Tamil Nadu.
            </p>
            <div className="contact-info-card">
              <div className="icon"><Award /></div>
              <div>
                <strong>Our Mission</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--gray-400)" }}>
                  To provide seamless, professional, and affordable solutions for every documentation, property, and legal need.
                </p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="icon"><Target /></div>
              <div>
                <strong>Our Vision</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--gray-400)" }}>
                  To be the most trusted one-stop corporate service platform in South India.
                </p>
              </div>
            </div>
          </div>
          <div className="fade-in visible" style={{ background: "var(--navy-800)", borderRadius: "var(--radius-lg)", padding: "2rem", border: "1px solid var(--navy-600)" }}>
            <h3 style={{ color: "var(--gold-400)", marginBottom: "1.5rem" }}>Why Choose Us?</h3>
            <ul style={{ color: "var(--gray-300)", listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <CheckCircle style={{ color: "var(--green-400)", width: 20, height: 20 }} /> 15+ Years Combined Experience
              </li>
              <li style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <CheckCircle style={{ color: "var(--green-400)", width: 20, height: 20 }} /> Licensed & Professional Team
              </li>
              <li style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <CheckCircle style={{ color: "var(--green-400)", width: 20, height: 20 }} /> Transparent Pricing
              </li>
              <li style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <CheckCircle style={{ color: "var(--green-400)", width: 20, height: 20 }} /> Fast Turnaround Time
              </li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <CheckCircle style={{ color: "var(--green-400)", width: 20, height: 20 }} /> English & Tamil Support
              </li>
            </ul>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}>
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-gradient-alt">
        <div className="container">
          <h2 className="section-title">Advocate & <span>Legal Consultants</span></h2>
          <p className="section-subtitle">Professional legal experts at your service</p>
          <div className="card-grid">
            <div className="advocate-card fade-in visible">
              <div className="advocate-avatar"><Scale /></div>
              <h3>Adv. Legal Consultant</h3>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>Property Law & Sale Deeds</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>15+ years experience</p>
            </div>
            <div className="advocate-card fade-in visible">
              <div className="advocate-avatar"><Briefcase /></div>
              <h3>Senior Documentation Expert</h3>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>Agreements & MOD Documentation</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>Bank & Trust Deeds specialist</p>
            </div>
            <div className="advocate-card fade-in visible">
              <div className="advocate-avatar"><Gavel /></div>
              <h3>Court Documentation Advisor</h3>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>Court Case & Legal Opinion</p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>Civil & property matters</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
