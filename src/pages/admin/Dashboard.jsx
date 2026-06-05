import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import inquiryService from "../../services/inquiryService";
import invoiceService from "../../services/invoiceService";

export function Dashboard() {
  const [stats, setStats] = useState({ bills: 0, payments: 0, revenue: 0, inquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
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

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [inqStatsRes, salesReportRes, inquiriesRes] = await Promise.all([
          inquiryService.getStats(),
          invoiceService.getSalesReport(),
          inquiryService.getInquiries({ limit: 10 })
        ]);

        let totalInquiries = 0;
        if (inqStatsRes.success) {
          totalInquiries = Object.values(inqStatsRes.data).reduce((a, b) => a + b, 0);
        }

        let totalSales = 0;
        let totalBillsCount = 0;
        let totalPaymentsCount = 0;
        if (salesReportRes.success) {
          salesReportRes.data.forEach((item) => {
            totalSales += item.total_sales;
            totalBillsCount += item.bills;
            totalPaymentsCount += item.payments;
          });
        }

        setStats({
          bills: totalBillsCount,
          payments: totalPaymentsCount,
          revenue: totalSales,
          inquiries: totalInquiries,
        });

        if (inquiriesRes.success) {
          setRecentInquiries(inquiriesRes.data.items || inquiriesRes.data);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <span style={{ color: "var(--gray-400)" }}>Welcome, Admin</span>
      </div>

      {loading ? (
        <p style={{ color: "var(--gold-400)", textAlign: "center", margin: "2rem 0" }}>Loading dashboard analytics...</p>
      ) : (
        <>
          <div className="stats-row" id="dash-stats">
            <div className="admin-stat">
              <div className="value">{stats.bills}</div>
              <div className="label">Total Bills</div>
            </div>
            <div className="admin-stat">
              <div className="value">{stats.payments}</div>
              <div className="label">Payments</div>
            </div>
            <div className="admin-stat">
              <div className="value">{formatCurrency(stats.revenue)}</div>
              <div className="label">Total Revenue</div>
            </div>
            <div className="admin-stat">
              <div className="value">{stats.inquiries}</div>
              <div className="label">Inquiries</div>
            </div>
          </div>

          <div className="admin-card">
            <h3>Recent Inquiries</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="inquiries-body">
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="5">No inquiries yet</td>
                  </tr>
                ) : (
                  recentInquiries.map((i) => (
                    <tr key={i._id || i.id}>
                      <td>{formatDate(i.createdAt)}</td>
                      <td>{i.customerName}</td>
                      <td>{i.mobile}</td>
                      <td>{(i.message || "").slice(0, 50)}</td>
                      <td>
                        <span className="tag">{i.status || "new"}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-card">
            <h3>Quick Actions</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link to="/admin/bills" className="btn btn-primary">Create Bill</Link>
              <Link to="/admin/payments" className="btn btn-green">Record Payment</Link>
              <Link to="/admin/sales-report" className="btn btn-outline">View Sales Report</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
