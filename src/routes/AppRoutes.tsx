import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth.store";
import Login from "../pages/Login/login";
import Dashboard from "../pages/Dashboard/dashboard";
import NewAccount from "../pages/NewAccount/new-account";
import Deposit from "../pages/Deposit/deposit";
import Withdraw from "../pages/Withdraw/withdraw";
import Register from "../pages/Register/register";
import Profile from "../pages/Profile/profile";
import Accounts from "../pages/Accounts/accounts";
import AppLayout from "../components/app-layout";
import App from "../App";
import History from "../pages/History/history";

const Protected = ({ children }: any) => {
  const token = useAuth((s) => s.token);
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            // <Protected>
            <AppLayout>
                <Dashboard />
            </AppLayout>
            // </Protected>
          }
        />
        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
        <Route path="/accounts" element={<AppLayout><Accounts /></AppLayout>} />
        <Route path="/accounts/new" element={<AppLayout><NewAccount /></AppLayout>} />
        <Route path="/deposit/:id" element={<AppLayout><Deposit /></AppLayout>} />
        <Route path="/withdraw/:id" element={<AppLayout><Withdraw /></AppLayout>} />
        <Route path="/history" element={<AppLayout><History /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
