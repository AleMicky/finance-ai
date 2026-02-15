import { z } from 'zod'
import i18n from "../i18n"

export const signUpSchema = z.object({
    fullName: z.string().min(1, i18n.t("ui.SignUpScreen.form.inputFullName.validation.required")),
    email: z.email(i18n.t("ui.SignUpScreen.form.inputEmail.validation.invalid"))
        .min(1, i18n.t("ui.SignUpScreen.form.inputEmail.validation.required")),
    password: z.string().min(6, i18n.t("ui.SignUpScreen.form.inputPassword.validation.required")),

});

export type SignUpForm = z.infer<typeof signUpSchema>;