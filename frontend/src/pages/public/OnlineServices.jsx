import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Car, HeartPulse, Monitor } from "lucide-react";
import Seo from "../../components/common/Seo";

export function OnlineServices() {
  const services = [
    { title: "Passport Renewal", desc: "Passport application and renewal assistance.", icon: BookOpen, btnText: "Apply Now" },
    { title: "Motor Insurance", desc: "Two-wheeler, car, and commercial vehicle insurance.", icon: Car, btnText: "Get Quote" },
    { title: "Health Insurance", desc: "Individual and family health insurance plans.", icon: HeartPulse, btnText: "Get Quote" },
    { title: "TP Online Process", desc: "Town planning and municipal online applications.", icon: Monitor, btnText: "Enquire" }
  ];

  const onlineServicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://welcomefivestarenterprises.in/online-services/#breadcrumb",
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
            "name": "Online Services",
            "item": "https://welcomefivestarenterprises.in/online-services"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "PAN Card Registration & Correction",
        "description": "Apply for new PAN card, process reprint, and handle address/name corrections online.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Welcome Enterprises"
        }
      },
      {
        "@type": "Service",
        "name": "Aadhaar Card Update Assistance",
        "description": "Help with biometric updates, address changes, demographic correction services.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Welcome Enterprises"
        }
      }
    ]
  };

  return (
    <>
      <Seo 
        title="Online Government Services"
        description="Fast and reliable assistance for PAN Card, Aadhaar Card updates, Passport renewal, and Motor & Health Insurance policies in Tamil Nadu."
        canonical="/online-services"
        schema={onlineServicesSchema}
      />
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
