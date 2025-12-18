"use client";
import { useActionState } from "react";
import { resetPassword } from "@/utils/auth-actions";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import Link from "next/link";

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
  const [state, formAction, isPending] = useActionState(resetPassword, undefined);
  
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {AUTH_CONTENT?.modal?.titles?.resetPassword || "Set New Password"}
        </h1>
        <p className="text-gray-300 text-sm">
          {AUTH_CONTENT?.modal?.subtitles?.resetPassword || "Enter your new password below"}
        </p>
      </div>

      {state?.error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="bg-green-500/20 border border-green-400/30 text-green-300 p-3 rounded-lg mb-4 text-sm">
          {AUTH_CONTENT?.modal?.messages?.passwordReset || "Password updated successfully"}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input
          name="password"
          type="password"
          placeholder={AUTH_CONTENT?.modal?.fields?.password || "New Password"}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
          minLength={6}
        />
        
        <input
          name="confirmPassword"
          type="password"
          placeholder={AUTH_CONTENT?.modal?.fields?.confirmPassword || "Confirm New Password"}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
          minLength={6}
        />
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending ? (AUTH_CONTENT?.modal?.loading?.resettingPassword || "Updating Password...") : (AUTH_CONTENT?.modal?.buttons?.resetPassword || "Update Password")}
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