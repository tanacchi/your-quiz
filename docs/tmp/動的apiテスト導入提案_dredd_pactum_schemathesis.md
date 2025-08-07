# 動的 API テスト導入提案

## 対象ツール

| ツール | 主目的 | 導入難易度 (★低〜★★★高) |
| --- | --- | --------------- |
|     |     |                 |

| **Dredd**                                 | OpenAPI ↔ 実装の完全一致チェック                     | ★  |
| ----------------------------------------- | ----------------------------------------- | -- |
| **PactumJS** + `@pactum/swagger-coverage` | 正常系 + 業務例外を TypeScript DSL で検証 / カバレッジ可視化 | ★★ |
| **Schemathesis**                          | スキーマ準拠のファズ & 境界テスト (異常入力検出)               | ★★ |

## 1. 背景

- **スキーマファースト (TypeSpec → OpenAPI)** により静的型は担保済み。
- しかし **実装レイヤ** では
  - 仕様外 404/500 返却
  - 業務例外の抜け漏れ
  - バリデーション不足 など「**ランタイム起因のバグ**」が依然残存。

## 2. 動的テストが解決する課題

| 課題                               | 静的型で検出可? | 動的テストで検出可      |
| -------------------------------- | -------- | -------------- |
| スキーマ外レスポンス (例: `price` が string) | ✕        | ◯ Dredd        |
| 未実装の業務例外 (未登録タグで 404 を返さず空配列)    | ✕        | ◯ PactumJS     |
| 入力境界値の不正 (負数, 超桁)                | ✕        | ◯ Schemathesis |

## 3. 各ツールの役割と相乗効果

1. **Dredd** — *仕様ドキュメントの守護神*
   - OpenAPI のパス × メソッド × レスポンスを網羅的に呼び出し、一致しない箇所を即時検知。
2. **PactumJS** — *業務ロジックの受入テスト*
   - TypeScript DSL で正常系 & 例外シナリオを記述。
   - `@pactum/swagger-coverage` により「テストされていない経路」をレポート。
3. **Schemathesis** — *未知のバグハンター*
   - スキーマ境界・ネガティブパスを自動生成し、多様な 4xx/5xx を発見。
   - ファズ結果を Pactum シナリオに昇格することで **継続的学習ループ** を形成。

## 4. 最小導入ステップ (PoC)

1. **Miniflare + D1** でローカル API を起動。
2. GitHub Actions に以下ジョブを追加し **PR ゲート**化:
   ```yaml
   - name: Dredd (spec drift)
     run: dredd openapi.yaml http://localhost:8787
   - name: Pactum (business rules)
     run: npx jest
   - name: Schemathesis (boundary fuzz)
     run: schemathesis run --workers 4 --mode both http://localhost:8787/openapi.json
   ```
3. 成果物
   - HTML カバレッジ (Pactum)
   - ファズテストレポート (Schemathesis)

## 5. 投資対効果

| 項目         | コスト    | リターン                           |
| ---------- | ------ | ------------------------------ |
| ツール追加・CI設定 | 1–2 人日 | 仕様逸脱バグを **早期検知** / 障害コスト削減     |
| テストシナリオ拡充  | 継続的    | リグレッションリスク低減、*change fear* の解消 |

> **結論**: 静的型だけでは捕捉できない “実装・運用バグ” を **工数小** でカバーし、リリース信頼性を向上させます。段階導入 (まず Dredd → Pactum → Schemathesis) により学習コストと ROI を最適化できます。

---

### 参考リンク

- Dredd: [https://dredd.org/](https://dredd.org/)
- PactumJS: [https://pactumjs.github.io/](https://pactumjs.github.io/)
- Schemathesis: [https://schemathesis.readthedocs.io/](https://schemathesis.readthedocs.io/)
- Pactum Swagger Coverage: [https://github.com](https://github.com)

