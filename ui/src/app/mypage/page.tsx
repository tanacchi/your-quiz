import Link from "next/link";

export default function MyPagePage() {
  return (
    <div>
      <h1>マイページ</h1>

      <div>
        <h2>統計サマリー</h2>
        <p>今日の回答: 12問</p>
        <p>正答率: 85%</p>
        <p>連続日数: 7日</p>
      </div>

      <div>
        <h2>メニュー</h2>
        <Link href="/mypage/history">回答履歴</Link>
        <Link href="/mypage/wrong-quiz">間違い問題集</Link>
        <Link href="/mypage/created">投稿管理</Link>
        <Link href="/mypage/achievements">実績・ランキング</Link>
      </div>

      <div>
        <h2>最近の活動</h2>
        <p>数学クイズ集を完了 (80%)</p>
        <p>歴史クイズを3問投稿</p>
        <p>レベル5に到達！</p>
      </div>

      <Link href="/">← ホーム</Link>
    </div>
  );
}
