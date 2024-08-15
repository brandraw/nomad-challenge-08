import type { Metadata } from "next";
import "./globals.css";
import { MainHeader } from "@/components/main-header";

export const metadata: Metadata = {
  title: "Nomad Challenge",
  description: "Go!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
