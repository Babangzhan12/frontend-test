import { useEffect, useState } from "react";
import api from "../services/axios";

export default function useTotalBalance() {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/accounts");
      const accounts = res.data?.data || [];

      const sum = accounts.reduce(
        (acc: number, item: any) => acc + Number(item.balance),
        0
      );

      setTotal(sum);
    } catch (err) {
      console.error("Failed to load total balance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { total, loading };
}
