import { NumberInput, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/axios";
import PinSheet from "../../components/pin-sheet";

export default function Withdraw() {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [pinOpen, setPinOpen] = useState(false);

  const submitWithdraw = async () => {
  setPinOpen(true);
};

  const doWithdraw = async () => {
    await api.post(`/transactions/${id}/withdraw`, {
      amount,
      date: new Date(),
    });
    navigate("/success-withdraw");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Withdraw from Account</h2>

      <NumberInput label="Amount" value={amount} onChange={(v) => setAmount(Number(v))} />

      <Button color="red" fullWidth mt="md" onClick={submitWithdraw}>
        Withdraw
      </Button>
      <PinSheet
      opened={pinOpen}
      onClose={() => setPinOpen(false)}
      onSuccess={doWithdraw}
    />
    </div>
  );
}
