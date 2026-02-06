"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Database, Plus, Sparkles, User } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/knowledge", label: "지식DB", icon: Database },
  { href: "/ai-generate", label: "AI 생성", icon: Sparkles },
  { href: "/profile", label: "마이", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-neutral-100 px-6 flex justify-between items-center z-50">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <span key={item.href}>
            {index === 2 && (
              <div className="relative -top-5">
                <Link
                  href="/record"
                  className="w-14 h-14 bg-neutral-900 rounded-full shadow-lg flex items-center justify-center text-white border-4 border-white"
                >
                  <Plus size={24} />
                </Link>
              </div>
            )}
            <Link
              href={item.href}
              className="flex flex-col items-center gap-1"
            >
              <Icon
                size={22}
                className={
                  isActive ? "text-neutral-900" : "text-neutral-300"
                }
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
          </span>
        );
      })}
    </nav>
  );
}
