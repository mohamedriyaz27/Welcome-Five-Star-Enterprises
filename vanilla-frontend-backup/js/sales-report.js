let salesChart = null;

function getMonthKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(key) {
  const [y, m] = key.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

let salesData = []; // [{ month: "2026-05", transactions: 45, bills: 30, payments: 15, total_sales: 125000 }]

async function fetchSalesReport() {
  try {
    const res = await apiFetch("/reports/monthly-sales");
    if (res.success) {
      salesData = res.data;
    }
  } catch (err) {
    console.error("Error fetching sales report:", err);
  }
}

async function renderSalesReport() {
  const selectedMonth = document.getElementById("report-month")?.value;
  const filteredData = selectedMonth 
    ? salesData.filter(d => d.month === selectedMonth) 
    : salesData.slice(-12);

  let totalSales = 0;
  let totalTransactions = 0;

  const tbody = document.getElementById("sales-report-body");
  if (tbody) {
    tbody.innerHTML = filteredData.length
      ? filteredData
          .slice()
          .reverse()
          .map((d) => {
            totalSales += d.total_sales;
            totalTransactions += d.transactions;
            return `
        <tr>
          <td>${getMonthLabel(d.month)}</td>
          <td>${d.transactions}</td>
          <td>${d.bills}</td>
          <td>${d.payments}</td>
          <td><strong>${formatCurrency(d.total_sales)}</strong></td>
        </tr>`;
          })
          .join("")
      : '<tr><td colspan="5">No sales data for selected period</td></tr>';
  }

  const salesEl = document.getElementById("report-total-sales");
  if (salesEl) salesEl.textContent = formatCurrency(totalSales);
  
  const txEl = document.getElementById("report-total-transactions");
  if (txEl) txEl.textContent = totalTransactions;
  
  const avgEl = document.getElementById("report-avg-sale");
  if (avgEl) {
    avgEl.textContent = totalTransactions ? formatCurrency(totalSales / totalTransactions) : "₹0";
  }

  // Prep for charts and export
  const keys = filteredData.map(d => d.month);
  const byMonth = {};
  filteredData.forEach(d => {
    byMonth[d.month] = { total: d.total_sales, count: d.transactions, bills: d.bills, payments: d.payments };
  });

  renderSalesChart(keys, byMonth);
  exportReportData(keys, byMonth);
}

function renderSalesChart(keys, byMonth) {
  const canvas = document.getElementById("sales-chart");
  if (!canvas || typeof Chart === "undefined") return;

  const labels = keys.map(getMonthLabel);
  const data = keys.map((k) => byMonth[k]?.total || 0);

  if (salesChart) salesChart.destroy();

  salesChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Monthly Sales (₹)",
          data,
          backgroundColor: "rgba(201, 162, 39, 0.7)",
          borderColor: "#c9a227",
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#94a3b8" } },
      },
      scales: {
        x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(255,255,255,0.05)" } },
        y: {
          ticks: {
            color: "#94a3b8",
            callback: (v) => "₹" + (v / 100000).toFixed(1) + "L",
          },
          grid: { color: "rgba(255,255,255,0.05)" },
        },
      },
    },
  });
}

function populateMonthFilter() {
  const sel = document.getElementById("report-month");
  if (!sel) return;
  // Clear any existing except default first option
  sel.innerHTML = '<option value="">All Months</option>';
  const keys = salesData.map(d => d.month).sort().reverse();
  keys.forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = getMonthLabel(key);
    sel.appendChild(opt);
  });
}

function exportReportData(keys, byMonth) {
  window._salesExport = keys.map((key) => ({
    month: getMonthLabel(key),
    transactions: byMonth[key].count,
    bills: byMonth[key].bills,
    payments: byMonth[key].payments,
    total: byMonth[key].total,
  }));
}

document.getElementById("export-csv-btn")?.addEventListener("click", () => {
  const data = window._salesExport || [];
  if (!data.length) {
    alert("No data to export");
    return;
  }
  const headers = ["Month", "Transactions", "Bills", "Payments", "Total (INR)"];
  const rows = data.map((r) => [r.month, r.transactions, r.bills, r.payments, r.total]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `sales-report-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
});

document.getElementById("print-report-btn")?.addEventListener("click", () => {
  window.print();
});

document.getElementById("report-month")?.addEventListener("change", renderSalesReport);
document.getElementById("refresh-report-btn")?.addEventListener("click", renderSalesReport);

document.addEventListener("DOMContentLoaded", async () => {
  await fetchSalesReport();
  populateMonthFilter();
  renderSalesReport();
});

