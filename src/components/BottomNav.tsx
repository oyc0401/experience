"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Database, User } from "lucide-react";
import { useExperienceStore } from "@/stores/experience";
import { useNavigationStore, type PageId } from "@/stores/navigation";

const navItems: { pageId: PageId; label: string; icon: typeof Home }[] = [
  { pageId: "home", label: "홈", icon: Home },
  { pageId: "experience", label: "내 경험", icon: Database },
  { pageId: "profile", label: "마이", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { postId, setPostId } = useExperienceStore();
  const { pageId, setPageId, saveScroll } = useNavigationStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[390px] h-20 bg-white border-t border-neutral-100 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === "/" && pageId === item.pageId;
        const Icon = item.icon;

        const handleClick = () => {
          const container = document.getElementById("main-scroll");

          if (pathname === "/" && pageId === item.pageId) {
            container?.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }

          if (container) saveScroll(pageId, container.scrollTop);

          if (pathname !== "/") {
            router.push("/");
          }

          if (item.pageId === "experience" && pageId === "experience" && postId) {
            setPostId(null);
          }

          setPageId(item.pageId);
        };

        return (
          <button
            key={item.pageId}
            type="button"
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
          </button>
        );
      })}
    </nav>
  );
}
