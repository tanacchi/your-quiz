import Link from "next/link";

export default function WrongQuizPage() {
  return (
    <div>
      <h1>間違い問題集</h1>

      <div>
        <h2>自動生成された間違い問題集</h2>
        <p>過去に間違えた問題を自動的にまとめました。</p>
      </div>

      <div>
        <h2>問題集一覧</h2>

        <div>
          <h3>数学の間違い問題集</h3>
          <p>8問 | 最終更新: 2025-01-15</p>
          <Link href="/solve/wrong-math-session">挑戦する</Link>
        </div>

        <div>
          <h3>歴史の間違い問題集</h3>
          <p>5問 | 最終更新: 2025-01-14</p>
          <Link href="/solve/wrong-history-session">挑戦する</Link>
        </div>

        <div>
          <h3>英語の間違い問題集</h3>
          <p>12問 | 最終更新: 2025-01-13</p>
          <Link href="/solve/wrong-english-session">挑戦する</Link>
        </div>
      </div>

      <div>
        <h2>習得状況</h2>
        <p>数学: 3問習得済み / 8問中</p>
        <p>歴史: 2問習得済み / 5問中</p>
        <p>英語: 4問習得済み / 12問中</p>
      </div>

      <Link href="/mypage">← マイページ</Link>
    </div>
  );
}
