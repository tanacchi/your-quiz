# ADR-0021: Quiz Solution API Response Strategy

## Status

Proposed

## Context

クイズAPIにおいて、Solution（正解情報）をどのようにレスポンスに含めるかが重要な設計判断となっている。現在、TypeSpecでは既に多態的な`Solution` Union型が定義されているが、API Catalogとの間に不整合が存在する。

### Background

- **現在のTypeSpec設計**: `AnswerType` enum（boolean, free_text, single_choice, multiple_choice）と対応する`Solution` Union型が定義済み
- **API Catalog状況**: 単純な`correctAnswer: boolean`として記載されており、拡張可能性を考慮していない
- **技術スタック**: TypeScript SDK付きAPI、OpenAPI 3.1対応、2025年のベストプラクティス準拠が必要

### Drivers

- **型安全性**: TypeScript SDKでの強い型付けによる開発効率向上
- **拡張性**: 新しい回答タイプ（single_choice, multiple_choice等）への対応
- **パフォーマンス**: ネットワーク効率とキャッシュ最適化
- **開発効率**: SDK生成とクライアント実装の容易さ
- **API一貫性**: 他のAPIとの設計整合性

## Decision

### Chosen Option

#### 段階的統合アプローチ（Union型 + オプショナルField Selection）

Phase 1では**Discriminated Union型**を採用し、Phase 2で**Field Selection**機能を追加する戦略を選択する。

#### Phase 1: Union型による型安全性確保

```typescript
interface QuizDetailResponse {
  id: string;
  question: string;
  answerType: "boolean" | "free_text" | "single_choice" | "multiple_choice";
  solution: BooleanSolution | FreeTextSolution | SingleChoiceSolution | MultipleChoiceSolution;
  explanation?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: QuizStatus;
  createdAt: string;
  statistics: QuizStatistics;
}

// Discriminated Union型定義
type Solution =
  | { type: "boolean"; value: boolean }
  | { type: "free_text"; correctAnswer: string; matchingStrategy: "exact" | "partial" | "regex"; caseSensitive: boolean }
  | { type: "single_choice"; correctChoiceId: string; choices: Choice[] }
  | { type: "multiple_choice"; correctChoiceIds: string[]; choices: Choice[]; minCorrectAnswers: number };
```

#### Phase 2: オプショナルField Selection

```http
GET /api/quiz/v1/manage/quizzes/:id                    # 基本情報のみ
GET /api/quiz/v1/manage/quizzes/:id?include=solution   # Solution情報を含む
GET /api/quiz/v1/manage/quizzes/:id?fields=id,question,solution.value  # 特定フィールドのみ
```

### Alternatives Considered

| 選択肢 | 型安全性 | 開発効率 | 拡張性 | パフォーマンス | 評価 |
|--------|----------|----------|--------|----------------|------|
| **Union型 + Field Selection** | **★★★★★** | **★★★★☆** | **★★★★★** | **★★★★☆** | **★★★★★** |
| 別API分離 | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| Nullable Fields | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ |
| 動的スキーマ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★★★ | ★★★★☆ | ★★☆☆☆ |

#### 詳細比較分析

##### 1. Union型アプローチ（採用案）

- ✅ TypeScript Discriminated Unionによる完全な型安全性
- ✅ OpenAPI 3.1 discriminatorサポート
- ✅ 既存TypeSpec設計との完全整合
- ⚠️ クライアント側で型ガード実装が必要

##### 2. 別API分離アプローチ

- ✅ シンプルな型構造
- ✅ 完全な下位互換性
- ❌ 2回のAPIコール必要（N+1問題）
- ❌ 管理コンテキストでの統合性低下

##### 3. Nullable Fields アプローチ

- ❌ どのフィールドが有効か不明確
- ❌ 型チェックの複雑化
- ❌ 新answerType追加時のスキーマ汚染

##### 4. 動的スキーマアプローチ

- ❌ 型安全性の完全な喪失
- ❌ IDE支援の無効化
- ✅ 最大限の柔軟性

## Consequences

### Positive

- **完全な型安全性**: TypeScript SDKでコンパイル時エラー検出
- **拡張性確保**: 新answerTypeの追加が容易（Union型に追加のみ）
- **IDE支援最大化**: IntelliSenseとリファクタリング支援
- **パフォーマンス最適化**: Field Selectionによる必要なデータのみ転送
- **キャッシュ効率**: include/fieldsパラメータ別のキャッシュ戦略
- **2025年トレンド準拠**: OpenAPI 3.1、tRPC、GraphQLライクな体験

### Negative

- **実装複雑性**: クライアント側での型ガード実装
- **SDK生成複雑化**: Discriminated Union型の適切な生成ロジック
- **既存APIとの一時的不整合**: 段階的移行期間中の複雑性
- **学習コスト**: 開発者のUnion型理解が必要

### Neutral

- **TypeSpec整合性**: 既存設計に準拠するため、新たな学習コストは最小限
- **OpenAPI生成**: discriminatorを活用した明確なスキーマ定義
- **GraphQL対応**: 将来的なGraphQL移行時の互換性

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| クライアント実装の複雑化 | 中 | 中 | 型ガード関数の提供、SDKサンプルコード充実 |
| 既存API利用者への影響 | 高 | 低 | 段階的移行、下位互換性維持期間設定 |
| パフォーマンス劣化 | 低 | 中 | Field Selection実装、キャッシュ戦略最適化 |
| 新answerType追加時の影響 | 低 | 中 | 自動テスト充実、型安全性チェック |

## Implementation Notes

### Action Items

#### Phase 1: Union型実装（2週間）

- [ ] API Catalog 01-quiz-management.mdの修正
  - `QuizDetailResponse`にUnion型`solution`フィールドを追加
  - 各Solution型の詳細仕様を記載
- [ ] TypeSpec operationsの確認・修正
  - `QuizResponse`モデルの利用確認
  - API endpointでの適切なレスポンス型指定
- [ ] TypeScript SDK生成ロジックの確認
  - Discriminated Unionの適切な生成
  - 型ガード関数の自動生成

#### Phase 2: Field Selection実装（1週間）

- [ ] クエリパラメータ仕様の追加
  - `include=solution`パラメータの実装
  - `fields=field1,field2.subfield`構文の実装
- [ ] キャッシュ戦略の最適化
  - パラメータ別キャッシュキーの設計
  - CDNレベルでのキャッシュ効率化

### TypeScript SDK Implementation Example

```typescript
// 型ガード関数（SDK自動生成）
export function isBooleanSolution(solution: Solution): solution is BooleanSolution {
  return solution.type === "boolean";
}

export function isFreeTextSolution(solution: Solution): solution is FreeTextSolution {
  return solution.type === "free_text";
}

// クライアント利用例
const quiz = await api.getQuiz("quiz-123");
if (isBooleanSolution(quiz.solution)) {
  console.log("Boolean answer:", quiz.solution.value);
} else if (isFreeTextSolution(quiz.solution)) {
  console.log("Text answer:", quiz.solution.correctAnswer);
  console.log("Matching strategy:", quiz.solution.matchingStrategy);
}
```

### API Response Examples

```typescript
// Boolean Quiz
{
  "id": "quiz-123",
  "question": "TypeScriptは静的型付け言語である",
  "answerType": "boolean",
  "solution": {
    "type": "boolean",
    "value": true
  }
}

// Free Text Quiz
{
  "id": "quiz-456",
  "question": "JavaScriptでHTTPリクエストを送信するAPIは？",
  "answerType": "free_text",
  "solution": {
    "type": "free_text",
    "correctAnswer": "fetch",
    "matchingStrategy": "partial",
    "caseSensitive": false
  }
}

// Single Choice Quiz
{
  "id": "quiz-789",
  "question": "次のうち、JavaScriptのプリミティブ型はどれ？",
  "answerType": "single_choice",
  "solution": {
    "type": "single_choice",
    "correctChoiceId": "choice-2",
    "choices": [
      {"id": "choice-1", "text": "Object", "orderIndex": 0},
      {"id": "choice-2", "text": "string", "orderIndex": 1},
      {"id": "choice-3", "text": "Array", "orderIndex": 2}
    ]
  }
}
```

### Timeline

- **決定日**: 2025-08-04
- **Phase 1 実装開始**: 2025-08-05
- **Phase 1 完了予定**: 2025-08-19
- **Phase 2 実装開始**: 2025-08-20
- **Phase 2 完了予定**: 2025-08-27

## References

- [TypeSpec Solution Models](../../api/spec/models/quiz.tsp)
- [API Design Principles](../api-design/design-principles.md)
- [OpenAPI 3.1 Discriminator Specification](https://spec.openapis.org/oas/v3.1.0#discriminator-object)
- [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [GraphQL Field Selection](https://graphql.org/learn/queries/#fields)
- [ADR-0015: API Query Language](0015-api-query-language.md)

---

**Created**: 2025-08-04
**Last Updated**: 2025-08-04
**Authors**: Claude Code Assistant
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
