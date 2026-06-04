const ADVOCATE = {
  name: "Adv. Farook Ahamed, B.A., B.L.,",
  phone: "9003088794",
  whatsapp: "919003088794",
};

// Navbar scroll & active section
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 60);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinksEl = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => navLinksEl?.classList.toggle("open"));
navLinks.forEach((a) => a.addEventListener("click", () => navLinksEl?.classList.remove("open")));

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Testimonials
let testimonialIdx = 0;
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelectorAll(".testimonial-nav button");

function showTestimonial(i) {
  testimonialCards.forEach((c, idx) => c.classList.toggle("active", idx === i));
  testimonialDots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  testimonialIdx = i;
}

testimonialDots.forEach((dot, i) => dot.addEventListener("click", () => showTestimonial(i)));
if (testimonialCards.length) {
  setInterval(() => showTestimonial((testimonialIdx + 1) % testimonialCards.length), 6000);
}

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

// Contact form
const contactForm = document.getElementById("advocate-contact-form");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(contactForm);
  const name = fd.get("name")?.toString().trim();
  const phone = fd.get("phone")?.toString().trim();
  if (!name || !phone) {
    alert("Please fill in name and phone number.");
    return;
  }
  const inquiries = JSON.parse(localStorage.getItem("advocate_inquiries") || "[]");
  inquiries.push({
    id: Date.now(),
    name,
    phone,
    email: fd.get("email") || "",
    service: fd.get("service") || "",
    message: fd.get("message") || "",
    date: new Date().toISOString(),
  });
  localStorage.setItem("advocate_inquiries", JSON.stringify(inquiries));
  alert("Thank you! Your consultation request has been received. We will contact you shortly.");
  contactForm.reset();
});

// Lucide icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") lucide.createIcons();
});
