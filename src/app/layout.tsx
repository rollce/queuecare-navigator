import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { MuiThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueueCare Navigator",
  description: "Triage-driven clinic navigation to reduce waiting stress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>
          <SiteNav />
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}
