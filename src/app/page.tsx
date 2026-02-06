import {
  Github,
  Bot,
  MessageSquareMore,
  Code,
  Users,
  ChevronRight,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@/components/AppBar";

export default function HomePage() {
  return (
    <>
      <AppBar />

      {/* Hero Section */}
      <section className="px-5 py-8 bg-neutral-50">
        <h1 className="text-2xl font-bold leading-tight mb-3">
          당신의 모든 경험을 AI가 질문하고,
          <br />
          답변은 면접 무기가 됩니다.
        </h1>
        <p className="text-neutral-500 text-sm mb-6">
          연동된 채널에서 새로운 활동이 감지되면
          <br />
          AI가 질문을 던져 당신의 성장을 기록합니다.
        </p>
        <div className="flex gap-2 items-center">
          <div className="flex -space-x-2">
            <Image
              src="https://api.dicebear.com/9.x/notionists/svg?scale=200&seed=12"
              className="rounded-full border-2 border-white bg-neutral-200"
              width={32}
              height={32}
              alt="user"
            />
            <Image
              src="https://api.dicebear.com/9.x/notionists/svg?scale=200&seed=45"
              className="rounded-full border-2 border-white bg-neutral-200"
              width={32}
              height={32}
              alt="user"
            />
            <Image
              src="https://api.dicebear.com/9.x/notionists/svg?scale=200&seed=89"
              className="rounded-full border-2 border-white bg-neutral-200"
              width={32}
              height={32}
              alt="user"
            />
          </div>
          <span className="text-xs text-neutral-400 ml-2">
            3,420명의 취준생이 기록 중
          </span>
        </div>
      </section>

      {/* AI Question Card */}
      <section className="px-5 py-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-bold text-base">답변 대기 중인 경험</h2>
          <span className="bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded-full">
            2
          </span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-1 bg-neutral-100 rounded text-[10px] font-medium flex items-center gap-1">
              <Github size={10} /> GitHub 감지
            </div>
            <span className="text-neutral-300 text-[10px]">2시간 전</span>
          </div>
          <h3 className="font-bold text-sm mb-1">
            Refactor: Auth logic optimization
          </h3>
          <p className="text-neutral-500 text-xs mb-4">
            커밋 메시지에서 새로운 기술적 시도가 발견되었습니다.
          </p>

          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 mb-4">
            <div className="flex gap-2 mb-2">
              <Bot className="text-neutral-400 mt-0.5 shrink-0" size={14} />
              <p className="text-xs leading-relaxed font-medium">
                &ldquo;기존 인증 로직에서 어떤 병목 현상이 있었나요? 그리고 이번
                최적화를 통해 성능이 얼마나 개선되었는지 수치로 설명해 주실 수
                있나요?&rdquo;
              </p>
            </div>
          </div>

          <button className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
            <MessageSquareMore size={16} /> 답변하고 기록하기
          </button>
        </div>
      </section>

      {/* Knowledge DB Preview */}
      <section className="px-5 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-base">나의 최근 경험</h2>
          <button className="text-xs text-neutral-400 flex items-center gap-1">
            전체보기 <ChevronRight size={12} />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl">
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
          </div>
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
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 z-50 w-full max-w-[390px] left-1/2 -translate-x-1/2 pointer-events-none">
        <Link
          href="/write"
          className="absolute bottom-0 right-4 w-14 h-14 bg-neutral-900 rounded-full shadow-lg flex items-center justify-center text-white pointer-events-auto"
        >
          <Plus size={24} />
        </Link>
      </div>
    </>
  );
}
