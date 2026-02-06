"use client";

import { useState } from "react";
import { Code, Users, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

const experiences: { icon: LucideIcon; title: string; date: string; href: string }[] = [
  { icon: Code, title: "경험기록앱 개발", date: "2025.05.12 저장됨", href: "/experience/app-dev" },
  { icon: Users, title: "버거킹 알바", date: "2025.05.08 저장됨", href: "#" },
];

export default function ExperiencePage() {
  const [query, setQuery] = useState("");

  const filtered = experiences.filter((exp) =>
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
          <Link
            key={exp.title}
            href={exp.href}
            className="block flex items-center gap-4 p-4 border border-neutral-100 rounded-2xl transition-transform duration-150 active:scale-[0.98]"
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
          </Link>
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
