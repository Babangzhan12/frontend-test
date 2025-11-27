import { NumberInput, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/axios";

export default function Withdraw() {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const doWithdraw = async () => {
    await api.post(`/transactions/${id}/withdraw`, {
      amount,
      date: new Date(),
    });
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Withdraw from Account</h2>

      <NumberInput label="Amount" value={amount} onChange={(v) => setAmount(Number(v))} />

      <Button color="red" fullWidth mt="md" onClick={doWithdraw}>
        Withdraw
      </Button>
    </div>
  );
}
