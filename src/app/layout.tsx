import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppContext";
import DynamicTitle from "@/components/DynamicTitle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TenkiSense - AI Weather Assistant",
  description: "Chat with AI to get weather updates and travel advice for Japan and India",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <DynamicTitle />
          {children}
        </AppProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#262626',
              color: '#fff',
              border: '1px solid #404040',
            },
          }}
        />
      </body>
    </html>
  );
}
