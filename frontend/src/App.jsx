import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import AppRoutes from "./routes/AppRoutes";

// Import global style sheets
import "./styles/variables.css";
import "./styles/main.css";
import "./styles/admin.css";
import "./styles/print.css";

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <AlertProvider>
            <AppRoutes />
          </AlertProvider>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
