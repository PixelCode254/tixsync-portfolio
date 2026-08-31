import { Metadata } from "next";
import { Download, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Cornelius Maina Nyaga's resume — Full-Stack Developer & Security Engineer.",
};

export default function ResumePage() {
  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cornelius Maina Nyaga</h1>
            <p className="text-lg text-cyber-400">Full-Stack Developer & Security Engineer</p>
          </div>
          <a href="/api/resume/download" className="flex items-center gap-2 px-4 py-2 bg-cyber-500 text-white rounded-lg text-sm font-medium hover:bg-cyber-600 transition-colors">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 text-sm text-obsidian-400">
          <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> tixsyncsolutions@gmail.com</span>
          <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +254 704 440 164</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Nairobi, Kenya</span>
          <a href="https://github.com/PixelCode254" className="flex items-center gap-1.5 hover:text-white transition-colors"><Github className="h-3.5 w-3.5" /> github.com/PixelCode254</a>
          <a href="https://linkedin.com/in/corneliusmaina" className="flex items-center gap-1.5 hover:text-white transition-colors"><Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/corneliusmaina</a>
        </div>

        <div className="space-y-8 text-sm text-obsidian-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-cyber-500" /> Professional Summary
            </h2>
            <p>Full-Stack Developer and Security Engineer with expertise in building secure, scalable web applications and defending digital infrastructure. Founder of TIXSYNC SOLUTIONS, delivering enterprise-grade digital solutions to clients worldwide. Specializing in Next.js, TypeScript, PostgreSQL, penetration testing, and cloud architecture.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-cyber-500" /> Experience
            </h2>
            <div className="space-y-6">
              <div className="card-glow p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">Founder & Lead Engineer</h3>
                    <p className="text-cyber-400">TIXSYNC SOLUTIONS</p>
                  </div>
                  <span className="text-xs font-mono text-obsidian-500">2024 — Present</span>
                </div>
                <ul className="list-disc list-inside space-y-1 mt-3">
                  <li>Founded and lead enterprise digital solutions company</li>
                  <li>Delivering web development, cybersecurity, and cloud infrastructure services</li>
                  <li>Built secure, scalable applications for clients across Africa and globally</li>
                  <li>Managing full project lifecycle from architecture to deployment</li>
                </ul>
              </div>
              <div className="card-glow p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">Full-Stack Developer</h3>
                    <p className="text-cyber-400">Freelance / Contract</p>
                  </div>
                  <span className="text-xs font-mono text-obsidian-500">2022 — 2024</span>
                </div>
                <ul className="list-disc list-inside space-y-1 mt-3">
                  <li>Built scalable web applications and REST APIs</li>
                  <li>Specialized in Next.js, TypeScript, and PostgreSQL</li>
                  <li>Delivered real-time dashboards and e-commerce platforms</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-cyber-500" /> Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-white mb-2">Frontend</h3>
                <p>Next.js, React, TypeScript, Tailwind CSS, HTML/CSS/JavaScript, Framer Motion</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Backend</h3>
                <p>Node.js, Python, PostgreSQL, Prisma ORM, REST APIs, GraphQL</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Security</h3>
                <p>Penetration Testing, Vulnerability Assessment, Network Security, SOC Analysis, ISO 27001</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">DevOps</h3>
                <p>AWS, Docker, CI/CD, Linux, Git, GitHub Actions</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-cyber-500" /> Education
            </h2>
            <div className="card-glow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">BSc Computer Science</h3>
                  <p className="text-cyber-400">University</p>
                </div>
                <span className="text-xs font-mono text-obsidian-500">2019 — 2023</span>
              </div>
              <p className="mt-3">Focused on software engineering, network security, and database systems. Graduated with distinction.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-cyber-500" /> Leadership
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-cyber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Secretary General — KINAPSA</p>
                  <p className="text-xs text-obsidian-500">Kenya National Police Service Association</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-cyber-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Peace Champion</p>
                  <p className="text-xs text-obsidian-500">Certified community peace-building advocate</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
