import { Code, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import AppBar from "@/components/AppBar";

export default function ExperiencePage() {
  return (
    <>
      <AppBar />
      <div className="px-5 py-6">
        <h1 className="text-2xl font-bold mb-6">내 경험</h1>

      <div className="space-y-3">
        <Link
          href="/experience/app-dev"
          className="flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl"
        >
          <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
            <Code size={18} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold">경험기록앱 개발</h4>
            <p className="text-[11px] text-neutral-400">2025.05.12 저장됨</p>
          </div>
          <div className="text-neutral-300">
            <ChevronRight size={14} />
          </div>
        </Link>
        <div className="flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl">
          <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
            <Users size={18} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold">버거킹 알바</h4>
            <p className="text-[11px] text-neutral-400">2025.05.08 저장됨</p>
          </div>
          <div className="text-neutral-300">
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
