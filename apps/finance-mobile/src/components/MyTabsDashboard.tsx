import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native'
import { stylesVars } from '../../theme';


interface Props {
    onLogout: () => void;
}

export const MyTabsDashboard = ({ onLogout }: Props) => {

    const [tab, setTab] = useState<"summary" | "stats">("summary");


    return (
        <View style={styles.topRow}>
            <View style={styles.tabsWrap}>
                <Pressable
                    onPress={() => setTab("summary")}
                    style={[styles.tabBtn, tab === "summary" && styles.tabBtnActive]}
                >
                    <Text style={[styles.tabText, tab === "summary" && styles.tabTextActive]}>Summary</Text>
                </Pressable>
                <Pressable
                    onPress={() => setTab("stats")}
                    style={[styles.tabBtn, tab === "stats" && styles.tabBtnActive]}
                >
                    <Text
                        style={[styles.tabText, tab === "stats" && styles.tabTextActive]}
                    >
                        Estadísticas
                    </Text>
                </Pressable>
            </View>
            <Pressable onPress={onLogout} hitSlop={10}>
                <Text style={styles.logout}>Salir</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
        marginBottom: 16,
    },
    tabsWrap: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 14,
        padding: 4,
        flex: 1,
        marginRight: 12,
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    tabBtnActive: {
        backgroundColor: stylesVars.card,
        borderWidth: 1,
        borderColor: stylesVars.border,
        ...Platform.select({
            ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
            android: { elevation: 2 },
            web: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
        }),
    },
    tabText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#64748B"
    },
    tabTextActive: { color: stylesVars.text },
    logout: { color: "#EF4444", fontWeight: "800", fontSize: 13 },
});