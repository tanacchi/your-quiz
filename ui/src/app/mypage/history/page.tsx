import Link from "next/link";

export default function HistoryPage() {
  return (
    <div>
      <h1>回答履歴</h1>

      <div>
        <h2>フィルター</h2>
        <Link href="/mypage/history?filter=all">全て</Link>
        <Link href="/mypage/history?filter=correct">正解のみ</Link>
        <Link href="/mypage/history?filter=wrong">間違いのみ</Link>
      </div>

      <div>
        <h2>履歴一覧</h2>

        <div>
          <h3>数学クイズ集</h3>
          <p>2025-01-15 | 20問中16問正解 (80%)</p>
          <Link href="/solve/session1/result">詳細</Link>
          <Link href="/solve/session1-retry">再挑戦</Link>
        </div>

        <div>
          <h3>歴史クイズ集</h3>
          <p>2025-01-14 | 15問中12問正解 (80%)</p>
          <Link href="/solve/session2/result">詳細</Link>
          <Link href="/solve/session2-retry">再挑戦</Link>
        </div>

        <div>
          <h3>英語クイズ集</h3>
          <p>2025-01-13 | 25問中18問正解 (72%)</p>
          <Link href="/solve/session3/result">詳細</Link>
          <Link href="/solve/session3-retry">再挑戦</Link>
        </div>
      </div>

      <Link href="/mypage">← マイページ</Link>
    </div>
  );
}
