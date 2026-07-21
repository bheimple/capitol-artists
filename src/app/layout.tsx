import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = "https://www.capitol-artists.com";

export const metadata: Metadata = {
  title: {
    default: "Capitol Artists | Gospel Concert Booking Agency",
    template: "%s | Capitol Artists",
  },
  description:
    "For over 35 years, Capitol Artists has connected churches and organizations with top talent in Southern Gospel and Bluegrass Gospel music. Book your next concert with us.",
  keywords: [
    "Southern Gospel",
    "Bluegrass Gospel",
    "concert booking",
    "gospel music",
    "Capitol Artists",
    "Mike Heimple",
    "gospel concert",
    "church concert",
    "booking agency",
  ],
  authors: [{ name: "Capitol Artists" }],
  creator: "Capitol Artists",
  openGraph: {
    title: "Capitol Artists | Gospel Concert Booking Agency",
    description:
      "For over 35 years, Capitol Artists has connected churches and organizations with top talent in Southern Gospel and Bluegrass Gospel music.",
    type: "website",
    url: siteUrl,
    siteName: "Capitol Artists",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capitol Artists | Gospel Concert Booking Agency",
    description:
      "Connecting churches with top talent in Southern Gospel and Bluegrass Gospel music for over 35 years.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Capitol Artists",
  description:
    "Connecting churches and organizations with top talent in Southern Gospel and Bluegrass Gospel music for over 35 years.",
  url: siteUrl,
  founder: {
    "@type": "Person",
    name: "Mike Heimple",
  },
  telephone: "719-260-1151",
  email: "mike@capitol-artists.com",
  areaServed: "United States",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased grain`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
