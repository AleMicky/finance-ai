import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, type TextInputProps } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


interface Props extends TextInputProps {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    styleLabel?: Text['props']['style'];
    placeholder?: string;
    password?: boolean;
    errorText?: string;
}

export const MyTextInput = ({ label, placeholder, icon, password = false, errorText, ...props }: Props) => {

    const [showPass, setShowPass] = useState(false);


    return (
        <>
            <Text style={[styles.label, props.styleLabel]}>{label}</Text>
            <View style={styles.inputWrap}>
                <Ionicons name={icon} size={18} color="#94A3B8" />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder ?? "Ingresa tu texto aquí"}
                    secureTextEntry={password && !showPass}
                    {...props}
                />
                {
                    password && (
                        <Pressable onPress={() => setShowPass((s) => !s)} hitSlop={10}>
                            <Ionicons
                                name={showPass ? "eye-outline" : "eye-off-outline"}
                                size={18}
                                color="#94A3B8"
                            />
                        </Pressable>
                    )
                }
            </View>
            {errorText && <Text style={styles.error}>{errorText}</Text>}
        </>
    )
}


export const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 8,
    },
    inputWrap: {
        height: 48,
        borderRadius: 12,
        backgroundColor: "#F6F9FF",
        borderWidth: 1,
        borderColor: "#E6EEF8",
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#0F172A",
        outlineStyle: "none" as any,
    },
    error: {
        marginTop: 4,
        fontSize: 12,
        color: "#DC2626",
    }
});