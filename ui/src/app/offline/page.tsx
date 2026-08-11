import Link from "next/link";

export default function OfflinePage() {
  return (
    <div>
      <h1>オフラインモード</h1>

      <div>
        <h2>ネットワーク接続が必要です</h2>
        <p>現在オフライン状態です。一部の機能が制限されます。</p>
      </div>

      <div>
        <h2>利用可能な機能</h2>
        <Link href="/">キャッシュ済みクイズ一覧</Link>
        <Link href="/mypage/history">回答履歴確認</Link>
        <Link href="/create">クイズ作成（下書き保存）</Link>
      </div>

      <div>
        <h2>制限される機能</h2>
        <p>・新しいクイズの検索</p>
        <p>・クイズの投稿</p>
        <p>・リアルタイム統計</p>
        <p>・ランキング確認</p>
      </div>

      <div>
        <h2>同期待ちデータ</h2>
        <p>回答データ: 3件</p>
        <p>下書きクイズ: 1件</p>
        <p>統計更新: 5件</p>
      </div>

      <button type="button">接続を再試行</button>
      <Link href="/">← ホーム</Link>
    </div>
  );
}
