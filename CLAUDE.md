# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- **`npm run build` 실행 금지** — 빌드는 직접 하지 말 것

## Build & Development Commands

- `npm run dev` — Start development server
- `npm run build` — Production build (Claude 실행 금지)
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

### SPA Navigation

모든 페이지 전환은 SPA 방식. URL 라우트가 아닌 Zustand 상태로 뷰를 전환.

- **탭 전환**: `useNavigationStore`의 `pageId` (`home` | `experience` | `profile`)
- **하위뷰 관리**: 각 탭 store에서 depth별 상태 관리
  - experience: `folderId` (폴더) → `experienceId` (글 상세/편집)
  - profile: `subPage` (`"billing"` 등)
- **통일 인터페이스**: `usePageSubView(pageId)` 훅이 `{ hasSubView, resetSubView }` 제공
  - `resetSubView`는 가장 깊은 depth부터 한 단계씩 pop
  - 새 탭에 하위뷰 추가 시 이 훅의 switch만 수정하면 BottomNav/AppBar 자동 적용
- **BottomNav**: 같은 탭 재클릭 시 하위뷰 있으면 `resetSubView`, 없으면 스크롤 top
- **AppBar**: `hasSubView` 없으면 로고+벨, 있으면 뒤로가기+타이틀(또는 검색바)

### Layout Structure
Root layout (`src/app/layout.tsx`)이 AppBar, BottomNav, NotificationDialog를 전역 렌더링.
- **AppBar**: 메인 탭에서 하위뷰 없으면 로고+알림, 하위뷰 있으면 뒤로가기+타이틀
- **BottomNav**: `pageId`로 active 판정, 재클릭 시 하위뷰 pop
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
- 경험 상세 페이지는 SPA 내 Zustand 상태로 전환 (`experienceId`)
