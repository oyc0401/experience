import { Github, ChevronRight } from "lucide-react";
import Link from "next/link";

const recentExperiences = [
  {
    title: "Refactor: Auth logic optimization",
    description: "인증 로직 리팩토링 및 성능 최적화",
    date: "2025.05.14",
    href: "/experience/app-dev/refactor-auth-logic",
  },
  {
    title: "Feat: 경험 기록 API 연동",
    description: "경험 데이터를 저장하는 REST API 연동 구현",
    date: "2025.05.12",
    href: "#",
  },
  {
    title: "Fix: 토큰 갱신 로직 버그 수정",
    description: "리프레시 토큰 만료 시 무한 루프 발생 이슈 해결",
    date: "2025.05.10",
    href: "#",
  },
  {
    title: "Feat: React Query 캐싱 전략 적용",
    description: "서버 상태 관리 및 캐싱 최적화",
    date: "2025.04.30",
    href: "#",
  },
  {
    title: "Feat: 포트폴리오 사이트 개발",
    description: "Next.js 기반 포트폴리오 개발",
    date: "2025.04.22",
    href: "#",
  },
];

export default function HistoryPage() {
  return (
    <div className="px-5 py-6">
      <div className="space-y-3">
        {recentExperiences.map((exp) => (
          <Link
            key={exp.title}
            href={exp.href}
            className="block flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl"
          >
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
              <Github size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">{exp.title}</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {exp.description}
              </p>
              <p className="text-[10px] text-neutral-300 mt-1">{exp.date}</p>
            </div>
            <div className="text-neutral-300">
              <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
