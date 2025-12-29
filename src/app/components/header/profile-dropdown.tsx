import Link from "next/link";
import { User, LogOut, Settings, BookOpen } from "lucide-react";
import { logout } from "@/utils/auth-actions";

interface ProfileDropdownProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function ProfileDropdown({ isMobile = false, onLinkClick }: ProfileDropdownProps) {
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