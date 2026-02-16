import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { stylesVars } from "../../theme";
import { MyTabsDashboard } from "../components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listTxns, TxnItem } from "../api/txns";

function monthNow(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function parseAmount(amount: string | number): number {
  if (typeof amount === "number") return amount;
  // soporta "15", "15.5", "15,5", "1,234.50" (y limpia espacios)
  const normalized = String(amount).replace(/\s/g, "").replace(/,/g, ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function iconForCategory(category: string): keyof typeof Ionicons.glyphMap {
  const key = (category ?? "").trim().toUpperCase();

  if (["FOOD", "COMIDA"].includes(key)) return "restaurant-outline";
  if (["TRANSPORT", "TRANSPORTE"].includes(key)) return "car-outline";
  if (["HEALTH", "SALUD"].includes(key)) return "medkit-outline";
  if (["EDUCATION", "EDUCACIÓN", "EDUCACION"].includes(key)) return "school-outline";
  if (["HOUSING", "VIVIENDA"].includes(key)) return "home-outline";
  if (["UTILITIES", "SERVICIOS"].includes(key)) return "flash-outline";
  if (["ENTERTAINMENT", "ENTRETENIMIENTO"].includes(key)) return "game-controller-outline";
  if (["SHOPPING", "COMPRAS"].includes(key)) return "bag-outline";
  if (["TRANSFER", "TRANSFERENCIA"].includes(key)) return "swap-horizontal-outline";
  if (["PETS", "MASCOTAS"].includes(key)) return "paw-outline";

  return "pricetag-outline";
}

export const HomeScreen = ({
  navigation,
  onLogout,
}: any & { onLogout: () => void }) => {
  const qc = useQueryClient();

  const [month, setMonth] = useState(() => monthNow());
  const [quick, setQuick] = useState("");

  const txnsQ = useQuery({
    queryKey: ["txns", month],
    queryFn: () => listTxns(month),
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.root}>
        {/* Header + Tabs */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.h1}>Dashboard</Text>
          </View>

          <MyTabsDashboard onLogout={onLogout} />
        </View>

        {/* Quick add */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>AGREGAR RÁPIDO</Text>

          <Pressable style={styles.monthPill} onPress={() => {}}>
            <Text style={styles.monthText}>{month}</Text>
            <Ionicons
              name="chevron-expand"
              size={14}
              color={stylesVars.primary}
            />
          </Pressable>
        </View>

        <View style={styles.quickCard}>
          <View style={styles.quickRow}>
            <TextInput
              value={quick}
              onChangeText={setQuick}
              placeholder='Ej: "Cena sushi 45 bs"'
              placeholderTextColor={stylesVars.placeholder}
              style={styles.quickInput}
            />
            <Pressable style={styles.aiBtn} onPress={() => {}}>
              <Ionicons name="sparkles" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="information-circle-outline"
            size={14}
            color={stylesVars.muted}
          />
          <Text style={styles.infoText}>
            La IA categorizará automáticamente tu movimiento.
          </Text>
        </View>

        <View style={styles.movHeader}>
          <Text style={styles.movTitle}>Movimientos</Text>
          <Text style={styles.movCount}>{txnsQ.data?.length ?? 0} TOTAL</Text>
        </View>

        {/* List */}
        <FlatList
          data={txnsQ.data ?? []}
          keyExtractor={(x: TxnItem) => x.id}
          refreshing={txnsQ.isRefetching}
          onRefresh={() => txnsQ.refetch()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay movimientos</Text>
          }
          renderItem={({ item }: { item: TxnItem }) => {
            const isIncome = item.type === "INCOME"; // si usas enum: item.type === Type.Income
            const amt = parseAmount(item.amount);

            return (
              <Pressable style={styles.txnCard}>
                <View
                  style={[
                    styles.txnIconBox,
                    isIncome
                      ? styles.txnIconBoxIncome
                      : styles.txnIconBoxExpense,
                  ]}
                >
                  <Ionicons
                    name={iconForCategory(item.category)}
                    size={20}
                    color={isIncome ? "#16A34A" : "#64748B"}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.txnTopRow}>
                    <Text style={styles.txnTitle} numberOfLines={1}>
                      {item.category}
                    </Text>

                    <Text
                      style={[
                        styles.txnAmount,
                        isIncome ? styles.amtIncome : styles.amtExpense,
                      ]}
                    >
                      {isIncome ? "+" : "-"} Bs{" "}
                      {amt.toLocaleString("es-BO", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </View>

                  {!!item.description && (
                    <Text style={styles.txnNote} numberOfLines={1}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

function NavItem({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.navItem} onPress={onPress}>
      <Ionicons
        name={icon}
        size={22}
        color={active ? stylesVars.primary : stylesVars.navMuted}
      />
      <Text style={[styles.navText, active && styles.navTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF5FF",
  },
  root: {
    flex: 1,
    backgroundColor: stylesVars.bg,
    paddingHorizontal: 18,
  },

  // IMPORTANTE: aquí quitamos flex:1 para que no “mate” el FlatList
  content: {
    paddingTop: 8,
    paddingBottom: 6,
  },

  header: {
    paddingBottom: 8,
  },
  h1: {
    fontSize: 32,
    fontWeight: "700",
    color: stylesVars.text,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 8,
    paddingHorizontal: 2,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 1.6,
    color: stylesVars.muted,
  },
  monthPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(25,118,255,0.10)", // azul del login
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  monthText: {
    color: stylesVars.primary,
    fontWeight: "800",
    fontSize: 12,
  },

  quickCard: {
    backgroundColor: stylesVars.card,
    borderRadius: 18,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(230,238,248,1)",
  },
  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
  },
  quickInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "600",
    color: stylesVars.text,
    outlineStyle: "none" as any,
  },
  aiBtn: {
    backgroundColor: stylesVars.primary,
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    ...Platform.select({
      ios: {
        shadowColor: stylesVars.primary,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 4 },
      web: {
        shadowColor: stylesVars.primary,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 2,
    marginBottom: 18,
  },
  infoText: {
    fontSize: 11,
    color: stylesVars.muted,
    fontWeight: "600",
  },

  movHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  movTitle: { fontSize: 18, fontWeight: "900", color: stylesVars.text },
  movCount: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: stylesVars.muted,
  },

  listContent: {
    paddingBottom: 140,
  },
  emptyText: {
    color: stylesVars.muted,
    marginTop: 10,
    textAlign: "center",
  },

  txnCard: {
    backgroundColor: stylesVars.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(230,238,248,1)",
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 1 },
      web: {
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },
  txnIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  txnIconBoxExpense: {
    backgroundColor: "#F6F9FF",
  },
  txnIconBoxIncome: {
    backgroundColor: "rgba(22,163,74,0.10)",
  },
  txnTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
  },
  txnTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: stylesVars.text,
  },
  txnAmount: { fontSize: 15, fontWeight: "900" },
  amtExpense: { color: "#EF4444" },
  amtIncome: { color: "#16A34A" },
  txnNote: {
    fontSize: 12,
    color: stylesVars.muted,
    marginTop: 4,
    fontWeight: "600",
  },
  navItem: { alignItems: "center", gap: 4, width: 64 },
  navText: { fontSize: 10, fontWeight: "900", color: stylesVars.navMuted },
  navTextActive: { color: stylesVars.primary },
});
