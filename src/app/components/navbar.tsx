"use client";
import { Home, BookOpen, PlayCircle, MessageCircle, CircleDollarSign } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HomeNavigationProps {
  onLearnClick: () => void;
}

export function HomeNavigation() {
  const pathname = usePathname();

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: PlayCircle,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: BookOpen,
    label: "Tutorials",
    href: "/tutorials",
  },
  {
    icon: CircleDollarSign,
    label: "Pricing",
    href: "/pricing",
  },
  {
    icon: MessageCircle,
    label: "Reach Us",
    href: "/reach-us",
  },
];


  return (
    <div className="flex justify-center">
        <nav className="flex items-center gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-out 
                  cursor-pointer border-b-2 hover:scale-110 ${
                  isActive
                    ? "border-teal-400"
                    : "border-transparent"
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
    </div>
  );
}
