import { NumberInput, Button, Text, Card } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/axios";
import PinSheet from "../../components/pin-sheet";

export default function Withdraw() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);

  const [pinOpen, setPinOpen] = useState(false);

  const [account, setAccount] = useState<any>(null);
  const [minRemaining, setMinRemaining] = useState(0);
  const [saving, setSaving] = useState(false);

  const loadAccount = async () => {
    const res = await api.get(`/accounts/${id}`);
    const acc = res.data?.data;

    setAccount(acc);
    setMinRemaining(Number(acc.depositoType.initialDeposit));
  };

  useEffect(() => {
    loadAccount();
  }, []);

  const canWithdraw =
    account && amount > 0 && account.balance - amount >= minRemaining;

  const submitWithdraw = async () => {
    if (!canWithdraw) return;

    setPinOpen(true);
  };

  const doWithdraw = async () => {
  if (saving) return;
  setSaving(true);

  try {
    await api.post(`/transactions/${id}/withdraw`, {
      amount,
      date: new Date(),
    });
    navigate("/success-withdraw");
  } catch (err) {
    console.error(err);
    alert("Failed to withdraw");
  } finally {
    setSaving(false);
  }
};

  if (!account) return <Text>Loading...</Text>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Withdraw from Account</h2>

      <Card withBorder radius="md" p="md" mb="md">
        <Text fw={600}>Current Balance:</Text>
        <Text fz={22} fw={800}>
          Rp {Number(account.balance).toLocaleString("id-ID")}
        </Text>

        <Text mt="md" fw={600}>
          Minimum Remaining Balance:
        </Text>
        <Text fz={18} color="red">
          Rp {minRemaining.toLocaleString("id-ID")}
        </Text>
      </Card>

      <NumberInput
        label="Withdraw Amount"
        value={amount}
        onChange={(v) => setAmount(Number(v))}
        min={0}
      />

      {!canWithdraw && amount > 0 && (
        <Text mt={8} color="red">
          You must leave at least Rp{" "}
          {minRemaining.toLocaleString("id-ID")} in the account.
        </Text>
      )}

      <Button
        fullWidth
        mt="lg"
        radius="md"
        color="red"
        onClick={submitWithdraw}
        disabled={!canWithdraw}
      >
        Withdraw
      </Button>

      <PinSheet
        opened={pinOpen}
        onClose={() => setPinOpen(false)}
        onSuccess={doWithdraw}
        loading={saving}
      />
    </div>
  );
}
