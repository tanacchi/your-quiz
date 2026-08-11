import Link from "next/link";

export default function PreviewPage() {
  return (
    <div>
      <h1>プレビュー</h1>

      <div>
        <h2>作成したクイズのプレビュー</h2>
        <p>これはサンプル問題です。正解は○ですか？</p>

        <button type="button">○</button>
        <button type="button">×</button>

        <div>
          <h3>解説</h3>
          <p>これはサンプルの解説です。</p>
        </div>

        <div>
          <p>タグ: #数学 #基礎</p>
        </div>
      </div>

      <div>
        <Link href="/create">← 修正</Link>
        <Link href="/create/success">投稿する</Link>
      </div>
    </div>
  );
}
