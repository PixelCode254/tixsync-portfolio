export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Cornelius Maina's portfolio website.",
};

export default function PrivacyPage() {
  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-sm text-obsidian-300 leading-relaxed">
          <p>Last updated: August 31, 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Information I Collect</h2>
            <p>
              When you use the contact form on this website, I collect your name, email address,
              phone number (optional), and message content. This information is stored securely
              in a database and is used solely to respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. How I Use Your Information</h2>
            <p>
              Your information is used only to communicate with you regarding your inquiry.
              I do not sell, trade, or share your personal information with third parties,
              except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Data Security</h2>
            <p>
              I implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure, and I
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Cookies</h2>
            <p>
              This website may use essential cookies for authentication and session management.
              No third-party tracking cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>
              This website uses Vercel for hosting and analytics. These services may collect
              anonymous usage data as described in their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your
              personal data. To exercise these rights, please contact me at
              tixsyncsolutions@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Contact</h2>
            <p>
              For questions about this privacy policy, contact me at tixsyncsolutions@gmail.com
              or via WhatsApp at +254 704 440 164.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
