/* WELCOME ENTERPRISES – TAJ REAL ESTATE – Main JS */

const BUSINESS = {
  name: "WELCOME ENTERPRISES – TAJ REAL ESTATE",
  owner: "S.T. Syed Imran, M.A.",
  phones: ["9003088794", "8056256133", "8608875658"],
  whatsapp: "919003088794",
  email: "welcomeenterprises.taj@gmail.com",
  address: "Taj Real Estate Office, Tamil Nadu, India",
};

// Navbar scroll
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => navLinks?.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => navLinks?.classList.remove("open"));
});

// Theme toggle
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}
initTheme();

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Counter animation
function animateCounters() {
  document.querySelectorAll(".stat-card .number").forEach((el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 25);
  });
}

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  const statsObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObs.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  statsObs.observe(statsSection);
}

// Testimonials slider
let testimonialIndex = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".testimonial-dots button");

function showTestimonial(i) {
  slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
  dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  testimonialIndex = i;
}

dots.forEach((dot, i) => dot.addEventListener("click", () => showTestimonial(i)));
if (slides.length) {
  setInterval(() => showTestimonial((testimonialIndex + 1) % slides.length), 5000);
}

// Contact form validation
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const name = contactForm.querySelector('[name="name"]');
    const phone = contactForm.querySelector('[name="phone"]');
    const email = contactForm.querySelector('[name="email"]');

    [name, phone].forEach((field) => {
      const group = field.closest(".form-group");
      if (!field.value.trim()) {
        group.classList.add("invalid");
        valid = false;
      } else {
        group.classList.remove("invalid");
      }
    });

    if (phone.value && !/^[6-9]\d{9}$/.test(phone.value.replace(/\D/g, "").slice(-10))) {
      phone.closest(".form-group").classList.add("invalid");
      valid = false;
    }

    if (!valid) return;

    const inquiry = {
      id: Date.now(),
      name: name.value,
      phone: phone.value,
      email: email?.value || "",
      message: contactForm.querySelector('[name="message"]')?.value || "",
      date: new Date().toISOString(),
      status: "new",
    };

    const inquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
    inquiries.push(inquiry);
    localStorage.setItem("inquiries", JSON.stringify(inquiries));

    alert("Thank you! Your inquiry has been submitted. We will contact you shortly.");
    contactForm.reset();
  });
}

// Modal helpers
function openModal(id) {
  document.getElementById(id)?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".modal-close, .modal-overlay").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target === el || e.target.classList.contains("modal-close")) {
      el.closest(".modal-overlay")?.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

window.openModal = openModal;
window.closeModal = closeModal;
window.BUSINESS = BUSINESS;

// Active nav link
const path = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((a) => {
  const href = a.getAttribute("href");
  if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
});

// Lucide icons init
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") lucide.createIcons();
});
