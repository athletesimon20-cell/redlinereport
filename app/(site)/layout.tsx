import type { Metadata } from "next";
import { Anton, IBM_Plex_Sans, IBM_Plex_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RegionProvider } from "@/lib/regions/context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Logo-only typeface — used exclusively by the rr-lockup/rr-horizontal/rr-mark
// brand components (components/brand/logo.tsx), per the brand handoff. Not the
// site's general display face — that stays Anton.
const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["300", "400", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Redline Report — Motorcycle Gear & Bike Reviews",
    template: "%s — Redline Report",
  },
  description:
    "Independent, field-tested motorcycle gear and motorcycle reviews. Real riding, real verdicts, no manufacturer copy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${plexSans.variable} ${plexMono.variable} ${archivo.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RegionProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </RegionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
