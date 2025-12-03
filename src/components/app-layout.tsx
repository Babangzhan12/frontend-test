import useIdleLock from "../hooks/useIdleLock";
import BottomNav from "./bottom-nav";
import useTotalBalance from "../hooks/useTotalBalance";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Loader } from "@mantine/core";

export default function AppLayout({
  children,
  showTotalBalance = true,
}: {
  children: React.ReactNode;
  showTotalBalance?: boolean;
}) {
  useIdleLock(60000);

  const { total, loading } = useTotalBalance();
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f9fc" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0a4bd3, #1e6bff)",
          padding: "30px 20px 100px 20px",
          color: "white",
          borderRadius: "0 0 25px 25px",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 700 }}>Welcome back 👋</h2>

        {showTotalBalance && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {loading ? (
              <Loader color="white" size="sm" />
            ) : (
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>
                {visible
                  ? `Rp ${total.toLocaleString("id-ID")}`
                  : "Rp •••••••••"}
              </h1>
            )}

            {!loading && (
              <div
                onClick={() => setVisible(!visible)}
                style={{
                  cursor: "pointer",
                  marginTop: 5,
                  opacity: 0.8,
                }}
              >
                {visible ? (
                  <IconEyeOff color="white" />
                ) : (
                  <IconEye color="white" />
                )}
              </div>
            )}

          </div>
        )}

        {showTotalBalance && (
          <p style={{ margin: 0, opacity: 0.8 }}>Total Balance</p>
        )}
      </div>

      <div
        className="fade-slide"
        style={{
          padding: "20px",
          paddingBottom: "100px",
          marginTop: showTotalBalance ? "-70px" : "0px",
          background: "#f3f6fa",
          borderRadius: "20px 20px 0 0",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>

      <BottomNav />
    </div>
  );
}