let html5QrCode = null;

function generatePaymentQR(amount, note) {
  const upiId = document.getElementById("upi-id")?.value || "welcomeenterprises@upi";
  const payeeName = "Welcome Enterprises";
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note || "Payment")}`;

  const container = document.getElementById("payment-qr");
  if (!container) return;
  container.innerHTML = "";
  if (typeof QRCode !== "undefined") {
    new QRCode(container, {
      text: upiUrl,
      width: 220,
      height: 220,
      colorDark: "#0a1628",
      colorLight: "#ffffff",
    });
  }
  document.getElementById("qr-amount-display").textContent = formatCurrency(amount);
  document.getElementById("qr-upi-display").textContent = upiId;
}

document.getElementById("generate-qr-btn")?.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("payment-amount").value) || 0;
  const note = document.getElementById("payment-note").value || "Service Payment";
  if (amount <= 0) {
    alert("Enter a valid amount");
    return;
  }
  generatePaymentQR(amount, note);
});

document.getElementById("confirm-payment-btn")?.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("payment-amount").value) || 0;
  const note = document.getElementById("payment-note").value || "";
  const method = document.getElementById("payment-method")?.value || "UPI";
  const customer = document.getElementById("pay-customer").value || "Customer";

  if (amount <= 0) {
    alert("Enter amount first");
    return;
  }

  const payment = {
    id: Date.now(),
    amount,
    note,
    method,
    customer,
    date: new Date().toISOString(),
    status: "completed",
  };

  const payments = getPayments();
  payments.push(payment);
  savePayments(payments);
  alert("Payment recorded successfully!");
  loadPaymentHistory();
  document.getElementById("payment-amount").value = "";
  document.getElementById("payment-note").value = "";
});

async function startQRScanner() {
  const readerEl = document.getElementById("qr-reader");
  if (!readerEl || typeof Html5Qrcode === "undefined") {
    alert("QR scanner library not loaded");
    return;
  }

  if (html5QrCode) {
    try {
      await html5QrCode.stop();
    } catch (_) {}
  }

  html5QrCode = new Html5Qrcode("qr-reader");
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  try {
    await html5QrCode.start(
      { facingMode: "environment" },
      config,
      onScanSuccess,
      () => {}
    );
    document.getElementById("scanner-status").textContent = "Scanner active – point at QR code";
  } catch (err) {
    document.getElementById("scanner-status").textContent =
      "Camera access denied. Use manual payment entry.";
    console.error(err);
  }
}

function onScanSuccess(decodedText) {
  document.getElementById("scanned-data").value = decodedText;
  document.getElementById("scanner-status").textContent = "QR scanned successfully!";

  let amount = 0;
  try {
    const url = new URL(decodedText.replace("upi://", "https://"));
    amount = parseFloat(url.searchParams.get("am")) || 0;
    const note = url.searchParams.get("tn") || "";
    if (amount) document.getElementById("payment-amount").value = amount;
    if (note) document.getElementById("payment-note").value = decodeURIComponent(note);
    generatePaymentQR(amount || parseFloat(document.getElementById("payment-amount").value) || 0, note);
  } catch {
    if (/^\d+(\.\d+)?$/.test(decodedText)) {
      document.getElementById("payment-amount").value = decodedText;
    }
  }

  html5QrCode?.stop();
  document.getElementById("scanner-status").textContent = "Scan complete. Verify amount and confirm.";
}

document.getElementById("start-scanner-btn")?.addEventListener("click", startQRScanner);
document.getElementById("stop-scanner-btn")?.addEventListener("click", async () => {
  if (html5QrCode) {
    try {
      await html5QrCode.stop();
    } catch (_) {}
    document.getElementById("scanner-status").textContent = "Scanner stopped";
  }
});

function loadPaymentHistory() {
  const tbody = document.getElementById("payment-history-body");
  if (!tbody) return;
  const payments = getPayments().slice(-30).reverse();
  tbody.innerHTML =
    payments
      .map(
        (p) => `
    <tr>
      <td>${formatDate(p.date)}</td>
      <td>${p.customer}</td>
      <td>${p.method}</td>
      <td>${formatCurrency(p.amount)}</td>
      <td>${p.note || "-"}</td>
    </tr>`
      )
      .join("") || '<tr><td colspan="5">No payments recorded</td></tr>';
}

document.addEventListener("DOMContentLoaded", loadPaymentHistory);
