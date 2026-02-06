"use client";

import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="px-5 py-6">

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold mb-2">내용</label>
          <textarea
            placeholder="어떤 경험을 했는지 자유롭게 작성해 주세요"
            rows={8}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-neutral-900 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-neutral-900 text-white rounded-xl text-sm font-bold"
        >
          저장하기
        </button>
      </form>
    </div>
  );
}
