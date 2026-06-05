import React from "react";
import { Link } from "react-router-dom";
import { CreditCard, Fingerprint, BookOpen, Car, HeartPulse, Monitor } from "lucide-react";

export function OnlineServices() {
  const services = [
    { title: "PAN Card", desc: "New PAN application, correction, and reprint services.", icon: CreditCard, btnText: "Apply Now" },
    { title: "Aadhaar Card", desc: "Aadhaar update, address change, and enrollment.", icon: Fingerprint, btnText: "Apply Now" },
    { title: "Passport Renewal", desc: "Passport application and renewal assistance.", icon: BookOpen, btnText: "Apply Now" },
    { title: "Motor Insurance", desc: "Two-wheeler, car, and commercial vehicle insurance.", icon: Car, btnText: "Get Quote" },
    { title: "Health Insurance", desc: "Individual and family health insurance plans.", icon: HeartPulse, btnText: "Get Quote" },
    { title: "TP Online Process", desc: "Town planning and municipal online applications.", icon: Monitor, btnText: "Enquire" }
  ];

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Online <span style={{ color: "var(--gold-400)" }}>Services</span></h1>
          <p>ஆன்லைன் சேவைகள் – Government & insurance services made easy</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="service-card fade-in visible">
                  <div className="icon"><Icon /></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link to="/contact" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>
                    {item.btnText}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default OnlineServices;
