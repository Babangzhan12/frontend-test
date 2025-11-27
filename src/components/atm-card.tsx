import { Card, Text } from "@mantine/core";

export default function ATMCard({
  balance,
  accountName,
  accountId,
  depositoType,
}: any) {
  const gradientMap: any = {
    bronze: "linear-gradient(135deg, #8C5E3C, #C8926B)",
    silver: "linear-gradient(135deg, #9ea7b8, #d0d5dd)",
    gold: "linear-gradient(135deg, #b99343, #ffd700)",
    default: "linear-gradient(135deg, #1147d7, #1ea2ff)",
  };

  const cardColor =
    gradientMap[depositoType] || gradientMap["default"];

  return (
    <Card
      shadow="md"
      radius="lg"
      p="lg"
      style={{
        background: cardColor,
        color: "white",
        border: "none",
      }}
    >
      <Text fw={700} fz={22}>
        {accountName}
      </Text>

      <Text mt="md" fz={28} fw={800}>
        Rp {Number(balance).toLocaleString("id-ID")}
      </Text>

      <Text mt="xs" opacity={0.8}>
        Balance
      </Text>

      <Text mt="md" fz={14}>
        Account No:
      </Text>

      <Text fw={700} fz={18} lts={1}>
        {accountId}
      </Text>
    </Card>
  );
}
