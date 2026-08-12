# ADR-0024: アクセシビリティ方針（WCAG 2.1 AA目標）

## Status

Proposed

## Context

QuizPocketのアクセシビリティ方針は、docs内で三つの異なる扱いを受けており、以降の実装が参照すべき「正」が定まっていない。

### Background

- **要件定義**: `requirements-quiz.md`の可用性要件は「アクセシビリティ: 初期段階では考慮しない」と明記している
- **future-work**: `future-work.md`の「9. アクセシビリティ対応」は、バリアフリー機能を「長期的な社会的責任として検討」する将来作業として位置づけ、その中で基準を「WCAG 2.1 AAレベル準拠」としている
- **UI設計**: `ui-design/1.00_overview.md`は主要UI要件として「アクセシビリティ: WCAG 2.1 AA準拠」を掲げ、品質保証チェックリストでも「アクセシビリティ: WCAG 2.1 AA配慮事項明記」を完了扱いにしている
- 加えて、UI設計側には既に具体的なアクセシビリティ方針が多数記述済みである: キーボード操作代替（スワイプ操作の代替ボタン、`us-01_quiz-answering.md`）、ARIAラベルと`aria-live`（`us-06_quiz-search.md`、各wireframe）、コントラスト比4.5:1以上（`design-system.md`）、タップ領域44px以上（`1.02_user-stories/README.md`）、色以外での正誤区別、`prefers-reduced-motion`尊重、Storybookの`@storybook/addon-a11y`（axe）による自動検証（`storybook-setup.md`）
- ADR配下にはアクセシビリティ方針を定めたADRが存在せず、上記の矛盾を裁定する根拠が無い

### Drivers

- **UI形態のリスク**: 主要な回答UIがTinder風スワイプ操作であり、キーボードのみ・スクリーンリーダー利用者への代替手段が必須
- **既存資産の活用**: UI設計・Storybookに既にアクセシビリティ対応の実装方針とツール（axe）が存在し、これを正式な方針として追認・体系化するコストは小さい
- **匿名・スマートフォン専用という利用形態**: 幅広い利用者が事前設定なしにアクセスするため、標準的な達成基準への準拠が望ましい
- **後続工程への影響**: 実装フェーズ（Skeleton/Implementation）が要件定義とUI設計のどちらを正とするか判断できない状態を解消する必要がある

## Decision

### Chosen Option

**WCAG 2.1 レベルAA**を、QuizPocketが目標とするアクセシビリティ達成基準として採用する。

`ui-design/1.00_overview.md`に既に明記されている「WCAG 2.1 AA準拠」を正式な方針として確定し、要件定義とfuture-workの記述をこれに整合させる（本ADRとあわせて`requirements-quiz.md`・`future-work.md`を修正する）。適合対象は以下のとおりとし、いずれもUI設計側に既存の記述を追認・体系化したものである。

- **コントラスト比**: 通常テキストで4.5:1以上（`design-system.md`の`$contrast-ratios`定義に準拠）
- **キーボード操作**: フルキーボードナビゲーション対応。スワイプ操作には代替ボタン（正誤ボタン等）を必ず提供する
- **スクリーンリーダー対応**: 主要な操作要素にARIAラベルを付与し、動的な状態変化（検索結果・回答結果等）には`aria-live`を用いる
- **タップ領域**: 主要な操作要素は44px×44px以上を最小サイズとする
- **色に依存しない情報伝達**: 正誤・状態の区別を色のみに依存させず、アイコン・テキストを併用する
- **モーション配慮**: `prefers-reduced-motion`を尊重し、過度なアニメーションを抑制する
- **自動検証**: Storybookの`@storybook/addon-a11y`（axe-core）による静的検証を継続し、新規UIコンポーネントのStoryに組み込む

### Alternatives Considered

以下の代替案を検討した：

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| **WCAG 2.1 AA目標（採用）** | **国際的に広く採用される達成基準、UI設計の既存記述と整合、法令・ガイドライン準拠の説明が容易** | **代替操作UIの実装コストが発生** | **★★★** |
| レベルAのみ | 達成コストが低い | コントラスト比等の基本的な配慮が不十分になりやすく、UI設計の既存記述（AA前提）と食い違う | ★ |
| AAAを目指す | 最高水準のアクセシビリティ | コントラスト比7:1等、達成コストが高くMVP規模に見合わない | ★★ |
| 方針を定めない（現状維持） | 追加コストなし | 要件定義・future-work・UI設計の矛盾が解消されず、実装時にどちらを参照すべきか判断できない | ☆ |

## Consequences

### Positive

- UI設計側に既に存在するアクセシビリティ関連の記述（キーボード操作・ARIA・コントラスト・タップ領域）が正式な根拠を得る
- Storybook `@storybook/addon-a11y`による自動検証を、恣意的な取り組みではなく方針に基づく継続活動として位置づけられる
- 要件定義・future-work・UI設計の矛盾が解消し、以降の実装工程が単一の基準を参照できる

### Negative

- スワイプ主体のUIに対する代替操作（キーボード操作、代替ボタン）の実装・保守コストが発生する
- コントラスト比・タップ領域の制約により、デザインの自由度が一部制限される

### Neutral

- AAAレベルへの引き上げは将来の検討事項として残す（本ADRのスコープ外）
- 多言語対応時のスクリーンリーダー読み上げ品質は別途検討が必要

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 新規UIコンポーネント追加時にAA基準の考慮漏れ | 中 | 中 | `@storybook/addon-a11y`をStory作成時のデフォルトチェックとし、DoDに組み込む |
| スワイプ代替操作の実装が後回しになる | 中 | 高 | US-01（クイズ回答）の受け入れ条件にキーボード操作代替を明記する |
| コントラスト比の自動検証がデザイン変更に追随しない | 低 | 中 | `design-system.md`のカラートークン変更時にaxeレポートを再確認する運用とする |

## Implementation Notes

### Action Items

- [ ] `requirements-quiz.md`の「アクセシビリティ: 初期段階では考慮しない」を本ADRの目標に整合させる（本PRで実施）
- [ ] `future-work.md`「9. アクセシビリティ対応」を、AA到達済みの中核方針とAAAへの拡張検討に分離する（本PRで実施）
- [ ] Storybook `@storybook/addon-a11y`のCI組込みを検討する（本ADRのスコープ外・別途検討）
- [ ] US-01（クイズ回答）の受け入れ条件へキーボード操作代替を明記する（別途検討）

### Timeline

- **決定日**: 2025-08-11
- **実装開始**: 未定（Accepted後）
- **完了予定**: 未定

## References

- [UI設計概要（1.00_overview.md）](../ui-design/1.00_overview.md)
- [デザインシステム（design-system.md）](../ui-design/4.01_components/design-system.md)
- [Storybookセットアップ（storybook-setup.md）](../ui-design/4.01_components/storybook-setup.md)
- [US-01: クイズ回答（アクセシビリティ制約）](../ui-design/1.02_user-stories/us-01_quiz-answering.md)
- [非機能要件: クイズ機能（requirements-quiz.md）](../specifications/requirements/requirements-quiz.md)
- [Future Work](../specifications/future-work.md)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)

---

**Created**: 2025-08-11
**Last Updated**: 2025-08-11
**Authors**: Claude Code
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
