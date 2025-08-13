import Link from "next/link";

export default function SuccessPage() {
  return (
    <div>
      <h1>投稿完了</h1>

      <div>
        <h2>クイズを投稿しました！</h2>
        <p>
          承認待ち状態です。承認されると他のユーザーも解答できるようになります。
        </p>
      </div>

      <div>
        <h3>次のアクション</h3>
        <Link href="/solve/my-quiz-session">自分で解いてみる</Link>
        <Link href="/create">新しいクイズを作成</Link>
        <Link href="/mypage/created">投稿管理を確認</Link>
        <Link href="/">ホームに戻る</Link>
      </div>
    </div>
  );
}
