import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

interface AuthContent {
  modal: {
    titles: { forgotPassword: string };
    subtitles: { forgotPassword: string };
    fields: { email: string };
    buttons: { sendReset: string };
    loading: { sendingReset: string };
    messages: { resetSent: string };
    links: { backToLogin: string };
    errors: { unexpected: string };
  };
}

export default function ForgotPasswordPage() {
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return <ForgotPasswordForm content={AUTH_CONTENT} />;
}
