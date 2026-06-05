let allProperties = [];

async function loadProperties() {
  const isHome = !!document.getElementById("home-property-grid");
  const baseUrl = window.API_BASE_URL || "http://localhost:5000/api";
  const url = isHome ? "/properties/featured" : "/properties";

  try {
    const res = await fetch(`${baseUrl}${url}`);
    const json = await res.json();
    if (json.success) {
      // API might return paginated { items, total } or straight array
      allProperties = json.data.items || json.data;
    } else {
      allProperties = getDefaultProperties();
    }
  } catch (err) {
    allProperties = getDefaultProperties();
  }

  // Normalize API models to frontend property objects
  allProperties = allProperties.map(p => ({
    id: p._id || p.id,
    title: p.title,
    location: p.location,
    type: p.type,
    price: p.price,
    area: p.area || "",
    image: (p.images && p.images[0]?.url) || p.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    description: p.description || "",
    featured: p.featured || false
  }));

  renderProperties(allProperties);
  populateFilters();
}

function getDefaultProperties() {
  return [
    {
      id: 1,
      title: "3 BHK Independent House",
      location: "Chennai",
      type: "house",
      price: 8500000,
      area: "1800 sq.ft",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
      description: "Spacious 3 BHK with modern amenities, near main road.",
      featured: true,
    },
    {
      id: 2,
      title: "Commercial Shop Space",
      location: "Madurai",
      type: "commercial",
      price: 4500000,
      area: "800 sq.ft",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      description: "Prime commercial location with high footfall.",
      featured: true,
    },
    {
      id: 3,
      title: "Agricultural Land – 2 Acres",
      location: "Trichy",
      type: "land",
      price: 3200000,
      area: "2 Acres",
      image: "https://images.unsplash.com/photo-1500382017468-904fcfed447f?w=600&q=80",
      description: "Fertile land with clear title and road access.",
      featured: false,
    },
    {
      id: 4,
      title: "2 BHK Apartment",
      location: "Coimbatore",
      type: "house",
      price: 5200000,
      area: "1100 sq.ft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      description: "Gated community apartment with parking.",
      featured: true,
    },
    {
      id: 5,
      title: "Office Space – IT Park",
      location: "Chennai",
      type: "commercial",
      price: 12000000,
      area: "2500 sq.ft",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      description: "Fully furnished office in IT corridor.",
      featured: false,
    },
    {
      id: 6,
      title: "Residential Plot",
      location: "Salem",
      type: "land",
      price: 1800000,
      area: "2400 sq.ft",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
      description: "DTCP approved plot in developing area.",
      featured: false,
    },
  ];
}

function formatPrice(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function renderProperties(list) {
  const grid = document.getElementById("property-grid");
  const homeGrid = document.getElementById("home-property-grid");
  const target = grid || homeGrid;
  if (!target) return;

  if (!list.length) {
    target.innerHTML = '<p class="section-subtitle">No properties match your filters.</p>';
    return;
  }

  const limit = homeGrid ? 3 : list.length;
  const items = list.slice(0, limit);

  target.innerHTML = items
    .map(
      (p) => `
    <article class="property-card fade-in">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <div class="body">
        <div class="price">${formatPrice(p.price)}</div>
        <h3>${p.title}</h3>
        <div class="location">
          <i data-lucide="map-pin" style="width:14px"></i> ${p.location} · ${p.area}
        </div>
        <div class="property-tags">
          <span class="tag">${p.type}</span>
          ${p.featured ? '<span class="tag" style="background:rgba(201,162,39,0.2);color:var(--gold-400)">Featured</span>' : ""}
        </div>
        <p style="font-size:0.85rem;color:var(--gray-400);margin-bottom:1rem">${p.description}</p>
        <button class="btn btn-primary btn-sm" onclick="openPropertyModal('${p.id}')">View Details</button>
      </div>
    </article>`
    )
    .join("");

  if (typeof lucide !== "undefined") lucide.createIcons();
  document.querySelectorAll(".fade-in").forEach((el) => {
    new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    ).observe(el);
  });
}

function populateFilters() {
  const locSel = document.getElementById("filter-location");
  if (!locSel) return;
  locSel.innerHTML = '<option value="">All Locations</option>';
  const locations = [...new Set(allProperties.map((p) => p.location))];
  locations.forEach((l) => {
    const opt = document.createElement("option");
    opt.value = l;
    opt.textContent = l;
    locSel.appendChild(opt);
  });
}

function filterProperties() {
  const loc = document.getElementById("filter-location")?.value || "";
  const budget = parseInt(document.getElementById("filter-budget")?.value, 10) || Infinity;
  const type = document.getElementById("filter-type")?.value || "";

  const filtered = allProperties.filter((p) => {
    if (loc && p.location !== loc) return false;
    if (type && p.type !== type) return false;
    if (p.price > budget) return false;
    return true;
  });
  renderProperties(filtered);
}

document.getElementById("filter-location")?.addEventListener("change", filterProperties);
document.getElementById("filter-budget")?.addEventListener("change", filterProperties);
document.getElementById("filter-type")?.addEventListener("change", filterProperties);

function openPropertyModal(id) {
  const p = allProperties.find((x) => x.id === id);
  if (!p) return;
  const modal = document.getElementById("property-modal");
  if (!modal) return;
  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-body").innerHTML = `
    <img src="${p.image}" alt="${p.title}" style="border-radius:12px;margin-bottom:1rem;width:100%" />
    <p><strong>Price:</strong> ${formatPrice(p.price)}</p>
    <p><strong>Location:</strong> ${p.location}</p>
    <p><strong>Area:</strong> ${p.area}</p>
    <p><strong>Type:</strong> ${p.type}</p>
    <p style="margin-top:0.75rem">${p.description}</p>
    <form id="property-enquiry" style="margin-top:1.5rem">
      <div class="form-group"><label>Name</label><input name="name" required /></div>
      <div class="form-group"><label>Phone</label><input name="phone" type="tel" pattern="[6-9][0-9]{9}" required placeholder="10-digit mobile number" /></div>
      <div class="form-group"><label>Message</label><textarea name="message" rows="2">Interested in: ${p.title}</textarea></div>
      <button type="submit" class="btn btn-green" style="width:100%">Send Enquiry</button>
    </form>`;
  modal.classList.add("active");
  document.getElementById("property-enquiry")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const baseUrl = window.API_BASE_URL || "http://localhost:5000/api";
    const payload = {
      customerName: fd.get("name"),
      mobile: fd.get("phone"),
      message: fd.get("message"),
      propertyId: p.id,
      serviceType: "real-estate",
    };

    try {
      const res = await fetch(`${baseUrl}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        alert("Enquiry submitted! We will contact you soon.");
        modal.classList.remove("active");
      } else {
        alert("Error submitting enquiry: " + result.message);
      }
    } catch (err) {
      alert("Error submitting enquiry: " + err.message);
    }
  });
  if (typeof lucide !== "undefined") lucide.createIcons();
}

window.openPropertyModal = openPropertyModal;

document.addEventListener("DOMContentLoaded", loadProperties);

