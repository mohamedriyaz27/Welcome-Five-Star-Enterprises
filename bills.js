let billItems = [{ desc: "", qty: 1, rate: 0 }];

function renderBillItems() {
  const tbody = document.getElementById("bill-items-body");
  if (!tbody) return;
  tbody.innerHTML = billItems
    .map(
      (item, i) => `
    <tr>
      <td><input type="text" value="${item.desc}" data-field="desc" data-i="${i}" placeholder="Service description" style="width:100%;padding:0.4rem;background:var(--navy-900);border:1px solid var(--navy-600);color:#fff;border-radius:6px" /></td>
      <td><input type="number" value="${item.qty}" data-field="qty" data-i="${i}" min="1" style="width:70px;padding:0.4rem;background:var(--navy-900);border:1px solid var(--navy-600);color:#fff;border-radius:6px" /></td>
      <td><input type="number" value="${item.rate}" data-field="rate" data-i="${i}" min="0" step="0.01" style="width:100px;padding:0.4rem;background:var(--navy-900);border:1px solid var(--navy-600);color:#fff;border-radius:6px" /></td>
      <td class="line-total">${formatCurrency(item.qty * item.rate)}</td>
      <td><button type="button" class="btn btn-sm" onclick="removeBillItem(${i})" style="background:#dc2626;color:#fff;padding:0.3rem 0.6rem">×</button></td>
    </tr>`
    )
    .join("");

  tbody.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("input", (e) => {
      const i = parseInt(e.target.dataset.i, 10);
      const field = e.target.dataset.field;
      billItems[i][field] = field === "desc" ? e.target.value : parseFloat(e.target.value) || 0;
      updateBillPreview();
      renderBillItems();
    });
  });
  updateBillPreview();
}

function addBillItem() {
  billItems.push({ desc: "", qty: 1, rate: 0 });
  renderBillItems();
}

function removeBillItem(i) {
  if (billItems.length > 1) {
    billItems.splice(i, 1);
    renderBillItems();
  }
}

function getBillTotal() {
  return billItems.reduce((s, item) => s + item.qty * item.rate, 0);
}

function generateBillNo() {
  const bills = getBills();
  const num = String(bills.length + 1).padStart(5, "0");
  return `WE-${new Date().getFullYear()}-${num}`;
}

function updateBillPreview() {
  const preview = document.getElementById("bill-preview-content");
  if (!preview) return;

  const customer = document.getElementById("customer-name")?.value || "Walk-in Customer";
  const phone = document.getElementById("customer-phone")?.value || "-";
  const billNo = document.getElementById("bill-no")?.value || generateBillNo();
  const date = new Date().toLocaleDateString("en-IN");
  const total = getBillTotal();
  const gst = document.getElementById("include-gst")?.checked;
  const gstAmt = gst ? total * 0.18 : 0;
  const grandTotal = total + gstAmt;

  preview.innerHTML = `
    <div class="bill-print print-area" id="print-bill">
      <div class="bill-header">
        <h2>WELCOME ENTERPRISES – TAJ REAL ESTATE</h2>
        <p class="tagline">Documentation | Real Estate | Legal | Online Services</p>
        <p style="font-size:0.8rem;margin-top:0.5rem">S.T. Syed Imran, M.A. | Ph: 90030 88794</p>
      </div>
      <div class="bill-meta">
        <div><strong>Bill No:</strong> ${billNo}</div>
        <div><strong>Date:</strong> ${date}</div>
        <div><strong>Customer:</strong> ${customer}</div>
        <div><strong>Phone:</strong> ${phone}</div>
      </div>
      <table class="bill-table">
        <thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
        <tbody>
          ${billItems
            .filter((i) => i.desc || i.rate)
            .map(
              (item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${item.desc || "Service"}</td>
              <td>${item.qty}</td>
              <td>${formatCurrency(item.rate)}</td>
              <td>${formatCurrency(item.qty * item.rate)}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <div class="bill-total">
        Subtotal: ${formatCurrency(total)}<br/>
        ${gst ? `GST (18%): ${formatCurrency(gstAmt)}<br/>` : ""}
        <strong style="font-size:1.2rem">Grand Total: ${formatCurrency(grandTotal)}</strong>
      </div>
      <div class="bill-footer">
        <p>Thank you for your business!</p>
        <p>90030 88794 | 80562 56133 | </p>
      </div>
    </div>`;

  document.getElementById("preview-total").textContent = formatCurrency(grandTotal);
}

function printBill() {
  updateBillPreview();
  const printContent = document.getElementById("print-bill");
  if (!printContent) return;
  const w = window.open("", "_blank");
  w.document.write(`
    <html><head><title>Bill Print</title>
    <link rel="stylesheet" href="../css/print.css" />
    <style>body{margin:0;padding:20px;font-family:Georgia,serif}</style>
    </head><body>${printContent.outerHTML}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => { w.print(); w.close(); }, 300);
}

function saveBill() {
  const bill = {
    id: Date.now(),
    billNo: document.getElementById("bill-no").value || generateBillNo(),
    customerName: document.getElementById("customer-name").value,
    customerPhone: document.getElementById("customer-phone").value,
    items: [...billItems],
    subtotal: getBillTotal(),
    gst: document.getElementById("include-gst")?.checked ? getBillTotal() * 0.18 : 0,
    total: getBillTotal() + (document.getElementById("include-gst")?.checked ? getBillTotal() * 0.18 : 0),
    date: new Date().toISOString(),
    status: "paid",
  };
  const bills = getBills();
  bills.push(bill);
  saveBills(bills);
  alert("Bill saved successfully!");
  loadBillHistory();
}

function loadBillHistory() {
  const tbody = document.getElementById("bill-history-body");
  if (!tbody) return;
  const bills = getBills().slice(-20).reverse();
  tbody.innerHTML =
    bills
      .map(
        (b) => `
    <tr>
      <td>${b.billNo}</td>
      <td>${formatDate(b.date)}</td>
      <td>${b.customerName}</td>
      <td>${formatCurrency(b.total)}</td>
      <td><button class="btn btn-sm btn-outline" onclick="reprintBill(${b.id})">Reprint</button></td>
    </tr>`
      )
      .join("") || '<tr><td colspan="5">No bills yet</td></tr>';
}

function reprintBill(id) {
  const b = getBills().find((x) => x.id === id);
  if (!b) return;
  billItems = b.items;
  document.getElementById("customer-name").value = b.customerName;
  document.getElementById("customer-phone").value = b.customerPhone;
  document.getElementById("bill-no").value = b.billNo;
  updateBillPreview();
  printBill();
}

document.getElementById("add-item-btn")?.addEventListener("click", addBillItem);
document.getElementById("print-btn")?.addEventListener("click", printBill);
document.getElementById("save-bill-btn")?.addEventListener("click", saveBill);
document.getElementById("customer-name")?.addEventListener("input", updateBillPreview);
document.getElementById("customer-phone")?.addEventListener("input", updateBillPreview);
document.getElementById("include-gst")?.addEventListener("change", updateBillPreview);

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("bill-no")) {
    document.getElementById("bill-no").value = generateBillNo();
  }
  renderBillItems();
  loadBillHistory();
});

window.addBillItem = addBillItem;
window.removeBillItem = removeBillItem;
window.reprintBill = reprintBill;
