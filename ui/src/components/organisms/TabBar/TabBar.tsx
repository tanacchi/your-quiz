import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";

const NAV_ITEMS = [
  {
    label: "作る",
    href: "/create",
    icon: "create" as const,
    title: "作るアイコン",
  },
  { label: "解く", href: "/", icon: "play" as const, title: "解くアイコン" },
  {
    label: "マイページ",
    href: "/mypage",
    icon: "user" as const,
    title: "マイページアイコン",
  },
] as const;

export function TabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-white border-t border-base flex justify-around items-center h-16 z-20"
      aria-label="メインナビゲーション"
    >
      {NAV_ITEMS.map(({ label, href, icon, title }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center justify-center text-base focus:outline-none"
        >
          <Icon
            name={icon}
            title={title}
            size={24}
            color="#f5835c"
            className="mb-0.5"
          />
          <span className="text-xs font-semibold">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
