import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { RegisterForm } from "@/components/forms/register-form";

interface AuthContent {
  modal: {
    titles: { signup: string };
    subtitles: { signup: string };
    fields: { name: string; email: string; password: string; confirmPassword: string };
    buttons: { signup: string; googleLogin: string };
    loading: { signup: string };
    errors: { passwordMismatch: string; unexpected: string };
  };
}

export default function RegisterPage() {
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return <RegisterForm content={AUTH_CONTENT} />;
}
