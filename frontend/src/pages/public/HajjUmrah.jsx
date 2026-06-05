import React from "react";
import { Link } from "react-router-dom";
import { Moon, Plane, Map, Stamp } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function HajjUmrah() {
  const { business } = useApp();

  return (
    <>
      <header className="page-header" style={{ background: "linear-gradient(135deg, var(--navy-900), rgba(45, 106, 79, 0.4))" }}>
        <div className="container">
          <h1>Hajj & <span style={{ color: "var(--gold-400)" }}>Umrah</span></h1>
          <p>ஹஜ் & உம்ரா – Sacred journey packages with complete assistance</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            <div className="service-card fade-in visible" style={{ borderColor: "var(--green-400)" }}>
              <div className="icon" style={{ background: "rgba(45, 106, 79, 0.2)", color: "var(--green-300)" }}>
                <Moon />
              </div>
              <h3>Hajj Booking</h3>
              <p>Complete Hajj package booking with group and individual options. Accommodation, transport, and guidance included.</p>
              <Link to="/contact" className="btn btn-green btn-sm" style={{ marginTop: "1rem" }}>
                Book Hajj
              </Link>
            </div>
            
            <div className="service-card fade-in visible">
              <div className="icon">
                <Plane />
              </div>
              <h3>Umrah Packages</h3>
              <p>Flexible Umrah packages – economy to premium. Hotel, visa, and ground transport arranged.</p>
              <Link to="/contact" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>
                View Packages
              </Link>
            </div>

            <div className="service-card fade-in visible">
              <div className="icon">
                <Map />
              </div>
              <h3>Travel Assistance</h3>
              <p>Flight booking, airport pickup, and on-ground support in Saudi Arabia.</p>
            </div>

            <div className="service-card fade-in visible">
              <div className="icon">
                <Stamp />
              </div>
              <h3>Visa Support</h3>
              <p>Complete visa documentation and application processing assistance.</p>
            </div>
          </div>

          <div style={{ marginTop: "3rem", padding: "2rem", background: "var(--navy-800)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gold-400)", textAlign: "center" }}>
            <h3 style={{ color: "var(--gold-400)", marginBottom: "0.5rem" }}>Plan Your Sacred Journey</h3>
            <p style={{ color: "var(--gray-400)", marginBottom: "1.5rem" }}>Contact us for customized Hajj & Umrah packages with transparent pricing</p>
            <a href={`https://wa.me/${business.whatsapp}?text=Hajj%20Umrah%20Enquiry`} className="btn btn-green" target="_blank" rel="noopener noreferrer">
              WhatsApp for Packages
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default HajjUmrah;
