import { Brain, Bell, AlignLeft } from "lucide-react";

export default function AppBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
          <Brain className="text-white" size={14} />
        </div>
        <span className="font-bold text-lg tracking-tight">ExpLog</span>
      </div>
      <div className="flex gap-4">
        <button className="relative">
          <Bell className="text-neutral-400" size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-900 rounded-full border-2 border-white" />
        </button>
        <button>
          <AlignLeft className="text-neutral-900" size={22} />
        </button>
      </div>
    </header>
  );
}
