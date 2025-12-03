import { useState } from "react";
import { Paper, TextInput, PasswordInput, Button, Title } from "@mantine/core";
import { useAuth } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = useAuth((s) => s.login);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();
  setLoading(true);

  const ok = await login(username, password);

  setLoading(false);

  if (ok) navigate("/dashboard", { replace: true });
  else alert("Invalid username or password!");
};

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f5f6fa"
    }}>
      <Paper shadow="md" radius="md" p="xl" style={{ width: 380 }}>
        <Title order={2} ta="center" mb="md">
          Login
        </Title>

        <form onSubmit={doLogin}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mt="md"
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mt="md"
          />

          <Button
            fullWidth
            mt="lg"
            size="md"
            type="submit"
            loading={loading}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
