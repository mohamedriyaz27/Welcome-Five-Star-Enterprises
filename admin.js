const ADMIN_USER = "admin";
const ADMIN_PASS = "welcome@2026";

function checkAuth() {
  const pages = ["login.html"];
  const isLogin = pages.some((p) => window.location.pathname.includes(p));
  const authed = sessionStorage.getItem("adminAuth") === "true";
  if (!isLogin && !authed) {
    window.location.href = "login.html";
    return false;
  }
  if (isLogin && authed) {
    window.location.href = "dashboard.html";
  }
  return authed;
}

document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem("adminAuth", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("login-error").style.display = "block";
  }
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
  sessionStorage.removeItem("adminAuth");
  window.location.href = "login.html";
});

function getBills() {
  return JSON.parse(localStorage.getItem("bills") || "[]");
}

function saveBills(bills) {
  localStorage.setItem("bills", JSON.stringify(bills));
}

function getPayments() {
  return JSON.parse(localStorage.getItem("payments") || "[]");
}

function savePayments(payments) {
  localStorage.setItem("payments", JSON.stringify(payments));
}

function getSalesData() {
  const bills = getBills();
  const payments = getPayments();
  return { bills, payments };
}

function formatCurrency(n) {
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

checkAuth();

window.getBills = getBills;
window.saveBills = saveBills;
window.getPayments = getPayments;
window.savePayments = savePayments;
window.getSalesData = getSalesData;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
