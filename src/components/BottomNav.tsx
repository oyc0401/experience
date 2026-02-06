"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, User } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/history", label: "히스토리", icon: History },
  { href: "/profile", label: "프로필", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <ul className="flex h-16 items-center justify-around">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 text-xs ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
