import React from 'react'
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { MyButton, MyTextInput } from '../components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotForm, forgotSchema } from '../schemas/forgot.schema';


export const ForgotPasswordScreen = () => {

  const navigate = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
    mode: "onChange", // valida mientras escribe
  });

  const onSubmit = async (values: ForgotForm) => {
    try {
      // aquí tu API real:
      // await forgotPassword(values.email)
      Alert.alert("Listo", `Enviamos el link a: ${values.email}`);
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message ?? "No se pudo enviar el enlace");
    }
  };

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
          {/* Top back (círculo) */}
          <View style={styles.navRow}>
            <Pressable onPress={() => navigate.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={18} color="#64748B" />
            </Pressable>
          </View>

          {/* Header icon */}

          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="lock-closed-outline" size={28} color="#1976FF" />
            </View>

            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address to receive a password reset link.
            </Text>
          </View>

          {/* Form */}
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <MyTextInput
                label="Email"
                icon="mail-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                errorText={errors.email?.message}
              />
            )}
          />

          <View style={{ marginTop: 16 }}>
            <MyButton
              title={isSubmitting ? "Sending..." : "Send Link"}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
            />
          </View>

          {/* Back to Login */}
          <View style={styles.bottom}>
            <Pressable style={styles.backToLogin} onPress={() => navigate.goBack()}>
              <Ionicons name="arrow-back-outline" size={16} color="#137FEC" />
              <Text style={styles.backToLoginText}>Back to Login</Text>
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
    backgroundColor: "#F6F7F8",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    shadowColor: "#0B1220",
    shadowOpacity: Platform.OS === "web" ? 0.08 : 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  navRow: {
    height: 44,
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#F6F7F8",
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 18,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: "rgba(19,127,236,0.10)",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },
  bottom: {
    paddingTop: 8,
    alignItems: "center",
  },
  backToLogin: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
  },
  backToLoginText: {
    color: "#137FEC",
    fontWeight: "800",
    fontSize: 14,
  },
})
