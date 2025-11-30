import { Button, Title, Text, Paper } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconCreditCard } from "@tabler/icons-react";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 30px",
        background: "#f5f6fa"
      }}
    >
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <IconCreditCard size={80} stroke={1.5} color="#0a4bd3" />
        <Title order={2} mt="md">Bank Saving System</Title>
        <Text c="dimmed" mt="xs">Manage your accounts easily & securely</Text>
      </div>

      <Paper shadow="md" radius="md" p="xl">
        <Button 
          component={Link}
          to="/login" 
          fullWidth 
          size="lg" 
          radius="xl"
          style={{ marginBottom: 16 }}
        >
          Login
        </Button>

        <Button 
          component={Link}
          to="/register" 
          fullWidth 
          size="lg" 
          radius="xl"
          variant="outline"
        >
          Register
        </Button>
      </Paper>

      <div style={{ textAlign: "center", paddingBottom: 10 }}>
        <Text size="xs" c="dimmed">© 2025 Bank Saving App</Text>
      </div>
    </div>
  );
}
