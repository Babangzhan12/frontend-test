import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useIdleLock(timeoutMs = 60000) {
  const navigate = useNavigate();
  const location = useLocation();
  const timer = useRef<any>(null);

  const lockApp = () => {
    localStorage.setItem("pinUnlocked", "false");

    if (location.pathname !== "/unlock-pin") {
      navigate("/unlock-pin", { replace: true });
    }
  };

  const resetTimer = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      lockApp();
    }, timeoutMs);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keypress", "touchstart", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));

    resetTimer();

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
      clearTimeout(timer.current);
    };
  }, [location.pathname]);

  return null;
}
