import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Head from "next/head";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "Git Resume",
  description: "Create a professional resume from your GitHub profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head><meta name="google-adsense-account" content="ca-pub-5949291372561693"></Head>
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
