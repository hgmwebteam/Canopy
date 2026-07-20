import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import TrackPageview from "@/components/TrackPageview";
import UtmCapture from "@/components/UtmCapture";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://canopy-moodymoonridge.netlify.app"),
  title: "The Canopy — Luxury Treehouses for Quiet Connection",
  description:
    "Only six treehouses. One waitlist. The Canopy at Moody Moon Ridge — luxury treehouse retreats built for quiet connection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TrackPageview />
        <UtmCapture />
        {children}
      </body>
    </html>
  );
}
