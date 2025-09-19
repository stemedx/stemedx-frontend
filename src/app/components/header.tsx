"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeNavigation } from "./navbar";
import { LoginModal } from "./loginModal";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <div className="glass rounded-b-2xl border-b border-b-white/20 py-3">
        {/* Mobile Layout */}
        <div className="flex justify-center items-center mx-auto px-4 lg:hidden">
          <button
            onClick={() => setIsSideMenuOpen(true)}
            className="absolute left-4 text-white"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="text-2xl font-bold text-white">
            steMEdx
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center mx-auto px-4">
          {/* Component 1: Logo */}
          <Link href="/" className="text-2xl sm:text-3xl font-bold text-white">
            steMEdx
          </Link>

          {/* Component 2: Navigation */}
          <HomeNavigation />

          {/* Component 3: Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="glass text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl font-medium text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                Login
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-primary-gradient text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl font-medium text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu for Mobile */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSideMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 glass border-r border-white/20 p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsSideMenuOpen(false)}
                className="text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <HomeNavigation />
              
              <div className="space-y-4 pt-6">
                <div className="gradient-separator mb-4"></div>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsSideMenuOpen(false);
                  }}
                  className="w-full glass text-white px-4 py-2 rounded-3xl font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsSideMenuOpen(false);
                  }}
                  className="w-full bg-primary-gradient text-white px-4 py-2 rounded-3xl font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
