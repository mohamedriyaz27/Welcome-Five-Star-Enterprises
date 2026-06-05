// Central API client for Welcome Enterprises
const API_BASE_URL = "http://localhost:5000/api";

async function apiFetch(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = localStorage.getItem("accessToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        
        // Redirect to login only if not already there, and if trying to access admin pages
        const isLoginPage = window.location.pathname.includes("login.html");
        const isAdminFolder = window.location.pathname.includes("/admin/");
        if (!isLoginPage && isAdminFolder) {
          window.location.href = "login.html";
        }
      }
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// Check if user is logged in (returns user details if valid, null otherwise)
async function getProfile() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const res = await apiFetch("/auth/me");
    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    }
  } catch (err) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
  return null;
}

window.apiFetch = apiFetch;
window.getProfile = getProfile;
window.API_BASE_URL = API_BASE_URL;
