import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Icon } from "@/components/atoms/Icon";
import { TagChip } from "@/components/atoms/TagChip";
import { cn } from "@/lib/cn";
import type { Quiz } from "@/types/quiz";

interface QuizCardProps {
  readonly quiz: Quiz;
  readonly href: string;
}

export function QuizCard({ quiz, href }: QuizCardProps) {
  const isWrong = quiz.status === "復習が必要";
  return (
    <Link
      href={href}
      className={cn(
        "w-full text-left rounded-2xl bg-white shadow-card p-5 transition hover:scale-[1.01] active:scale-95",
        "focus:ring-2 focus:ring-base flex flex-col gap-2 border-l-4",
        isWrong ? "border-wrong" : "border-base",
        quiz.status === "解答済み" ? "bg-base-light opacity-60" : "",
      )}
    >
      {/* タグ行 */}
      <div className="flex flex-wrap gap-1 mb-1">
        {quiz.tags.map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
        <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
          <Icon
            name="explanation"
            title={
              quiz.hasExplanation ? "解説ありアイコン" : "解説なしアイコン"
            }
            size={16}
            color="#f5835c"
            className="inline-block"
          />
          {quiz.hasExplanation ? "解説あり" : "解説なし"}
        </span>
      </div>

      {/* 問題文 */}
      <div className="text-sm font-medium line-clamp-3">{quiz.question}</div>

      {/* ステータスバッジ行 */}
      <div className="flex gap-2 mt-2">
        <Badge variant={quiz.status} />
        {quiz.isOfflineAvailable === true && (
          <span className="px-2 py-0.5 bg-gray-200 text-gray-400 rounded-full text-xs font-bold flex items-center">
            <Icon
              name="wifi-off"
              title="オフライン利用可能アイコン"
              size={12}
              className="mr-1"
            />
            オフライン
          </span>
        )}
      </div>
    </Link>
  );
}
