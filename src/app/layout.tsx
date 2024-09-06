import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const bodyFont = localFont({
  src: [
    {
      path: "./assets/body-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/body-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  weight: "swap",
  variable: "--font-body",
});

const pixelFont = localFont({
  src: "./assets/pixel-numbers.ttf",
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Metal Gear Solid Codec",
  description: "Daily Bots multi-character demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${pixelFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
