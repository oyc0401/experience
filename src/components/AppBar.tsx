"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Brain, Bell, ChevronLeft, Search, ArrowUpDown } from "lucide-react";
import { useNotificationStore } from "@/stores/notification";
import { useSearchStore } from "@/stores/search";
import { useExperienceStore, sortLabels, type SortOption } from "@/stores/experience";
import { useNavigationStore } from "@/stores/navigation";

const pageTitles: Record<string, string> = {
  "/experience/app-dev/refactor-auth-logic": "경험 상세",
  "/history": "나의 최근 경험",
  "/profile/billing": "결제",
};

const pageIdTitles: Record<string, string> = {
  experience: "내 경험",
  profile: "마이페이지",
};

export default function AppBar() {
  const pathname = usePathname();
  const router = useRouter();
  const toggle = useNotificationStore((s) => s.toggle);
  const { query, setQuery } = useSearchStore();
  const { postId, setPostId, sort, setSort, showSortMenu, setShowSortMenu } = useExperienceStore();
  const pageId = useNavigationStore((s) => s.pageId);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSortMenu) return;
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSortMenu, setShowSortMenu]);

  const isOnRoot = pathname === "/";
  const isMainTab = isOnRoot && ["home", "experience", "profile"].includes(pageId);
  const isHome = isMainTab && !(pageId === "experience" && postId);
  const showSearch = isOnRoot && pageId === "experience" && postId !== null;

  const isExperiencePage = isOnRoot && pageId === "experience";
  const title = isOnRoot ? (pageIdTitles[pageId] ?? "") : (pageTitles[pathname] ?? "");

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

  const handleBack = () => {
    if (isExperiencePage && postId) {
      setPostId(null);
      setQuery("");
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex items-center gap-3">
      <button onClick={handleBack} className="text-neutral-900 shrink-0">
        <ChevronLeft size={22} />
      </button>
      {showSearch ? (
        <>
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
          <div ref={sortRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-50 transition-colors"
            >
              <ArrowUpDown size={18} />
            </button>
            {showSortMenu && (
              <div className="absolute top-10 right-0 z-50 bg-white border border-neutral-100 rounded-xl shadow-lg py-1 min-w-[160px]">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setSort(key)}
                    className={`block w-full text-left px-4 py-2 text-xs ${sort === key ? "text-neutral-900 font-bold bg-neutral-50" : "text-neutral-500"}`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <span className="font-bold text-base">{title}</span>
      )}
    </header>
  );
}
