import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import UnlockPin from "../pages/Auth/unlock-pin";
import SuccessScreen from "../components/success-screen";
import CreatePin from "../pages/Auth/create-pin";
import { useEffect, useState } from "react";
import api from "../services/axios";
import CreateProfile from "../pages/Profile/create-profile";
import Logout from "../pages/Auth/logout";
import Home from "../pages/Home/home";

const GuestOnly = ({ children }: any) => {
  const token = useAuth((s) => s.token);

  if (token) return <Navigate to="/dashboard" replace />;
  return children;
};

const LoggedInOnly = ({ children }: any) => {
  const token = useAuth((s) => s.token);

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const Protected = ({ children }: any) => {
  const [status, setStatus] = useState("loading");
  const token = useAuth((s) => s.token);
  const location = useLocation();
  const pinUnlocked = localStorage.getItem("pinUnlocked") === "true";

  useEffect(() => {
    async function check() {
      try {
        if (!token) {
          setStatus("unauth");
          return;
        }
        const res = await api.get("/auth/me");
        useAuth.getState().setUser(res.data);
        const user = res.data;
        console.debug("/auth/me", user);


        if (!user.hasProfile) {
          setStatus("no-profile");
          return;
        }

        if (!user.hasPin) {
          setStatus("no-pin");
          return;
        }

        setStatus("ok");
      } catch (e) {
        setStatus("unauth");
      }
    }
    check();
  }, [token]);

  console.debug("Protected status:", { status, token, path: location.pathname });
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauth") return <Navigate to="/login" />;
  if (status === "no-profile") {
    if (location.pathname !== "/create-profile") return <Navigate to="/create-profile" />;
  }
  if (status === "no-pin") {
    if (location.pathname !== "/create-pin") return <Navigate to="/create-pin" />;
  }
   if (status === "ok" && !pinUnlocked && location.pathname !== "/unlock-pin") {
    return <Navigate to="/unlock-pin" replace />;
  }
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route 
        path="/" 
        element={
          <GuestOnly>
            <Home />
          </GuestOnly>
        }
      />

        <Route path="/login" element={
          <GuestOnly>
            <Login />
          </GuestOnly>
          } />
        <Route path="/register" element={
          <GuestOnly>
            <Register />
          </GuestOnly>
          } />
        <Route path="/logout" element={
            <Logout />
          } />
        <Route
          path="/dashboard"
          element={
            <Protected>
            <AppLayout>
                <Dashboard />
            </AppLayout>
            </Protected>
          }
        />
        <Route path="/profile" element={
           <Protected>
          <AppLayout><Profile /></AppLayout>
           </Protected>
          } />
        <Route path="/create-profile" element={
          <LoggedInOnly>
            <AppLayout  showTotalBalance={false}>
            <CreateProfile />
            </AppLayout>
          </LoggedInOnly>
          } />
        <Route path="/accounts" element={
          <Protected>
            <AppLayout><Accounts /></AppLayout>
          </Protected>
          } />
        <Route path="/accounts/new" element={
          <Protected>
            <AppLayout><NewAccount /></AppLayout>
          </Protected>
          } />
        <Route path="/deposit/:id" element={
          <Protected>
            <AppLayout><Deposit /></AppLayout>
          </Protected>
          } />
        <Route path="/withdraw/:id" element={
          <Protected>
            <AppLayout><Withdraw /></AppLayout>
          </Protected>
          } />
        <Route path="/history" element={
          <Protected>
            <AppLayout><History /></AppLayout>
          </Protected>
          } />
        <Route path="/unlock-pin" element={
          <LoggedInOnly>
            <UnlockPin />
           </LoggedInOnly>
          } />
        <Route
        path="/success-withdraw"
        element={
          <Protected>
            <SuccessScreen title="Withdraw Successful!" goTo="/accounts" />
          </Protected>
      }
        />
        <Route path="/create-pin" element={
          <LoggedInOnly>
            {/* <AppLayout> */}
            <CreatePin />
            {/* </AppLayout> */}
          </LoggedInOnly>
          } />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
