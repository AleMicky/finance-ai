import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Pressable } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { MyButton, MyTextInput } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { SignUpForm, signUpSchema } from '../schemas/sign-up.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '../api/auth';
import { setToken } from '../auth/tokenStore';


export const SignUpScreen = ({ onAuthed }: { onAuthed: () => void }) => {

    const { t } = useTranslation();

    const navigate = useNavigation();


    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: SignUpForm) => {
        try {
            const data = await register(values.fullName, values.email, values.password);
            await setToken(data.accessToken);
            onAuthed();
        }
        catch (e: any) {
            Alert.alert("Error", e?.response?.data?.message ?? "No se pudo registrar el usuario");
        }

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
                    <Text style={styles.title}>{t("ui.SignUpScreen.title")}</Text>
                    <Text style={styles.subtitle}>{t("ui.SignUpScreen.subtitle")}</Text>


                    {/* Form */}

                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field: { onChange, value } }) => (
                            <MyTextInput
                                label={t("ui.SignUpScreen.form.inputFullName.label")}
                                styleLabel={{ marginTop: 16 }}
                                icon="person-outline"
                                placeholder={t("ui.SignUpScreen.form.inputFullName.placeholder")}
                                value={value}
                                onChangeText={onChange}
                                placeholderTextColor="#94A3B8"
                                errorText={errors.fullName?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <MyTextInput
                                label={t("ui.SignUpScreen.form.inputEmail.label")}
                                styleLabel={{ marginTop: 16 }}
                                icon="mail-outline"
                                placeholder={t("ui.SignUpScreen.form.inputEmail.placeholder")}
                                keyboardType="email-address"
                                value={value}
                                onChangeText={onChange}
                                placeholderTextColor="#94A3B8"
                                autoCapitalize="none"
                                errorText={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <MyTextInput
                                label={t("ui.SignUpScreen.form.inputPassword.label")}
                                placeholder={t("ui.SignUpScreen.form.inputPassword.placeholder")}
                                styleLabel={{ marginTop: 16 }}
                                icon="lock-closed-outline"
                                value={value}
                                onChangeText={onChange}
                                placeholderTextColor="#94A3B8"
                                password={true}
                                errorText={errors.password?.message}
                            />
                        )} />

                    <Text style={styles.terms}>
                        {t("ui.SignUpScreen.terms.message")}
                        <Text style={styles.link} onPress={() => Alert.alert("Terms of Service")}>
                            {t("ui.SignUpScreen.terms.terms")}
                        </Text>{" "}
                        {t("ui.SignUpScreen.terms.and")}{" "}
                        <Text style={styles.link} onPress={() => Alert.alert("Privacy Policy")}>
                            {t("ui.SignUpScreen.terms.privacy")}
                        </Text>
                        {t("ui.SignUpScreen.terms.dot")}
                    </Text>

                    <MyButton
                        title={isSubmitting ? t("ui.SignUpScreen.btn.registering") : t("ui.SignUpScreen.btn.register")}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>{t("ui.SignUpScreen.login.title")}</Text>
                        <Pressable onPress={() => navigate.goBack()}>
                            <Text style={styles.footerLink}> {t("ui.SignUpScreen.login.link")}</Text>
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
