import Link from "next/link";
import { BackLink } from "@/components/molecules/BackLink";
import { StatItem } from "@/components/molecules/StatItem";
import { MobilePageTemplate } from "@/components/templates/MobilePageTemplate";

export default async function QuizResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <MobilePageTemplate title="結果">
      <BackLink href={`/quiz/${id}`} label="問題に戻る" />
      <div className="mt-6 bg-white rounded-2xl shadow-card p-5 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-800">お疲れ様でした！</h2>
        <div className="flex gap-6">
          <StatItem label="正答率" value="80%" />
          <StatItem label="所要時間" value="3分30秒" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-gray-600">次のアクション</h3>
        <Link
          href="/quiz"
          className="w-full text-center px-6 py-3 text-sm rounded-xl bg-base text-white font-semibold shadow hover:bg-base-dark transition"
        >
          新しいクイズを探す
        </Link>
        <Link
          href={`/quiz/${id}`}
          className="w-full text-center px-6 py-3 text-sm rounded-xl bg-white text-base border border-base font-semibold shadow hover:bg-base-light transition"
        >
          再挑戦
        </Link>
        <Link
          href="/mypage/history"
          className="w-full text-center px-6 py-3 text-sm rounded-xl bg-transparent text-base font-semibold hover:bg-base-light transition"
        >
          履歴を確認
        </Link>
      </div>
    </MobilePageTemplate>
  );
}
