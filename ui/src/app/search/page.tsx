import Link from "next/link";

export default function SearchPage() {
  return (
    <div>
      <h1>クイズ検索</h1>

      <input type="text" placeholder="キーワード検索" />
      <button type="button">検索</button>

      <div>
        <h2>タグ</h2>
        <Link href="/search?tag=数学">#数学</Link>
        <Link href="/search?tag=歴史">#歴史</Link>
        <Link href="/search?tag=英語">#英語</Link>
      </div>

      <div>
        <h2>検索結果</h2>
        <div>
          <h3>サンプルクイズ集1</h3>
          <p>20問</p>
          <Link href="/solve/session1">開始</Link>
        </div>
        <div>
          <h3>サンプルクイズ集2</h3>
          <p>15問</p>
          <Link href="/solve/session2">開始</Link>
        </div>
      </div>

      <Link href="/">← ホーム</Link>
    </div>
  );
}
