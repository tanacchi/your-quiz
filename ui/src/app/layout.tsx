import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-base-light min-h-screen flex flex-col font-['Noto_Sans_JP','Inter',sans-serif]">
        {/* App Bar */}
        <header className="flex justify-between items-center px-4 pt-4 pb-2 bg-base-light sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            {/* Logo/Icon */}
            <div className="bg-base rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              <span>Q</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-base tracking-tight">
                QuizPocket
              </span>
              <span className="text-xs text-base font-medium opacity-70">
                いつでもどこでも、手軽にクイズ学習
              </span>
            </div>
          </div>
          {/* MyPage Icon */}
          <button
            type="button"
            aria-label="マイページ"
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border border-base hover:bg-base-light transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f5835c"
              className="w-6 h-6"
            >
              <title>マイページアイコン</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.25a8.38 8.38 0 0115 0v.25A2.25 2.25 0 0117.25 21.5H6.75A2.25 2.25 0 014.5 19.5v-.25z"
              />
            </svg>
          </button>
        </header>

        {children}

        {/* ボトムナビゲーション */}
        <nav
          className="fixed bottom-0 left-0 w-full bg-white border-t border-base flex justify-around items-center h-16 z-20"
          style={{ maxWidth: "100vw", minWidth: 0 }}
        >
          <button
            type="button"
            className="flex flex-col items-center justify-center text-base focus:outline-none"
          >
            <svg
              className="w-6 h-6 mb-0.5"
              fill="none"
              stroke="#f5835c"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <title>作るアイコン</title>
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-semibold">作る</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center text-base focus:outline-none"
          >
            <svg
              className="w-6 h-6 mb-0.5"
              fill="none"
              stroke="#f5835c"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <title>解くアイコン</title>
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
            </svg>
            <span className="text-xs font-semibold">解く</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center text-base focus:outline-none"
          >
            <svg
              className="w-6 h-6 mb-0.5"
              fill="none"
              stroke="#f5835c"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <title>マイページアイコン</title>
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            </svg>
            <span className="text-xs font-semibold">マイページ</span>
          </button>
        </nav>

        {/* Footer */}
        <footer
          className="text-center text-xs py-3 opacity-30 mt-8 mb-16"
          style={{ color: "#f5835c" }}
        >
          &copy; 2025 QuizPocket
        </footer>
      </body>
    </html>
  );
}
