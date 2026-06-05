import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../common/Sidebar";
import { useAuth } from "../../context/AuthContext";

export function AdminLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="loading-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "var(--gold-400)" }}>
        <h3>Loading Session...</h3>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {!isSidebarOpen && (
        <button 
          className="admin-sidebar-toggle no-print" 
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          <Menu style={{ width: 20, height: 20 }} />
        </button>
      )}

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
