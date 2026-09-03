import { createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/dashboard-page";
import { StudyChat } from "@/components/study-chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Study Chat | ExamGlow" },
      {
        name: "description",
        content:
          "Chat with Yumna, your personal AI study tutor: explain concepts simply, solve math problems, quiz yourself, and ace your exams.",
      },
      { property: "og:title", content: "AI Study Chat | ExamGlow" },
      { property: "og:description", content: "Ask Yumna anything about your syllabus and study material." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100dvh-65px)] w-full pb-2">
        <StudyChat className="h-full rounded-3xl border border-border shadow-sm" />
      </div>
    </DashboardLayout>
  );
}
