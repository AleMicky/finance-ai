import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { MonthPicker } from "../components/MonthPicker";
import { saveLang } from "../i18n/langStore";
import i18n from "../i18n";
import { quickTxn, listTxns, TxnItem } from "../api/txns";
import { clearToken } from "../auth/tokenStore";

function monthNow(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function HomeScreen({ navigation, onLogout }: any & { onLogout: () => void }) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [text, setText] = useState("");


  const [month, setMonth] = useState(() => monthNow());

  const txnsQ = useQuery({
    queryKey: ["txns", month],
    queryFn: () => listTxns(month),
  });

  const quickM = useMutation({
    mutationFn: () => quickTxn(text),
    onSuccess: async () => {
      setText("");
      await qc.invalidateQueries({ queryKey: ["txns", month] });
    },
    onError: (e: any) => {
      Alert.alert(
        t("ui.errorTitle"),
        e?.response?.data?.message ?? t("ui.genericError"),
      );
    },
  });

  async function logout() {
    await clearToken();
    onLogout();
  }

  return (
    <View style={{ padding: 16, gap: 12, flex: 1 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>{t("ui.quickAdd")}</Text>

        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Text style={{ fontWeight: "800" }}>{t("ui.dashboard")}</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await i18n.changeLanguage("es");
              await saveLang("es");
            }}
          >
            <Text style={{ fontWeight: "800" }}>ES</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await i18n.changeLanguage("en");
              await saveLang("en");
            }}
          >
            <Text style={{ fontWeight: "800" }}>EN</Text>
          </Pressable>

          <Pressable onPress={logout}>
            <Text style={{ color: "red", fontWeight: "800" }}>{t("ui.logout")}</Text>
          </Pressable>
        </View>
      </View>

      <MonthPicker
        value={month}
        onChange={(m) => setMonth(m)}
        label={t("ui.month")}
      />

      {/* Input */}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={t("ui.quickPlaceholder")}
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
      />

      {/* Button */}
      <Pressable
        onPress={() => quickM.mutate()}
        disabled={!text.trim() || quickM.isPending}
        style={{
          backgroundColor: !text.trim() ? "#999" : "black",
          padding: 14,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "800" }}>
          {quickM.isPending ? t("ui.saving") : t("ui.save")}
        </Text>
      </Pressable>

      {/* List */}
      <Text style={{ marginTop: 8, fontWeight: "800" }}>
        {t("ui.movements")} {month}
      </Text>

      <FlatList
        data={txnsQ.data ?? []}
        keyExtractor={(x: TxnItem) => x.id}
        refreshing={txnsQ.isRefetching}
        onRefresh={() => txnsQ.refetch()}
        ListEmptyComponent={<Text style={{ color: "#666", marginTop: 10 }}>{t("ui.empty")}</Text>}
        renderItem={({ item }: { item: TxnItem }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "800" }}>
              {t(`txnType.${item.type}`, { defaultValue: item.type })} ·{" "}
              {t(`category.${item.category}`, { defaultValue: item.category })} · Bs {item.amount}
            </Text>
            {!!item.description && <Text style={{ color: "#555" }}>{item.description}</Text>}
          </View>
        )}
      />
    </View>
  );
}