"use client";

import { useState } from "react";
import { loginWithEmail } from "@/lib/actions/auth-client";
import { GoogleIcon } from "@/components/ui/icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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

interface LoginFormProps {
  content: AuthContent;
}

export function LoginForm({ content }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginWithEmail(email, password);

      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {content?.modal?.titles?.login || "Welcome Back"}
        </h1>
        <p className="text-gray-300 text-sm">
          {content?.modal?.subtitles?.login || "Sign in to continue"}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={content?.modal?.fields?.email || "Email Address"}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={content?.modal?.fields?.password || "Password"}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isLoading ? (content?.modal?.loading?.login || "Signing In...") : (content?.modal?.buttons?.login || "Sign In")}
        </button>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            {content?.modal?.links?.forgotPassword || "Forgot Password?"}
          </Link>
        </div>

        <div className="text-center">
          <div className="border-t border-white/20 my-4"></div>
          <button
            type="button"
            className="w-full bg-white/5 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
          >
            <GoogleIcon size={20} />
            {content?.modal?.buttons?.googleLogin || "Continue with Google"}
          </button>
        </div>
      </form>
    </>
  );
}
