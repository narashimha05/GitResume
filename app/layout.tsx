import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "GitResume | Create Your GitHub-Powered Resume",
  description: "Generate a professional resume from your GitHub projects in seconds. Showcase skills, work experience, and open-source contributions.",
  keywords: "GitHub resume, developer portfolio, software engineer CV, open-source resume",
  alternates: {
    canonical: "https://git-resume-coral.vercel.app/", // Prevents duplicate content
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5949291372561693"
     crossOrigin="anonymous"></script></head>
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
