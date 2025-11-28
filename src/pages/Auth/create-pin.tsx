import { useState } from "react";
import { Button, Text } from "@mantine/core";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function CreatePin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const press = (d: string) => {
    if (pin.length < 6) setPin(pin + d);
  };

  const pressConfirm = (d: string) => {
    if (confirmPin.length < 6) setConfirmPin(confirmPin + d);
  };

  const back = () => {
    if (confirmPin) setConfirmPin(confirmPin.slice(0, -1));
    else setPin(pin.slice(0, -1));
  };

  const submit = async () => {
    if (pin !== confirmPin) {
      alert("PIN does not match!");
      return;
    }

    await api.post("/auth/set-pin", { pin });
    alert("PIN created!");
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 30px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Text fw={700} fz={24}>
          {pin.length < 6 ? "Create PIN" : "Confirm PIN"}
        </Text>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
          {(pin.length < 6 ? pin : confirmPin).padEnd(6, ".").split("").map((x, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: x !== "." ? "#0a4bd3" : "transparent",
                border: "2px solid #0a4bd3",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {["1","2","3","4","5","6","7","8","9"].map(n => (
          <Button key={n} variant="outline" radius="xl" size="xl"
            onClick={() => pin.length < 6 ? press(n) : pressConfirm(n)}
          >
            {n}
          </Button>
        ))}

        <Button radius="xl" size="xl" variant="outline" onClick={back}>⌫</Button>
        <Button radius="xl" size="xl" variant="outline"
           onClick={() => pin.length < 6 ? press("0") : pressConfirm("0")}
        >
          0
        </Button>

        {pin.length === 6 && confirmPin.length === 6 ? (
          <Button radius="xl" size="xl" onClick={submit}>OK</Button>
        ) : (
          <Button radius="xl" size="xl" disabled>OK</Button>
        )}
      </div>
    </div>
  );
}
