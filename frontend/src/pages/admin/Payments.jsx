import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useAlert } from "../../context/AlertContext";
import paymentService from "../../services/paymentService";

export function Payments() {
  const { showAlert } = useAlert();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Service Payment");
  const [upiId, setUpiId] = useState("welcomeenterprises@upi");
  const [method, setMethod] = useState("UPI");
  const [customer, setCustomer] = useState("");
  const [upiUrl, setUpiUrl] = useState("");
  
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // QR Scanner States
  const [scannerStatus, setScannerStatus] = useState("Scanner inactive");
  const [scannedData, setScannedData] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

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

  // Load Payment History
  const loadHistory = async () => {
    try {
      const res = await paymentService.getPayments({ limit: 30 });
      if (res.success) {
        setHistory(res.data.items || res.data);
      }
    } catch (err) {
      console.error("Error loading payment history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  // Generate UPI QR Code URL
  const generateQR = (e) => {
    e?.preventDefault();
    const floatAmount = parseFloat(amount) || 0;
    if (floatAmount <= 0) {
      showAlert("Enter a valid amount", "error");
      return;
    }
    const payeeName = "Welcome Enterprises";
    const url = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${floatAmount}&cu=INR&tn=${encodeURIComponent(note || "Payment")}`;
    setUpiUrl(url);
  };

  // Save payment logs
  const recordPayment = async (e) => {
    e?.preventDefault();
    const floatAmount = parseFloat(amount) || 0;
    if (floatAmount <= 0) {
      showAlert("Enter amount first", "error");
      return;
    }
    const payload = {
      amount: floatAmount,
      note,
      paymentMethod: method,
      customer: customer || "Walk-in Customer",
    };
    try {
      const res = await paymentService.recordPayment(payload);
      if (res.success) {
        showAlert("Payment recorded successfully!", "success");
        setAmount("");
        setNote("Service Payment");
        setCustomer("");
        setUpiUrl("");
        loadHistory();
      }
    } catch (err) {
      showAlert("Error recording payment: " + err.message, "error");
    }
  };

  // Start Camera QR Scanner
  const startScanner = async () => {
    if (isScanning) return;
    setScannerStatus("Activating camera...");
    setIsScanning(true);

    try {
      // Ensure element exists before instantiating
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        () => {}
      );
      setScannerStatus("Scanner active – point at QR code");
    } catch (err) {
      setScannerStatus("Camera access denied. Use manual payment entry.");
      setIsScanning(false);
      console.error(err);
    }
  };

  // Stop Camera QR Scanner
  const stopScanner = async () => {
    if (!isScanning || !html5QrCodeRef.current) return;
    try {
      await html5QrCodeRef.current.stop();
      setScannerStatus("Scanner stopped");
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // On QR Code Scan Success
  const onScanSuccess = (decodedText) => {
    setScannedData(decodedText);
    setScannerStatus("QR scanned successfully!");

    try {
      // Parse UPI URL if format is upi://
      let parsedAmount = "";
      let parsedNote = "";
      if (decodedText.startsWith("upi://")) {
        const urlStr = decodedText.replace("upi://", "https://");
        const url = new URL(urlStr);
        parsedAmount = url.searchParams.get("am") || "";
        parsedNote = url.searchParams.get("tn") || "";
        if (parsedNote) parsedNote = decodeURIComponent(parsedNote);
      } else if (/^\d+(\.\d+)?$/.test(decodedText)) {
        parsedAmount = decodedText;
      }

      if (parsedAmount) setAmount(parsedAmount);
      if (parsedNote) setNote(parsedNote);

      // Regenerate dynamic QR if amount was scanned
      if (parsedAmount) {
        const payeeName = "Welcome Enterprises";
        const newUpiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${parsedAmount}&cu=INR&tn=${encodeURIComponent(parsedNote || "Payment")}`;
        setUpiUrl(newUpiUrl);
      }
    } catch (err) {
      console.error("Failed to parse scanned QR content", err);
    }

    stopScanner();
    setScannerStatus("Scan complete. Verify amount and confirm.");
  };

  return (
    <>
      <div className="admin-header no-print">
        <h1>QR Payments & Scanning</h1>
        <span style={{ color: "var(--gray-400)" }}>Admin Panel</span>
      </div>

      <div className="contact-grid" style={{ gap: "2rem", marginBottom: "2rem" }}>
        {/* Payment Configuration Panel */}
        <div className="admin-card">
          <h3>Generate Payment QR</h3>
          <form onSubmit={generateQR}>
            <div className="form-group">
              <label>UPI ID</label>
              <input 
                type="text" 
                value={upiId} 
                onChange={(e) => setUpiId(e.target.value)} 
                placeholder="Merchant UPI ID" 
              />
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0.00" 
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Name</label>
              <input 
                type="text" 
                value={customer} 
                onChange={(e) => setCustomer(e.target.value)} 
                placeholder="Customer Name" 
              />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="UPI">UPI (QR Code)</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card Payment</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payment Description</label>
              <input 
                type="text" 
                value={note} 
                onChange={(e) => setNote(e.target.value)} 
                placeholder="Description" 
              />
            </div>
            
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
              <button type="submit" className="btn btn-primary">Generate QR</button>
              <button type="button" className="btn btn-green" onClick={recordPayment}>Confirm & Save Payment</button>
            </div>
          </form>
        </div>

        {/* QR Display & Camera Scan Panel */}
        <div className="admin-card">
          <h3>Payment Output</h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "1.5rem 0" }}>
            
            {/* Generated QR Image (Uses public QR generation API) */}
            {upiUrl ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ background: "white", padding: "1rem", borderRadius: "12px", border: "1px solid var(--navy-600)" }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}&color=0a1628`} 
                    alt="Payment QR Code" 
                    width="220" 
                    height="220"
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <strong>Payable Amount: </strong>
                  <span style={{ color: "var(--gold-400)", fontSize: "1.2rem" }}>{formatCurrency(amount || 0)}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginTop: "0.25rem" }}>
                  Merchant ID: {upiId}
                </div>
              </div>
            ) : (
              <div style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed var(--navy-600)", width: "220px", borderRadius: "12px", color: "var(--gray-500)", fontSize: "0.9rem" }}>
                Generate QR to display
              </div>
            )}

            {/* QR Scanner Camera Interface */}
            <div style={{ width: "100%", borderTop: "1px solid var(--navy-600)", paddingTop: "1.5rem" }}>
              <h4>Or Scan Customer QR Code</h4>
              <div id="qr-reader" ref={scannerRef} style={{ width: "100%", maxWidth: "350px", margin: "1rem auto", background: "#000", minHeight: isScanning ? "250px" : "auto", borderRadius: "8px" }}></div>
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--gold-400)" }}>{scannerStatus}</p>
              
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                {!isScanning ? (
                  <button type="button" className="btn btn-outline btn-sm" onClick={startScanner}>Start Camera Scanner</button>
                ) : (
                  <button type="button" className="btn btn-sm" onClick={stopScanner} style={{ background: "#dc2626", color: "#fff" }}>Stop Camera Scanner</button>
                )}
              </div>
              
              {scannedData && (
                <div className="form-group" style={{ marginTop: "1rem" }}>
                  <label>Scanned Data</label>
                  <input type="text" value={scannedData} readOnly style={{ background: "var(--navy-900)", border: "1px solid var(--navy-600)", color: "var(--gray-400)", fontSize: "0.8rem" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Log */}
      <div className="admin-card">
        <h3>Transaction History</h3>
        {loadingHistory ? (
          <p style={{ color: "var(--gold-400)" }}>Loading payment logs...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="5">No transactions recorded yet</td>
                </tr>
              ) : (
                history.map((p) => (
                  <tr key={p._id || p.id}>
                    <td>{formatDate(p.createdAt)}</td>
                    <td>{p.customer}</td>
                    <td>{p.paymentMethod}</td>
                    <td>{formatCurrency(p.amount)}</td>
                    <td>{p.note || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Payments;
