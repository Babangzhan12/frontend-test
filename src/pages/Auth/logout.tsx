import { useEffect } from "react";
import { useAuth } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout();   
    localStorage.removeItem("pinUnlocked");         
    navigate("/login");  
  }, []);

  return null;
}
