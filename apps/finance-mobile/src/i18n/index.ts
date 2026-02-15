import i18n, { t } from "i18next";
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
          SignUpScreen: {
            title: "Create Account",
            subtitle: "Join BudgetAI to take control of your finances",
            form: {
              inputFullName: {
                label: "Full Name",
                placeholder: "Enter your full name",
                validation: {
                  required: "Full name is required"
                }
              },
              inputEmail: {
                label: "Email",
                placeholder: "Enter your email",
                validation: {
                  required: "Email is required",
                  invalid: "Please enter a valid email address"
                }
              },
              inputPassword: {
                label: "Password",
                placeholder: "Enter your password",
                validation: {
                  required: "Password is required",
                  min: "Password must be at least 6 characters"
                }
              },
            },
            terms: {
              message: "By signing up, you agree to our ",
              terms: "Terms of Service",
              and: " and ",
              privacy: "Privacy Policy",
              dot: "."
            },
            btn:{
              register: "Register",
              registering: "Registering..."
            },
            login:{
              title: "Already have an account?",
              link: "Sign In"
            }
          },
          forgotPasswordScreen: {
            title: "Forgot Password?",
            subtitle: "Enter your email address to receive a password reset link.",
            form: {
              inputEmail: {
                label: "Email",
                placeholder: "Enter your email",
                validation: {
                  required: "Email is required",
                  invalid: "Please enter a valid email address"
                }
              },
            },
            btn:{
              send: "Send Link",
              sending: "Sending..."
            },
            backToLogin: "Back to Login"
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
          SignUpScreen: {
            title: "Crear cuenta",
            subtitle: "Únete a BudgetAI para tomar el control de tus finanzas",
            form: {
              inputFullName: {
                label: "Nombre completo",
                placeholder: "Ingresa tu nombre completo",
                validation: {
                  required: "El nombre completo es requerido"
                }
              },
              inputEmail: {
                label: "Correo",
                placeholder: "Ingresa tu correo",
                validation: {
                  required: "El correo es requerido",
                  invalid: "Por favor, ingresa un correo válido"
                }
              },
              inputPassword: {
                label: "Contraseña",
                placeholder: "Ingresa tu contraseña",
                validation: {
                  required: "La contraseña es requerida",
                  tooShort: "La contraseña debe tener al menos 6 caracteres"
                }
              },
            },
            terms: {
              message: "Al registrarte, aceptas nuestros ",
              terms: "Términos de servicio",
              and: " y ",
              privacy: "Política de privacidad",
              dot: "."
            },
            btn:{
              register: "Registrarse",
              registering: "Registrando..."
            },
            login:{
              title: "¿Ya tienes una cuenta?",
              link: "Iniciar sesión"
            }
          },
          forgotPasswordScreen: {
            title: "¿Olvidaste tu contraseña?",
            subtitle: "Ingresa tu correo para recibir un enlace de restablecimiento de contraseña.",
            form: {
              inputEmail: {
                label: "Correo",
                placeholder: "Ingresa tu correo",
                validation: {
                  required: "El correo es requerido",
                  invalid: "Por favor, ingresa un correo válido"
                }
              },
            },
            btn:{
              send: "Enviar enlace",
              sending: "Enviando..."
            },
            backToLogin: "Volver al inicio de sesión"
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