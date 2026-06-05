import api from "./api";

export const paymentService = {
  async recordPayment(paymentData) {
    // paymentData: amount, note, paymentMethod, customer
    return await api.post("/payments", paymentData);
  },

  async getPayments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/payments?${queryString}` : "/payments";
    return await api.get(endpoint);
  }
};

export default paymentService;
