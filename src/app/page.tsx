import {
  Github,
  Bot,
  MessageSquareMore,
  Code,
  Users,
  ChevronRight,
  User,
  PencilLine,
} from "lucide-react";
import Link from "next/link";
export default function HomePage() {
  return (
    <>
      {/* AI Question Card */}
      <section className="py-4">
        <div className="flex items-center gap-2 mb-4 px-5">
          <h2 className="font-bold text-base">답변 대기 중인 경험</h2>
          <span className="bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded-full">
            2
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-5 pr-5 scrollbar-hide pb-1" style={{ scrollPaddingLeft: "20px" }}>
          {/* Card 1 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm shrink-0 w-[85%] snap-start">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-1 bg-neutral-100 rounded text-[10px] font-medium flex items-center gap-1">
                <Github size={10} /> GitHub 감지
              </div>
              <span className="text-neutral-300 text-[10px]">2시간 전</span>
            </div>
            <Link href="/experience/app-dev/refactor-auth-logic">
              <h3 className="font-bold text-sm mb-1">
                Refactor: Auth logic optimization
              </h3>
            </Link>

            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 mb-4">
              <div className="flex gap-2 mb-2">
                <Bot className="text-neutral-400 mt-0.5 shrink-0" size={14} />
                <p className="text-xs leading-relaxed font-medium">
                  &ldquo;기존 인증 로직에서 어떤 병목 현상이 있었나요? 그리고
                  이번 최적화를 통해 성능이 얼마나 개선되었는지 수치로 설명해
                  주실 수 있나요?&rdquo;
                </p>
              </div>
            </div>

            <textarea
              placeholder="이 경험에 대한 답변을 작성해 보세요..."
              className="w-full p-3 border border-neutral-200 rounded-xl text-sm leading-relaxed resize-none focus:outline-none focus:border-neutral-400 mb-3"
              rows={3}
            />

            <button className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <MessageSquareMore size={16} /> 답변하고 기록하기
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm shrink-0 w-[85%] snap-start">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-1 bg-neutral-100 rounded text-[10px] font-medium flex items-center gap-1">
                <Github size={10} /> GitHub 감지
              </div>
              <span className="text-neutral-300 text-[10px]">1일 전</span>
            </div>
            <Link href="/experience/app-dev">
              <h3 className="font-bold text-sm mb-1">
                Feat: 경험 기록 API 연동
              </h3>
            </Link>

            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 mb-4">
              <div className="flex gap-2 mb-2">
                <Bot className="text-neutral-400 mt-0.5 shrink-0" size={14} />
                <p className="text-xs leading-relaxed font-medium">
                  &ldquo;REST API 설계 시 어떤 기준으로 엔드포인트를
                  구성했나요? 그리고 React Query를 선택한 이유가
                  무엇인가요?&rdquo;
                </p>
              </div>
            </div>

            <textarea
              placeholder="이 경험에 대한 답변을 작성해 보세요..."
              className="w-full p-3 border border-neutral-200 rounded-xl text-sm leading-relaxed resize-none focus:outline-none focus:border-neutral-400 mb-3"
              rows={3}
            />

            <button className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <MessageSquareMore size={16} /> 답변하고 기록하기
            </button>
          </div>
        </div>
      </section>

      {/* Knowledge DB Preview */}
      <section className="px-5 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-base">나의 최근 경험</h2>
          <Link href="/history" className="text-xs text-neutral-400 flex items-center gap-1">
            전체보기 <ChevronRight size={12} />
          </Link>
        </div>

        <div className="space-y-3">
          <Link href="/experience/app-dev/refactor-auth-logic" className="block flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl">
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
              <Github size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">Refactor: Auth logic optimization</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">인증 로직 리팩토링 및 성능 최적화</p>
              <p className="text-[10px] text-neutral-300 mt-1">2025.05.14</p>
            </div>
            <div className="text-neutral-300">
              <ChevronRight size={14} />
            </div>
          </Link>
          <div className="flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl">
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
              <Github size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">Feat: 경험 기록 API 연동</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">경험 데이터를 저장하는 REST API 연동 구현</p>
              <p className="text-[10px] text-neutral-300 mt-1">2025.05.12</p>
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
          <PencilLine size={22} />
        </Link>
      </div>
    </>
  );
}
