import Link from "next/link";

export default function CreatePage() {
  return (
    <div>
      <h1>クイズ作成</h1>

      <form>
        <div>
          <label htmlFor="question">問題文 (500文字以内)</label>
          <textarea
            id="question"
            placeholder="問題を入力してください"
          ></textarea>
        </div>

        <div>
          <fieldset>
            <legend>正解</legend>
            <label>
              <input type="radio" name="answer" value="true" /> ○
            </label>
            <label>
              <input type="radio" name="answer" value="false" /> ×
            </label>
          </fieldset>
        </div>

        <div>
          <label htmlFor="explanation">解説 (任意, 1000文字以内)</label>
          <textarea
            id="explanation"
            placeholder="解説を入力してください"
          ></textarea>
        </div>

        <div>
          <label htmlFor="tags">タグ</label>
          <input
            id="tags"
            type="text"
            placeholder="タグを入力 (例: 数学, 基礎)"
          />
        </div>

        <div>
          <Link href="/create/preview">プレビュー</Link>
          <button type="submit">投稿</button>
        </div>
      </form>

      <Link href="/">← ホーム</Link>
    </div>
  );
}
