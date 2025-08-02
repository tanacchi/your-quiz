export default function QuizList() {
  return (
    <>
      {/* タグフィルタ・検索バー */}
      <section className="w-full max-w-md mx-auto px-4 mt-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            className="px-3 py-1 bg-base text-white rounded-full text-xs font-semibold shadow hover:bg-base-dark transition whitespace-nowrap"
          >
            #数学
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-white text-base border border-base rounded-full text-xs font-semibold shadow hover:bg-base-light transition whitespace-nowrap"
          >
            #歴史
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-white text-base border border-base rounded-full text-xs font-semibold shadow hover:bg-base-light transition whitespace-nowrap"
          >
            #英語
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-white text-base border border-base rounded-full text-xs font-semibold shadow hover:bg-base-light transition whitespace-nowrap"
          >
            #理科
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-white text-base border border-base rounded-full text-xs font-semibold shadow hover:bg-base-light transition whitespace-nowrap"
          >
            #雑学
          </button>
        </div>
        <div className="mt-3">
          <button
            type="button"
            className="w-full flex items-center gap-2 bg-white rounded-full shadow px-3 py-2 border border-base hover:bg-base-light transition focus:ring-2 focus:ring-base"
            aria-label="検索条件の変更"
          >
            {/* 検索条件バッジ群 */}
            <span className="flex flex-wrap gap-1 flex-1">
              <span className="flex items-center px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #数学
                <button
                  type="button"
                  className="ml-1 cursor-pointer hover:text-base transition"
                  aria-label="この条件を削除"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <title>削除アイコン</title>
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </span>
              <span className="flex items-center px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #図形
                <button
                  type="button"
                  className="ml-1 cursor-pointer hover:text-base transition"
                  aria-label="この条件を削除"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <title>削除アイコン</title>
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </span>
              <span className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                五角形
                <button
                  type="button"
                  className="ml-1 cursor-pointer hover:text-base transition"
                  aria-label="この条件を削除"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <title>削除アイコン</title>
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </span>
            </span>
            {/* フィルターアイコン＋下矢印 */}
            <span className="flex items-center gap-1 text-base opacity-70">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <title>フィルターアイコン</title>
                <path d="M3 6h18M6 6v6a6 6 0 0012 0V6" />
              </svg>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <title>下矢印アイコン</title>
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* クイズ一覧カードリスト */}
      <main className="w-full max-w-md mx-auto px-4 flex-1 pb-28 mt-3">
        <div className="flex flex-col gap-6">
          {/* クイズカード例1（未解答） */}
          <button
            type="button"
            className="w-full text-left rounded-2xl bg-white shadow-card p-5 transition hover:scale-[1.01] active:scale-95 focus:ring-2 focus:ring-base flex flex-col gap-2 border-l-4 border-base group"
          >
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #数学
              </span>
              <span className="px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #図形
              </span>
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="#f5835c"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <title>解説ありアイコン</title>
                  <path d="M12 20h9" />
                  <path d="M6.6 10a6 6 0 1110.8 0" />
                </svg>
                解説あり
              </span>
            </div>
            <div className="text-base text-sm font-medium line-clamp-3">
              図形の内角の和について、以下の問いに答えなさい。五角形の内角の和は何度ですか？
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-base text-white rounded-full text-xs font-bold">
                未解答
              </span>
            </div>
          </button>

          {/* クイズカード例2（解答済み） */}
          <button
            type="button"
            className="w-full text-left rounded-2xl bg-base-light shadow-card p-5 transition hover:scale-[1.01] active:scale-95 focus:ring-2 focus:ring-base flex flex-col gap-2 border-l-4 border-base group opacity-60"
          >
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #歴史
              </span>
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="#f5835c"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <title>解説なしアイコン</title>
                  <path d="M12 20h9" />
                  <path d="M6.6 10a6 6 0 1110.8 0" />
                </svg>
                解説なし
              </span>
            </div>
            <div className="text-base text-sm font-medium line-clamp-3">
              鎌倉幕府が成立した年を答えなさい。
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-white text-base border border-base rounded-full text-xs font-bold">
                解答済み
              </span>
            </div>
          </button>

          {/* クイズカード例3（間違い：復習ラベル） */}
          <button
            type="button"
            className="w-full text-left rounded-2xl bg-white shadow-card p-5 transition hover:scale-[1.01] active:scale-95 focus:ring-2 focus:ring-base flex flex-col gap-2 border-l-4 border-wrong group"
          >
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #理科
              </span>
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="#f5835c"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <title>解説ありアイコン</title>
                  <path d="M12 20h9" />
                  <path d="M6.6 10a6 6 0 1110.8 0" />
                </svg>
                解説あり
              </span>
            </div>
            <div className="text-base text-sm font-medium line-clamp-3">
              水の三態変化について説明しなさい。
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-wrong text-wrong border border-wrong rounded-full text-xs font-bold">
                復習が必要
              </span>
            </div>
          </button>

          {/* クイズカード例4（未解答・オフライン） */}
          <button
            type="button"
            className="w-full text-left rounded-2xl bg-white shadow-card p-5 transition hover:scale-[1.01] active:scale-95 focus:ring-2 focus:ring-base flex flex-col gap-2 border-l-4 border-base group"
          >
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="px-2 py-0.5 bg-base-light text-base text-xs rounded-full font-semibold">
                #英語
              </span>
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="#f5835c"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <title>解説ありアイコン</title>
                  <path d="M12 20h9" />
                  <path d="M6.6 10a6 6 0 1110.8 0" />
                </svg>
                解説あり
              </span>
            </div>
            <div className="text-base text-sm font-medium line-clamp-3">
              This is a pen. の意味を日本語で答えなさい。
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-base text-white rounded-full text-xs font-bold">
                未解答
              </span>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-400 rounded-full text-xs font-bold flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <title>オフラインアイコン</title>
                  <path d="M17 17v-3a5 5 0 00-10 0v3" />
                  <path d="M12 5v.01" />
                </svg>
                オフライン
              </span>
            </div>
          </button>
        </div>

        {/* オフライン表示例 */}
        <div className="mt-8 flex items-center justify-center text-xs text-gray-500 gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="#f5835c"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <title>オフライン状態アイコン</title>
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          オフライン中です。ダウンロード済みクイズのみ表示しています。
        </div>
      </main>
    </>
  );
}
