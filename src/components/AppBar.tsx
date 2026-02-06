"use client";

import { usePathname, useRouter } from "next/navigation";
import { Brain, Bell, AlignLeft, ChevronLeft } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/experience": "내 경험",
  "/experience/app-dev": "경험기록앱 개발",
  "/experience/app-dev/refactor-auth-logic": "경험 상세",
  "/history": "나의 최근 경험",
  "/profile": "마이페이지",
  "/write": "경험 기록하기",
};

export default function AppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const mainPages = ["/", "/experience", "/profile"];
  const isHome = mainPages.includes(pathname);

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
        <div className="flex gap-4">
          <button className="relative">
            <Bell className="text-neutral-400" size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-900 rounded-full border-2 border-white" />
          </button>
          <button>
            <AlignLeft className="text-neutral-900" size={22} />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex items-center gap-3">
      <button onClick={() => router.back()} className="text-neutral-900">
        <ChevronLeft size={22} />
      </button>
      <span className="font-bold text-base">{title}</span>
    </header>
  );
}
