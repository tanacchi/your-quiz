# DocSpec Lite 運用ガイド（コンパクト版）

> **狙い**：各ドキュメントの Front Matter に最小の **DocSpec Lite** を書くだけで、依存関係グラフと「必ず読むべき文書（強制参照）」を機械生成し、LLM／フック／CI で一貫運用する。

---

## 0. 背景（超要約）

- UI・API・E2E・設計ガイドが単一リポに同居し、参照順・重複・不整合が発生しやすい。
- 各 `.md` が **自分の依存** と **読ませる条件** を宣言し、中央は生成物のみ（SSOT）。

---

## 1. ゴールと原則

- **SSOT**：ルールは各 `.md` の DocSpec Lite に一度だけ書く。
- **自動生成**：DocSpec から `_graph/graph.json`（機械可読）と `graph.md`（Mermaid）を生成。
- **強制の三段**：①LLM 入口で必読セット→読書順固定 ②pre-commit／ラッパで未読中断 ③CI で未読／循環／未解決を Fail。
- **重複の収束**：`authority` と `canonical` で“正本”を一箇所に。

---

## 2. DocSpec Lite（書き手が覚える最小）

Front Matter の例：

```yaml
---
docspec: lite@1
title: "ドキュメント名"
# id/kind/stage は任意（推論可）
requires:      # 読む順の依存（上から順に）
  - workflow:01.01_specification
  - workflow:04.02_api-design
must_on:       # OR 結合：この状況なら必読（既定 ack:true）
  - task: 作業A
  - ext: .b
  - cmd: pnpm z|make z
should_on:     # OR 結合：できれば参照（LLM は優先、CI は警告）
  - stage: 10.*
authority: 80  # 重複時の優先（0-100, 既定50）
canonical: []  # この Doc が正本のトピックID
---
```

**条件セレクタ**： `task:<文字列>` / `stage:<番号|接頭辞.*>` / `cmd:<a|b>` / `ext:<.x|.y>` / `changed:<glob>` / `stack:<キーワード>`

- AND は同一行で `&`、OR は行を分ける。
- 定番マクロ（例）：`@ts = ext:.ts|.tsx`、`@impl = stage:10.*`、`@bdd = stage:07.*`

---

## 3. 典型パターン（最小 YAML）

**A｜作業Aなら文書Xを必読**

```yaml
---
docspec: lite@1
title: "ドキュメントX"
must_on:
  - task: 作業A
---
```

**B｜**``** を触るなら文書Yを必読**

```yaml
---
docspec: lite@1
title: "ドキュメントY（.b 運用）"
must_on:
  - ext: .b
---
```

**C｜コマンドZを使うなら文書Zを必読**

```yaml
---
docspec: lite@1
title: "ドキュメントZ（コマンドZ 運用）"
must_on:
  - cmd: pnpm z|make z
---
```

---

## 4. ドキュメント体系（最終形）

- **入口**：`docs/instructions/workflow/00.02_workflow.md`（LLM は常にここから）
- **工程群**：`docs/instructions/workflow/*.md`（各 Doc が自分の `requires` を宣言）
- **横断ガイド**：`docs/instructions/shared/**`（言語・テスト・ツールは `must_on` で条件宣言）
- **生成物**：`docs/instructions/_graph/graph.json` / `graph.md`
- **既読証跡**：`docs/instructions/_acks/<branch-or-pr>.json`
- **補助**：`_schema`（Lite 検証・マクロ定義）、`_scripts`（正規化・グラフ生成・ポリシーチェック）※中身の詳細は本書では扱わない

---

## 5. 強制と運用（挙動のみ）

- **LLM**：`graph.json` を読み、`must_on` を文脈（task/changed/stack など）で評価 → 依存展開しトポロジカル順で読書 → 要旨を残して **ack** を出力 → 手順実行。
- **Hook**：変更拡張子・コマンドに応じて `ack` を要求。無ければコミット／実行を中断。
- **CI**：`docs:build` 実行後、未読・未解決依存・循環を検出して Fail。例外は承認付き `waiver` のみ。

---

## 6. 導入手順（短縮版）

1. `workflow/00.02` と主要 5–10 Doc に **DocSpec Lite** を付与。
2. `macros.json` に `@ts/@impl/@bdd` 等を定義。
3. 生成物 `_graph/*` を CI で必須化。pre-commit／ラッパで `ack` を求める。
4. まず **.b／TypeScript／コマンドZ** を対象に強制適用 → 徐々に拡大。

---

## 7. LLM への渡し方（最小指示）

- 入力：`_graph/graph.json` とタスク文脈（`task.name|stage|command|changed_extensions|changed_paths`, `repo.stack`）
- 要求：①必読 Doc の抽出 ②依存展開→読書順提示 ③各 Doc の要旨 ④`ack` JSON の提示 ⑤実施計画の提示

---

## 8. 成果（期待値）

- 参照順の固定化と未読禁止の徹底。
- ドキュメント重複の権威化と不整合の減少。
- LLM・人間・CI が同じ規約で動くため、迷子にならない。

