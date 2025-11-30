import { useEffect, useState } from "react";
import { Button, NumberInput, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

interface DepositoType {
  depositoTypeId: string;
  name: string;
  yearlyReturn: number;
  initialDeposit: number;
  description?: string;
}

export default function NewAccount() {
  const [types, setTypes] = useState<DepositoType[]>([]);
  const [depositoTypeId, setDepositoTypeId] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [minDeposit, setMinDeposit] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/deposito-types").then((res) => setTypes(res.data?.data));
  }, []);

  const createAcc = async () => {
    try {
      await api.post("/accounts", {
        depositoTypeId,
        topup: initialDeposit,
      });

      navigate("/");

    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Open New Deposito Account</h2>

      <Select
        label="Deposito Type"
        data={types.map((t: any) => ({
          label: t.name,
          value: t.depositoTypeId,
        }))}
        onChange={(value) => {
          setDepositoTypeId(value!);

          const selected = types.find(
            (t: any) => t.depositoTypeId === value
          );

          if (selected) {
            setMinDeposit(Number(selected?.initialDeposit));
          }
        }}
      />

      {minDeposit > 0 && (
        <div style={{ marginTop: 10, color: "gray" }}>
          Minimum deposit: <b>Rp {minDeposit.toLocaleString("id-ID")}</b>
        </div>
      )}

      <NumberInput
        label="Topup Amount"
        value={initialDeposit}
        onChange={(v) => setInitialDeposit(Number(v))}
        min={0}
      />

      <Button
        fullWidth
        mt="md"
        disabled={
          !depositoTypeId || 
          initialDeposit < minDeposit
        }
        onClick={createAcc}
      >
        Create Account
      </Button>
    </div>
  );
}
