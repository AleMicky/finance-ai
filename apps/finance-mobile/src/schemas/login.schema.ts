import { z } from 'zod'
import i18n from "../i18n"


export const loginSchema = z.object({
    email: z.email(i18n.t("ui.LoginScreen.validationEmail.emailInvalid"))
    .min(1, i18n.t("ui.LoginScreen.validationEmail.emailRequired")),
    password: z.string().min(6, i18n.t("ui.LoginScreen.validationPassword.passwordTooShort")),
});

export type LoginForm = z.infer<typeof loginSchema>;