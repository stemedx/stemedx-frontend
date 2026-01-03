import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

interface AuthContent {
  modal: {
    titles: { resetPassword: string };
    subtitles: { resetPassword: string };
    fields: { password: string; confirmPassword: string };
    buttons: { resetPassword: string };
    loading: { resettingPassword: string };
    messages: { passwordReset: string };
    links: { backToLogin: string };
    errors: { passwordMismatch: string; unexpected: string };
  };
}

export default function ResetPasswordPage() {
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return <ResetPasswordForm content={AUTH_CONTENT} />;
}
