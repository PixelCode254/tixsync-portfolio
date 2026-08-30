import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="card-glow max-w-md p-8 text-center">
        <h1 className="font-mono text-6xl font-bold text-cyber-500 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">Page Not Found</h2>
        <p className="text-sm text-obsidian-400 mb-6">
          The page you&apos;re looking for doesn&apos; exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
