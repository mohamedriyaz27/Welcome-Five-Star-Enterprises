import React, { useState, useEffect } from "react";
import { useAlert } from "../../context/AlertContext";
import invoiceService from "../../services/invoiceService";

export function Bills() {
  const { showAlert } = useAlert();
  const [billItems, setBillItems] = useState([{ desc: "", qty: 1, rate: 0 }]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [billNo, setBillNo] = useState("Auto-generated");
  const [includeGst, setIncludeGst] = useState(false);
  
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Formatters
  const formatCurrency = (n) => {
    return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
  };

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Load Invoice History
  const loadHistory = async () => {
    try {
      const res = await invoiceService.getInvoices({ limit: 20 });
      if (res.success) {
        setHistory(res.data.items || res.data);
      }
    } catch (err) {
      console.error("Error loading invoices history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Items Handlers
  const handleItemChange = (index, field, value) => {
    const newItems = [...billItems];
    newItems[index][field] = field === "desc" ? value : parseFloat(value) || 0;
    setBillItems(newItems);
  };

  const addBillItem = () => {
    setBillItems([...billItems, { desc: "", qty: 1, rate: 0 }]);
  };

  const removeBillItem = (index) => {
    if (billItems.length > 1) {
      const newItems = billItems.filter((_, i) => i !== index);
      setBillItems(newItems);
    }
  };

  const subtotal = billItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const gstAmount = includeGst ? subtotal * 0.18 : 0;
  const grandTotal = subtotal + gstAmount;

  // Print Bill Helper
  const printBill = () => {
    const printContent = document.getElementById("print-bill");
    if (!printContent) return;
    const w = window.open("", "_blank");
    w.document.write(`
      <html>
        <head>
          <title>Bill Print</title>
          <style>
            body { margin: 0; padding: 20px; font-family: "Courier New", monospace; background: white; color: #111; }
            .bill-print { max-width: 800px; margin: 0 auto; padding: 1rem; }
            .bill-header { text-align: center; border-bottom: 2px solid #c9a227; padding-bottom: 0.5rem; margin-bottom: 1rem; }
            .bill-header h2 { color: #0a1628; font-size: 1.3rem; margin: 0 0 0.25rem; }
            .bill-header .tagline { color: #2d6a4f; font-size: 0.8rem; margin: 0; }
            .bill-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem; font-size: 0.85rem; margin-bottom: 1rem; }
            .bill-table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.85rem; }
            .bill-table th, .bill-table td { border: 1px solid #ccc; padding: 0.4rem 0.5rem; text-align: left; }
            .bill-table th { background: #f1f5f9; }
            .bill-total { text-align: right; font-size: 1rem; font-weight: bold; margin-top: 1rem; padding-top: 0.5rem; border-top: 2px solid #0a1628; line-height: 1.4; }
            .bill-footer { margin-top: 1.5rem; font-size: 0.75rem; text-align: center; color: #64748b; line-height: 1.3; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    w.document.close();
    w.focus();
    setTimeout(() => {
      w.print();
      w.close();
    }, 300);
  };

  // Save Bill to DB
  const saveBill = async () => {
    if (!customerName || !customerPhone) {
      showAlert("Please enter customer name and phone number", "error");
      return;
    }

    const payload = {
      customerName,
      customerPhone,
      items: billItems
        .filter((item) => item.desc || item.rate > 0)
        .map((item) => ({
          description: item.desc || "Service",
          qty: parseInt(item.qty, 10) || 1,
          rate: parseFloat(item.rate) || 0,
        })),
      includeGst,
    };

    try {
      const res = await invoiceService.createInvoice(payload);
      if (res.success) {
        showAlert("Bill saved successfully!", "success");
        setBillNo(res.data.invoiceNumber);
        loadHistory();
      }
    } catch (err) {
      showAlert("Error saving bill: " + err.message, "error");
    }
  };

  // Reprint Bill handler
  const reprintBill = (invoice) => {
    setCustomerName(invoice.customerName);
    setCustomerPhone(invoice.customerPhone);
    setBillNo(invoice.invoiceNumber);
    setIncludeGst(invoice.gstRate > 0);
    setBillItems(
      invoice.items.map((item) => ({
        desc: item.description,
        qty: item.qty,
        rate: item.rate,
      }))
    );
    
    // Trigger print after state updates
    setTimeout(() => {
      printBill();
    }, 100);
  };

  return (
    <>
      <div className="admin-header no-print">
        <h1>Bill Generation</h1>
        <span style={{ color: "var(--gray-400)" }}>Admin Panel</span>
      </div>

      <div className="contact-grid no-print" style={{ gap: "2rem", marginBottom: "2rem" }}>
        {/* Bill Entry Form */}
        <div className="admin-card">
          <h3>Customer Details</h3>
          <div className="form-group">
            <label>Customer Name</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              placeholder="Name" 
            />
          </div>
          <div className="form-group">
            <label>Customer Phone</label>
            <input 
              type="text" 
              value={customerPhone} 
              onChange={(e) => setCustomerPhone(e.target.value)} 
              placeholder="Phone" 
            />
          </div>
          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
            <input 
              type="checkbox" 
              id="include-gst" 
              checked={includeGst} 
              onChange={(e) => setIncludeGst(e.target.checked)} 
              style={{ width: "auto" }}
            />
            <label htmlFor="include-gst" style={{ margin: 0, cursor: "pointer" }}>Include GST (18%)</label>
          </div>

          <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>Bill Items</h3>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {billItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input 
                        type="text" 
                        value={item.desc} 
                        onChange={(e) => handleItemChange(index, "desc", e.target.value)}
                        placeholder="Service description" 
                        style={{ width: "100%", padding: "0.4rem", background: "var(--navy-900)", border: "1px solid var(--navy-600)", color: "#fff", borderRadius: "6px" }}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.qty} 
                        onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                        min="1" 
                        style={{ width: "70px", padding: "0.4rem", background: "var(--navy-900)", border: "1px solid var(--navy-600)", color: "#fff", borderRadius: "6px" }}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={item.rate} 
                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                        min="0" 
                        step="0.01" 
                        style={{ width: "100px", padding: "0.4rem", background: "var(--navy-900)", border: "1px solid var(--navy-600)", color: "#fff", borderRadius: "6px" }}
                      />
                    </td>
                    <td>{formatCurrency(item.qty * item.rate)}</td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-sm" 
                        onClick={() => removeBillItem(index)}
                        style={{ background: "#dc2626", color: "#fff", padding: "0.3rem 0.6rem" }}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            <button type="button" className="btn btn-outline" onClick={addBillItem}>
              Add Item
            </button>
            <button type="button" className="btn btn-green" onClick={saveBill}>
              Save Bill
            </button>
            <button type="button" className="btn btn-primary" onClick={printBill}>
              Print Bill
            </button>
          </div>
        </div>

        {/* Bill Live Preview */}
        <div className="admin-card">
          <h3>Live Preview</h3>
          <div className="bill-preview" style={{ background: "white", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--navy-600)" }}>
            <div id="print-bill" className="bill-print">
              <div className="bill-header">
                <h2>WELCOME ENTERPRISES – TAJ REAL ESTATE</h2>
                <p className="tagline">Documentation | Real Estate | Legal | Online Services</p>
                <p style={{ fontSize: "0.8rem", margin: "0.5rem 0 0", color: "#444" }}>S.T. Syed Imran, M.A. | Ph: 90030 88794</p>
              </div>
              <div className="bill-meta">
                <div><strong>Bill No:</strong> {billNo}</div>
                <div><strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}</div>
                <div><strong>Customer:</strong> {customerName || "Walk-in Customer"}</div>
                <div><strong>Phone:</strong> {customerPhone || "-"}</div>
              </div>
              <table className="bill-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems
                    .filter((item) => item.desc || item.rate)
                    .map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.desc || "Service"}</td>
                        <td>{item.qty}</td>
                        <td>{formatCurrency(item.rate)}</td>
                        <td>{formatCurrency(item.qty * item.rate)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="bill-total">
                Subtotal: {formatCurrency(subtotal)}
                {includeGst && (
                  <>
                    <br />
                    GST (18%): {formatCurrency(gstAmount)}
                  </>
                )}
                <br />
                <span style={{ fontSize: "1.15rem" }}>Grand Total: {formatCurrency(grandTotal)}</span>
              </div>
              <div className="bill-footer">
                <p style={{ margin: "0 0 0.25rem" }}>Thank you for your business!</p>
                <p style={{ margin: 0 }}>90030 88794 | 80562 56133</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", textAlign: "right" }}>
            <strong>Total Amount: </strong>
            <span id="preview-total" style={{ color: "var(--gold-400)", fontSize: "1.25rem" }}>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Bill History List */}
      <div className="admin-card no-print">
        <h3>Billing History</h3>
        {loading ? (
          <p style={{ color: "var(--gold-400)" }}>Loading bill archives...</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="5">No bills recorded yet</td>
                  </tr>
                ) : (
                  history.map((invoice) => (
                    <tr key={invoice._id || invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{formatDate(invoice.createdAt)}</td>
                      <td>{invoice.customerName}</td>
                      <td>{formatCurrency(invoice.total)}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline" 
                          onClick={() => reprintBill(invoice)}
                        >
                          Reprint
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Bills;
