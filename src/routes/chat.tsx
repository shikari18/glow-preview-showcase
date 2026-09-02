import { createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/dashboard-page";
import { StudyChat } from "@/components/study-chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — ask your study tutor anything | ExamGlow" },
      {
        name: "description",
        content:
          "Chat with the ExamGlow AI tutor: explain concepts, quiz yourself, summarise notes and plan your next study session.",
      },
      { property: "og:title", content: "AI Chat | ExamGlow" },
      { property: "og:description", content: "Ask the ExamGlow AI tutor anything about your study material." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <DashboardLayout crumbs={[{ label: "Study" }, { label: "Chat" }]}>
      {/* Stretch to fill the full content area — negative margins cancel the layout padding */}
      <div className="-mx-4 -mt-4 sm:-mx-6 lg:-mx-8" style={{ height: "calc(100dvh - 57px)" }}>
        <StudyChat className="h-full rounded-none border-x-0 border-b-0 border-t border-border" />
      </div>
    </DashboardLayout>
  );
}
