import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/app/ProtectedRoute";
import AppShell from "@/components/app/AppShell";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import AppRedirect from "./pages/app/AppRedirect";
import CustomerDashboard from "./pages/app/CustomerDashboard";
import NewShipment from "./pages/app/NewShipment";
import ShipmentTrack from "./pages/app/ShipmentTrack";
import DriverDashboard from "./pages/app/DriverDashboard";
import AdminDashboard from "./pages/app/AdminDashboard";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Branches from "./pages/Branches";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Solutions from "./pages/Solutions";
import LeoShoe from "./pages/LeoShoe.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/news" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />

            {/* App entry: redirects to role home */}
            <Route path="/app" element={<AppRedirect />} />

            {/* Customer */}
            <Route path="/app/customer" element={
              <ProtectedRoute requireRole="customer"><AppShell><CustomerDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/customer/new" element={
              <ProtectedRoute requireRole="customer"><AppShell><NewShipment /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/customer/history" element={
              <ProtectedRoute requireRole="customer"><AppShell><CustomerDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/customer/shipment/:id" element={
              <ProtectedRoute requireRole="customer"><AppShell><ShipmentTrack /></AppShell></ProtectedRoute>
            } />

            {/* Driver */}
            <Route path="/app/driver" element={
              <ProtectedRoute requireRole="driver"><AppShell><DriverDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/driver/active" element={
              <ProtectedRoute requireRole="driver"><AppShell><DriverDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/driver/earnings" element={
              <ProtectedRoute requireRole="driver"><AppShell><DriverDashboard /></AppShell></ProtectedRoute>
            } />

            {/* Admin */}
            <Route path="/app/admin" element={
              <ProtectedRoute requireRole="admin"><AppShell><AdminDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/admin/orders" element={
              <ProtectedRoute requireRole="admin"><AppShell><AdminDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/admin/fleet" element={
              <ProtectedRoute requireRole="admin"><AppShell><AdminDashboard /></AppShell></ProtectedRoute>
            } />
            <Route path="/app/admin/map" element={
              <ProtectedRoute requireRole="admin"><AppShell><AdminDashboard /></AppShell></ProtectedRoute>
            } />

            <Route path="/leo-shoe" element={<LeoShoe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
