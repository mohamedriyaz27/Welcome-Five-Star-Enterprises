function checkAuth() {
  const pages = ["login.html"];
  const isLogin = pages.some((p) => window.location.pathname.includes(p));
  const authed = !!localStorage.getItem("accessToken");
  if (!isLogin && !authed) {
    window.location.href = "login.html";
    return false;
  }
  if (isLogin && authed) {
    window.location.href = "dashboard.html";
  }
  return authed;
}

document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("login-error");

  try {
    if (errorEl) errorEl.style.display = "none";
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.success) {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "dashboard.html";
    }
  } catch (err) {
    if (errorEl) {
      errorEl.textContent = err.message || "Invalid credentials";
      errorEl.style.display = "block";
    }
  }
});

document.getElementById("logout-btn")?.addEventListener("click", async () => {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch (err) {
    console.error("Logout error", err);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
});

// Backward compatibility helpers for format utilities
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

window.formatCurrency = formatCurrency;
window.formatDate = formatDate;

