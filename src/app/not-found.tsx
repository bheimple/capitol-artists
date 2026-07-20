import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-serif font-black text-gradient-gold mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted mb-8">This page doesn&apos;t exist or has moved.</p>
        <Link
          href="/"
          className="px-8 py-4 rounded-full bg-accent text-background font-semibold hover:bg-accent-hover transition-all"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
