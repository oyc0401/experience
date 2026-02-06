import { Github, PenTool, CalendarCheck, Plus } from "lucide-react";
import AppBar from "@/components/AppBar";

export default function ProfilePage() {
  return (
    <>
      <AppBar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">마이페이지</h1>
      <p className="mt-2 text-gray-500">프로필 페이지입니다.</p>

      {/* 실시간 연동 상태 */}
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-base">실시간 연동 상태</h2>
          <span className="text-xs text-neutral-400">2025.05 업데이트</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl border border-neutral-200 flex items-center justify-center">
              <Github size={20} />
            </div>
            <span className="text-[10px] text-neutral-500">GitHub</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl border border-neutral-200 flex items-center justify-center">
              <PenTool size={20} />
            </div>
            <span className="text-[10px] text-neutral-500">Blog</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl border border-neutral-200 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
            <span className="text-[10px] text-neutral-500">Calendar</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-12 h-12 rounded-2xl border border-dashed border-neutral-300 flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-[10px] text-neutral-400">Add</span>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
