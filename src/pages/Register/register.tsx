import { useState } from "react";
import { Button, TextInput, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    try {
      await api.post("/auth/register", {
        username,
        password,
      });

      alert("Register success! Please login.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <Paper w={350} mx="auto" p="lg" mt={80} shadow="md">
      <h2>Register</h2>

      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        mt="md"
        required
      />

      <TextInput
        label="Password"
        type="password"
        value={password}
        mt="md"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button fullWidth mt="lg" onClick={doRegister}>
        Register
      </Button>
    </Paper>
  );
}
