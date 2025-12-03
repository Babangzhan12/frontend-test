import { NumberInput, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/axios";
import PinSheet from "../../components/pin-sheet";

export default function Deposit() {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [pinOpen, setPinOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const submitDeposit = () => {
    if (amount <= 0) {
      alert("Nominal harus lebih dari 0");
      return;
    }
    setPinOpen(true);
  };

  const doDeposit = async () => {
  if (saving) return;
  setSaving(true);

  try {
    await api.post(`/transactions/${id}/deposit`, {
      amount,
      date: new Date(),
    });
    navigate("/success-deposit");
  } catch (err) {
    console.error(err);
    alert("Failed to deposit");
  } finally {
    setSaving(false);
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Deposit to Account</h2>

      <NumberInput
        label="Amount"
        value={amount}
        onChange={(v) => setAmount(Number(v))}
      />

      <Button fullWidth mt="md" onClick={submitDeposit}>
        Deposit
      </Button>

      <PinSheet
        opened={pinOpen}
        onClose={() => setPinOpen(false)}
        onSuccess={doDeposit}
        loading={saving}
      />
    </div>
  );
}
