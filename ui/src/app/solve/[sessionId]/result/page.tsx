import Link from "next/link";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return (
    <div>
      <h1>結果</h1>
      <p>セッション: {sessionId}</p>

      <div>
        <h2>お疲れ様でした！</h2>
        <p>正答率: 4/5 (80%)</p>
        <p>所要時間: 3分30秒</p>
      </div>

      <div>
        <h3>次のアクション</h3>
        <Link href="/search">新しいクイズを探す</Link>
        <Link href="/solve/wrong-session">間違い問題集</Link>
        <Link href="/mypage/history">履歴を確認</Link>
        <Link href={`/solve/${sessionId}`}>再挑戦</Link>
      </div>

      <Link href="/">← ホーム</Link>
    </div>
  );
}
