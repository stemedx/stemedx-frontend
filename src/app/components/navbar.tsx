"use client";
import { Home, BookOpen, PlayCircle, MessageCircle, CircleDollarSign } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";

export function HomeNavigation() {
  const pathname = usePathname();
  const CONTENT = getTranslations('navbar', CURRENT_LANGUAGE) as any;

  const menuItems = [
    {
      icon: Home,
      label: CONTENT?.home || "Home",
      href: "/",
    },
    {
      icon: PlayCircle,
      label: CONTENT?.courses || "Courses",
      href: "/courses",
    },
    {
      icon: BookOpen,
      label: CONTENT?.tutorials || "Tutorials",
      href: "/tutorials",
    },
    {
      icon: CircleDollarSign,
      label: CONTENT?.pricing || "Pricing",
      href: "/pricing",
    },
    {
      icon: MessageCircle,
      label: CONTENT?.reachUs || "Reach Us",
      href: "/reachus",
    },
  ];

  return (
    <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-1 lg:px-1 lg:py-1 w-full lg:w-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-out cursor-pointer flex-shrink-0 lg:rounded-3xl lg:hover:scale-105 rounded-full w-full lg:w-auto border-b-2 ${
                isActive 
                  ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30" 
                  : "border-transparent lg:hover:bg-white/5 hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">
                {item.label}
              </span>
            </Link>
          );
        })}
    </nav>
  );
}
