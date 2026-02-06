"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Database, User } from "lucide-react";
import { useExperienceStore } from "@/stores/experience";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/experience", label: "내 경험", icon: Database },
  { href: "/profile", label: "마이", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { postId, setPostId } = useExperienceStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[390px] h-20 bg-white border-t border-neutral-100 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        const handleClick = (e: React.MouseEvent) => {
          if (item.href === "/experience" && pathname === "/experience" && postId) {
            e.preventDefault();
            setPostId(null);
          }
        };

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleClick}
            className="flex flex-col items-center gap-1 transition-transform duration-150 active:scale-95"
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
