"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HomeNavigation } from "./navbar";
import { Menu, X, User, LogOut, Settings, BookOpen } from "lucide-react";
import { logout } from "@/lib/actions/auth-server";

interface HeaderProps {
  claims: any;
}

function ProfileDropdown({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void }) {
  if (isMobile) {
    return (
      <>
        <Link
          href="/profile?tab=profile"
          onClick={onLinkClick}
          className="w-full flex items-center gap-3 text-white px-4 py-2 rounded-3xl hover:bg-white/10 transition-colors"
        >
          <User size={16} />
          Profile
        </Link>
        <Link
          href="/profile?tab=courses"
          onClick={onLinkClick}
          className="w-full flex items-center gap-3 text-white px-4 py-2 rounded-3xl hover:bg-white/10 transition-colors"
        >
          <BookOpen size={16} />
          My Courses
        </Link>
        <Link
          href="/profile?tab=settings"
          onClick={onLinkClick}
          className="w-full flex items-center gap-3 text-white px-4 py-2 rounded-3xl hover:bg-white/10 transition-colors"
        >
          <Settings size={16} />
          Settings
        </Link>
        <form action={logout} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center gap-3 text-white px-4 py-2 rounded-3xl hover:bg-white/10 transition-colors text-left"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
      </>
    );
  }

  return (
    <div className="p-2">
      <Link
        href="/profile?tab=profile"
        onClick={onLinkClick}
        className="flex items-center gap-3 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <User size={16} />
        Profile
      </Link>
      <Link
        href="/profile?tab=courses"
        onClick={onLinkClick}
        className="flex items-center gap-3 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <BookOpen size={16} />
        My Courses
      </Link>
      <Link
        href="/profile?tab=settings"
        onClick={onLinkClick}
        className="flex items-center gap-3 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Settings size={16} />
        Settings
      </Link>
      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-3 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors w-full text-left"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </form>
    </div>
  );
}

export function Header({ claims }: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 glass rounded-b-2xl border-b border-b-white/20 py-3 z-40">
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

          {/* Component 3: Auth Buttons / Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {claims ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="glass text-white p-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30"
                >
                  <User size={24} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg z-50">
                    <ProfileDropdown onLinkClick={() => setIsProfileOpen(false)} />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <Link
                  href="/login"
                  className="glass text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl font-medium text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-gradient text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl font-medium text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
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
                {claims ? (
                  <ProfileDropdown
                    isMobile={true}
                    onLinkClick={() => setIsSideMenuOpen(false)}
                  />
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsSideMenuOpen(false)}
                      className="w-full glass text-white px-4 py-2 rounded-3xl font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 text-center block"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsSideMenuOpen(false)}
                      className="w-full bg-primary-gradient text-white px-4 py-2 rounded-3xl font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 text-center block"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
