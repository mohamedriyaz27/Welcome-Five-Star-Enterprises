import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [confirm, setConfirm] = useState(null);

  const showAlert = useCallback((message, type = "success") => {
    const id = Date.now().toString() + Math.random().toString();
    setAlerts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3500);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const showConfirm = useCallback((message, onConfirm, onCancel) => {
    setConfirm({ message, onConfirm, onCancel });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      
      {/* Toast Notifications */}
      <div className="toast-container no-print">
        {alerts.map((alert) => {
          let Icon = Info;
          if (alert.type === "success") Icon = CheckCircle;
          if (alert.type === "error") Icon = AlertCircle;

          return (
            <div key={alert.id} className={`toast-alert toast-${alert.type}`}>
              <div className="toast-icon">
                <Icon style={{ width: 20, height: 20 }} />
              </div>
              <div className="toast-message">{alert.message}</div>
              <button className="toast-close" onClick={() => removeAlert(alert.id)}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {confirm && (
        <div className="modal-overlay active" style={{ zIndex: 11000 }} onClick={() => setConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "400px", textAlign: "center" }}>
            <h3 style={{ color: "var(--gold-400)", marginBottom: "1rem" }}>Confirm Action</h3>
            <p style={{ color: "var(--gray-300)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              {confirm.message}
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => {
                  const cb = confirm.onConfirm;
                  setConfirm(null);
                  if (cb) cb();
                }}
              >
                Confirm
              </button>
              <button 
                className="btn btn-outline" 
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => {
                  const cb = confirm.onCancel;
                  setConfirm(null);
                  if (cb) cb();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

export default AlertContext;
