"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";

interface AuthContent {
  modal: {
    titles: { login: string; signup: string };
    tabs: { login: string; signup: string };
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(pathname === '/register' ? 'signup' : 'login');
  
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  useEffect(() => {
    setActiveTab(pathname === '/register' ? 'signup' : 'login');
  }, [pathname]);

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    router.push(tab === 'login' ? '/login' : '/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md">
        {/* Tab Headers */}
        <div className="flex bg-white/5 rounded-lg p-1 mb-6">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'login'
                ? 'bg-primary-gradient text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {AUTH_CONTENT?.modal?.tabs?.login || "Sign In"}
          </button>
          <button
            onClick={() => handleTabChange('signup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'signup'
                ? 'bg-primary-gradient text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {AUTH_CONTENT?.modal?.tabs?.signup || "Sign Up"}
          </button>
        </div>

        {/* Tab Content */}
        {children}
      </div>
    </div>
  );
}