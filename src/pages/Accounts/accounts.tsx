import { useEffect, useState } from "react";
import { Button, Card, Group, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import ATMCard from "../../components/atm-card";
import api from "../../services/axios";
import { Loader } from "@mantine/core";

export default function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAccounts = async () => {
  setLoading(true);
  try {
    const res = await api.get("/accounts");
    setAccounts(Array.isArray(res.data.data) ? res.data.data : []);
  } catch (err) {
    console.error(err);
    setAccounts([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadAccounts();
  }, []);

  if (loading) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f6fa"
      }}
    >
      <Loader size="lg" color="blue" />
    </div>
  );
}

  return (
    <div style={{ paddingBottom: 120 }}>
      <Text fw={700} fz={26} mb="lg">
        My Accounts
      </Text>

      {accounts.length === 0 && (
        <Card
          shadow="sm"
          radius="md"
          p="lg"
          style={{
            background: "white",
            borderRadius: 16,
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <Text fw={600} fz={20}>
            You don't have any accounts yet
          </Text>

          <Text fz="sm" c="dimmed" mt={6}>
            Create your first saving/deposito account.
          </Text>

          <Button
            fullWidth
            radius="md"
            mt="lg"
            onClick={() => navigate("/accounts/new")}
          >
            Create New Account
          </Button>
        </Card>
      )}

      {accounts.map((acc) => (
        <div key={acc.accountId} style={{ marginBottom: 25 }}>
          <ATMCard
            balance={acc.balance}
            accountName={acc.depositoType?.name}
            accountId={acc.accountId}
            depositoType={acc.depositoType?.name?.toLowerCase()}
          />

          <Card shadow="xs" mt="sm" p="md" radius="md" withBorder>
            <Group grow>
              <Button
                fullWidth
                radius="md"
                component={Link}
                to={`/deposit/${acc.accountId}`}
              >
                Deposit
              </Button>

              <Button
                fullWidth
                radius="md"
                component={Link}
                color="red"
                to={`/withdraw/${acc.accountId}`}
              >
                Withdraw
              </Button>
            </Group>
          </Card>
        </div>
      ))}

      {accounts.length > 0 && (
        <Button
          mt="lg"
          fullWidth
          radius="md"
          variant="outline"
          onClick={() => navigate("/accounts/new")}
        >
          Create Another Account
        </Button>
      )}
    </div>
  );
}
