import { createFileRoute } from "@tanstack/react-router";

import { DashboardLayout } from "@/components/dashboard-page";
import { StudyChat } from "@/components/study-chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — ask your study tutor anything | ExamGlow" },
      {
        name: "description",
        content: "Chat with Whiskers, the ExamGlow AI tutor: explain concepts, quiz yourself, summarise notes and plan sessions.",
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
      <div className="h-[calc(100dvh-9rem)] py-4">
        <StudyChat />
      </div>
    </DashboardLayout>
  );
}
