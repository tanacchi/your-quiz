import { TagChip } from "@/components/atoms/TagChip";

interface TagFilterProps {
  readonly tags: ReadonlyArray<string>;
  readonly selected?: string;
}

export function TagFilter({ tags, selected }: TagFilterProps) {
  return (
    <ul
      className="flex gap-2 overflow-x-auto pb-1 list-none m-0 p-0"
      aria-label="タグフィルター"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <TagChip label={tag} selected={tag === selected} />
        </li>
      ))}
    </ul>
  );
}
