import api from "./api";

export const invoiceService = {
  async createInvoice(invoiceData) {
    // invoiceData: customerName, customerPhone, items (description, qty, rate), includeGst
    return await api.post("/invoices", invoiceData);
  },

  async getInvoices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/invoices?${queryString}` : "/invoices";
    return await api.get(endpoint);
  },

  async getInvoiceById(id) {
    return await api.get(`/invoices/${id}`);
  },

  async getSalesReport() {
    return await api.get("/reports/monthly-sales");
  }
};

export default invoiceService;
