import React, { useState, useEffect } from "react";
import { useAlert } from "../../context/AlertContext";
import invoiceService from "../../services/invoiceService";

export function SalesReport() {
  const { showAlert } = useAlert();
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthsList, setMonthsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statistics
  const [stats, setStats] = useState({ totalSales: 0, totalTx: 0, avgSale: 0 });

  // Formatters
  const formatCurrency = (n) => {
    return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
  };

  const getMonthLabel = (key) => {
    const [y, m] = key.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };

  // Load Sales Data
  const loadSalesReport = async () => {
    try {
      setLoading(true);
      const res = await invoiceService.getSalesReport();
      if (res.success) {
        setSalesData(res.data);
        
        // Populate months filter
        const months = res.data.map((d) => d.month).sort().reverse();
        setMonthsList(months);
      }
    } catch (err) {
      console.error("Error loading sales report data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalesReport();
  }, []);

  // Filter & Stats Compute
  useEffect(() => {
    const filtered = selectedMonth
      ? salesData.filter((d) => d.month === selectedMonth)
      : salesData.slice(-12); // Last 12 months

    setFilteredData(filtered);

    // Compute stats
    let totalSales = 0;
    let totalTx = 0;
    filtered.forEach((d) => {
      totalSales += d.total_sales;
      totalTx += d.transactions;
    });

    setStats({
      totalSales,
      totalTx,
      avgSale: totalTx ? totalSales / totalTx : 0,
    });
  }, [selectedMonth, salesData]);

  // Export CSV Handler
  const exportCSV = () => {
    if (!filteredData.length) {
      showAlert("No data to export", "error");
      return;
    }
    const headers = ["Month", "Transactions", "Bills", "Payments", "Total (INR)"];
    const rows = filteredData.map((r) => [getMonthLabel(r.month), r.transactions, r.bills, r.payments, r.total_sales]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `sales-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  // Find max value for CSS chart scaling
  const maxSalesValue = filteredData.reduce((max, d) => (d.total_sales > max ? d.total_sales : max), 0) || 1;

  return (
    <>
      <div className="admin-header no-print">
        <h1>Sales Report & Analytics</h1>
        <span style={{ color: "var(--gray-400)" }}>Admin Panel</span>
      </div>

      {/* Filter Options */}
      <div className="admin-card no-print" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: "200px" }}>
          <label>Filter By Month</label>
          <select 
            id="report-month" 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {monthsList.map((m) => (
              <option key={m} value={m}>{getMonthLabel(m)}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button type="button" className="btn btn-primary" onClick={loadSalesReport}>
            Refresh
          </button>
          <button type="button" className="btn btn-green" onClick={exportCSV}>
            Export CSV
          </button>
          <button type="button" className="btn btn-outline" onClick={handlePrint}>
            Print Report
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "var(--gold-400)", textAlign: "center", margin: "2rem 0" }}>Loading sales data...</p>
      ) : (
        <>
          {/* Key Statistics Row */}
          <div className="stats-row">
            <div className="admin-stat">
              <div className="value">{formatCurrency(stats.totalSales)}</div>
              <div className="label">Total Revenue</div>
            </div>
            <div className="admin-stat">
              <div className="value">{stats.totalTx}</div>
              <div className="label">Total Transactions</div>
            </div>
            <div className="admin-stat">
              <div className="value">{formatCurrency(stats.avgSale)}</div>
              <div className="label">Average Transaction Value</div>
            </div>
          </div>

          {/* Sales Report Table */}
          <div className="admin-card">
            <h3>Monthly Breakdowns</h3>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Transactions</th>
                    <th>Bills</th>
                    <th>Payments</th>
                    <th>Total Sales</th>
                  </tr>
                </thead>
                <tbody id="sales-report-body">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="5">No data available for selected period</td>
                    </tr>
                  ) : (
                    filteredData.slice().reverse().map((d) => (
                      <tr key={d.month}>
                        <td>{getMonthLabel(d.month)}</td>
                        <td>{d.transactions}</td>
                        <td>{d.bills}</td>
                        <td>{d.payments}</td>
                        <td><strong>{formatCurrency(d.total_sales)}</strong></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pure React/CSS Interactive Chart */}
          <div className="admin-card no-print">
            <h3>Visual Analytics (Revenue Trend)</h3>
            <div className="chart-container" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "300px", padding: "1.5rem 1rem", background: "var(--navy-900)", borderRadius: "8px", border: "1px solid var(--navy-600)", gap: "10px" }}>
              {filteredData.length === 0 ? (
                <div style={{ color: "var(--gray-500)", margin: "auto" }}>No data to display</div>
              ) : (
                filteredData.map((d) => {
                  const percentage = (d.total_sales / maxSalesValue) * 80; // Scale to max 80% height
                  return (
                    <div 
                      key={d.month} 
                      style={{ 
                        flex: 1, 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        height: "100%", 
                        justifyContent: "flex-end" 
                      }}
                    >
                      <div 
                        className="chart-bar" 
                        style={{ 
                          width: "80%", 
                          maxWidth: "50px", 
                          height: `${Math.max(percentage, 5)}%`, 
                          background: "linear-gradient(to top, rgba(201, 162, 39, 0.5), rgba(201, 162, 39, 0.9))", 
                          border: "1px solid var(--gold-400)", 
                          borderRadius: "4px 4px 0 0", 
                          transition: "height 0.4s ease",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative"
                        }}
                        title={`${getMonthLabel(d.month)}: ${formatCurrency(d.total_sales)}`}
                      >
                        {/* Tooltip value */}
                        <div style={{ position: "absolute", top: "-24px", color: "var(--gold-400)", fontSize: "0.75rem", fontWeight: "bold" }}>
                          {d.total_sales >= 100000 ? `${(d.total_sales / 100000).toFixed(1)}L` : `${(d.total_sales / 1000).toFixed(0)}k`}
                        </div>
                      </div>
                      <span style={{ color: "var(--gray-400)", fontSize: "0.75rem", marginTop: "0.5rem", textAlign: "center" }}>
                        {getMonthLabel(d.month)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SalesReport;
