import { NumberInput, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/axios";

export default function Deposit() {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const doDeposit = async () => {
    await api.post(`/transactions/${id}/deposit`, {
      amount,
      date: new Date(),
    });
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Deposit to Account</h2>

      <NumberInput label="Amount" value={amount} onChange={(v) => setAmount(Number(v))} />
      <Button fullWidth mt="md" onClick={doDeposit}>
        Deposit
      </Button>
    </div>
  );
}
