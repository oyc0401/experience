"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Database, User } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/experience", label: "내 경험", icon: Database },
  { href: "/profile", label: "마이", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[390px] h-20 bg-white border-t border-neutral-100 px-6 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              size={22}
              className={isActive ? "text-neutral-900" : "text-neutral-300"}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span
              className={`text-[10px] ${
                isActive
                  ? "font-bold text-neutral-900"
                  : "font-medium text-neutral-400"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
