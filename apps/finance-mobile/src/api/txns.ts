import { api } from "./client";

export type TxnItem = {
  id: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  amount: string; // recomendado (Decimal serializado)
  occurredAt: string;
  description?: string | null;
  createdAt?: string;
};

export async function quickTxn(text: string, occurredAt?: string) {
  const res = await api.post("/txns/quick", { text, occurredAt });
  return res.data;
}

export async function listTxns(month: string) {
  // Asumo que creaste GET /txns?month=YYYY-MM
  const res = await api.get(`/txns?month=${encodeURIComponent(month)}`);
  return res.data as TxnItem[];
}