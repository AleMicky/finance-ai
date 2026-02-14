import React, { useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

function lastMonths(n = 12): string[] {
    const out: string[] = [];
    const d = new Date();
    d.setDate(1);

    for (let i = 0; i < n; i++) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        out.push(`${y}-${m}`);
        d.setMonth(d.getMonth() - 1);
    }
    return out;
}

export function MonthPicker({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: (v: string) => void;
    label: string;
}) {
    const [open, setOpen] = useState(false);
    const months = useMemo(() => lastMonths(12), []);

    return (
        <>
            <Pressable
                onPress={() => setOpen(true)}
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontWeight: "800" }}>{label}</Text>
                <Text style={{ fontWeight: "800" }}>{value} ▾</Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable
                    onPress={() => setOpen(false)}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", padding: 16 }}
                >
                    <Pressable
                        onPress={() => { }}
                        style={{ backgroundColor: "white", borderRadius: 16, padding: 12 }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "900", marginBottom: 8 }}>Selecciona mes</Text>

                        {months.map((m) => (
                            <Pressable
                                key={m}
                                onPress={() => {
                                    onChange(m);
                                    setOpen(false);
                                }}
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 12,
                                    borderRadius: 10,
                                    backgroundColor: m === value ? "#eee" : "transparent",
                                }}
                            >
                                <Text style={{ fontWeight: "800" }}>{m}</Text>
                            </Pressable>
                        ))}
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}