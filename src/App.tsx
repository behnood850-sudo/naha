import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ConfigList from "./pages/ConfigList";
import BuyConfig from "./pages/BuyConfig";
import Charge from "./pages/Charge";
import Search from "./pages/Search";
import RenewConfig from "./pages/RenewConfig";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PaymentsList from "./pages/PaymentsList";
import NotFound from "./pages/NotFound";

import { AdminLayout } from "./components/AdminLayout";
import AdminServers from "./pages/admin/AdminServers";
import AdminAddServer from "./pages/admin/AdminAddServer";
import AdminConfigs from "./pages/admin/AdminConfigs";
import AdminAmounts from "./pages/admin/AdminAmounts";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminServices from "./pages/admin/AdminServices";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCreateAgent from "./pages/admin/AdminCreateAgent";
import AdminAgentInfo from "./pages/admin/AdminAgentInfo";
import AdminEditUser from "./pages/admin/AdminEditUser";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configs" element={<ConfigList />} />
          <Route path="/buy" element={<BuyConfig />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="/search" element={<Search />} />
          <Route path="/renew/:id" element={<RenewConfig />} />
          <Route path="/payments" element={<PaymentsList />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="servers" element={<AdminServers />} />
            <Route path="add-server" element={<AdminAddServer />} />
            <Route path="configs" element={<AdminConfigs />} />
            <Route path="amounts" element={<AdminAmounts />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="create-agent" element={<AdminCreateAgent />} />
            <Route path="agent-info/:id" element={<AdminAgentInfo />} />
            <Route path="edit-user/:id" element={<AdminEditUser />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
