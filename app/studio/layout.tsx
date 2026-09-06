import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — Redline Report",
  robots: { index: false, follow: false },
};

// A separate root layout (Next.js multiple-root-layouts pattern) so the embedded
// Sanity Studio gets a clean full-viewport shell instead of the marketing site's
// header/footer/theme chrome from app/(site)/layout.tsx.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
