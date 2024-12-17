import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
          <NuqsAdapter>
            <NextAuthProvider>
              <ReactQueryProvider>
                <Navbar />
                {children}
              </ReactQueryProvider>
              <ToastContainer />
            </NextAuthProvider>
          </NuqsAdapter>
        </StoreProvider>
      </body>
    </html>
  );
}
