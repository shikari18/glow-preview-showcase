import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Shield,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ExamGlow" },
      {
        name: "description",
        content:
          "Read ExamGlow's Terms of Service covering subscriptions, automated renewals, cancellations, refunds, and academic use.",
      },
    ],
  }),
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/home" className="flex items-center gap-2.5">
            <img src={logoMark} alt="ExamGlow" className="size-8 rounded-full" />
            <span className="text-lg font-bold tracking-tight text-zinc-900">ExamGlow</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link to="/privacy" className="text-zinc-500 hover:text-zinc-900 transition">
              Privacy Policy
            </Link>
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-zinc-700 hover:bg-zinc-200 transition"
            >
              <ArrowLeft className="size-3.5" /> Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Title & Badge */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-4">
            <FileText className="size-3.5" /> Legal &amp; Subscription Terms
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-zinc-500 flex items-center justify-center sm:justify-start gap-2">
            <Clock className="size-4 text-zinc-400" /> Last Updated: September 2026 · Effective Immediately
          </p>
        </div>

        {/* Quick Highlights Callout */}
        <div className="mb-12 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-bold text-zinc-900">
            <Shield className="size-5 text-emerald-600" /> Key Highlights for Students &amp; Parents
          </h2>
          <div className="mt-4 grid gap-3 text-xs sm:text-sm text-zinc-600 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>3 Simple Plans:</strong> Weekly, 3 Months, and 1 Year with complete access to all revision materials.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Cancel Anytime:</strong> One-click cancellation right inside your Account Settings with no hidden fees.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Google Account Sync:</strong> Pro access is permanently tied to your Gmail so you can study on any device.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>No Ads or Data Selling:</strong> We never sell your personal data or study history to advertisers.</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-sm text-zinc-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, registering for, or using the ExamGlow educational platform, websites, mobile interfaces, or application programming interfaces (collectively, the &ldquo;Service&rdquo;), you (&ldquo;User&rdquo;, &ldquo;Student&rdquo;, &ldquo;Subscriber&rdquo;, or &ldquo;Parent/Guardian&rdquo;) enter into a legally binding agreement with ExamGlow (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p>
              If you are under 18 years of age (or the age of legal majority in your jurisdiction), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf. If you do not agree to all terms and conditions set forth herein, you must immediately discontinue all use of the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">2. Educational Mission &amp; AI Tutoring (Yumna)</h2>
            <p>
              ExamGlow is an interactive academic preparation platform providing syllabus-aligned study guides, past examination questions, quizzes, flashcards, and automated AI study assistance through our proprietary tutor, <strong>Yumna</strong>.
            </p>
            <p>
              <strong>Academic Integrity:</strong> ExamGlow is designed as a learning companion to assist comprehension, reinforce syllabus concepts, and improve retention. The Service may not be used to violate school honor codes, cheat on live examinations, or misrepresent AI-generated material as independent student work.
            </p>
            <p>
              <strong>Accuracy Disclaimer:</strong> While ExamGlow notes and Yumna AI tutoring are meticulously designed to adhere to international curriculum specifications (including Cambridge Assessment International Education and Edexcel standards), examination syllabi and mark schemes may change periodically. Students are encouraged to verify official exam specifications directly with their respective examination boards.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">3. User Accounts &amp; Google Authentication</h2>
            <p>
              <strong>Authentication:</strong> User authentication is managed primarily via Google Single Sign-On (OAuth). When you log in with your Gmail address, your account profile, study progress, and subscription privileges are securely linked to your unique Google account credential.
            </p>
            <p>
              <strong>Cross-Device Access:</strong> Once a Google account has purchased or unlocked a Pro subscription, that subscription is locked into our secure cloud registry. You can access your Pro benefits from any supported device, tablet, phone, or browser simply by logging in with that same Google account.
            </p>
            <p>
              <strong>Account Security:</strong> You are responsible for safeguarding your Google account credentials. Sharing account credentials across multiple individuals is strictly prohibited and may result in subscription suspension.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">4. Subscription Plans, Billing &amp; Automated Renewals</h2>
            <p>
              ExamGlow offers three straightforward premium subscription options to give students flexible access:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Weekly Plan:</strong> Billed at regular intervals every 7 calendar days.</li>
              <li><strong>3 Months Plan:</strong> Billed every 90 calendar days at our discounted quarterly rate.</li>
              <li><strong>1 Year Plan:</strong> Billed every 365 calendar days for continuous full-year access at our best value.</li>
            </ul>
            <p>
              <strong>Recurring Billing:</strong> By selecting a subscription plan and providing your payment method (via PayPal or debit/credit card), you authorize ExamGlow and its payment processors to automatically charge the applicable recurring subscription fee at the beginning of each renewal period, unless and until you cancel your subscription.
            </p>
            <p>
              <strong>Currency &amp; Taxes:</strong> Prices are displayed in USD or your localized currency converted for your convenience. All transactions are processed securely through licensed payment processors (PayPal). You are responsible for any applicable local sales taxes or banking conversion fees.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">5. Cancellation &amp; Refund Policy</h2>
            <p>
              <strong>Cancel Anytime:</strong> You may cancel your subscription at any time with one click directly in your <Link to="/settings" className="font-semibold text-blue-600 underline hover:text-blue-800">Account Settings</Link>. There are no cancellation penalties, retention lock-ins, or customer service hurdles.
            </p>
            <p>
              <strong>Access After Cancellation:</strong> When you cancel auto-renewal, your Pro access remains active and fully functional until the end of your currently paid billing period. After this date reaches, your account will transition gracefully to the Free tier without any further charges.
            </p>
            <p>
              <strong>Refund Requests:</strong> Because digital study materials, past paper mark schemes, and AI tokens are accessible immediately upon subscription activation, subscription fees are generally non-refundable. However, if you experienced technical disruptions or made an unintentional duplicate purchase, you may submit a refund request to our support team within 14 days of the transaction date.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">6. Acceptable Use Policy</h2>
            <p>When using ExamGlow, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Scrape, crawl, extract, or bulk download syllabus notes, past paper databases, or quiz items using automated scripts, bots, or browser extensions.</li>
              <li>Attempt to reverse-engineer, decompile, or tamper with the AI routing architecture, audio streaming systems, or backend Cloudflare Workers infrastructure.</li>
              <li>Transmit any malicious software, viruses, or disruptive code designed to damage or intercept server operations.</li>
              <li>Use the Yumna AI study tutor for unlawful, harassing, defamatory, or abusive purposes.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">7. Intellectual Property Rights</h2>
            <p>
              All platform designs, code, user interfaces, revision summaries, interactive animations, and proprietary tutor algorithms are the intellectual property of ExamGlow. All rights not expressly granted to you are reserved.
            </p>
            <p>
              Cambridge International Education, Edexcel, and other examination boards are registered trademarks of their respective governing bodies. ExamGlow is an independent academic resource and is not officially endorsed by or affiliated with Cambridge University Press &amp; Assessment.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, ExamGlow and its affiliates, directors, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of academic credit, or examination outcomes resulting from your use of or inability to use the Service.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">9. Modifications to the Service and Terms</h2>
            <p>
              We continually enhance our educational materials and features. We reserve the right to modify or discontinue features, introduce new syllabus subjects, or update these Terms. For material changes, we will provide notice through the platform or via email. Continued use of the Service following published updates constitutes your acceptance.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">10. Contact &amp; Support</h2>
            <p>
              If you have questions regarding these Terms, your subscription, or billing inquiries, please contact our support desk:
            </p>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="font-semibold text-zinc-900">ExamGlow Support Team</p>
              <p className="text-xs text-zinc-500 mt-0.5">Email: support@examglow.com</p>
              <p className="text-xs text-zinc-500">Live Support: Available via Customer Service in your Dashboard</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-400">
        <p>&copy; {new Date().getFullYear()} ExamGlow. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/terms" className="text-zinc-600 underline">Terms of Service</Link>
          <Link to="/privacy" className="text-zinc-600 underline">Privacy Policy</Link>
          <Link to="/pricing" className="text-zinc-600 underline">Pricing &amp; Plans</Link>
        </div>
      </footer>
    </div>
  );
}
