import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Headphones,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Send,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/customer-service")({
  head: () => ({
    meta: [
      { title: "Customer Service & Support | ExamGlow" },
      { name: "description", content: "Get help from ExamGlow 24/7 student support team." },
    ],
  }),
  component: CustomerServicePage,
});

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

  return (
    <DashboardLayout crumbs={[{ label: "Support" }, { label: "Customer Service" }]}>
      <PageHeading
        title="Customer Service & Help Desk"
        badge="24/7 Student Support"
        action={
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Support Agents Live
          </div>
        }
      />

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-3">
            <Mail className="size-5" />
          </div>
          <h3 className="font-bold text-foreground">Email Support</h3>
          <p className="text-xs text-muted-foreground mt-1">Direct inquiries & academic issues</p>
          <a
            href="mailto:support@examglow.com"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            support@examglow.com
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
            <MessageCircle className="size-5" />
          </div>
          <h3 className="font-bold text-foreground">WhatsApp Student Desk</h3>
          <p className="text-xs text-muted-foreground mt-1">Instant chat for active students</p>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Open WhatsApp Chat &rarr;
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-3">
            <Clock className="size-5" />
          </div>
          <h3 className="font-bold text-foreground">Response Time</h3>
          <p className="text-xs text-muted-foreground mt-1">Average resolution speed</p>
          <p className="mt-3 text-sm font-semibold text-foreground">Under 15 minutes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Support Form */}
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
                  Our academic team is reviewing your message and will reply to <span className="font-semibold">{form.email}</span> shortly.
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
