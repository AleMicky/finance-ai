import { api } from "./client";

export async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    return res.data as { accessToken: string; user: { id: string; email: string; name?: string } };
}

export async function register(email: string, name: string, password: string) {
    const res = await api.post("/auth/register", { email, name, password });
    return res.data as { accessToken: string; user: { id: string; email: string; name?: string } };
}