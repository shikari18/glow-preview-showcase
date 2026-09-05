import { createFileRoute } from "@tanstack/react-router";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
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
    <div className="flex h-dvh w-full max-w-full overflow-hidden bg-background">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 h-dvh max-w-full overflow-hidden flex flex-col p-0 m-0">
        <StudyChat className="h-full w-full rounded-none border-0 shadow-none" />
      </main>
    </div>
  );
}
