import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const fraunces = Fraunces({ subsets: ["latin"], variable: '--font-serif', weight: ['300', '400', '500', '600'] });
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "Stellar Dashboard",
  description: "A gorgeous, user-friendly dashboard for the Stellar network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${jbMono.variable} font-sans bg-background text-textMain antialiased`} style={{fontFamily: "var(--font-sans), sans-serif"}}>
        {children}
      </body>
    </html>
  );
}