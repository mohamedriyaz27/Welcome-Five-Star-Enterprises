import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Printer, QrCode, BarChart3, Globe, LogOut, X, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    if (onClose) onClose();
    navigate("/admin/login");
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/properties", label: "Properties", icon: Home },
    { href: "/admin/bills", label: "Bill Print", icon: Printer },
    { href: "/admin/payments", label: "QR Payment", icon: QrCode },
    { href: "/admin/sales-report", label: "Sales Report", icon: BarChart3 },
  ];

  return (
    <aside className={`admin-sidebar no-print ${isOpen ? "open" : ""}`}>
      <div className="brand" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>WELCOME ENTERPRISES</h2>
          <p style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>Admin Panel</p>
        </div>
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
          <X style={{ width: 20, height: 20 }} />
        </button>
      </div>
      <nav className="admin-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={isActive ? "active" : ""}
              onClick={onClose}
            >
              <Icon style={{ width: 18, height: 18 }} /> {item.label}
            </Link>
          );
        })}
        <Link to="/" onClick={onClose}>
          <Globe style={{ width: 18, height: 18 }} /> View Website
        </Link>
        <a href="#logout" onClick={handleLogout} id="logout-btn">
          <LogOut style={{ width: 18, height: 18 }} /> Logout
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
