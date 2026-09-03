import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Star,
  Headphones,
  HelpCircle,
  ChevronDown,
  Send,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/customer-service")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Support | ExamGlow" },
      { name: "description", content: "See what students say about ExamGlow and get support from our team." },
    ],
  }),
  component: CustomerServicePage,
});

const REVIEWS = [
  {
    name: "Amara K.",
    country: "Nigeria",
    avatar: "AK",
    rating: 5,
    date: "August 2025",
    review:
      "ExamGlow completely changed how I study for IGCSE. Yumna helped me understand difficult Chemistry concepts in minutes — something my textbook couldn't do in hours. Passed my mocks with distinction!",
    subject: "Chemistry 0620",
  },
  {
    name: "Zainab M.",
    country: "Pakistan",
    avatar: "ZM",
    rating: 5,
    date: "July 2025",
    review:
      "The past questions section is incredible. Having all Cambridge papers in one place with year filters saved me so much time. The AI tutor Yumna also explains every mark scheme answer so clearly.",
    subject: "Mathematics 0580",
  },
  {
    name: "David O.",
    country: "Ghana",
    avatar: "DO",
    rating: 5,
    date: "September 2025",
    review:
      "I love the quiz and flashcard features. Every question is different because the AI generates them fresh each time. My Physics grade went from a C to an A* in one term. Absolutely worth every penny.",
    subject: "Physics 0625",
  },
  {
    name: "Fatima A.",
    country: "UAE",
    avatar: "FA",
    rating: 5,
    date: "June 2025",
    review:
      "Best study platform for IGCSE students. The syllabus notes are detailed and easy to follow. My sister and I both use it and we recommend it to everyone in our class.",
    subject: "Biology 0610",
  },
  {
    name: "Emmanuel T.",
    country: "Kenya",
    avatar: "ET",
    rating: 4,
    date: "August 2025",
    review:
      "Very well designed app. The exam simulation timer actually made me practice under real pressure. My only wish is more subjects — but the ones available are already superb.",
    subject: "Economics 0455",
  },
  {
    name: "Sara J.",
    country: "Jordan",
    avatar: "SJ",
    rating: 5,
    date: "July 2025",
    review:
      "Yumna answers everything I ask and never gives generic replies. It's like having a real private tutor available 24/7. The voice call feature is my favourite — I revise while walking around the house!",
    subject: "English Literature",
  },
];

const FAQS = [
  {
    q: "How does the ExamGlow subscription renewal work?",
    a: "Your membership renews automatically based on your chosen billing interval (weekly, monthly, or termly). You can easily toggle auto-renewal ON or OFF at any time directly in your Settings page.",
  },
  {
    q: "What is the difference between Free Preview and Premium?",
    a: "Free preview users can access Chapters 1 & 2 of all syllabus notes, 2024 past papers, and introductory quizzes. Premium users unlock every chapter, all historical past question series, unlimited AI tutoring with Yumna, and full-length exam simulation forms.",
  },
  {
    q: "Can I download and print the notes and past papers?",
    a: "Yes! While on-screen content is protected from unauthorized clipping, official Cambridge question papers and mark schemes have direct PDF viewer and full download links inside the paper modal.",
  },
  {
    q: "How do I report a typo or incorrect mark scheme answer?",
    a: "You can submit an instant support ticket below or chat directly with Yumna by saying 'Report an issue with this question'. Our academic syllabus team reviews all submissions within 24 hours.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`size-3.5 ${n <= rating ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`}
        />
      ))}
    </div>
  );
}

function CustomerServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const genId = "EXG-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(genId);
    setTicketSent(true);
  };

  const totalReviews = REVIEWS.length;
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  return (
    <DashboardLayout crumbs={[{ label: "Support" }, { label: "Customer Service" }]}>
      <PageHeading
        title="Student Reviews & Support"
        badge="Community"
        action={
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Support Team Online
          </div>
        }
      />

      {/* Rating Summary Banner */}
      <div className="mb-8 rounded-3xl border border-border bg-gradient-to-br from-amber-500/5 via-card to-primary/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center">
          <p className="text-6xl font-black text-foreground">{avgRating}</p>
          <StarRating rating={5} />
          <p className="text-xs text-muted-foreground mt-1">{totalReviews} verified reviews</p>
        </div>
        <div className="w-px h-16 bg-border hidden sm:block" />
        <div className="flex-1 space-y-2">
          {[5, 4, 3].map((star) => {
            const count = REVIEWS.filter((r) => r.rating === star).length;
            const pct = Math.round((count / totalReviews) * 100);
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-4 text-muted-foreground font-bold">{star}</span>
                <Star className="size-3 fill-amber-400 text-amber-400 shrink-0" />
                <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right text-muted-foreground">{pct}%</span>
              </div>
            );
          })}
        </div>
        <div className="w-px h-16 bg-border hidden sm:block" />
        <div className="text-center sm:text-right">
          <Quote className="size-8 text-primary/30 mb-2 mx-auto sm:ml-auto sm:mr-0" />
          <p className="text-sm font-bold text-foreground max-w-[200px]">
            "Trusted by students across 30+ countries"
          </p>
          <p className="text-xs text-muted-foreground mt-1">Cambridge IGCSE · O-Level · A-Level</p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">What Students Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-sm font-bold text-primary">
                  {r.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.country} · {r.date}</p>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="flex-1 text-xs text-muted-foreground leading-relaxed">"{r.review}"</p>
              <div className="mt-3 inline-block self-start rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {r.subject}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Form + FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Support Ticket Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Headphones className="size-4" />
              </span>
              <div>
                <h2 className="font-bold text-lg text-foreground">Submit a Support Ticket</h2>
                <p className="text-xs text-muted-foreground">We reply directly to your verified email</p>
              </div>
            </div>

            {ticketSent ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center">
                <div className="flex justify-center mb-3">
                  <CheckCircle2 className="size-12 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Ticket Received!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your ticket reference is <span className="font-mono font-bold text-foreground">#{ticketId}</span>.
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Our academic team is reviewing your message and will reply to{" "}
                  <span className="font-semibold">{form.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTicketSent(false);
                    setForm({ name: "", email: "", category: "General Inquiry", subject: "", message: "" });
                  }}
                  className="mt-5 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-ink-foreground hover:opacity-90"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1">Inquiry Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option>General Inquiry</option>
                      <option>Account & Billing</option>
                      <option>AI Study Tutor (Yumna)</option>
                      <option>Past Papers & Mark Schemes</option>
                      <option>Syllabus Content Error</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1">Subject / Paper</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Physics 0625 / May 2024"
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full rounded-xl border border-border bg-surface p-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-ink py-3 text-sm font-semibold text-ink-foreground shadow hover:opacity-90 transition-opacity"
                >
                  <Send className="size-4" /> Submit Support Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <HelpCircle className="size-4" />
              </span>
              <h2 className="font-bold text-lg text-foreground">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-4 text-left font-semibold text-sm text-foreground hover:bg-secondary/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        openFaq === i ? "rotate-180 text-foreground" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
