import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { useAlert } from "../../context/AlertContext";
import propertyService from "../../services/propertyService";
import inquiryService from "../../services/inquiryService";
import Seo from "../../components/common/Seo";

export function Properties() {
  const { showAlert } = useAlert();
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  
  // Filter States
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterType, setFilterType] = useState("");

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", message: "" });
  const [enquiryStatus, setEnquiryStatus] = useState({ success: null, message: "" });

  // Load properties
  useEffect(() => {
    async function fetchProperties() {
      const data = await propertyService.getProperties();
      setProperties(data);

      // Populate unique locations
      const uniqueLocs = [...new Set(data.map((p) => p.location))];
      setLocations(uniqueLocs);
    }
    fetchProperties();
  }, []);

  // Compute filtered properties on demand during render to prevent cascading state update renders
  const filteredProperties = properties.filter((p) => {
    if (filterLocation && p.location !== filterLocation) return false;
    if (filterType && p.type !== filterType) return false;
    if (filterBudget) {
      const maxBudget = parseInt(filterBudget, 10);
      if (p.price > maxBudget) return false;
    }
    return true;
  });

  // Format price helper
  const formatPrice = (n) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  // Inquiry Submission Handler
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) {
      setEnquiryStatus({ success: false, message: "Name and phone are required" });
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

  const propertiesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://welcomefivestarenterprises.in/properties/#breadcrumb",
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
            "name": "Properties",
            "item": "https://welcomefivestarenterprises.in/properties"
          }
        ]
      },
      {
        "@type": "RealEstateAgent",
        "name": "Taj Real Estate",
        "description": "Taj Real Estate offers premium lands, homes, and commercial properties for buying and selling in Chennai and Tamil Nadu.",
        "telephone": "+91-9003088794",
        "priceRange": "$$"
      }
    ]
  };

  return (
    <>
      <Seo 
        title="Featured Properties & Land Listings"
        description="Browse premium real estate, land layouts, homes, and commercial properties for buying and selling in Chennai and surrounding districts."
        canonical="/properties"
        schema={propertiesSchema}
      />
      <header className="page-header">
        <div className="container">
          <h1>Property <span style={{ color: "var(--gold-400)" }}>Listings</span></h1>
          <p>Find your dream property with expert guidance</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="filters-bar">
            <select 
              id="filter-location" 
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select 
              id="filter-budget" 
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
            >
              <option value="">Any Budget</option>
              <option value="2000000">Under ₹20 Lakh</option>
              <option value="5000000">Under ₹50 Lakh</option>
              <option value="10000000">Under ₹1 Crore</option>
              <option value="999999999">Any Price</option>
            </select>

            <select 
              id="filter-type" 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="card-grid" id="property-grid">
            {filteredProperties.length === 0 ? (
              <p className="section-subtitle">No properties match your filters.</p>
            ) : (
              filteredProperties.map((p) => (
                <article key={p.id} className="property-card fade-in visible">
                  <img 
                    src={p.image} 
                    alt={`${p.title} - Taj Real Estate Listing`} 
                    width="400" 
                    height="220" 
                    style={{ width: "100%", height: "220px", objectFit: "cover" }} 
                    loading="lazy" 
                  />
                  <div className="body">
                    <div className="price">{formatPrice(p.price)}</div>
                    <h3>{p.title}</h3>
                    <div className="location">
                      <MapPin style={{ width: 14, height: 14, marginRight: 4 }} /> {p.location} · {p.area}
                    </div>
                    <div className="property-tags">
                      <span className="tag">{p.type}</span>
                      {p.featured && (
                        <span className="tag" style={{ background: "rgba(201,162,39,0.2)", color: "var(--gold-400)" }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--gray-400)", marginBottom: "1rem" }}>{p.description}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => setSelectedProperty(p)}>
                      View Details
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Property Modal */}
      {selectedProperty && (
        <div className="modal-overlay active" onClick={() => setSelectedProperty(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProperty(null)}>&times;</button>
            <h3 id="modal-title">{selectedProperty.title}</h3>
            <div id="modal-body">
              <img 
                 src={selectedProperty.image} 
                 alt={`${selectedProperty.title} - Detailed Property View`} 
                 width="500" 
                 height="375" 
                 style={{ borderRadius: "12px", marginBottom: "1rem", width: "100%", height: "auto", objectFit: "cover" }} 
              />
              <p><strong>Price:</strong> {formatPrice(selectedProperty.price)}</p>
              <p><strong>Location:</strong> {selectedProperty.location}</p>
              <p><strong>Area:</strong> {selectedProperty.area}</p>
              <p><strong>Type:</strong> {selectedProperty.type}</p>
              <p style={{ marginTop: "0.75rem" }}>{selectedProperty.description}</p>
              
              <form id="property-enquiry" style={{ marginTop: "1.5rem" }} onSubmit={handleEnquirySubmit}>
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

export default Properties;
