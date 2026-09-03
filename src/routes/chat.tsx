import { createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/dashboard-page";
import { StudyChat } from "@/components/study-chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Yumna AI Tutor — ask your study tutor anything | ExamGlow" },
      {
        name: "description",
        content:
          "Chat with Yumna, your personal AI study tutor: explain concepts simply, solve math problems, quiz yourself, and ace your exams.",
      },
      { property: "og:title", content: "Yumna AI Tutor | ExamGlow" },
      { property: "og:description", content: "Ask Yumna anything about your syllabus and study material." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <DashboardLayout crumbs={[{ label: "Tutor" }, { label: "Yumna" }]}>
      <div className="h-[calc(100dvh-85px)] w-full py-1">
        <StudyChat className="h-full rounded-3xl border border-border shadow-sm" />
      </div>
    </DashboardLayout>
  );
}
