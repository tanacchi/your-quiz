import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-row gap-6 mt-10 justify-center">
        {/* 作る（左）: 白地＋オレンジ文字・枠 */}
        <Link
          href="/create"
          className="flex-1 py-10 rounded-2xl bg-white text-xl font-bold border-2 border-base shadow-lg hover:bg-base-light transition flex flex-col items-center focus:outline-none"
        >
          <span className="text-xs font-semibold opacity-80">問題を</span>
          <span className="text-2xl font-bold tracking-wide text-wide">
            作る
          </span>
        </Link>
        {/* 解く（右）: オレンジ地＋白文字 */}
        <Link
          href="/search"
          className="flex-1 py-10 rounded-2xl bg-base text-white text-xl font-bold shadow-lg hover:bg-base-dark transition flex flex-col items-center focus:outline-none"
        >
          <span className="text-xs font-semibold opacity-80">問題を</span>
          <span className="text-2xl font-bold tracking-wide">解く</span>
        </Link>
      </div>

      <div className="mt-6">
        <h2>クイズ一覧</h2>
        <div>
          <Link href="/solve/demo1">サンプルクイズ1</Link>
          <Link href="/solve/demo2">サンプルクイズ2</Link>
        </div>
      </div>

      {/* Pocket Motif Illustration */}
      <div className="flex justify-center mt-10">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <title>ポケットモチーフイラスト</title>
          <rect x="12" y="12" width="40" height="40" rx="12" fill="#f5835c" />
          <path
            d="M20 32a12 12 0 0024 0"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="24" y="24" width="16" height="8" rx="2" fill="#fff" />
          <circle cx="32" cy="28" r="2" fill="#d15d34" />
        </svg>
      </div>
    </main>
  );
}
