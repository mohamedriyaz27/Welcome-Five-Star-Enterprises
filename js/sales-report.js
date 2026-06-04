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

function aggregateMonthlySales() {
  const bills = getBills();
  const payments = getPayments();
  const combined = [
    ...bills.map((b) => ({ date: b.date, amount: b.total, type: "bill", ref: b.billNo })),
    ...payments.map((p) => ({ date: p.date, amount: p.amount, type: "payment", ref: p.id })),
  ];

  const byMonth = {};
  combined.forEach((item) => {
    const key = getMonthKey(item.date);
    if (!byMonth[key]) byMonth[key] = { total: 0, count: 0, bills: 0, payments: 0 };
    byMonth[key].total += item.amount;
    byMonth[key].count += 1;
    if (item.type === "bill") byMonth[key].bills += 1;
    else byMonth[key].payments += 1;
  });

  return byMonth;
}

function renderSalesReport() {
  const byMonth = aggregateMonthlySales();
  const keys = Object.keys(byMonth).sort();
  const selectedMonth = document.getElementById("report-month")?.value;
  const filterKeys = selectedMonth ? [selectedMonth] : keys.slice(-12);

  let totalSales = 0;
  let totalTransactions = 0;

  const tbody = document.getElementById("sales-report-body");
  if (tbody) {
    tbody.innerHTML = filterKeys.length
      ? filterKeys
          .reverse()
          .map((key) => {
            const d = byMonth[key];
            totalSales += d.total;
            totalTransactions += d.count;
            return `
        <tr>
          <td>${getMonthLabel(key)}</td>
          <td>${d.count}</td>
          <td>${d.bills}</td>
          <td>${d.payments}</td>
          <td><strong>${formatCurrency(d.total)}</strong></td>
        </tr>`;
          })
          .join("")
      : '<tr><td colspan="5">No sales data for selected period</td></tr>';
  }

  document.getElementById("report-total-sales").textContent = formatCurrency(totalSales);
  document.getElementById("report-total-transactions").textContent = totalTransactions;
  document.getElementById("report-avg-sale").textContent =
    totalTransactions ? formatCurrency(totalSales / totalTransactions) : "₹0";

  renderSalesChart(filterKeys, byMonth);
  exportReportData(filterKeys, byMonth);
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
  const byMonth = aggregateMonthlySales();
  const keys = Object.keys(byMonth).sort().reverse();
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

document.addEventListener("DOMContentLoaded", () => {
  populateMonthFilter();
  renderSalesReport();
});
