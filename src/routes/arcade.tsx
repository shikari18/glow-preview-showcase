import { createFileRoute } from "@tanstack/react-router";

import { Gamepad2 } from "lucide-react";

import { CardGrid } from "@/components/study-page";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/arcade")({
  head: () => ({
    meta: [
      { title: "Arcade — study games, streaks and leaderboards | ExamGlow" },
      {
        name: "description",
        content:
          "Turn revision into a game: timed challenges, streaks, points and leaderboards built on your own study material.",
      },
      { property: "og:title", content: "Arcade | ExamGlow" },
      { property: "og:description", content: "Study games, streaks and leaderboards from your own notes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArcadePage,
});

function ArcadePage() {
  return (
    <DashboardLayout crumbs={[{ label: "My First Study Set" }, { label: "Arcade" }]}>
      <PageHeading
        icon={<Gamepad2 className="size-5" aria-hidden />}
        title="Arcade"
        subtitle="Revision disguised as games — beat the clock and keep your streak alive"
      />
      <CardGrid
        items={[
          { meta: "60 seconds", title: "Speed round", body: "How many questions can you clear before the timer runs out?" },
          { meta: "Head to head", title: "Duel", body: "Challenge a classmate to the same set of questions." },
          { meta: "Daily", title: "Streak challenge", body: "One curated question set every day." },
          { meta: "Memory", title: "Match up", body: "Pair terms with definitions against the clock." },
          { meta: "Survival", title: "Last stand", body: "Keep answering until you miss three." },
          { meta: "Weekly", title: "Leaderboard", body: "See where you rank against your course." },
        ]}
      />
    </DashboardLayout>
  );
}
