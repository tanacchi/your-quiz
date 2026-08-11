interface StatItemProps {
  readonly label: string;
  readonly value: string | number;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold text-base">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
