"use client";
import { useState } from "react";
import { loginWithEmail, signupWithEmail } from "@/utils/auth-actions";
import { GoogleIcon } from "./icons";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthContent {
  modal: {
    titles: { login: string; signup: string };
    subtitles: { login: string; signup: string };
    tabs: { login: string; signup: string };
    fields: { name: string; email: string; password: string; confirmPassword: string };
    buttons: { login: string; signup: string; googleLogin: string };
    loading: { login: string; signup: string };
    errors: { passwordMismatch: string; unexpected: string };
  };
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
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
      if (isLogin) {
        const result = await loginWithEmail(email, password);
        if (result.error) {
          setError(result.error);
        } else {
          onClose();
          window.location.reload();
        }
      } else {
        if (password !== confirmPassword) {
          setError(AUTH_CONTENT.modal.errors.passwordMismatch);
          setLoading(false);
          return;
        }
        const result = await signupWithEmail(email, password, name);
        if (result.error) {
          setError(result.error);
        } else {
          onClose();
          window.location.reload();
        }
      }
    } catch {
      setError(AUTH_CONTENT.modal.errors.unexpected);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right text-white text-xl hover:text-gray-300">✕</button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? AUTH_CONTENT.modal.titles.login : AUTH_CONTENT.modal.titles.signup}
          </h2>
          <p className="text-gray-300 text-sm">
            {isLogin ? AUTH_CONTENT.modal.subtitles.login : AUTH_CONTENT.modal.subtitles.signup}
          </p>
        </div>

        <div className="flex bg-white/5 rounded-lg p-1 mb-6">
          <button 
            onClick={() => setIsLogin(true)} 
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin ? 'bg-primary-gradient text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            {AUTH_CONTENT.modal.tabs.login}
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin ? 'bg-primary-gradient text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            {AUTH_CONTENT.modal.tabs.signup}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder={AUTH_CONTENT.modal.fields.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          )}
          
          <input
            type="email"
            placeholder={AUTH_CONTENT.modal.fields.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          <input
            type="password"
            placeholder={AUTH_CONTENT.modal.fields.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          
          {!isLogin && (
            <input
              type="password"
              placeholder={AUTH_CONTENT.modal.fields.confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 
              (isLogin ? AUTH_CONTENT.modal.loading.login : AUTH_CONTENT.modal.loading.signup) : 
              (isLogin ? AUTH_CONTENT.modal.buttons.login : AUTH_CONTENT.modal.buttons.signup)
            }
          </button>
          
          <div className="text-center">
            <div className="border-t border-white/20 my-4"></div>
            <button
              type="button"
              className="w-full bg-white/5 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
            >
              <GoogleIcon size={20} />
              {AUTH_CONTENT.modal.buttons.googleLogin}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}