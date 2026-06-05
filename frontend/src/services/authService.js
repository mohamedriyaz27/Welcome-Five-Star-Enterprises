import api from "./api";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    if (response.success && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed, cleaning local session anyway", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  },

  async getProfile() {
    return await api.get("/auth/me");
  },

  async refreshToken() {
    const response = await api.post("/auth/refresh-token");
    if (response.success && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response;
  }
};

export default authService;
