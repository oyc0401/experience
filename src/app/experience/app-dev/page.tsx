import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import Link from "next/link";

const experiences = [
  {
    slug: "refactor-auth-logic",
    title: "Refactor: Auth logic optimization",
    description: "인증 로직 리팩토링 및 성능 최적화",
    date: "2025.05.14",
  },
  {
    slug: "experience-api",
    title: "Feat: 경험 기록 API 연동",
    description: "경험 데이터를 저장하는 REST API 연동 구현",
    date: "2025.05.12",
  },
  {
    slug: "token-refresh-fix",
    title: "Fix: 토큰 갱신 로직 버그 수정",
    description: "리프레시 토큰 만료 시 무한 루프 발생 이슈 해결",
    date: "2025.05.10",
  },
];

export default function AppDevExperiencePage() {
  return (
    <div className="px-5 py-6">
      <Link
        href="/experience"
        className="flex items-center gap-1 text-neutral-400 text-sm mb-4"
      >
        <ChevronLeft size={16} /> 내 경험
      </Link>

      <h1 className="text-2xl font-bold mb-6">경험기록앱 개발</h1>

      <div className="space-y-3">
        {experiences.map((exp) => (
          <Link
            key={exp.slug}
            href={`/experience/app-dev/${exp.slug}`}
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
