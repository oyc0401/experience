"use client";

import { usePathname, useRouter } from "next/navigation";
import { Brain, Bell, ChevronLeft, Search } from "lucide-react";
import { useNotificationStore } from "@/stores/notification";
import { useSearchStore } from "@/stores/search";

const pageTitles: Record<string, string> = {
  "/experience": "내 경험",
  "/experience/app-dev": "경험기록앱 개발",
  "/experience/app-dev/refactor-auth-logic": "경험 상세",
  "/history": "나의 최근 경험",
  "/profile": "마이페이지",
  "/profile/billing": "결제",
  "/write": "경험 기록하기",
};

export default function AppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const toggle = useNotificationStore((s) => s.toggle);
  const { query, setQuery } = useSearchStore();
  const mainPages = ["/", "/experience", "/profile"];
  const isHome = mainPages.includes(pathname);
  const showSearch = pathname === "/experience/app-dev";

  const title = pageTitles[pathname] ?? "";

  if (isHome) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Brain className="text-white" size={14} />
          </div>
          <span className="font-bold text-lg tracking-tight">ExpLog</span>
        </div>
        <button className="relative transition-transform duration-150 active:scale-95" onClick={toggle}>
          <Bell className="text-neutral-400" size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-900 rounded-full border-2 border-white" />
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex items-center gap-3">
      <button onClick={() => router.back()} className="text-neutral-900 shrink-0">
        <ChevronLeft size={22} />
      </button>
      {showSearch ? (
        <div className="flex items-center gap-2 flex-1 bg-neutral-50 rounded-lg px-3 py-1.5">
          <Search size={14} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="경험 검색..."
            className="bg-transparent text-sm w-full outline-none placeholder:text-neutral-400"
          />
        </div>
      ) : (
        <span className="font-bold text-base">{title}</span>
      )}
    </header>
  );
}
