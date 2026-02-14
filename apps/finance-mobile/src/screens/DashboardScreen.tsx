import React, { useMemo, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { dashboardInsights } from "../api/dashboard";
import { MonthPicker } from "../components/MonthPicker"

function monthNow(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function DashboardScreen() {
  const { t } = useTranslation();
  const [month, setMonth] = useState(() => monthNow());
  const q = useQuery({
    queryKey: ["dashboard", month],
    queryFn: () => dashboardInsights(month),
  });

  if (q.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>{t("ui.loading")}</Text>
      </View>
    );
  }

  if (!q.data) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: "red" }}>{t("ui.genericError")}</Text>
      </View>
    );
  }

  const { summary, insights } = q.data;

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "900" }}>
        {t("ui.dashboard")} · {summary.month}
      </Text>

      <View style={{ borderWidth: 1, borderRadius: 12, padding: 12, gap: 6 }}>
        <Text style={{ fontWeight: "800" }}>
          {t("ui.income")}: Bs {summary.incomeTotal}
        </Text>
        <Text style={{ fontWeight: "800" }}>
          {t("ui.expense")}: Bs {summary.expenseTotal}
        </Text>
        <Text style={{ fontWeight: "800" }}>
          {t("ui.balance")}: Bs {summary.balance}
        </Text>
        <Text style={{ color: "#555" }}>
          {t("ui.avgDailyExpense")}: Bs {Number(summary.avgDailyExpense).toFixed(2)}
        </Text>
      </View>
      <MonthPicker value={month} onChange={setMonth} label={t("ui.month")} />
      <Text style={{ fontSize: 16, fontWeight: "900" }}>{t("ui.byCategory")}</Text>

      <FlatList
        data={summary.byCategory ?? []}
        keyExtractor={(x) => x.category}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "800" }}>
              {t(`category.${item.category}`, { defaultValue: item.category })}: Bs {item.total}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: "#666" }}>{t("ui.empty")}</Text>}
      />

      <View style={{ borderWidth: 1, borderRadius: 12, padding: 12, gap: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: "900" }}>{t("ui.aiInsights")}</Text>

        {typeof insights === "string" ? (
          <Text>{insights}</Text>
        ) : (
          <Text>{JSON.stringify(insights, null, 2)}</Text>
        )}
      </View>
    </View>
  );
}