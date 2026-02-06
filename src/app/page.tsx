"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Bot,
  ChevronRight,
  Github,
  Loader2,
  MessageSquareMore,
  PenTool,
} from "lucide-react";

import type {
  ExperienceSummaryDtoSourceType,
  QuestionSummaryDtoSourceType,
} from "@/api/generated";
import ExperiencePage from "@/app/experience/page";
import ProfilePage from "@/app/profile/page";
import { useCreateExperienceMutation } from "@/hooks/useExperiences";
import { useAnswerQuestionMutation, useQuestions } from "@/hooks/useQuestions";
import { useRecentExperiences } from "@/hooks/useRecentExperiences";
import { useExperienceStore } from "@/stores/experience";
import { useHomeStore } from "@/stores/home";
import { useNavigationStore } from "@/stores/navigation";

function sourceTypeIcon(
  sourceType?:
    | QuestionSummaryDtoSourceType
    | ExperienceSummaryDtoSourceType
    | string,
) {
  switch (sourceType) {
    case "GITHUB":
      return <Github size={10} />;
    case "BLOG":
      return <PenTool size={10} />;
    case "NOTION":
      return <BookOpen size={10} />;
    default:
      return <PenTool size={10} />;
  }
}

function sourceTypeLabel(
  sourceType?:
    | QuestionSummaryDtoSourceType
    | ExperienceSummaryDtoSourceType
    | string,
) {
  switch (sourceType) {
    case "GITHUB":
      return "GitHub 감지";
    case "BLOG":
      return "블로그 감지";
    case "NOTION":
      return "노션 감지";
    case "MANUAL":
      return "수기 작성";
    default:
      return "수기 작성";
  }
}

function sourceTypeIconLarge(
  sourceType?: ExperienceSummaryDtoSourceType | string,
) {
  switch (sourceType) {
    case "GITHUB":
      return <Github size={18} />;
    case "BLOG":
      return <PenTool size={18} />;
    case "NOTION":
      return <BookOpen size={18} />;
    default:
      return <PenTool size={18} />;
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function timeAgo(dateStr?: string) {
  if (!dateStr) return "";
  const now = Date.now();
  const past = new Date(dateStr).getTime();
  const diffMs = now - past;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}일 전`;
}

/* ── 히스토리 뷰 (홈 하위뷰) ── */
function HistoryView() {
  const { data: experiences, isLoading } = useRecentExperiences();
  const setPageId = useNavigationStore((s) => s.setPageId);
  const setArticleId = useExperienceStore((s) => s.setArticleId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="px-5 py-20 text-center">
        <p className="text-sm text-neutral-400">아직 기록된 경험이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6">
      <div className="space-y-3">
        {experiences.map((exp) => (
          <button
            type="button"
            key={exp.experienceId}
            onClick={() => {
              if (exp.experienceId) {
                setPageId("experience");
                setArticleId(exp.experienceId);
              }
            }}
            className="w-full flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl text-left"
          >
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
              {sourceTypeIconLarge(exp.sourceType)}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">{exp.title}</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {exp.summary}
              </p>
              <p className="text-[10px] text-neutral-300 mt-1">
                {formatDate(exp.createdAt)}
              </p>
            </div>
            <div className="text-neutral-300">
              <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeContent() {
  const setPageId = useNavigationStore((s) => s.setPageId);
  const setArticleId = useExperienceStore((s) => s.setArticleId);
  const setHomeSubView = useHomeStore((s) => s.setSubView);
  const homeSubView = useHomeStore((s) => s.subView);

  const { data: questions, isLoading: questionsLoading } = useQuestions();
  const { data: recentExperiences, isLoading: recentLoading } =
    useRecentExperiences(5);
  const createMutation = useCreateExperienceMutation();
  const answerMutation = useAnswerQuestionMutation();

  const [writeInput, setWriteInput] = useState("");
  const [answerTexts, setAnswerTexts] = useState<Record<number, string>>({});

  if (homeSubView === "history") {
    return <HistoryView />;
  }

  const handleCreate = () => {
    if (!writeInput.trim()) return;
    createMutation.mutate(
      { data: { input: writeInput } },
      { onSuccess: () => setWriteInput("") },
    );
  };

  const handleAnswer = (questionId: number) => {
    const answer = answerTexts[questionId];
    if (!answer?.trim() || !questionId) return;
    answerMutation.mutate(
      { questionId, data: { answer } },
      {
        onSuccess: () =>
          setAnswerTexts((prev) => ({ ...prev, [questionId]: "" })),
      },
    );
  };

  const goToArticle = (experienceId: number) => {
    setPageId("experience");
    setArticleId(experienceId);
  };

  return (
    <>
      {/* Quick Write */}
      <section className="px-5 pt-4 pb-2">
        <div className="px-4 py-3.5 bg-neutral-50 rounded-2xl">
          <textarea
            placeholder="오늘은 어떤 경험을 하셨나요?"
            rows={3}
            value={writeInput}
            onChange={(e) => setWriteInput(e.target.value)}
            className="w-full bg-transparent text-sm leading-relaxed resize-none outline-none placeholder:text-neutral-400 overflow-hidden"
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleCreate}
          disabled={createMutation.isPending || !writeInput.trim()}
          className="px-5 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg ml-auto block mt-3 transition-transform duration-150 active:scale-[0.98] disabled:opacity-50"
        >
          {createMutation.isPending ? "등록 중..." : "등록하기"}
        </button>
      </section>

      {/* AI Question Card */}
      <section className="py-4">
        <div className="flex items-center gap-2 mb-4 px-5">
          <h2 className="font-bold text-base">답변 대기 중인 경험</h2>
          {!questionsLoading && questions.length > 0 && (
            <span className="bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded-full">
              {questions.length}
            </span>
          )}
        </div>

        {questionsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={20} className="animate-spin text-neutral-400" />
          </div>
        ) : questions.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-8 px-5">
            현재 대기 중인 질문이 없습니다
          </p>
        ) : (
          <div
            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pl-5 pr-5 scrollbar-hide pb-1"
            style={{ scrollPaddingLeft: "20px" }}
          >
            {questions.map((q) => (
              <div
                key={q.questionId}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm shrink-0 w-[85%] snap-start"
              >
                <button
                  type="button"
                  onClick={() => q.experienceId && goToArticle(q.experienceId)}
                  className="w-full text-left mb-1"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-neutral-100 rounded text-[10px] font-medium flex items-center gap-1">
                      {sourceTypeIcon(q.sourceType)}{" "}
                      {sourceTypeLabel(q.sourceType)}
                    </div>
                    <span className="text-neutral-300 text-[10px]">
                      {timeAgo(q.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-left">{q.title}</h3>
                </button>

                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 mb-4">
                  <div className="flex gap-2 mb-2">
                    <Bot
                      className="text-neutral-400 mt-0.5 shrink-0"
                      size={14}
                    />
                    <p className="text-xs leading-relaxed font-medium">
                      &ldquo;{q.content}&rdquo;
                    </p>
                  </div>
                </div>

                <textarea
                  placeholder="이 경험에 대한 답변을 작성해 보세요..."
                  className="w-full p-3 border border-neutral-200 rounded-xl text-sm leading-relaxed resize-none focus:outline-none focus:border-neutral-400 mb-3"
                  rows={3}
                  value={
                    (q.questionId != null ? answerTexts[q.questionId] : "") ??
                    ""
                  }
                  onChange={(e) => {
                    if (q.questionId == null) return;
                    setAnswerTexts((prev) => ({
                      ...prev,
                      [q.questionId as number]: e.target.value,
                    }));
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    q.questionId != null && handleAnswer(q.questionId)
                  }
                  disabled={
                    answerMutation.isPending ||
                    !(q.questionId != null && answerTexts[q.questionId]?.trim())
                  }
                  className="w-full py-3 bg-neutral-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-transform duration-150 active:scale-[0.98] disabled:opacity-50"
                >
                  <MessageSquareMore size={16} />{" "}
                  {answerMutation.isPending
                    ? "답변 중..."
                    : "답변하고 기록하기"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Knowledge DB Preview */}
      <section className="px-5 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-base">나의 최근 경험</h2>
          <button
            type="button"
            onClick={() => setHomeSubView("history")}
            className="text-xs text-neutral-400 flex items-center gap-1"
          >
            전체보기 <ChevronRight size={12} />
          </button>
        </div>

        {recentLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={20} className="animate-spin text-neutral-400" />
          </div>
        ) : recentExperiences.length === 0 ? (
          <p className="text-sm text-neutral-400 text-center py-8">
            아직 기록된 경험이 없습니다
          </p>
        ) : (
          <div className="space-y-3">
            {recentExperiences.map((exp) => (
              <button
                type="button"
                key={exp.experienceId}
                onClick={() =>
                  exp.experienceId && goToArticle(exp.experienceId)
                }
                className="w-full flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl text-left"
              >
                <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
                  {sourceTypeIconLarge(exp.sourceType)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{exp.title}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {exp.summary}
                  </p>
                  <p className="text-[10px] text-neutral-300 mt-1">
                    {formatDate(exp.createdAt)}
                  </p>
                </div>
                <div className="text-neutral-300">
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function HomePage() {
  const pageId = useNavigationStore((s) => s.pageId);

  const savedScroll = useNavigationStore((s) => s.scrollPositions[s.pageId]);

  useEffect(() => {
    const container = document.getElementById("main-scroll");
    if (container) container.scrollTo(0, savedScroll);
  }, [savedScroll]);

  switch (pageId) {
    case "experience":
      return <ExperiencePage />;
    case "profile":
      return <ProfilePage />;
    default:
      return <HomeContent />;
  }
}
