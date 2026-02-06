"use client";

import { Bot, X, Github } from "lucide-react";
import { useNotificationStore } from "@/stores/notification";

const notifications = [
  {
    repo: "experience-app",
    message: "새 커밋에서 Redis 관련 작업이 감지되었어요. 캐싱 전략을 선택한 기준이 무엇인가요?",
    time: "10분 전",
  },
  {
    repo: "experience-app",
    message: "테스트 커버리지가 크게 올랐어요. 어떤 테스트 전략을 사용했는지 설명해 주실 수 있나요?",
    time: "3시간 전",
  },
  {
    repo: "portfolio-site",
    message: "CI/CD 파이프라인 설정이 추가되었네요. 배포 자동화를 도입한 이유는 무엇인가요?",
    time: "1일 전",
  },
];

export default function NotificationDialog() {
  const { isOpen, close } = useNotificationStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/20" onClick={close} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] pt-[60px] px-3">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
          <div className="flex justify-between items-center px-4 pt-4 pb-2">
            <h3 className="font-bold text-sm">AI 스캔 알림</h3>
            <button onClick={close}>
              <X size={16} className="text-neutral-400" />
            </button>
          </div>
          <div className="divide-y divide-neutral-50">
            {notifications.map((n, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-neutral-100 rounded text-[10px] font-medium">
                    <Github size={10} /> {n.repo}
                  </div>
                  <span className="text-[10px] text-neutral-300">{n.time}</span>
                </div>
                <div className="flex gap-2">
                  <Bot size={14} className="text-neutral-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-neutral-700 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
