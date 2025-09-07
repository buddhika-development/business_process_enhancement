import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/layout/Global/Header";
import Footer from "@/components/layout/Global/Footer";
import FloatingChatButton from "@/components/ui/Global/FloatingChatButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "mr.Registar",
  description: "We simplyfiy your registration process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingChatButton />
        </div>
      </body>
    </html>
  );
}
