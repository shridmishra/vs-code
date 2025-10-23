import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next.js IDE Demo",
  description: "Visual Studio–like interface demo with Monaco and MUI"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
