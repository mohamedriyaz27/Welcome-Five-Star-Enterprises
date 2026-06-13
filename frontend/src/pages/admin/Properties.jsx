import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, Search, Star, MapPin, X } from "lucide-react";
import { useAlert } from "../../context/AlertContext";
import propertyService from "../../services/propertyService";

export function Properties() {
  const { showAlert, showConfirm } = useAlert();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [locations, setLocations] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null); // null for create, property object for edit

  // Form State
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    priceLabel: "",
    area: "",
    type: "house",
    status: "active",
    featured: false,
    imageUrl: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Load properties
  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
      setFilteredProperties(data);
      
      // Extract unique locations for filter
      const uniqueLocs = [...new Set(data.map((p) => p.location))].filter(Boolean);
      setLocations(uniqueLocs);
    } catch (err) {
      console.error("Error loading properties:", err);
      showAlert("Failed to load properties list", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...properties];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
      );
    }

    if (filterType) {
      result = result.filter((p) => p.type === filterType);
    }

    if (filterLocation) {
      result = result.filter((p) => p.location === filterLocation);
    }

    setFilteredProperties(result);
  }, [searchTerm, filterType, filterLocation, properties]);

  // Open modal for Create
  const handleCreateOpen = () => {
    setCurrentProperty(null);
    setForm({
      title: "",
      description: "",
      location: "",
      price: "",
      priceLabel: "",
      area: "",
      type: "house",
      status: "active",
      featured: false,
      imageUrl: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEditOpen = (property) => {
    setCurrentProperty(property);
    setForm({
      title: property.title || "",
      description: property.description || "",
      location: property.location || "",
      price: property.price || "",
      priceLabel: property.priceLabel || "",
      area: property.area || "",
      type: property.type || "house",
      status: property.status || "active",
      featured: property.featured || false,
      imageUrl: property.image || "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.location.trim()) errors.location = "Location is required";
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) {
      errors.price = "Valid non-negative price is required";
    }
    if (!form.type) errors.type = "Property type is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      price: Number(form.price),
      priceLabel: form.priceLabel || undefined,
      area: form.area,
      type: form.type,
      status: form.status,
      featured: form.featured,
      images: form.imageUrl.trim() ? [{ url: form.imageUrl.trim(), alt: form.title }] : [],
    };

    try {
      if (currentProperty) {
        // Update
        const res = await propertyService.updateProperty(currentProperty.id, payload);
        if (res.success) {
          showAlert("Property updated successfully!", "success");
        } else {
          showAlert(res.message || "Failed to update property", "error");
        }
      } else {
        // Create
        const res = await propertyService.createProperty(payload);
        if (res.success) {
          showAlert("Property added successfully!", "success");
        } else {
          showAlert(res.message || "Failed to add property", "error");
        }
      }
      setIsModalOpen(false);
      loadProperties();
    } catch (err) {
      showAlert(err.message || "Something went wrong while saving", "error");
    }
  };

  // Delete Property
  const handleDelete = (id) => {
    showConfirm("Are you sure you want to delete this property?", async () => {
      try {
        const res = await propertyService.deleteProperty(id);
        if (res.success) {
          showAlert("Property deleted successfully", "success");
          loadProperties();
        } else {
          showAlert(res.message || "Failed to delete property", "error");
        }
      } catch (err) {
        showAlert(err.message || "Error deleting property", "error");
      }
    });
  };

  // Quick toggle featured status
  const handleToggleFeatured = async (property) => {
    try {
      const updatedFeatured = !property.featured;
      const res = await propertyService.updateProperty(property.id, {
        title: property.title,
        location: property.location,
        price: property.price,
        type: property.type,
        featured: updatedFeatured,
      });

      if (res.success) {
        showAlert(
          `Property ${updatedFeatured ? "marked as Featured" : "removed from Featured"}`,
          "success"
        );
        loadProperties();
      } else {
        showAlert(res.message || "Failed to toggle featured status", "error");
      }
    } catch (err) {
      showAlert(err.message || "Error toggling featured status", "error");
    }
  };

  const formatPrice = (n) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <>
      <div className="admin-header no-print">
        <div>
          <h1>Property Management</h1>
          <p style={{ color: "var(--gray-400)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
            Add, update, or remove real estate listings
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateOpen}>
          <Plus style={{ width: 18, height: 18 }} /> Add Property
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card no-print">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          {/* Search */}
          <div style={{ flex: 2, minWidth: "250px", position: "relative" }}>
            <input
              type="text"
              placeholder="Search properties by title, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 1rem 0.65rem 2.5rem",
                background: "var(--navy-900)",
                border: "1px solid var(--navy-600)",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Search
              style={{
                position: "absolute",
                left: "0.85rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--gray-400)",
                width: 16,
                height: 16,
              }}
            />
          </div>

          {/* Filter Type */}
          <div style={{ flex: 1, minWidth: "150px" }}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 1rem",
                background: "var(--navy-900)",
                border: "1px solid var(--navy-600)",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </select>
          </div>

          {/* Filter Location */}
          <div style={{ flex: 1, minWidth: "150px" }}>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 1rem",
                background: "var(--navy-900)",
                border: "1px solid var(--navy-600)",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Property List Table */}
      <div className="admin-card">
        {loading ? (
          <p style={{ color: "var(--gold-400)", textAlign: "center", padding: "2rem" }}>
            Loading properties list...
          </p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th style={{ textAlign: "center" }}>Featured</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--gray-500)" }}>
                      No properties found matching filters
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((p) => (
                    <tr key={p.id}>
                      <td style={{ width: "80px", padding: "0.5rem 1rem" }}>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: "60px",
                            height: "45px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            border: "1px solid var(--navy-600)",
                          }}
                        />
                      </td>
                      <td style={{ fontWeight: "600" }}>
                        {p.title}
                        {p.area && (
                          <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", fontWeight: "normal" }}>
                            {p.area}
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          <MapPin style={{ width: 12, height: 12, color: "var(--gold-400)" }} />
                          {p.location}
                        </span>
                      </td>
                      <td style={{ textTransform: "capitalize" }}>{p.type}</td>
                      <td style={{ color: "var(--gold-400)", fontWeight: "600" }}>
                        {formatPrice(p.price)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: p.featured ? "var(--gold-400)" : "var(--gray-500)",
                            padding: "0.25rem",
                            transition: "transform 0.2s",
                          }}
                          className="featured-toggle-btn"
                          title={p.featured ? "Remove from Featured" : "Mark as Featured"}
                        >
                          <Star style={{ width: 18, height: 18, fill: p.featured ? "var(--gold-400)" : "none" }} />
                        </button>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleEditOpen(p)}
                            style={{ padding: "0.4rem" }}
                            title="Edit"
                          >
                            <Edit style={{ width: 14, height: 14 }} />
                          </button>
                          <button
                            className="btn btn-sm"
                            onClick={() => handleDelete(p.id)}
                            style={{ padding: "0.4rem", background: "rgba(220, 38, 38, 0.15)", color: "#f87171", border: "1px solid rgba(220, 38, 38, 0.3)" }}
                            title="Delete"
                          >
                            <Trash style={{ width: 14, height: 14 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Property Editor Modal */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "650px" }}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X style={{ width: 20, height: 20 }} />
            </button>
            <h3>{currentProperty ? "Edit Property Listing" : "Add New Property"}</h3>
            
            <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
              <div className="form-group">
                <label>Property Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 3 BHK Luxury Villa"
                  required
                />
                {formErrors.title && <span style={{ color: "#f87171", fontSize: "0.8rem" }}>{formErrors.title}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Chennai"
                    required
                  />
                  {formErrors.location && <span style={{ color: "#f87171", fontSize: "0.8rem" }}>{formErrors.location}</span>}
                </div>

                <div className="form-group">
                  <label>Area / Size</label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g. 1800 sq.ft or 2 Acres"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (INR) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. 7500000"
                    required
                  />
                  {formErrors.price && <span style={{ color: "#f87171", fontSize: "0.8rem" }}>{formErrors.price}</span>}
                </div>

                <div className="form-group">
                  <label>Price Label (Optional)</label>
                  <input
                    type="text"
                    value={form.priceLabel}
                    onChange={(e) => setForm({ ...form, priceLabel: e.target.value })}
                    placeholder="e.g. ₹75 L or Negotiable"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Property Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="house">House</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="active">Active / Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Enter property highlights, amenities, road access, etc."
                ></textarea>
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: "auto", cursor: "pointer" }}
                />
                <label htmlFor="featured-checkbox" style={{ margin: 0, cursor: "pointer", userSelect: "none" }}>
                  Show on Homepage as Featured Property
                </label>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {currentProperty ? "Save Changes" : "Create Listing"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Properties;
