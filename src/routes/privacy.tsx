import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  EyeOff,
  Clock,
  Database,
  UserCheck,
  Sparkles,
  CreditCard,
  Trash2,
  Mail,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ExamGlow" },
      {
        name: "description",
        content:
          "ExamGlow Privacy Policy. Learn how we safeguard student data, Google accounts, payment information, and AI study interactions with enterprise-grade encryption.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
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
            <Link to="/terms" className="text-zinc-500 hover:text-zinc-900 transition">
              Terms of Service
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-4">
            <ShieldCheck className="size-3.5" /> Student Privacy &amp; Data Protection
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-zinc-500 flex items-center justify-center sm:justify-start gap-2">
            <Clock className="size-4 text-zinc-400" /> Last Updated: September 2026 · Effective Immediately
          </p>
        </div>

        {/* Highlights Callout */}
        <div className="mb-12 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-bold text-zinc-900">
            <Lock className="size-5 text-blue-600" /> Our Core Privacy Commitments
          </h2>
          <div className="mt-4 grid gap-3 text-xs sm:text-sm text-zinc-600 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <EyeOff className="size-4 shrink-0 text-blue-600 mt-0.5" />
              <span><strong>No Ads &amp; No Data Selling:</strong> We do not sell, rent, or trade student profiles, emails, or study records to any third-party advertisers.</span>
            </div>
            <div className="flex items-start gap-2">
              <CreditCard className="size-4 shrink-0 text-blue-600 mt-0.5" />
              <span><strong>Zero Payment Data Stored:</strong> Card numbers and payment credentials are processed directly by certified payment processors (PayPal/Stripe) over PCI-DSS compliant channels.</span>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="size-4 shrink-0 text-blue-600 mt-0.5" />
              <span><strong>Private AI Study Sessions:</strong> Questions and audio explanations with Yumna AI tutor are processed securely and never made public.</span>
            </div>
            <div className="flex items-start gap-2">
              <UserCheck className="size-4 shrink-0 text-blue-600 mt-0.5" />
              <span><strong>Cross-Device Google Account Lock-In:</strong> Your active Pro subscription is tied to your verified Google email so your access travels with you safely.</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-sm text-zinc-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              1. Introduction &amp; Scope
            </h2>
            <p>
              ExamGlow (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is dedicated to safeguarding the privacy and personal data of our learners, parents, and educators. This Privacy Policy outlines how we collect, store, utilize, and protect your information when you access or interact with our learning management platform, study materials, interactive AI tools, and payment services (collectively, the &ldquo;Service&rdquo;).
            </p>
            <p>
              We adhere strictly to internationally recognized student data protection standards, including the General Data Protection Regulation (GDPR), the Children&apos;s Online Privacy Protection Act (COPPA) guidelines, and Family Educational Rights and Privacy Act (FERPA) best practices.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              2. Information We Collect
            </h2>
            <p>
              We limit data collection exclusively to information required to provide you with an exceptional, personalized, and secure educational experience:
            </p>
            <div className="space-y-3 pt-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                  <UserCheck className="size-4 text-emerald-600" /> A. Google Account Identity
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-normal">
                  When you sign in using Google Single Sign-On (OAuth 2.0), we receive your verified Google email address, display name, user identifier (sub), and profile photo URL. We use this information to create your account profile and verify your active subscription status across any device or browser.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                  <Database className="size-4 text-blue-600" /> B. Academic Preferences &amp; Study Progress
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-normal">
                  We maintain your chosen curriculum (such as Cambridge IGCSE, Edexcel, or AQA), target examination dates, enrolled subjects, completed notes, quiz answers, bookmark collections, and flashcard performance to track your revision trajectory.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                  <CreditCard className="size-4 text-purple-600" /> C. Billing &amp; Transaction Identifiers
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-normal">
                  When subscribing to Weekly ($2.00/wk), 3 Months ($14.99/3mo), or 1 Year ($39.99/yr), payment processing is handled exclusively by certified payment processors (PayPal, Stripe). We receive a secure transaction ID, renewal timestamp, and billing country to unlock your access. <strong>We never capture, store, or have access to your full payment card numbers or bank credentials.</strong>
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                  <Sparkles className="size-4 text-amber-600" /> D. Interactive AI Tutor (Yumna) Conversations
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-normal">
                  When you ask questions, request detailed 20-minute audio explanations, or generate practice questions, your queries are processed in real-time to generate educational answers. Conversations are linked to your study session to maintain context.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              3. How We Use Your Information
            </h2>
            <p>Your personal data is used solely for educational and service fulfillment purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>To provide seamless, uninterrupted access to revision notes, past papers, mark schemes, and flashcards.</li>
              <li>To lock in and verify your paid Pro status on our high-speed Cloudflare global network whenever you log in with your Google Account.</li>
              <li>To personalize AI explanations based on your target syllabus, difficulty level, and study goals.</li>
              <li>To notify you about important account updates, curriculum revisions, or subscription renewal receipts.</li>
              <li>To detect and prevent fraudulent access, unauthorized account sharing, or abusive automation.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              4. Cross-Device Google Account Lock-In &amp; Storage
            </h2>
            <p>
              To ensure you can study without friction across your phone, tablet, laptop, and school computers:
            </p>
            <p>
              When an account upgraded to Pro (Weekly, 3 Months, or 1 Year) is associated with a verified Google Account, our backend securely registers your unique account identifier and expiration date in our distributed Cloudflare Key-Value (KV) database. Whenever you log in with that Google Account on any browser or device, your Pro status is instantly restored until your active period expires.
            </p>
            <p>
              No browser fingerprinting, cross-site trackers, or invasive telemetry tools are utilized to enforce this feature.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              5. AI Processing &amp; Data Confidentiality
            </h2>
            <p>
              Our automated AI tutor, Yumna, leverages cutting-edge artificial intelligence and high-fidelity speech synthesis to teach notes, explain complex exam concepts, and provide audio walkthroughs.
            </p>
            <p>
              <strong>Data Confidentiality:</strong> Your prompts and questions are transmitted over encrypted TLS 1.3 connections. We do not sell student prompts to third-party data brokers, nor are student questions used to train public, open-source foundational models without explicit educational consent.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              6. Information Sharing &amp; Third Parties
            </h2>
            <p>
              ExamGlow does not sell, rent, lease, or monetize your personal data. We only share necessary operational data with vetted infrastructure partners who adhere to strict data protection standards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li><strong>Cloudflare:</strong> Secure global content delivery network (CDN), serverless computing, and edge database storage with ISO 27001 and SOC 2 Type II certifications.</li>
              <li><strong>Google Identity Services:</strong> Secure OAuth 2.0 authentication protocols for user identity verification.</li>
              <li><strong>PayPal &amp; Payment Processors:</strong> Tokenized payment processing adhering to Tier 1 PCI-DSS compliance standards.</li>
              <li><strong>Legal Obligations:</strong> We may disclose information if required by law, subpoena, court order, or to protect the vital safety of students or platform integrity.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              7. Data Security &amp; Encryption
            </h2>
            <p>
              We implement comprehensive organizational and technical security measures to protect student records:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li><strong>End-to-End Encryption:</strong> All data in transit is encrypted using Modern TLS 1.3 encryption protocols. Data at rest is encrypted using AES-256 standards.</li>
              <li><strong>Access Control:</strong> Administrative access to user databases is restricted on a strict least-privilege basis with multi-factor authentication.</li>
              <li><strong>DDoS &amp; Threat Protection:</strong> Cloudflare edge security actively blocks malicious bots, SQL injection, and unauthorized data scraping attempts.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              8. Student &amp; Children Privacy (COPPA / GDPR-K)
            </h2>
            <p>
              ExamGlow is committed to student safety. If a student is under the age of digital consent in their jurisdiction (e.g., under 13 in the United States or under 16 in certain EU member states), registration and subscription purchases should be executed with the guidance or consent of a parent or guardian.
            </p>
            <p>
              We do not knowingly collect personal contact information from children beyond what is necessary to administer their educational account and learning features. Parents or guardians may contact us at any time to review, modify, or delete their child&apos;s stored data.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              9. Your Rights: Data Retention &amp; Deletion
            </h2>
            <p>
              Regardless of your location, we believe every student should have full control over their personal data:
            </p>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
              <div className="flex items-center gap-2 text-zinc-900 font-semibold">
                <Trash2 className="size-4 text-red-500" /> Account Deletion &amp; Right to Be Forgotten
              </div>
              <p className="text-xs text-zinc-600">
                You have the right to request the permanent deletion of your account, profile, study progress, and chat history. You can initiate an account reset or deletion directly within your Account Settings or by emailing our data protection team.
              </p>
              <p className="text-xs text-zinc-600">
                Upon verified request, all personal identifiers and study logs are purged from our live database within thirty (30) business days, retaining only anonymized transaction records required by financial and tax regulations.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              10. Changes to this Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect enhancements in our learning features, new legal requirements, or technological updates. Any material changes will be announced with an updated revision date at the top of this page and, where appropriate, via an in-app notice or email notification.
            </p>
          </section>

          {/* Section 11: Contact */}
          <section className="space-y-3 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Mail className="size-5 text-blue-600" /> Contact Our Privacy Team
            </h2>
            <p className="text-zinc-600 text-sm">
              If you have any questions, privacy concerns, or requests regarding the processing of your personal information, our dedicated Data Protection Officer is ready to assist you:
            </p>
            <div className="mt-3 space-y-1 text-xs text-zinc-600">
              <p><strong>ExamGlow Privacy &amp; Data Protection Office</strong></p>
              <p>Email: <a href="mailto:privacy@examglow.com" className="text-blue-600 hover:underline">privacy@examglow.com</a></p>
              <p>Support: <a href="mailto:support@examglow.com" className="text-blue-600 hover:underline">support@examglow.com</a></p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} ExamGlow. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-zinc-900 transition">Terms of Service</Link>
            <Link to="/pricing" className="hover:text-zinc-900 transition">Subscription Plans</Link>
            <Link to="/home" className="hover:text-zinc-900 transition">Home Dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
