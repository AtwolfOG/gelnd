import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./animation.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | GELND",
    default: "GELND",
  },
  description:
    "This is an analytics app to help christians in their spiritual journey",
  openGraph: {
    title: "GELND",
    description:
      "This is an analytics app for christians to measure their spiritual growth",
    url: import.meta.url,
    siteName: "GENLD",
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
        className={`${roboto.variable} font-roboto min-size-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
