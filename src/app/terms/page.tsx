export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for Cornelius Maina's portfolio website.",
};

export default function TermsPage() {
  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="space-y-6 text-sm text-obsidian-300 leading-relaxed">
          <p>Last updated: August 31, 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance</h2>
            <p>
              By accessing this website, you agree to these terms of service. If you do not
              agree, please discontinue use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Use of the Website</h2>
            <p>
              This website is a personal portfolio intended to showcase my work and provide
              a means of contact. You may browse the site freely. Unauthorized use, including
              scraping, automated access, or attempting to exploit vulnerabilities, is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, code, and design, is owned
              by Cornelius Maina Nyaga unless otherwise stated. You may not reproduce or
              distribute content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Projects and Services</h2>
            <p>
              Project descriptions and portfolio items are for informational purposes. Any
              services are governed by separate agreements. TIXSYNC SOLUTIONS operates
              independently at tixsyncsolutions.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Limitation of Liability</h2>
            <p>
              This website is provided &quot;as is&quot; without warranties. I am not liable
              for any damages arising from the use of this website or reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Changes</h2>
            <p>
              I reserve the right to update these terms at any time. Continued use of the
              site after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Contact</h2>
            <p>
              For questions about these terms, contact me at tixsyncsolutions@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
