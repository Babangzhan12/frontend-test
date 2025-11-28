import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function SuccessScreen({ title = "Success!", goTo = "/" }) {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: 80,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "#32cd32",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: 60, color: "white" }}>✓</span>
      </div>

      <Text fw={700} fz={28} mt="lg">{title}</Text>

      <Button mt="xl" radius="md" onClick={() => navigate(goTo)}>
        Continue
      </Button>
    </div>
  );
}
