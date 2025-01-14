import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BlogGo | Home",
  description:
    "Discover insightful articles and engaging stories on BlogGo. Explore a diverse range of topics, from tech and lifestyle to education and more. Stay informed and inspired—your go-to platform for quality content. Start reading today!",
  keywords: [
    "Blog app for diverse topics",
    "Explore engaging articles",
    "Insightful stories online",
    "Create and share blogs",
    "Quality blog content platform",
    "Tech, lifestyle, education blogs",
    "User-friendly blog application",
    "Interactive blogging platform",
    "Personalized blog experience",
    "Trending topics and blogs",
    "Modern blog app design",
    "Blogging with Next.js",
    "Fast-loading blog application",
    "Blog app powered by TypeScript",
    "Prisma-integrated blog platform",
    "Professional blogging experience",
    "Mobile-friendly blog app",
    "Publish blogs seamlessly",
    "Dynamic blog platform",
    "Share your thoughts online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <NuqsProvider>
            <NextAuthProvider>
              <ReactQueryProvider>
                <Navbar />
                {children}
              </ReactQueryProvider>
              <ToastContainer />
            </NextAuthProvider>
          </NuqsProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
