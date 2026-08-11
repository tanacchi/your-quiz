import { cn } from "@/lib/cn";

interface TagChipProps {
  readonly label: string;
  readonly selected?: boolean;
}

export function TagChip({ label, selected = false }: TagChipProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-semibold",
        selected ? "bg-base text-white" : "bg-base-light text-base",
      )}
    >
      #{label}
    </span>
  );
}
