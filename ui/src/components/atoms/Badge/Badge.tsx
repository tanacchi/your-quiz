import { cn } from "@/lib/cn";
import type { QuizStatus } from "@/types/quiz";

type BadgeVariant = QuizStatus | "オフライン";

const variantClasses: Record<BadgeVariant, string> = {
  未解答: "bg-base text-white",
  解答済み: "bg-white text-base border border-base",
  復習が必要: "bg-wrong text-wrong border border-wrong",
  オフライン: "bg-gray-200 text-gray-400",
};

interface BadgeProps {
  readonly variant: BadgeVariant;
  readonly children?: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-bold",
        variantClasses[variant],
      )}
    >
      {children ?? variant}
    </span>
  );
}
