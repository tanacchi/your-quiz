/** layout.tsx・list/page.tsx から集約したインラインSVGアイコン */

const ICON_PATHS = {
  /** ボトムナビ: 作る（＋） */
  create: <path d="M12 4v16m8-8H4" />,
  /** ボトムナビ: 解く（ホーム） */
  play: (
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
  ),
  /** ボトムナビ / ヘッダ: マイページ（ユーザー円） */
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    </>
  ),
  /** 検索チップ: 削除（×） */
  "x-mark": <path d="M6 6l12 12M6 18L18 6" />,
  /** フィルターアイコン */
  filter: <path d="M3 6h18M6 6v6a6 6 0 0012 0V6" />,
  /** 下矢印 */
  "chevron-down": <path d="M19 9l-7 7-7-7" />,
  /** 解説ありアイコン */
  explanation: (
    <>
      <path d="M12 20h9" />
      <path d="M6.6 10a6 6 0 1110.8 0" />
    </>
  ),
  /** オフライン: WiFiなし */
  "wifi-off": (
    <>
      <path d="M17 17v-3a5 5 0 00-10 0v3" />
      <path d="M12 5v.01" />
    </>
  ),
  /** オフライン状態: サークルマイナス */
  "offline-status": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
} as const;

export type IconName = keyof typeof ICON_PATHS;

interface IconProps {
  readonly name: IconName;
  readonly title: string;
  readonly size?: number;
  readonly color?: string;
  readonly className?: string;
}

export function Icon({
  name,
  title,
  size = 24,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <title>{title}</title>
      {ICON_PATHS[name]}
    </svg>
  );
}
