"use client";
import { useActionState } from "react";
import { sendPasswordResetEmail } from "@/utils/auth-actions";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import Link from "next/link";

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
  const [state, formAction, isPending] = useActionState(sendPasswordResetEmail, undefined);
  
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {AUTH_CONTENT?.modal?.titles?.forgotPassword || "Reset Password"}
        </h1>
        <p className="text-gray-300 text-sm">
          {AUTH_CONTENT?.modal?.subtitles?.forgotPassword || "Enter your email to receive a password reset link"}
        </p>
      </div>

      {state?.error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="bg-green-500/20 border border-green-400/30 text-green-300 p-3 rounded-lg mb-4 text-sm">
          {AUTH_CONTENT?.modal?.messages?.resetSent || "Password reset link sent to your email"}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder={AUTH_CONTENT?.modal?.fields?.email || "Email Address"}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending ? (AUTH_CONTENT?.modal?.loading?.sendingReset || "Sending...") : (AUTH_CONTENT?.modal?.buttons?.sendReset || "Send Reset Link")}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link 
          href="/login" 
          className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          {AUTH_CONTENT?.modal?.links?.backToLogin || "Back to Login"}
        </Link>
      </div>
    </>
  );
}