import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useIdleLock(timeoutMs = 60000) {
  const navigate = useNavigate();
  const timer = useRef<any>(null);

  const resetTimer = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      navigate("/unlock-pin");
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
  }, []);
}
