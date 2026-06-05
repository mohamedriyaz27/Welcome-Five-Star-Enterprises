// Centralized Fetch API Wrapper with request abstraction, JSON handling, timeout, retry, and 401 interceptor
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Custom Error Class for API Errors
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Centralized fetch client with request timeout and retry capability
 */
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = DEFAULT_TIMEOUT } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

/**
 * Fetch wrapper with retry mechanism
 */
async function fetchWithRetry(resource, options = {}, retries = 2, delay = 1000) {
  try {
    return await fetchWithTimeout(resource, options);
  } catch (err) {
    if (retries > 0 && (err.name === "AbortError" || err.message === "Failed to fetch")) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(resource, options, retries - 1, delay * 1.5);
    }
    throw err;
  }
}

/**
 * Centralized API request handler
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
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

  // Convert body to string if it is an object
  if (options.body && typeof options.body === "object") {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetchWithRetry(url, config, options.retries, options.retryDelay);
    
    // Check for token expiration or unauthorized (401)
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      
      // Notify authentication state changed (or reload page if within admin area)
      const isAdminPage = window.location.pathname.includes("/admin");
      if (isAdminPage) {
        window.location.href = "/admin/login";
      }
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(result.message || "An error occurred during the request", response.status, result);
    }

    return result;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// REST Method shortcuts
export const api = {
  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: "PUT", body }),
  patch: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: "PATCH", body }),
  delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: "DELETE" }),
};

export default api;
