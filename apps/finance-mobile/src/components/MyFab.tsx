import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

export const MyFab = () => {
    return (
        <View style={styles.fab}>
            <Ionicons
                name="add"
                size={28}
                color="#fff"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    fab: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#1976FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
        shadowColor: "#1976FF",
        shadowOpacity: 0.35,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
    }
});
