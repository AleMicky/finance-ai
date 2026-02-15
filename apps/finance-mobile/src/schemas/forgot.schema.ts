import { z } from "zod";
import i18n from "../i18n"

export const forgotSchema = z.object({
    email: z.email(i18n.t("ui.forgotPasswordScreen.form.inputEmail.validation.invalid"))
    .min(1, i18n.t("ui.forgotPasswordScreen.form.inputEmail.validation.required")),
});

export type ForgotForm = z.infer<typeof forgotSchema>;