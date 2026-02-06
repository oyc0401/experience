import { Code, Users, Github, ChevronRight } from "lucide-react";
import Link from "next/link";

const recentExperiences = [
  {
    icon: Code,
    title: "경험기록앱 개발",
    description: "인증 로직 리팩토링 및 성능 최적화",
    date: "2025.05.14",
    href: "/experience/app-dev",
  },
  {
    icon: Users,
    title: "버거킹 알바",
    description: "매장 운영 효율화 및 신메뉴 교육",
    date: "2025.05.08",
    href: "#",
  },
  {
    icon: Github,
    title: "오픈소스 기여",
    description: "React Query 한국어 문서 번역",
    date: "2025.04.30",
    href: "#",
  },
  {
    icon: Code,
    title: "포트폴리오 사이트",
    description: "Next.js 기반 포트폴리오 개발",
    date: "2025.04.22",
    href: "#",
  },
  {
    icon: Users,
    title: "팀 프로젝트 리드",
    description: "졸업작품 팀 리딩 및 일정 관리",
    date: "2025.04.15",
    href: "#",
  },
];

export default function HistoryPage() {
  return (
    <div className="px-5 py-6">
      <h1 className="text-2xl font-bold mb-6">나의 최근 경험</h1>

      <div className="space-y-3">
        {recentExperiences.map((exp) => (
          <Link
            key={exp.title}
            href={exp.href}
            className="block flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl"
          >
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
              <exp.icon size={18} />
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
