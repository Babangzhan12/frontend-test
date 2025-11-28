import { Card, Grid, Text, Center } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import {
  IconUser,
  IconCreditCard,
  IconCash,
  IconArrowDown,
  IconArrowUp,
  IconHistory,
  IconLogout,
} from "@tabler/icons-react";
import BottomNav from "../../components/bottom-nav";
import { useEffect, useState } from "react";
import api from "../../services/axios";

const MenuBox = ({ title, icon, path }: any) => (
  <Link to={path} style={{ textDecoration: "none" }}>
    <Card
        shadow="sm"
        radius="md"
        p="md"
        withBorder
        style={{
            textAlign: "center",
            background: "white",
            height: 110,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid #e9edef",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
        >
      <div>{icon}</div>
      <Text fw={600} fz={14} mt={6} c="dark">
        {title}
      </Text>
    </Card>
  </Link>
);

export default function Dashboard() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const navigate = useNavigate();

    const loadAccounts = async () => {
    const res = await api.get("/accounts/my");
    setAccounts(res.data || []);
    if (!res.data.hasPin) {
    navigate("/create-pin");
    } else {
    navigate("/");
    }
    };

    useEffect(() => {
    loadAccounts();
    }, []);
  return (
    <div >

      <div >
        <Grid gutter="md">

          <Grid.Col span={6}>
            <MenuBox title="Profile" path="/profile" icon={<IconUser size={32} />} />
          </Grid.Col>

          <Grid.Col span={6}>
            <MenuBox title="Accounts" path="/accounts" icon={<IconCreditCard size={32} />} />
          </Grid.Col>

          <Grid.Col span={6}>
            <MenuBox title="Deposit" path="/deposit/select" icon={<IconArrowDown size={32} />} />
          </Grid.Col>

          <Grid.Col span={6}>
            <MenuBox title="Withdraw" path="/withdraw/select" icon={<IconArrowUp size={32} />} />
          </Grid.Col>

          <Grid.Col span={6}>
            <MenuBox title="History" path="/history" icon={<IconHistory size={32} />} />
          </Grid.Col>

          <Grid.Col span={6}>
            <MenuBox title="Logout" path="/logout" icon={<IconLogout size={32} />} />
          </Grid.Col>

        </Grid>
      </div>

      <BottomNav />
    </div>
  );
}
