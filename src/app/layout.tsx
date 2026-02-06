import type { Metadata } from "next";
import "./globals.css";
import AppBar from "@/components/AppBar";
import BottomNav from "@/components/BottomNav";
import NotificationDialog from "@/components/NotificationDialog";

export const metadata: Metadata = {
  title: "ExpLog",
  description: "당신의 모든 경험을 AI가 질문하고, 답변은 면접 무기가 됩니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-neutral-100">
        <div className="mx-auto w-full max-w-[390px] min-h-dvh bg-white text-neutral-900 shadow-2xl">
          <AppBar />
          <main className="pb-24">{children}</main>
        </div>
        <NotificationDialog />
        <BottomNav />
      </body>
    </html>
  );
}
