import { useEffect, useState } from "react";
import { Card, Text, Group, Badge } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconCoin,
} from "@tabler/icons-react";
import api from "../../services/axios";

export default function History() {
  const [items, setItems] = useState<any[]>([]);

  const loadHistory = async () => {
    const res = await api.get("/transactions");
    setItems(res.data?.data || []);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const iconMap: any = {
    deposit: <IconArrowDown size={26} color="green" />,
    withdraw: <IconArrowUp size={26} color="red" />,
    interest: <IconCoin size={26} color="gold" />,
  };

  const colorMap: any = {
    deposit: "green",
    withdraw: "red",
    interest: "yellow",
  };

  const labelMap: any = {
    deposit: "Deposit",
    withdraw: "Withdraw",
    interest: "Interest",
  };

  return (
    <div>
      <Text fw={700} fz={24} mb="lg">
        Transaction History
      </Text>

      {items.length === 0 && (
        <Text ta="center" c="dimmed" mt="lg">
          No transaction data.
        </Text>
      )}

      {items.map((trx) => {
        const deposito = trx.account?.depositoType;
        const depositoName = deposito?.name || "-";
        const depositoReturn =
          deposito?.yearlyReturn
            ? `${Number(deposito.yearlyReturn) * 100}% / year`
            : "-";

        return (
          <Card
            key={trx.transactionId}
            shadow="xs"
            radius="md"
            withBorder
            mb="md"
            p="md"
            style={{ display: "flex", gap: 15 }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "#f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {iconMap[trx.type]}
            </div>

            <div style={{ flex: 1 }}>
              <Group justify="space-between">
                <Text fw={700}>{labelMap[trx.type]}</Text>

                <Badge color={colorMap[trx.type]} variant="light">
                  {trx.type.toUpperCase()}
                </Badge>
              </Group>

              <Text fz="sm" mt={3}>
                <b>{depositoName}</b> ({depositoReturn})
              </Text>

              <Text c="dimmed" fz="sm" mt={3}>
                {new Date(trx.transactionDate).toLocaleString("id-ID")}
              </Text>

              <Text
                fw={700}
                fz={20}
                mt={5}
                style={{
                  color: trx.type === "withdraw" ? "red" : "green",
                }}
              >
                {trx.type === "withdraw" ? "-" : "+"}{" "}
                Rp {Number(trx.amount).toLocaleString("id-ID")}
              </Text>

              <Text mt={3} c="dimmed" fz="sm">
                Balance: Rp{" "}
                {Number(trx.startingBalance).toLocaleString("id-ID")} → Rp{" "}
                {Number(trx.endingBalance).toLocaleString("id-ID")}
              </Text>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
