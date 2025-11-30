import { useState } from "react";
import { Paper, TextInput, PasswordInput, Button, Title } from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/axios";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const doRegister = async () => {
    if (!username || !password) {
      alert("Username dan password wajib diisi!");
      return;
    }

    if (password !== confirm) {
      alert("Password dan Confirm Password tidak sama!");
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        password,
      });

      alert("Register berhasil! Silakan login.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f6fa",
      }}
    >
      <Paper shadow="md" radius="md" p="xl" style={{ width: 380 }}>
        <Title order={2} ta="center" mb="md">
          Register
        </Title>

        <TextInput
          label="Username"
          placeholder="Choose username"
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

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          mt="md"
        />

        <Button fullWidth mt="lg" size="md" onClick={doRegister}>
          Register
        </Button>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link to="/login" style={{ fontSize: 14 }}>
            Already have an account? Login
          </Link>
        </div>
      </Paper>
    </div>
  );
}
