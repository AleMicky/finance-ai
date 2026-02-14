import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getSavedLang } from "./langStore";

i18n.use(initReactI18next).init({
  lng: "es", // default
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        txnType: { INCOME: "Income", EXPENSE: "Expense" },
        category: {
          FOOD: "Food",
          TRANSPORT: "Transport",
          HEALTH: "Health",
          EDUCATION: "Education",
          HOUSING: "Housing",
          UTILITIES: "Utilities",
          ENTERTAINMENT: "Entertainment",
          SHOPPING: "Shopping",
          TRANSFER: "Transfer",
          OTHER: "Other",
        },
        ui: {
          LoginScreen: {
            title: "Welcome to BudgetAI",
            subtitle: "Please log in to manage your finances",
            email: "Email",
            emailPlaceholder: "Enter your email",
            validationEmail: {
              emailRequired: "Email is required",
              emailInvalid: "Please enter a valid email address",
            },
            password: "Password",
            passwordPlaceholder: "Enter your password",
            validationPassword: {
              passwordRequired: "Password is required",
              passwordMin: "Password must be at least 6 characters",
            },
            forgot: "Forgot Password?",
            enter: "Sign In",
            or: "OR",
            titleSignUp: "Don't have an account?",
            linkSignUp: "Sign Up",
            sending: "Sending...",
          },
          logout: "Logout",
          quickAdd: "Quick Add",
          quickPlaceholder: 'e.g. "Taxi 15 bs"',
          save: "Save with AI",
          saving: "Saving...",
          movements: "Transactions",
          empty: "No transactions yet.",
          dashboard: "Dashboard",
          byCategory: "By category",
          aiInsights: "AI Insights",
          loading: "Loading...",
          income: "Income",
          expense: "Expense",
          balance: "Balance",
          avgDailyExpense: "Daily average",
          month: "Month",
        },
      },
    },
    es: {
      translation: {
        txnType: { INCOME: "Ingreso", EXPENSE: "Gasto" },
        category: {
          FOOD: "Comida",
          TRANSPORT: "Transporte",
          HEALTH: "Salud",
          EDUCATION: "Educación",
          HOUSING: "Vivienda",
          UTILITIES: "Servicios",
          ENTERTAINMENT: "Entretenimiento",
          SHOPPING: "Compras",
          TRANSFER: "Transferencia",
          OTHER: "Otros",
        },
        ui: {
          LoginScreen: {
            title: "Bienvenido a BudgetAI",
            subtitle: "Por favor, inicia sesión para gestionar tus finanzas",
            email: "Correo",
            emailPlaceholder: "Ingresa tu correo",
            validationEmail: {
              emailRequired: "El correo es requerido",
              emailInvalid: "Por favor, ingresa un correo válido",
            },
            password: "Contraseña",
            passwordPlaceholder: "Ingresa tu contraseña",
            validationPassword: {
              passwordRequired: "La contraseña es requerida",
              passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
            },
            forgot: "¿Olvidaste tu contraseña?",
            enter: "Iniciar sesión",
            or: "O",
            titleSignUp: "¿No tienes una cuenta?",
            linkSignUp: "Regístrate",
            sending: "Enviando...",
          },
          logout: "Salir",
          quickAdd: "Agregar rápido",
          quickPlaceholder: 'Ej: "Taxi 15 bs"',
          save: "Guardar con IA",
          saving: "Guardando...",
          movements: "Movimientos",
          empty: "Aún no hay movimientos.",
          dashboard: "Dashboard",
          byCategory: "Por categoría",
          aiInsights: "Insights IA",
          loading: "Cargando...",
          income: "Ingresos",
          expense: "Gastos",
          balance: "Balance",
          avgDailyExpense: "Promedio diario",
          month: "Mes",
        },
      },
    },
  },
  interpolation: { escapeValue: false },
});

export async function initLangFromStorage() {
  const saved = await getSavedLang();
  if (saved) await i18n.changeLanguage(saved);
}

export default i18n;