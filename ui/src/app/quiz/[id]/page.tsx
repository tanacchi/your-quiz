import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { BackLink } from "@/components/molecules/BackLink";
import { MobilePageTemplate } from "@/components/templates/MobilePageTemplate";

export default async function QuizAnswerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <MobilePageTemplate>
      <BackLink href="/quiz" label="クイズ一覧" />
      <div className="mt-4">
        <ProgressBar current={1} total={5} />
        <p className="text-xs text-gray-500 mt-1">1 / 5問</p>
      </div>
      <div className="mt-6 bg-white rounded-2xl shadow-card p-5">
        <h1 className="text-base font-semibold text-gray-800">
          これはサンプル問題です。正解は○ですか？
        </h1>
        <p className="text-xs text-gray-400 mt-1">クイズID: {id}</p>
      </div>
      <div className="flex gap-3 mt-6">
        <Button variant="primary" fullWidth>
          ○
        </Button>
        <Button variant="secondary" fullWidth>
          ×
        </Button>
      </div>
      <div className="flex gap-3 mt-3">
        <Button variant="ghost" size="sm">
          ← 前問
        </Button>
        <Button variant="ghost" size="sm">
          次問 →
        </Button>
        <Button variant="ghost" size="sm">
          スキップ
        </Button>
      </div>
      <div className="mt-6">
        <Link
          href={`/quiz/${id}/result`}
          className="text-xs text-base underline"
        >
          結果を見る（テスト用）
        </Link>
      </div>
    </MobilePageTemplate>
  );
}
