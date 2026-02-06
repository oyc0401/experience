"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, Github, Eye, PencilLine } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const initialContent = `## 배경

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
- 성능 최적화는 항상 측정 → 분석 → 개선 순서로 진행해야 한다`;

export default function RefactorAuthLogicPage() {
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, []);

  useEffect(() => {
    if (!preview) autoResize();
  }, [preview, autoResize]);

  return (
    <div className="px-5 py-6">
      <Link
        href="/experience/app-dev"
        className="flex items-center gap-1 text-neutral-400 text-sm mb-4"
      >
        <ChevronLeft size={16} /> 경험기록앱 개발
      </Link>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
          <Github size={18} />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">
            Refactor: Auth logic optimization
          </h1>
          <p className="text-[11px] text-neutral-400 mt-0.5">2025.05.14</p>
        </div>
      </div>

      {preview ? (
        <article className="min-h-[65vh] p-4 border border-neutral-200 rounded-2xl">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-base font-bold mt-6 mb-2 first:mt-0">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-bold mt-4 mb-1.5">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="text-sm text-neutral-700 space-y-1 mb-3 pl-4 list-disc">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              code: ({ children, className }) => {
                if (className?.includes("language-")) {
                  return (
                    <code className="block bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-xs overflow-x-auto">{children}</code>
                  );
                }
                return (
                  <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="mb-3 overflow-hidden rounded-xl">{children}</pre>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      ) : (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            autoResize();
          }}
          className="w-full p-4 border border-neutral-200 rounded-2xl text-sm leading-relaxed resize-none focus:outline-none focus:border-neutral-400 overflow-hidden"
        />
      )}

      <button
        onClick={() => setPreview(!preview)}
        className="fixed bottom-28 right-1/2 translate-x-[170px] w-12 h-12 bg-neutral-900 rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        {preview ? <PencilLine size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
