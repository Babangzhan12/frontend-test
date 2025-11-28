import useIdleLock from "../hooks/useIdleLock";
import BottomNav from "./bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
useIdleLock(60000);
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
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>
          Rp 12.500.000
        </h1>
        <p style={{ margin: 0, opacity: 0.8 }}>Total Balance</p>
      </div>

      <div
        className="fade-slide"
        style={{
          padding: "20px",
          paddingBottom: "100px",
          marginTop: "-70px",
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

