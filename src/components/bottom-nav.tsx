import { IconHome, IconUser, IconCreditCard } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Home", icon: <IconHome size={22} />, path: "/" },
    { label: "Accounts", icon: <IconCreditCard size={22} />, path: "/accounts" },
    { label: "Profile", icon: <IconUser size={22} />, path: "/profile" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 65,
        background: "white",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "0px -2px 5px rgba(0,0,0,0.05)",
        zIndex: 999,
      }}
    >
      {items.map((item) => {
        const active = location.pathname === item.path;

        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "33.3%",
              cursor: "pointer",
              color: active ? "#0a4bd3" : "#777",
            }}
          >
            {item.icon}
            <span style={{ fontSize: 12, marginTop: 4 }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
