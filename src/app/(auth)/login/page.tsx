"use client";
import { useActionState } from "react";
import { loginWithEmail } from "@/utils/auth-actions";
import { GoogleIcon } from "@/app/components/icons";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import Link from "next/link";

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
  const [state, formAction, isPending] = useActionState(loginWithEmail, undefined);
  
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {AUTH_CONTENT?.modal?.titles?.login || "Welcome Back"}
        </h1>
        <p className="text-gray-300 text-sm">
          {AUTH_CONTENT?.modal?.subtitles?.login || "Sign in to continue"}
        </p>
      </div>

        {state?.error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {state.error}
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
          
          <input
            name="password"
            type="password"
            placeholder={AUTH_CONTENT?.modal?.fields?.password || "Password"}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isPending ? (AUTH_CONTENT?.modal?.loading?.login || "Signing In...") : (AUTH_CONTENT?.modal?.buttons?.login || "Sign In")}
          </button>

          <div className="text-center">
            <Link 
              href="/forgot-password" 
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              {AUTH_CONTENT?.modal?.links?.forgotPassword || "Forgot Password?"}
            </Link>
          </div>
          
          <div className="text-center">
            <div className="border-t border-white/20 my-4"></div>
            <button
              type="button"
              className="w-full bg-white/5 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
            >
              <GoogleIcon size={20} />
              {AUTH_CONTENT?.modal?.buttons?.googleLogin || "Continue with Google"}
            </button>
          </div>
        </form>

    </>
  );
}