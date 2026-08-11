interface ProgressBarProps {
  readonly current: number;
  readonly total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      <p className="text-xs text-gray-500 mb-1">
        {current}/{total}問完了
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-base h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
