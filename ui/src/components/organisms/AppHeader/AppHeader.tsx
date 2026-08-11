import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";

export function AppHeader() {
  return (
    <header className="flex justify-between items-center px-4 pt-4 pb-2 bg-base-light sticky top-0 z-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-base rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          <span>Q</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-base tracking-tight">
            QuizPocket
          </span>
          <span className="text-xs text-base font-medium opacity-70">
            いつでもどこでも、手軽にクイズ学習
          </span>
        </div>
      </Link>
      <Link
        href="/mypage"
        aria-label="マイページ"
        className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border border-base hover:bg-base-light transition"
      >
        <Icon
          name="user"
          title="マイページアイコン"
          size={24}
          color="#f5835c"
        />
      </Link>
    </header>
  );
}
