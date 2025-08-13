import Link from "next/link";

export default function CreatedPage() {
  return (
    <div>
      <h1>投稿管理</h1>

      <div>
        <h2>投稿状況</h2>
        <p>承認待ち: 2件</p>
        <p>承認済み: 8件</p>
        <p>拒否: 1件</p>
      </div>

      <div>
        <h2>投稿一覧</h2>

        <div>
          <h3>数学の基礎問題</h3>
          <p>ステータス: 承認済み</p>
          <p>正答率: 78% | 挑戦者: 42人</p>
          <Link href="/solve/my-quiz-1">確認</Link>
        </div>

        <div>
          <h3>歴史の人物問題</h3>
          <p>ステータス: 承認待ち</p>
          <p>投稿日: 2025-01-15</p>
          <Link href="/create/preview?id=pending-1">プレビュー</Link>
        </div>

        <div>
          <h3>英語の文法問題</h3>
          <p>ステータス: 拒否</p>
          <p>理由: 内容が不適切</p>
          <button type="button">編集して再投稿</button>
        </div>
      </div>

      <div>
        <h2>統計情報</h2>
        <p>総挑戦者数: 127人</p>
        <p>平均正答率: 74%</p>
        <p>お気に入り登録: 23件</p>
      </div>

      <Link href="/mypage">← マイページ</Link>
    </div>
  );
}
