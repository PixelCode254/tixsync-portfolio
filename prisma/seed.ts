import { PrismaClient, ProjectCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@tixsync.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-password";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Cornelius Maina",
      hashedPassword,
      role: "ADMIN",
    },
  });

  console.log({ admin });

  const sampleProjects = [
    {
      title: "TIXSYNC Secure Portal",
      slug: "tixsync-secure-portal",
      description: "Enterprise-grade secure web application featuring end-to-end encryption, role-based access control, and real-time threat monitoring dashboard.",
      category: ProjectCategory.FULL_STACK,
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js"],
      featured: true,
      published: true,
      order: 1,
    },
    {
      title: "CyberShield Vulnerability Scanner",
      slug: "cybershield-scanner",
      description: "Automated security assessment tool for identifying and reporting vulnerabilities in web applications and network infrastructure.",
      category: ProjectCategory.CYBERSECURITY,
      techStack: ["Python", "Nmap", "Docker", "REST API"],
      featured: true,
      published: true,
      order: 2,
    },
    {
      title: "Enterprise SOC Dashboard",
      slug: "enterprise-soc-dashboard",
      description: "Real-time Security Operations Center dashboard with threat intelligence feeds, incident tracking, and automated alerting.",
      category: ProjectCategory.SECURITY_OPERATION,
      techStack: ["React", "Node.js", "Redis", "Elasticsearch", "WebSocket"],
      featured: true,
      published: true,
      order: 3,
    },
    {
      title: "SecureE-Com Platform",
      slug: "secure-ecommerce",
      description: "Full-stack e-commerce platform with PCI-DSS compliant payment processing, automated inventory management, and fraud detection.",
      category: ProjectCategory.WEB_DEVELOPMENT,
      techStack: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Tailwind CSS"],
      published: true,
      order: 4,
    },
    {
      title: "CloudSec Infrastructure",
      slug: "cloudsec-infrastructure",
      description: "AWS cloud architecture with automated security scanning, IaC templates, and zero-trust network configuration.",
      category: ProjectCategory.DEVOPS,
      techStack: ["AWS", "Terraform", "Docker", "GitHub Actions", "CloudWatch"],
      published: true,
      order: 5,
    },
  ];

  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
