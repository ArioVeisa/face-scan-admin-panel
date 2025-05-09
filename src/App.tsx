
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import FaceDetectionPage from "./pages/FaceDetectionPage";
import HistoryPage from "./pages/HistoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (adminRole: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(adminRole);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            
            {/* Protected routes */}
            <Route element={<DashboardLayout userRole={isAdmin ? "admin" : "user"} />}>
              <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
              {/* Admin only routes */}
              <Route path="/mahasiswa" element={isLoggedIn && isAdmin ? <StudentsPage /> : <Navigate to={isLoggedIn ? "/" : "/login"} />} />
              <Route path="/deteksi" element={isLoggedIn ? <FaceDetectionPage /> : <Navigate to="/login" />} />
              <Route path="/riwayat" element={isLoggedIn ? <HistoryPage /> : <Navigate to="/login" />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
