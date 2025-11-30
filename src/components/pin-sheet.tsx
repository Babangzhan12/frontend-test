import { Drawer, Button, Text } from "@mantine/core";
import { useState } from "react";
import api from "../services/axios";

export default function PinSheet({ opened, onClose, onSuccess }: any) {
  const [pin, setPin] = useState("");

  const press = (d: string) => {
    if (pin.length < 6) setPin(pin + d);
  };

  const back = () => setPin(pin.slice(0, -1));

  const verify = async () => {
    const res = await api.post("/auth/verify-pin", { pin });
    if (res.data?.status) {
      setPin("");
      onSuccess();
      onClose();
    } else {
      alert("Wrong PIN");
      setPin("");
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="bottom"
      size="auto"
      styles={{
        content: { borderRadius: "20px 20px 0 0" },
      }}
    >
      <Text fw={700} fz={20} ta="center" mb="md">
        Enter PIN
      </Text>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20 }}>
        {["1","2","3","4","5","6","7","8","9"].map(n => (
          <Button key={n} onClick={() => press(n)} variant="outline" size="xl" radius="xl">{n}</Button>
        ))}

        <Button onClick={back} variant="outline" size="xl" radius="xl">⌫</Button>
        <Button onClick={() => press("0")} variant="outline" size="xl" radius="xl">0</Button>

        <Button
          onClick={verify}
          disabled={pin.length !== 6}
          radius="xl"
          size="xl"
        >
          OK
        </Button>
      </div>
    </Drawer>
  );
}
