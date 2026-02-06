"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  Code,
  Eye,
  GraduationCap,
  Loader2,
  Pencil,
  PenTool,
  PencilLine,
  Search,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

import type { FolderItemDtoFolderType } from "@/api/generated";
import { useExperienceDetail, useExperiencesByFolder, useFolders } from "@/hooks/useExperiences";
import { useExperienceStore } from "@/stores/experience";
import { useSearchStore } from "@/stores/search";

function folderTypeIcon(folderType?: FolderItemDtoFolderType | string): LucideIcon {
  switch (folderType) {
    case "DEVELOPMENT":
      return Code;
    case "EDUCATION":
      return GraduationCap;
    case "COMPETITION":
      return Trophy;
    case "PART_TIME":
      return Users;
    case "ACTIVITY":
      return Briefcase;
    case "BOOK":
      return BookOpen;
    default:
      return PenTool;
  }
}

function SourceTypeIcon({ sourceType, size }: { sourceType?: string; size: number }) {
  switch (sourceType) {
    case "GITHUB":
      return <Code size={size} />;
    case "BLOG":
      return <PenTool size={size} />;
    case "NOTION":
      return <BookOpen size={size} />;
    default:
      return <PenTool size={size} />;
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

const articleMarkdownComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-base font-bold mt-6 mb-2 first:mt-0">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-sm font-bold mt-4 mb-1.5">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm text-neutral-700 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="text-sm text-neutral-700 space-y-1 mb-3 pl-4 list-disc">{children}</ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    if (className?.includes("language-")) {
      return (
        <code className="block bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-xs overflow-x-auto">{children}</code>
      );
    }
    return (
      <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs">{children}</code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-3 overflow-hidden rounded-xl">{children}</pre>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
};

/* ── 경험 목록 뷰 (폴더 리스트) ── */
function ExperienceListView() {
  const [query, setQuery] = useState("");
  const setPostId = useExperienceStore((s) => s.setPostId);
  const { data: folders, isLoading } = useFolders();

  const filtered = folders.filter((f) =>
    (f.name ?? "").toLowerCase().includes(query.toLowerCase()),
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

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="animate-spin text-neutral-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((folder) => {
            const Icon = folderTypeIcon(folder.folderType);
            return (
              <button
                type="button"
                key={folder.folderId}
                onClick={() => folder.folderId != null && setPostId(folder.folderId, folder.name ?? "")}
                className="w-full flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl transition-transform duration-150 active:scale-[0.98] text-left"
              >
                <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{folder.name}</h4>
                  <p className="text-[11px] text-neutral-400">
                    {folder.updatedAt ? `${formatDate(folder.updatedAt)} 저장됨` : ""}
                  </p>
                </div>
                <div className="text-neutral-300">
                  <ChevronRight size={14} />
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && !isLoading && (
            <p className="text-sm text-neutral-400 text-center py-8">
              {query ? "검색 결과가 없습니다" : "아직 폴더가 없습니다"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── 경험 상세 뷰 (폴더 내 경험 목록) ── */
function ExperienceDetailView() {
  const query = useSearchStore((s) => s.query);
  const sort = useExperienceStore((s) => s.sort);
  const postId = useExperienceStore((s) => s.postId);
  const postTitle = useExperienceStore((s) => s.postTitle);
  const setArticleId = useExperienceStore((s) => s.setArticleId);
  const { data: experiences, isLoading } = useExperiencesByFolder(postId as number);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = experiences.filter(
      (exp) =>
        (exp.title ?? "").toLowerCase().includes(q) ||
        (exp.summary ?? "").toLowerCase().includes(q),
    );
    return [...list].sort((a, b) => {
      const aDate = a.createdAt ?? "";
      const bDate = b.createdAt ?? "";
      switch (sort) {
        case "updated-desc":
          return bDate.localeCompare(aDate);
        case "updated-asc":
          return aDate.localeCompare(bDate);
        case "created-desc":
          return bDate.localeCompare(aDate);
        case "created-asc":
          return aDate.localeCompare(bDate);
        default:
          return 0;
      }
    });
  }, [query, sort, experiences]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="px-5 pt-3 pb-6">
      <h1 className="font-bold text-lg mb-3">{postTitle}</h1>
      <div className="-mx-5">
        {filtered.map((exp, i) => (
            <article key={exp.experienceId}>
              {i > 0 && <div className="h-4 bg-neutral-100" />}
              <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 shrink-0">
                      <SourceTypeIcon sourceType={exp.sourceType} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold truncate">{exp.title}</h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                        {exp.summary}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => exp.experienceId != null && setArticleId(exp.experienceId)}
                    className="flex items-center gap-1 text-xs text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full shrink-0 ml-3"
                  >
                    <Pencil size={12} />
                    수정하기
                  </button>
                </div>

                <p className="text-right text-[11px] text-neutral-400 mt-4">
                  {formatDate(exp.createdAt)}
                </p>
              </div>
            </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-8">
            {query ? "검색 결과가 없습니다" : "아직 기록된 경험이 없습니다"}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 글 상세/편집 뷰 ── */
function ArticleEditView() {
  const articleId = useExperienceStore((s) => s.articleId);
  const { data: detail, isLoading } = useExperienceDetail(articleId as number);

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (detail?.content && !initialized.current) {
      setContent(detail.content);
      initialized.current = true;
    }
  }, [detail]);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (!preview) autoResize();
  }, [preview, autoResize]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={24} className="animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="px-5 py-20 text-center">
        <p className="text-sm text-neutral-400">경험을 찾을 수 없습니다</p>
      </div>
    );
  }

  const Icon = sourceTypeIcon(detail.sourceType);

  return (
    <div className="px-5 py-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400">
          <Icon size={18} />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">{detail.title}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[11px] text-neutral-400">{formatDate(detail.createdAt)}</p>
          </div>
        </div>
      </div>

      {preview ? (
        <article>
          <ReactMarkdown components={articleMarkdownComponents}>
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
          className="w-full text-sm leading-relaxed resize-none focus:outline-none overflow-hidden"
        />
      )}

      <button
        type="button"
        onClick={() => setPreview(!preview)}
        className="fixed bottom-28 right-1/2 translate-x-[170px] w-12 h-12 bg-neutral-900 rounded-full shadow-lg flex items-center justify-center text-white z-50"
      >
        {preview ? <PencilLine size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}

/* ── 메인 페이지 ── */
export default function ExperiencePage() {
  const postId = useExperienceStore((s) => s.postId);
  const articleId = useExperienceStore((s) => s.articleId);

  if (postId && articleId) return <ArticleEditView />;
  if (postId) return <ExperienceDetailView />;
  return <ExperienceListView />;
}
