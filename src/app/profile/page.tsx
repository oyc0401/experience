"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github, PenTool, CalendarCheck, Plus, X, Check, Slack, Trello, Figma, FileText, User, CreditCard, LogOut, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Integration {
  icon: LucideIcon;
  name: string;
  connected: boolean;
}

const allIntegrations: Integration[] = [
  { icon: Github, name: "GitHub", connected: true },
  { icon: PenTool, name: "Blog", connected: true },
  { icon: CalendarCheck, name: "Calendar", connected: true },
  { icon: Slack, name: "Slack", connected: false },
  { icon: Trello, name: "Trello", connected: false },
  { icon: Figma, name: "Figma", connected: false },
  { icon: FileText, name: "Notion", connected: false },
];

export default function ProfilePage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const connected = allIntegrations.filter((i) => i.connected);

  return (
    <>
      <div className="p-6">
        {/* 프로필 카드 */}
        <div className="flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl mb-8">
          <div className="w-14 h-14 bg-neutral-200 rounded-full flex items-center justify-center">
            <User size={24} className="text-neutral-500" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-base">지디지</h2>
            <p className="text-[11px] text-neutral-400 mt-0.5">gdg@email.com</p>
            <div className="flex gap-3 mt-2">
              <span className="text-[11px] text-neutral-500"><strong className="text-neutral-900">12</strong> 경험</span>
              <span className="text-[11px] text-neutral-500"><strong className="text-neutral-900">3</strong> 연동</span>
              <span className="text-[11px] text-neutral-500"><strong className="text-neutral-900">8</strong> 답변</span>
            </div>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-base">실시간 연동 상태</h2>
            <span className="text-xs text-neutral-400">2025.05 업데이트</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {connected.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl border border-neutral-200 flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <span className="text-[10px] text-neutral-500">{item.name}</span>
              </div>
            ))}
            <button
              onClick={() => setShowDialog(true)}
              className="flex flex-col items-center gap-2 opacity-40"
            >
              <div className="w-12 h-12 rounded-2xl border border-dashed border-neutral-300 flex items-center justify-center">
                <Plus size={20} />
              </div>
              <span className="text-[10px] text-neutral-400">Add</span>
            </button>
          </div>
        </section>

        {/* 설정 메뉴 */}
        <section className="mt-8 space-y-2">
          <button
            onClick={() => router.push("/profile/billing")}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 hover:bg-neutral-50 transition-all duration-150 active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
              <CreditCard size={18} className="text-neutral-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">결제</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">현재 Pro Plan 이용 중</p>
            </div>
            <ChevronRight size={16} className="text-neutral-300" />
          </button>

          <button className="w-full flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 hover:bg-neutral-50 transition-all duration-150 active:scale-[0.98]">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <LogOut size={18} className="text-red-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-red-500">로그아웃</p>
            </div>
          </button>
        </section>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDialog(false)} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px]">
            <div className="bg-white rounded-t-2xl shadow-xl px-5 pt-5 pb-8">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-base">연동 추가</h3>
                <button onClick={() => setShowDialog(false)}>
                  <X size={18} className="text-neutral-400" />
                </button>
              </div>
              <div className="space-y-3">
                {allIntegrations.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      item.connected
                        ? "border-neutral-100 bg-neutral-50 opacity-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center">
                      <item.icon size={18} />
                    </div>
                    <span className="flex-1 text-sm font-medium">{item.name}</span>
                    {item.connected ? (
                      <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <Check size={12} /> 연동됨
                      </span>
                    ) : (
                      <button className="px-3 py-1.5 bg-neutral-900 text-white text-[11px] font-bold rounded-lg">
                        연동하기
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
