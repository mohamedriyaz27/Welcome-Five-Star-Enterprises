import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded Public Pages
const Home = lazy(() => import("../pages/public/Home"));
const About = lazy(() => import("../pages/public/About"));
const Services = lazy(() => import("../pages/public/Services"));
const LegalServices = lazy(() => import("../pages/public/LegalServices"));
const Advocate = lazy(() => import("../pages/public/Advocate"));
const OnlineServices = lazy(() => import("../pages/public/OnlineServices"));
const Properties = lazy(() => import("../pages/public/Properties"));
const HajjUmrah = lazy(() => import("../pages/public/HajjUmrah"));
const Contact = lazy(() => import("../pages/public/Contact"));

// Lazy-loaded Admin Pages
const Login = lazy(() => import("../pages/admin/Login"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Bills = lazy(() => import("../pages/admin/Bills"));
const Payments = lazy(() => import("../pages/admin/Payments"));
const AdminProperties = lazy(() => import("../pages/admin/Properties"));
const SalesReport = lazy(() => import("../pages/admin/SalesReport"));

// Loading Indicator Fallback Component
function PageLoader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "var(--gold-400)" }}>
      <h3>Loading Page Content...</h3>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes with Public Layout */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/legal-services" element={<PublicLayout><LegalServices /></PublicLayout>} />
        <Route path="/advocate" element={<Advocate />} />
        <Route path="/online-services" element={<PublicLayout><OnlineServices /></PublicLayout>} />
        <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
        <Route path="/hajj-umrah" element={<PublicLayout><HajjUmrah /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Unprotected Admin Login Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes with Admin Layout */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/bills" element={<ProtectedRoute><AdminLayout><Bills /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute><AdminLayout><Payments /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/properties" element={<ProtectedRoute><AdminLayout><AdminProperties /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/sales-report" element={<ProtectedRoute><AdminLayout><SalesReport /></AdminLayout></ProtectedRoute>} />

        {/* Fallback Catch All redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
