import React, { use, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { login } from "../api/auth";
import { setToken } from "../auth/tokenStore";
import { MyTextInput, MyButton, MyDivider } from "../components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export function LoginScreen({ onAuthed }: { onAuthed: () => void }) {

  const navigate = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },

  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });


  const onSubmit = async (values: LoginForm) => {
    try {
      const data = await login(values.email, values.password);
      await setToken(data.accessToken);
      onAuthed();
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message ?? "No se pudo iniciar sesión");
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
            <Ionicons name="flash" size={22} color="#1976FF" />
          </View>

          <Text style={styles.title}>{t("ui.LoginScreen.title")}</Text>
          <Text style={styles.subtitle}>
            {t("ui.LoginScreen.subtitle")}
          </Text>

          {/* Form */}

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <MyTextInput
                label={t("ui.LoginScreen.email")}
                placeholder={t("ui.LoginScreen.emailPlaceholder")}
                icon="mail-outline"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                errorText={errors.email?.message}
              />)}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <MyTextInput
                label={t("ui.LoginScreen.password")}
                placeholder={t("ui.LoginScreen.passwordPlaceholder")}
                styleLabel={{ marginTop: 16 }}
                icon="lock-closed-outline"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#94A3B8"
                password={true}
                errorText={errors.password?.message}
              />)}
          />

          <Pressable style={styles.forgotWrap} onPress={() => navigate.navigate("ForgotPassword")}>
            <Text style={styles.forgot}>{t("ui.LoginScreen.forgot")}</Text>
          </Pressable>

          <MyButton title={isSubmitting ? t("ui.LoginScreen.sending") : t("ui.LoginScreen.enter")}
            onPress={handleSubmit(onSubmit)} 
          />

          <MyDivider text={t("ui.LoginScreen.or")} />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{t("ui.LoginScreen.titleSignUp")}</Text>
            <Pressable onPress={() => navigate.navigate("SignUp")}>
              <Text style={styles.footerLink}> {t("ui.LoginScreen.linkSignUp")}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1, // IMPORTANTÍSIMO con ScrollView
    backgroundColor: "#EEF5FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    shadowColor: "#0B1220",
    shadowOpacity: Platform.OS === "web" ? 0.08 : 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  appIcon: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: { fontSize: 32, fontWeight: "800", color: "#0F172A", marginBottom: 6 },
  subtitle: { fontSize: 14, lineHeight: 20, color: "#64748B", marginBottom: 18 },
  forgotWrap: { alignSelf: "flex-end", marginTop: 10, marginBottom: 14 },
  forgot: { color: "#1976FF", fontWeight: "700", fontSize: 13 },
  footerRow: { marginTop: 18, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { color: "#64748B", fontSize: 13, fontWeight: "600" },
  footerLink: { color: "#1976FF", fontSize: 13, fontWeight: "800" },
});
