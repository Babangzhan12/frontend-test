import { useEffect, useState } from "react";
import { Button, NumberInput, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function NewAccount() {
  const [types, setTypes] = useState([]);
  const [depositoTypeId, setDepositoTypeId] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/deposito-types").then((res) => setTypes(res.data));
  }, []);

  const createAcc = async () => {
    await api.post("/accounts", {
      depositoTypeId,
      initialDeposit,
    });
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Open New Deposito Account</h2>

      <Select
        label="Deposito Type"
        data={types.map((t: any) => ({ label: t.name, value: t.depositoTypeId }))}
        onChange={(value) => setDepositoTypeId(value!)}
      />

      <NumberInput
        label="Initial Deposit"
        value={initialDeposit}
        onChange={(v) => setInitialDeposit(Number(v))}
      />

      <Button fullWidth mt="md" onClick={createAcc}>
        Create Account
      </Button>
    </div>
  );
}
