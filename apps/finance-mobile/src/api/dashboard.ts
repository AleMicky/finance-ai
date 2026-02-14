import { api } from "./client";

export async function dashboard(month: string) {
    const res = await api.get(`/dashboard?month=${encodeURIComponent(month)}`);
    return res.data;
}

export async function dashboardInsights(month: string) {
    const res = await api.get(`/dashboard/insights?month=${encodeURIComponent(month)}`);
    return res.data;
}