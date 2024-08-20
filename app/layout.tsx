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
    <html lang="en" className="p-3 bg-orange-50/30">
      <body className="max-w-[400px] w-full mx-auto border rounded-md overflow-hidden shadow-md flex flex-col">
        <MainHeader />
        <div className="overflow-y-auto h-full">{children}</div>
      </body>
    </html>
  );
}
