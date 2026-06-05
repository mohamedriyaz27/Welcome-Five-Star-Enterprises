import api from "./api";

export const inquiryService = {
  async submitInquiry(payload) {
    // payload should contain: customerName, mobile, email, message, serviceType, propertyId
    return await api.post("/inquiries", payload);
  },

  async getInquiries(params = {}) {
    // Mapped for admin panel fetching
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/inquiries?${queryString}` : "/inquiries";
    return await api.get(endpoint);
  },

  async getStats() {
    return await api.get("/inquiries/stats");
  }
};

export default inquiryService;
