import { useState } from "react";
import { Button, Text } from "@mantine/core";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function UnlockPin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [failCount, setFailCount] = useState(0);
  const [shake, setShake] = useState(false);

  const press = (d: string) => {
    if (pin.length < 6) setPin(pin + d);
  };

  const back = () => setPin(pin.slice(0, -1));

  const verify = async () => {
    const res = await api.post("/auth/verify-pin", { pin });

    if (!res.data.valid) {
      setPin("");
       setShake(true);

        setTimeout(() => setShake(false), 400);
      setFailCount(failCount + 1);

      if (failCount + 1 >= 3) {
        await api.post("/auth/block");
        alert("PIN salah 3x, akun Anda diblokir sementara!");
        navigate("/login");
        return;
      }

      alert(`PIN salah! Percobaan ${failCount + 1}/3`);
      return;
    }

    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        padding: "40px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Text fw={700} fz={24}>
          Unlock App
        </Text>

        <div
        className={shake ? "shake" : ""}
        style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
          {Array(6).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "2px solid #0a4bd3",
                background: i < pin.length ? "#0a4bd3" : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16
      }}>
        {["1","2","3","4","5","6","7","8","9"].map((d) => (
          <Button key={d} variant="outline" size="xl" radius="xl" onClick={() => press(d)}>
            {d}
          </Button>
        ))}

        <Button variant="outline" size="xl" radius="xl" onClick={back}>⌫</Button>
        <Button variant="outline" size="xl" radius="xl" onClick={() => press("0")}>0</Button>
        <Button radius="xl" size="xl" onClick={verify} disabled={pin.length !== 6}>OK</Button>
      </div>
    </div>
  );
}
