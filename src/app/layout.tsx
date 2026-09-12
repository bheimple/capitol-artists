import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "YDHOWGTdRTkfynTYAruOV42nKh0pNcvu9sx0biZOsRQ",
  },
  title: {
    default: "Capitol Artists | Gospel Concert Booking Agency",
    template: "%s | Capitol Artists",
  },
  description:
    "Connecting churches with Southern Gospel and Bluegrass Gospel ministries since 1992. Ask Mike about concert booking, travel routes, and dates.",
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
      "Connecting churches with Southern Gospel and Bluegrass Gospel ministries since 1992. Ask Mike about concert booking, travel routes, and dates.",
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "Capitol Artists",
    images: [{ url: "/brand/hero-small-logo.webp", width: 1774, height: 887, alt: "Capitol Artists: Gospel concert booking since 1992" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/hero-small-logo.webp"],
    title: "Capitol Artists | Gospel Concert Booking Agency",
    description:
      "Connecting churches with Southern Gospel and Bluegrass Gospel ministries since 1992. Ask Mike about concert booking, travel routes, and dates.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Capitol Artists",
      logo: `${SITE_URL}/brand/capitol-cross.png`,
      foundingDate: "1992",
      description:
        "Connecting churches with Southern Gospel and Bluegrass Gospel ministries since 1992.",
      url: `${SITE_URL}/`,
      founder: {
        "@type": "Person",
        name: "Mike Heimple",
      },
      telephone: "719-260-1151",
      email: "mike@capitol-artists.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Capitol Artists",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased grain`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
