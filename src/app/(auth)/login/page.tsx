import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { LoginForm } from "@/components/forms/login-form";

interface AuthContent {
  modal: {
    titles: { login: string };
    subtitles: { login: string };
    fields: { email: string; password: string };
    buttons: { login: string; googleLogin: string };
    loading: { login: string };
    links: { forgotPassword: string };
    errors: { unexpected: string };
  };
}

export default function LoginPage() {
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return <LoginForm content={AUTH_CONTENT} />;
}
