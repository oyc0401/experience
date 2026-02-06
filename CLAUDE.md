# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Architecture

**ExpLog** — AI 기반 경험 기록 앱 (모바일 퍼스트, 390px 고정 너비)

### Stack
- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4 (Pretendard 폰트)
- Zustand (전역 상태) + TanStack React Query (서버 상태)
- lucide-react (아이콘)

### Path Alias
- `@/*` → `./src/*`

### Layout Structure
Root layout (`src/app/layout.tsx`)이 AppBar, BottomNav, NotificationDialog를 전역 렌더링.
- **AppBar**: 메인 탭(`/`, `/experience`, `/profile`)에서는 로고+알림, 나머지 페이지에서는 뒤로가기+타이틀. 새 페이지 추가 시 `pageTitles` 맵에 경로-타이틀 등록 필요.
- **BottomNav**: `startsWith`로 active 판정 (홈은 정확 일치)
- **NotificationDialog**: Zustand store (`src/stores/notification.ts`)로 열림/닫힘 제어, props 없는 독립 컴포넌트

### State Management
- 전역 UI 상태: Zustand (`src/stores/`)
- 서버 상태: React Query (`src/api/query-client.ts`, staleTime 60s)
- 로컬 상태: React useState

### API Client
`src/api/client.ts` — 커스텀 fetch wrapper. 3회 재시도 + 지수 백오프. Base URL은 `NEXT_PUBLIC_API_URL` (기본값 `http://localhost:3001`).

### Styling Conventions
- Tailwind 유틸리티 클래스 인라인 사용
- 전역 스크롤바 숨김 (`globals.css`의 `*` 선택자)
- 모바일 390px 컨테이너 + `pb-24`로 바텀네비 영역 확보
- 카드: `border border-neutral-100 rounded-2xl` 패턴
- 색상: neutral 계열 (50~900)

### Page Patterns
- 서버 컴포넌트 기본, 인터랙션 필요 시 `"use client"` 추가
- 하드코딩된 더미 데이터 사용 중 (API 미연동)
- 경험 상세 페이지는 정적 라우트 (`/experience/app-dev/refactor-auth-logic`)
