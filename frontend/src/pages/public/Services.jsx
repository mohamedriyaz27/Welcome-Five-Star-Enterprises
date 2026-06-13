import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Globe, Scale, Building2, Plane } from "lucide-react";
import Seo from "../../components/common/Seo";

const serviceData = {
  documentation: { 
    icon: FileText, 
    items: [
      "EC - Encumbrance Certificate",
      "Copy of DOCUMENT",
      "E-Payment & Online TP",
      "LEGAL HEIR Certificate",
      "Notary Signature",
      "All MARRIAGE Registration",
      "SOCIETY & TRUST Registration",
      "Patta Chitta",
      "Document Scan & E-mail",
      "Income / Community Certificate"
    ] 
  },
 
  legal: { 
    icon: Scale, 
    items: [
      "Legal Opinion",
      "Sale Deed",
      "Trust Deed",
      "General Power of Attorney",
      "Settlement Deed",
      "Release Deed",
      "Partition Deed",
      "Partnership Deed",
      "Agreements",
      "Bank MOD Documentation",
      "Will Documentation"
    ] 
  },
  property: { 
    icon: Building2, 
    items: [
      "Land Buying & Selling",
      "House Buying & Selling",
      "Commercial Properties",
      "Real Estate Consultation",
      "Property Documentation",
      "Property Legal Verification"
    ] 
  },
  hajj: { 
    icon: Plane, 
    items: [
      "Hajj Booking",
      "Umrah Packages",
      "Travel Assistance",
      "Visa Support"
    ] 
  },
   online: { 
    icon: Globe, 
    items: [
      "Passport Renewal",
      "Motor & Health Insurance"
    ] 
  },
};

export function Services() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Services" },
    { id: "documentation", label: "Documentation" },
    { id: "online", label: "Online Services" },
    { id: "legal", label: "Legal" },
    { id: "property", label: "Property" },
    { id: "hajj", label: "Hajj & Umrah" },
  ];

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://welcomefivestarenterprises.in/services/#breadcrumb",
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
            "name": "Services",
            "item": "https://welcomefivestarenterprises.in/services"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Documentation & Legal Drafting Services",
        "description": "EC, Patta Chitta, Sale Deeds, GPAs, Trust Deeds, Agreements, and Notary signatures.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Welcome Enterprises"
        }
      },
      {
        "@type": "Service",
        "name": "Hajj & Umrah Tour Packages",
        "description": "Pilgrimage booking and complete visa and travel guidance.",
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
        title="Our Services"
        description="Comprehensive real estate consultation, documentation drafting, government online applications, and Hajj Umrah travel services."
        canonical="/services"
        schema={serviceListSchema}
      />
      <header className="page-header">
        <div className="container">
          <h1>Our <span style={{ color: "var(--gold-400)" }}>Services</span></h1>
          <p>Complete business solutions under one roof</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="tabs" id="service-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="card-grid" id="services-grid">
            {Object.entries(serviceData).map(([key, data]) => {
              if (activeTab !== "all" && activeTab !== key) return null;
              const Icon = data.icon;
              return data.items.map((item, idx) => (
                <div key={`${key}-${idx}`} className="service-card fade-in visible">
                  <div className="icon"><Icon /></div>
                  <h3>{item}</h3>
                  <p>Professional {key} service with expert assistance.</p>
                  <Link to="/contact" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>
                    Enquire
                  </Link>
                </div>
              ));
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
