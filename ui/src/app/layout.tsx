import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/templates/AppLayout";
import { JotaiProvider } from "@/providers";

export const metadata: Metadata = {
  title: "QuizPocket",
  description: "いつでもどこでも、手軽にクイズ学習",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-base-light font-['Noto_Sans_JP','Inter',sans-serif]">
        <JotaiProvider>
          <AppLayout>{children}</AppLayout>
        </JotaiProvider>
      </body>
    </html>
  );
}
