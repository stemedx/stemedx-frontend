"use client";
import { useState } from "react";
import { signupWithEmail } from "@/utils/auth-actions";
import { GoogleIcon } from "@/app/components/icons";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (password !== confirmPassword) {
        setError(AUTH_CONTENT?.modal?.errors?.passwordMismatch || "Passwords do not match");
        setLoading(false);
        return;
      }
      
      const result = await signupWithEmail(email, password, name);
      if (result.error) {
        setError(result.error);
      } else {
        window.location.href = '/';
      }
    } catch {
      setError(AUTH_CONTENT?.modal?.errors?.unexpected || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {AUTH_CONTENT?.modal?.titles?.signup || "Join StemXio"}
        </h1>
        <p className="text-gray-300 text-sm">
          {AUTH_CONTENT?.modal?.subtitles?.signup || "Create your account"}
        </p>
      </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={AUTH_CONTENT?.modal?.fields?.name || "Full Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          <input
            type="email"
            placeholder={AUTH_CONTENT?.modal?.fields?.email || "Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          <input
            type="password"
            placeholder={AUTH_CONTENT?.modal?.fields?.password || "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          <input
            type="password"
            placeholder={AUTH_CONTENT?.modal?.fields?.confirmPassword || "Confirm Password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? (AUTH_CONTENT?.modal?.loading?.signup || "Creating Account...") : (AUTH_CONTENT?.modal?.buttons?.signup || "Create Account")}
          </button>
          
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