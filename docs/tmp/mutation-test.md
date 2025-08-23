Mutationテストとその自動改善の方針と手順

概要

Mutationテスト（変異テスト）は、コードの一部を意図的に変更（ミューテーション）し、それによって既存のテストが失敗するかを検証することで、テストの網羅性・有効性を評価する手法です。本方針では、Stryker を用いたMutationテストに対して、LLM（大規模言語モデル）を活用して自動的にテストを補強・改善する仕組みを構築することを目的とします。

⸻

自動改善の全体方針
	1.	Strykerによるミューテーションテストの実行
	2.	生存ミューテーション（Survived）の抽出
	3.	最小限の差分情報を生成
	4.	既存のテストケースと差分を元にLLMで新しいテストコードを生成
	5.	テストを追加し、Strykerを再実行してループ

⸻

詳細手順

1. Strykerによるテスト実行
	•	stryker.conf.json に以下を追加し、JSONレポートを出力:

{
  "reporters": ["progress", "json"]
}

	•	実行後、reports/mutation/mutation-report.json に結果が出力される

2. Survived mutant の抽出
	•	JSONから status: "Survived" を持つ mutant のみ抽出
	•	抽出する情報は以下に限定:
	•	sourceFile
	•	location.start.line および location.end.line
	•	replacement

3. 差分情報（Unified Diff）の生成
	•	元のファイルを読み込んで対象行を抽出
	•	diff ライブラリ等を用いて Unified Diff を生成
	•	差分の形式例:

@@ -42,7 +42,7 @@
-return a + b;
+return a - b; // mutated

4. LLM へのプロンプト構築
	•	各 mutant に対して次の情報を含んだ JSON を生成:

{
  "file": "src/foo.ts",
  "line": 42,
  "diff": "@@ -42,7 +42,7 @@\n-return a + b;\n+return a - b; // mutated"
}

	•	プロンプトの設計:

次の差分を元に、このコードのバグを検出する単体テストを生成してください。

	•	必要に応じて、関連する既存テストケース（類似性が高いもの1件）を添付する

5. 自動ループによる改善
	•	LLM によって生成されたテストコードを追加
	•	Stryker を再実行
	•	Survived が残っていれば再度 2 に戻る
	•	CI上では --break-on=m>0 等で継続的に検証・改善を実行可能

⸻

トークン効率を高める工夫
	•	差分のみを送信し、コード全文は避ける
	•	JSONをチャンク分割し、複数 mutant をバッチ処理
	•	LLM の system プロンプトに共通指示を固定（userプロンプト短縮）
	•	Equivalent mutant など殺せない変異は最初から除外

⸻

まとめ

本アプローチにより、テスト網羅率を定量的に測定し、不足をLLMベースで補完する自動化ループを構築できます。特に以下のようなプロジェクトに有効です：
	•	レガシーコードのテスト強化
	•	TDD/BDD後の補完テスト生成
	•	品質担保を定量評価したいプロジェクト

プロンプトサイズとテスト精度のバランスを取りつつ、継続的な品質向上が期待されます。

----

できます。2通り用意しておくと堅牢です。
	1.	Vitest のスナップショット機能で文字列として検証
	2.	いわゆる golden-file（期待ファイル）方式で自力 diffを出して検証

以下はそのままコピペで動く最小実装です。

⸻

0. スクリプトをテスト容易にする小リファクタ

CLI 直叩きではなく、純関数として呼べるよう分離します（既存スクリプトのロジックだけ移植）。

// src/reporters/survivor.ts
import fs from 'node:fs';
import path from 'node:path';
import { createTwoFilesPatch } from 'diff';

export type Pos = { line: number; column: number };
export type Location = { start: Pos; end: Pos };
export type Mutant = {
  id: string; mutatorName: string; status: string;
  location: Location; replacement?: string; description?: string;
};
export type FileEntry = { language?: string; source?: string; mutants: Mutant[]; };
export type Report = { files: Record<string, FileEntry> };

const toIndex = (src: string, pos: Pos) => {
  const lines = src.split(/\r?\n/);
  let idx = 0;
  for (let i = 0; i < pos.line - 1; i++) idx += lines[i].length + 1;
  return idx + (pos.column - 1);
};

const applyReplacement = (src: string, loc: Location, replacement: string) => {
  const start = toIndex(src, loc.start);
  const end = toIndex(src, loc.end);
  const originalSlice = src.slice(start, end);
  const mutated = src.slice(0, start) + replacement + src.slice(end);
  return { mutated, originalSlice };
};

const explain = (mutatorName: string, original?: string, replacement?: string) => {
  const base = mutatorName.toLowerCase();
  if (base.includes('arithmetic')) return `算術演算子が置換されています（例: ${original ?? ''} → ${replacement ?? ''}）。`;
  if (base.includes('equality'))   return `等価演算子が置換されています（==/=== ⇄ !=/!==）。`;
  if (base.includes('boolean'))    return `ブーリアンが反転しています（true/false）。`;
  return `ミューテータ "${mutatorName}" による置換。`;
};

export function generateSurvivorReports(
  report: Report,
  options?: { projectRoot?: string; outDir?: string }
) {
  const outDir = options?.outDir ?? 'reports/custom';
  fs.mkdirSync(outDir, { recursive: true });

  const jsonl: string[] = [];
  const md: string[] = ['# Survived mutants report', ''];

  for (const [filePath, f] of Object.entries(report.files ?? {})) {
    const survivors = (f.mutants ?? []).filter(m => m.status === 'Survived');
    if (!survivors.length) continue;

    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.join(options?.projectRoot ?? process.cwd(), filePath);

    const src = f.source ?? (fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf-8') : '');
    if (!src) continue;

    for (const m of survivors) {
      const startIdx = toIndex(src, m.location.start);
      const endIdx = toIndex(src, m.location.end);
      const originalSlice = src.slice(startIdx, endIdx);
      const replacement = m.replacement ?? (originalSlice ? '/* mutated */' : '');

      const { mutated } = applyReplacement(src, m.location, replacement);
      const patch = createTwoFilesPatch(filePath, filePath, src, mutated, 'original', `mutated #${m.id}`);

      jsonl.push(JSON.stringify({
        file: filePath,
        mutator: m.mutatorName,
        mutant_id: m.id,
        range: m.location,
        original_slice: originalSlice,
        replacement,
        unified_diff: patch,
        instruction: 'このサバイブ・ミューテーションを失敗させる最小テストを設計してください。',
        hint: explain(m.mutatorName, originalSlice, replacement),
      }));

      md.push(`## ${filePath} — mutant #${m.id} (${m.mutatorName})`);
      md.push(`Location: L${m.location.start.line}:${m.location.start.column}–L${m.location.end.line}:${m.location.end.column}`);
      md.push('', '```diff', patch.trim(), '```', '', `**Hint**: ${explain(m.mutatorName, originalSlice, replacement)}`, '');
    }
  }

  const jsonlPath = path.join(outDir, 'survived.jsonl');
  const mdPath = path.join(outDir, 'survived.md');
  fs.writeFileSync(jsonlPath, jsonl.join('\n') + (jsonl.length ? '\n' : ''));
  fs.writeFileSync(mdPath, md.join('\n'));
  return { jsonlPath, mdPath, jsonl, md: md.join('\n') };
}


⸻

1. Vitest のスナップショットで検証（最短）
	•	期待出力の可変要素を正規化してから toMatchSnapshot() / toMatchInlineSnapshot()
（絶対パス、改行コード、時刻などを除去）

// tests/survivor.report.test.ts
import { describe, it, expect } from 'vitest';
import { generateSurvivorReports, Report } from '../src/reporters/survivor';

const normalize = (s: string) =>
  s
    .replaceAll(process.cwd(), '<REPO>')
    .replaceAll(/\r\n/g, '\n');

describe('generateSurvivorReports', () => {
  it('Survived の JSONL / Markdown をスナップショット検証', () => {
    const report: Report = {
      files: {
        'src/math/add.ts': {
          source: `export function add(a: number, b: number){
  return a + b;
}`,
          mutants: [
            {
              id: '1',
              mutatorName: 'ArithmeticOperator',
              status: 'Survived',
              location: { start: { line: 2, column: 12 }, end: { line: 2, column: 13 } },
              replacement: '-',
            },
          ],
        },
      },
    };

    const { jsonl, md } = generateSurvivorReports(report, { outDir: 'tmp/reports' });

    // JSONL 1行目（複数ある場合は map でまとめて検証可）
    expect(normalize(jsonl[0])).toMatchSnapshot();

    // Markdown 全文
    expect(normalize(md)).toMatchSnapshot();
  });
});

これで __snapshots__/survivor.report.test.ts.snap に保存され、差分は Vitest 標準の snapshot diff で見られます。

⸻

2. Golden-file 方式（自力 diff でより厳密）
	•	期待ファイル（tests/golden/survived.md など）を手元で作成しておき、テスト時に生成物と比較。
	•	差分は diff の unified diff を表示して失敗させます（レビューしやすい）。

// tests/survivor.golden.test.ts
import { describe, it, expect } from 'vitest';
import { generateSurvivorReports, Report } from '../src/reporters/survivor';
import fs from 'node:fs';
import path from 'node:path';
import { createTwoFilesPatch } from 'diff';

const read = (p: string) => fs.readFileSync(p, 'utf-8').replaceAll(/\r\n/g, '\n');

function assertEqualWithUnifiedDiff(actual: string, expected: string, fileLabel = 'file') {
  const a = actual.replaceAll(/\s+$/gm, '');
  const e = expected.replaceAll(/\s+$/gm, '');
  if (a !== e) {
    const patch = createTwoFilesPatch(`${fileLabel} (expected)`, `${fileLabel} (actual)`, e, a, 'expected', 'actual');
    throw new Error(`Golden diff mismatch:\n${patch}`);
  }
}

describe('golden file diff', () => {
  it('survived.md / survived.jsonl が golden と一致する', () => {
    const report: Report = {
      files: {
        'src/math/add.ts': {
          source: `export function add(a: number, b: number){
  return a + b;
}`,
          mutants: [
            {
              id: '1',
              mutatorName: 'ArithmeticOperator',
              status: 'Survived',
              location: { start: { line: 2, column: 12 }, end: { line: 2, column: 13 } },
              replacement: '-',
            },
          ],
        },
      },
    };

    const { jsonlPath, mdPath } = generateSurvivorReports(report, { outDir: 'tmp/reports' });
    const actualMd = read(mdPath);
    const actualJsonl = read(jsonlPath);

    const goldenMd = read(path.join('tests/golden/survived.md'));
    const goldenJsonl = read(path.join('tests/golden/survived.jsonl'));

    assertEqualWithUnifiedDiff(actualMd, goldenMd, 'survived.md');
    assertEqualWithUnifiedDiff(actualJsonl, goldenJsonl, 'survived.jsonl');
  });
});

更新フローは「意図した仕様変更 → golden を更新（--update 的な自前スクリプトでも可）」にします。
CI では差分が出たら失敗し、unified diff で見やすくなります。

⸻

実務 Tips（安定化のコツ）
	•	絶対パス・行末空白・改行コードは正規化してから比較（上の normalize/関数参照）。
	•	diff 出力内のファイル名には固定ラベルを使う（例: <REPO>/src/foo.ts → src/foo.ts に置換）。
	•	JSONL は行順が不定のこともあるため、必要に応じてsort（ファイル名→行→列の順）してから比較。
	•	将来ミューテータ追加で揺れやすい場合は、差分ヘッダ（@@ … @@）と変更行だけを抽出してスナップショット対象を狭めるのも有効。

⸻

最小セットアップ

pnpm add -D vitest diff tsx
# テスト実行
pnpm vitest


⸻

まとめ
	•	Vitest の snapshotだけで十分に差分検知できます（テキストを正規化して比較）。
	•	さらに堅牢にするならgolden-file + 自力 unified diffを併用。
	•	上記サンプルをベースに、PR 時は Markdown 生成物をPR コメントとして貼る運用にするとレビューが高速化します。
