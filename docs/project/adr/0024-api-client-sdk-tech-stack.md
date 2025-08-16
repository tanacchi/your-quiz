# ADR-0024: OrvalによるAPI SDK自動生成 + Zodランタイム検証 + neverthrow統一

## Status

Accepted

## Context

### Background

- 当プロジェクトでは OpenAPI (`openapi.yaml`) を唯一のソース・オブ・トゥルースとする **schema-first** 開発を採用している。
- APIクライアントSDKを型安全かつ保守性高く実装し、レスポンスはアプリケーションに渡す前にランタイム検証を行いたい。
- 従来は手書きまたは `openapi-generator-cli` によるSDK生成を行っていたが、Zodによる検証コードは別途作成する必要があった。

### Drivers

- 型安全とランタイム安全性の両立（TypeScript型 + Zod実体検証）
- SDK・モック・検証スキーマを**単一のOpenAPIから一括生成**し、仕様変更時の追従を自動化
- エラーハンドリングを `neverthrow` に統一して呼び出し側のコード品質を向上
- TDD/E2Eテストにおいて契約準拠モック（MSW）を自動利用可能にする

## Decision

### Chosen Option

OrvalによるfetchベースSDK生成 + Zodスキーマ生成 + MSWモック生成 + neverthrowアダプタ適用

- Orvalを用いて以下を自動生成：
  - fetchベースの型付きSDK関数群
  - 各エンティティ/レスポンスのZodスキーマ
  - MSWハンドラ（契約準拠モック）
- 手書き部分は `toResult`（neverthrow正規化）と `validateWith`（Zod適用）などの薄い接着コードに集約
- SDKはドメインごとの薄い関数でラップし、常に `ResultAsync<T, ApiError>` を返す設計に統一

### Alternatives Considered

| 選択肢                                           | メリット                                       | デメリット               | 評価      |
| --------------------------------------------- | ------------------------------------------ | ------------------- | ------- |
| openapi-generator-cli（typescript-fetch/axios） | 実績豊富、生成パターン多様                              | Zod生成は別系統、二段運用になりがち | ★★      |
| **Orval（選択案）**                                | **SDK・Zod・MSWを一括生成、React Queryフックも可、設定柔軟** | **Zod適用は手動、生成量多め**  | **★★★** |
| openapi-zod-client                            | Zod生成に特化、軽量                                | SDKやMSWは別実装が必要      | ★★      |

## Consequences

### Positive

- OpenAPI更新時にSDK・Zod・MSWが自動更新され、仕様との乖離を防止
- 型安全とランタイム安全性を両立（型推論 + Zod実体検証）
- neverthrowで一貫したエラーハンドリングパターンを維持
- TDD/E2Eテストで契約準拠モックが即利用可能

### Negative

- 生成物が多くなるため差分レビューが大きくなりがち
- Zodの適用は手動実装が必要（自動バリデーションは行われない）
- Orvalのバージョン更新に伴う設定変更リスク

### Neutral

- fetch/axiosの切替は設定で容易（ただし現状はfetch採用）
- React Queryフック生成は必須ではなく任意

### Risks and Mitigation

| リスク                      | 発生確率 | 影響度 | 対策                                 |
| ------------------------ | ---- | --- | ---------------------------------- |
| Orvalの仕様変更やバグ            | 中    | 中   | バージョン固定と定期的な検証、生成物の型テスト追加          |
| Zodスキーマ生成の不一致（OpenAPI依存） | 低    | 高   | OpenAPIのスキーマ定義を厳密化、生成後のスナップショットテスト |

## Implementation Notes

### Action Items

-

### Timeline

- **決定日**: 2025-08-10
- **実装開始**: 2025-08-11
- **完了予定**: 2025-08-20

## References

- [Orval公式ドキュメント](https://orval.dev/)
- [Zod公式](https://zod.dev/)
- [neverthrow](https://github.com/supermacro/neverthrow)
- 関連ADR: なし

---

**Created**: 2025-08-10\
**Last Updated**: 2025-08-10\
**Authors**: Daiki Tanaka\
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
