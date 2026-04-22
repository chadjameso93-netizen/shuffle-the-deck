import type { Metadata } from "next";
import "./globals.css";
import { AnalysisProvider } from '@/components/providers/AnalysisProvider';

export const metadata: Metadata = {
  title: "DEFRAG",
  description: "Relational reasoning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnalysisProvider>
          {children}
        </AnalysisProvider>
      </body>
    </html>
  );
}