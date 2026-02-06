"use client";

import { useMemo, useState } from "react";
import { Code, Users, ChevronRight, Search, Github, Pencil } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useExperienceStore } from "@/stores/experience";
import { useSearchStore } from "@/stores/search";

/* ── 경험 목록 데이터 ── */
const experienceList: { id: string | null; icon: LucideIcon; title: string; date: string }[] = [
  { id: "app-dev", icon: Code, title: "경험기록앱 개발", date: "2025.05.12 저장됨" },
  { id: null, icon: Users, title: "버거킹 알바", date: "2025.05.08 저장됨" },
];

const posts = [
  {
    slug: "refactor-auth-logic",
    title: "Refactor: Auth logic optimization",
    description: "인증 로직 리팩토링 및 성능 최적화",
    createdDate: "2025.05.10",
    updatedDate: "2025.05.14",
    commit: "a3c6eeb",
    content: `## 배경

기존 인증 로직에서 토큰 검증이 매 요청마다 DB를 조회하는 구조로 되어 있었다. 사용자가 늘어나면서 인증 관련 API의 응답 시간이 평균 320ms → 800ms로 증가했고, 이를 개선할 필요가 있었다.

## 문제 분석

- 매 API 요청마다 verifyToken() 에서 DB 조회 발생
- Redis 캐싱이 없어 반복적인 토큰 검증에 불필요한 I/O
- 토큰 갱신 로직이 동기적으로 처리되어 블로킹 발생

## 해결 방법

### 1. JWT 검증 로직 로컬 캐싱

const tokenCache = new Map();

function verifyTokenCached(token) {
  const cached = tokenCache.get(token);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.payload;
  }
  const payload = jwt.verify(token, SECRET_KEY);
  tokenCache.set(token, { payload, expiresAt: Date.now() + 60_000 });
  return payload;
}

### 2. Redis 세션 스토어 도입

- 토큰 블랙리스트를 Redis에서 관리
- TTL 기반 자동 만료로 메모리 효율화

## 결과

- 평균 응답시간: 800ms → 150ms
- DB 조회 횟수: 매 요청 → 캐시 미스 시에만
- 메모리 사용량: +12MB (Redis)

## 배운 점

- 인증처럼 빈번하게 호출되는 로직은 캐싱 전략이 필수
- 로컬 캐시 + Redis 2단 캐싱이 효과적
- 성능 최적화는 항상 측정 → 분석 → 개선 순서로 진행해야 한다`,
  },
  {
    slug: "experience-api",
    title: "Feat: 경험 기록 API 연동",
    description: "경험 데이터를 저장하는 REST API 연동 구현",
    createdDate: "2025.05.08",
    updatedDate: "2025.05.12",
    commit: "b7d2f14",
    content: `## 배경

경험 기록 데이터를 로컬에서만 관리하던 구조에서, 서버와 동기화할 수 있도록 REST API를 연동해야 했다.

## 구현 내용

- GET /api/experiences — 경험 목록 조회
- POST /api/experiences — 새 경험 생성
- PUT /api/experiences/:id — 경험 수정
- DELETE /api/experiences/:id — 경험 삭제

## 기술적 결정

- TanStack React Query를 사용하여 서버 상태 관리
- Optimistic update로 즉각적인 UI 반영
- staleTime 60초 설정으로 불필요한 재요청 방지

## 배운 점

- React Query의 mutation + invalidation 패턴이 CRUD에 매우 적합
- Optimistic update 시 롤백 로직을 반드시 구현해야 한다`,
  },
  {
    slug: "token-refresh-fix",
    title: "Fix: 토큰 갱신 로직 버그 수정",
    description: "리프레시 토큰 만료 시 무한 루프 발생 이슈 해결",
    createdDate: "2025.05.05",
    updatedDate: "2025.05.10",
    commit: "c1e8a92",
    content: `## 문제

리프레시 토큰이 만료된 상태에서 API 요청을 보내면 401 → 토큰 갱신 시도 → 다시 401 → 무한 루프가 발생했다.

## 원인 분석

- Axios interceptor에서 401 응답 시 무조건 토큰 갱신을 시도
- 갱신 요청 자체가 401을 반환해도 다시 interceptor가 동작
- 재귀 호출을 막는 플래그가 없었음

## 해결

- 토큰 갱신 요청에는 interceptor를 적용하지 않는 별도 Axios 인스턴스 생성
- 갱신 실패 시 즉시 로그아웃 처리
- 동시 다발적 요청 시 갱신을 한 번만 수행하도록 Promise 큐 구현

## 배운 점

- interceptor는 강력하지만 재귀 호출에 주의해야 한다
- 인증 관련 에러 처리는 edge case를 꼼꼼히 테스트해야 한다`,
  },
];

function sortPosts(list: typeof posts, sort: SortOption) {
  return [...list].sort((a, b) => {
    switch (sort) {
      case "updated-desc": return b.updatedDate.localeCompare(a.updatedDate);
      case "updated-asc": return a.updatedDate.localeCompare(b.updatedDate);
      case "created-desc": return b.createdDate.localeCompare(a.createdDate);
      case "created-asc": return a.createdDate.localeCompare(b.createdDate);
    }
  });
}

const markdownComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-[13px] font-bold mt-5 mb-1.5 first:mt-0">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xs font-bold mt-3 mb-1">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-xs text-neutral-600 leading-relaxed mb-2">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="text-xs text-neutral-600 space-y-0.5 mb-2 pl-3.5 list-disc">{children}</ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    if (className?.includes("language-")) {
      return (
        <code className="block bg-neutral-50 border border-neutral-100 rounded-lg p-3 text-[11px] overflow-x-auto">{children}</code>
      );
    }
    return (
      <code className="bg-neutral-100 px-1 py-0.5 rounded text-[11px]">{children}</code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-2 overflow-hidden rounded-lg">{children}</pre>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
};

/* ── 경험 목록 뷰 ── */
function ExperienceListView() {
  const [query, setQuery] = useState("");
  const setPostId = useExperienceStore((s) => s.setPostId);

  const filtered = experienceList.filter((exp) =>
    exp.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-50 rounded-xl mb-6">
        <Search size={16} className="text-neutral-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="경험 검색..."
          className="bg-transparent text-sm w-full outline-none placeholder:text-neutral-400"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((exp) => (
          <button
            key={exp.title}
            onClick={() => exp.id && setPostId(exp.id, exp.title)}
            className="w-full flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl transition-transform duration-150 active:scale-[0.98] text-left"
          >
            <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
              <exp.icon size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">{exp.title}</h4>
              <p className="text-[11px] text-neutral-400">{exp.date}</p>
            </div>
            <div className="text-neutral-300">
              <ChevronRight size={14} />
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-8">
            검색 결과가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 경험 상세 뷰 ── */
function ExperienceDetailView() {
  const query = useSearchStore((s) => s.query);
  const sort = useExperienceStore((s) => s.sort);
  const postTitle = useExperienceStore((s) => s.postTitle);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = posts.filter(
      (exp) =>
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.content.toLowerCase().includes(q)
    );
    return sortPosts(list, sort);
  }, [query, sort]);

  return (
    <div className="px-5 pt-3 pb-6">
      <h1 className="font-bold text-lg mb-3">{postTitle}</h1>
      <div className="-mx-5">
        {filtered.map((exp, i) => (
          <article key={exp.slug}>
            {i > 0 && <div className="h-4 bg-neutral-100" />}
            <div className="px-5 py-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 shrink-0">
                    <Github size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate">{exp.title}</h3>
                    <span className="text-[10px] text-neutral-300 font-mono bg-neutral-50 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                      {exp.commit}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/experience/app-dev/${exp.slug}`}
                  className="flex items-center gap-1 text-xs text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full shrink-0 ml-3"
                >
                  <Pencil size={12} />
                  수정하기
                </Link>
              </div>

              <div>
                <ReactMarkdown components={markdownComponents}>
                  {exp.content}
                </ReactMarkdown>
              </div>

              <p className="text-right text-[11px] text-neutral-400 mt-4">최근 수정일자 {exp.updatedDate}</p>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-8">
            검색 결과가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 메인 페이지 ── */
export default function ExperiencePage() {
  const postId = useExperienceStore((s) => s.postId);

  if (postId) {
    return <ExperienceDetailView />;
  }

  return <ExperienceListView />;
}
