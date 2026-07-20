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

export const metadata: Metadata = {
  title: "Capitol Artists | Gospel Concert Booking Agency",
  description:
    "For over 35 years, Capitol Artists has connected churches and organizations with top talent in Southern Gospel and Bluegrass Gospel music. Book your next concert with us.",
  keywords: [
    "Southern Gospel",
    "Bluegrass Gospel",
    "concert booking",
    "gospel music",
    "Capitol Artists",
    "Mike Heimple",
  ],
  openGraph: {
    title: "Capitol Artists | Gospel Concert Booking Agency",
    description:
      "For over 35 years, Capitol Artists has connected churches and organizations with top talent in Southern Gospel and Bluegrass Gospel music.",
    type: "website",
    url: "https://www.capitol-artists.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
