"use client";

import { Crown, RotateCcw } from "lucide-react";

export default function BillingPage() {
  const resetDays = 3;
  const usagePercentage = 42;

  return (
    <div className="p-6">
      {/* 현재 플랜 */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-5 mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-2 mb-3">
          <Crown size={18} className="text-amber-400" />
          <span className="text-xs font-medium text-neutral-400">현재 플랜</span>
        </div>
        <h2 className="text-xl font-bold mb-1">Pro Plan</h2>
        <p className="text-sm text-neutral-400">월 ₩19,000 · 다음 결제일 2월 28일</p>
      </div>

      {/* 주간 사용량 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-base">주간 사용량</h3>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <RotateCcw size={12} />
            <span>{resetDays}일 후 초기화</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">토큰 사용량</span>
            <span className="text-xs font-medium text-neutral-500">{usagePercentage}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                usagePercentage >= 80 ? "bg-red-400" : usagePercentage >= 50 ? "bg-amber-400" : "bg-neutral-900"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* 플랜 목록 */}
      <section className="mt-8">
        <h3 className="font-bold text-base mb-4">플랜 변경</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Free</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">기본 기능 · 제한된 토큰</p>
              </div>
              <span className="text-sm font-bold text-neutral-400">₩0</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl border-2 border-neutral-900 bg-neutral-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm font-bold">Pro</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">더 많은 토큰</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white bg-neutral-900 px-2 py-0.5 rounded-full">현재</span>
                <span className="text-sm font-bold">₩19,000</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Max</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Pro 대비 5배 토큰</p>
              </div>
              <span className="text-sm font-bold">₩99,000</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
