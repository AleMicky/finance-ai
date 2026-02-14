import React from 'react'
import { View, Text, StyleSheet } from "react-native";

interface Props {
    text?: string;
}

export const MyDivider = ({ text }: Props) => {
    return (
        <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            {text && <Text style={styles.dividerText}>{text}</Text>}
            <View style={styles.dividerLine} />
        </View>
    )
}

const styles = StyleSheet.create({
    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E6EEF8",
    },
    dividerText: {
        fontSize: 12,
        color: "#94A3B8",
        fontWeight: "700",
    }
});