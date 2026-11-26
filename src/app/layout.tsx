import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ServiceStrip } from "@/components/layout/service-strip";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const exo = localFont({
  src: "../assets/fonts/exo-latin-live.woff2",
  variable: "--font-exo",
  display: "swap",
  weight: "400 900",
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },
  description:
    "FreshCart is your one-stop destination for quality products. Shop fashion, electronics, groceries and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${exo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground font-medium">
        <SessionProvider>
          <Navbar />
          {children}
          <ServiceStrip />
          <Footer />
        </SessionProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
