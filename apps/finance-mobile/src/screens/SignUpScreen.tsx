import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Pressable } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { MyButton, MyTextInput } from '../components';
import { useNavigation } from '@react-navigation/native';


export const SignUpScreen = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigation();

    const onSubmit = () => {
        Alert.alert("Sign Up", "Full Name: " + fullName + "\nEmail: " + email + "\nPassword: " + password);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.page}
            >
                <View style={styles.card}>
                    <View style={styles.appIcon}>
                        <Ionicons name="person-add-outline" size={24} color="#1976FF" />
                    </View>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join our community and start your{"\n"}journey today.</Text>

                    <MyTextInput
                        label="Full Name"
                        icon="person-outline"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholderTextColor="#94A3B8"
                    />

                    <MyTextInput
                        label="Email"
                        styleLabel={{ marginTop: 16 }}
                        icon="mail-outline"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#94A3B8"
                        autoCapitalize="none"
                    />

                    <MyTextInput
                        label="Password"
                        styleLabel={{ marginTop: 16 }}
                        icon="lock-closed-outline"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#94A3B8"
                        password={true}
                    />
                    <Text style={styles.terms}>
                        By registering, you agree to our{" "}
                        <Text style={styles.link} onPress={() => Alert.alert("Terms of Service")}>
                            Terms of Service
                        </Text>{" "}
                        and{" "}
                        <Text style={styles.link} onPress={() => Alert.alert("Privacy Policy")}>
                            Privacy Policy
                        </Text>
                        .
                    </Text>
                    <MyButton
                        title="Register"
                        onPress={onSubmit}
                    />
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <Pressable onPress={() => navigate.goBack()}>
                            <Text style={styles.footerLink}> Sign In</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    page: {
        flexGrow: 1,
        backgroundColor: '#EEF5FF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    card: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 22,
        shadowOpacity: Platform.OS === "web" ? 0.08 : 0.15,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6
    },
    appIcon: {
        width: 74,
        height: 74,
        borderRadius: 18,
        backgroundColor: "#EAF2FF",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 16
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: '#64748B',
        marginBottom: 18
    },
    terms: {
        marginTop: 14,
        marginBottom: 16,
        fontSize: 13,
        lineHeight: 18,
        color: "#94A3B8",
        textAlign: "center",
    },
    link: {
        color: "#1976FF",
        fontWeight: "800",
    },
    footerRow: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        color: "#64748B",
        fontSize: 13,
        fontWeight: "600",
    },
    footerLink: {
        color: "#1976FF",
        fontSize: 13,
        fontWeight: "800",
    }

});
