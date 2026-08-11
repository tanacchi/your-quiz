import Link from "next/link";
import { useId } from "react";

export default function CreatePage() {
  const questionId = useId();
  const explanationId = useId();
  const tagsId = useId();

  return (
    <div>
      <h1>クイズ作成</h1>

      <form>
        <div>
          <label htmlFor={questionId}>問題文 (500文字以内)</label>
          <textarea
            id={questionId}
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
          <label htmlFor={explanationId}>解説 (任意, 1000文字以内)</label>
          <textarea
            id={explanationId}
            placeholder="解説を入力してください"
          ></textarea>
        </div>

        <div>
          <label htmlFor={tagsId}>タグ</label>
          <input
            id={tagsId}
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
