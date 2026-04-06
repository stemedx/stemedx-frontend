"use client";

import { useState, useActionState } from "react";
import { resetPassword } from "@/lib/actions/auth-server";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";

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

export function ResetPasswordForm() {
  const { language } = useLanguage();
  const content = getTranslations('auth', language) as AuthContent;
  const [state, formAction, isPending] = useActionState(resetPassword, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {content?.modal?.titles?.resetPassword || "Set New Password"}
        </h1>
        <p className="text-gray-300 text-sm">
          {content?.modal?.subtitles?.resetPassword || "Enter your new password below"}
        </p>
      </div>

      {state?.error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="bg-green-500/20 border border-green-400/30 text-green-300 p-3 rounded-lg mb-4 text-sm">
          {content?.modal?.messages?.passwordReset || "Password updated successfully"}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={content?.modal?.fields?.password || "New Password"}
            className="w-full p-3 pr-11 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder={content?.modal?.fields?.confirmPassword || "Confirm New Password"}
            className="w-full p-3 pr-11 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending ? (content?.modal?.loading?.resettingPassword || "Updating Password...") : (content?.modal?.buttons?.resetPassword || "Update Password")}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          href="/login"
          className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          {content?.modal?.links?.backToLogin || "Back to Login"}
        </Link>
      </div>
    </>
  );
}
