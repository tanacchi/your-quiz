import Link from "next/link";

export default async function SolvePage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return (
    <div>
      <h1>クイズ回答</h1>
      <p>セッション: {sessionId}</p>

      <div>
        <h2>問題 1/5</h2>
        <p>これはサンプル問題です。正解は○ですか？</p>

        <button type="button">○</button>
        <button type="button">×</button>
        <button type="button">スキップ</button>

        <div>
          <button type="button">← 前問</button>
          <button type="button">次問 →</button>
        </div>
      </div>

      <div>
        <p>進捗: 1/5問完了</p>
      </div>

      <Link href={`/solve/${sessionId}/result`}>結果を見る（テスト用）</Link>
      <Link href="/">← ホーム</Link>
    </div>
  );
}
