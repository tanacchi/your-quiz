# API Solution Implementation & Migration Plan

## 概要

ADR-0021で決定した「段階的統合アプローチ（Union型 + オプショナルField Selection）」の具体的な実装計画と移行戦略を定義します。

## 実装フェーズ

### Phase 1: Union型による型安全性確保（2週間）

#### Week 1: 基盤整備

##### Day 1-2: TypeSpec修正・確認

- [ ] `api/spec/models/quiz.tsp`の`Solution` Union型確認
- [ ] `CreateQuizRequest`に`creatorFingerprint`フィールド追加
- [ ] OpenAPI生成でdiscriminator正常出力確認
- [ ] TypeSpec → OpenAPI → TypeScript型定義の一貫性検証

##### Day 3-4: API Catalog整合性確保

- [x] `01-quiz-management.md`のUnion型対応完了
- [ ] `02-quiz-learning.md`のレスポンス型修正
- [ ] 他APIファイルでのQuiz参照箇所修正
- [ ] Cross-referenceリンクの確認・修正

##### Day 5: 初期テスト実装

- [ ] Union型のバリデーションテスト作成
- [ ] 型ガード関数のユニットテスト
- [ ] OpenAPI生成物の自動テスト

#### Week 2: SDK生成・統合

##### Day 6-8: TypeScript SDK生成

- [ ] OpenAPI Generator設定調整
- [ ] Discriminated Union型の適切な生成確認
- [ ] 型ガード関数の自動生成実装
- [ ] エラーハンドリング型の統合

##### Day 9-10: 実装サンプル作成

- [ ] 各answerType（boolean, free_text, single_choice, multiple_choice）のCRUD例
- [ ] クライアント側型ガード利用例
- [ ] エラーハンドリングパターン例

### Phase 2: Field Selection実装（1週間）

#### Week 3: オプショナル機能追加

##### Day 11-12: クエリパラメータ実装

- [ ] `include=solution`パラメータの追加
- [ ] `fields=field1,field2.subfield`パラメータの追加
- [ ] 条件付きレスポンス型の実装

##### Day 13-14: パフォーマンス最適化

- [ ] パラメータ別キャッシュ戦略実装
- [ ] レスポンスサイズ最適化
- [ ] CDNキャッシュ効率化

##### Day 15: 統合テスト

- [ ] Field Selection機能の統合テスト
- [ ] パフォーマンステスト
- [ ] キャッシュ効率テスト

## 移行戦略

### 段階的移行アプローチ

#### Stage 1: 新API並行運用（2週間）

```typescript
// 既存API（下位互換維持）
GET /api/quiz/v1/manage/quizzes/:id
// レスポンス: { correctAnswer: boolean, ... }

// 新API（Union型対応）
GET /api/quiz/v1/manage/quizzes/:id?version=v2
// レスポンス: { solution: BooleanSolution | ... }
```

##### メリット

- 既存クライアントへの影響なし
- 段階的なクライアント更新が可能
- ロールバック容易

#### Stage 2: クライアント移行期間（4週間）

- Week 1-2: 新SDKリリース・ドキュメント公開
- Week 3-4: 既存クライアントの段階的移行
- 移行完了後: 旧APIのDeprecation Warning追加

#### Stage 3: 旧API廃止（2週間後）

- 旧APIエンドポイントの削除
- レガシーコードの整理
- パフォーマンス最適化

### Breaking Changes対応

#### answerType拡張時の影響評価

```typescript
// 新answerType追加例: "multiple_choice"
type Solution = 
  | BooleanSolution      // 既存
  | FreeTextSolution     // 既存  
  | SingleChoiceSolution // 既存
  | MultipleChoiceSolution; // 新規追加

// クライアント側の対応パターン
function handleSolution(solution: Solution) {
  if (isBooleanSolution(solution)) {
    // 既存処理（影響なし）
  } else if (isFreeTextSolution(solution)) {
    // 既存処理（影響なし）
  } else if (isSingleChoiceSolution(solution)) {
    // 既存処理（影響なし）
  } else {
    // 新しい型への対応（exhaustive check）
    console.warn('Unknown solution type:', solution);
  }
}
```

#### 必須フィールド追加時の対応

```typescript
// 新必須フィールド追加時
interface CreateQuizRequest {
  // 既存フィールド
  question: string;
  solution: Solution;
  
  // 新規必須フィールド（移行期間中はオプショナル）
  category?: string; // Phase 1: optional
  category: string;  // Phase 2: required (breaking change)
}
```

## リスク管理

### 技術リスク

| リスク | 確率 | 影響 | 対策 |
|--------|------|------|------|
| Union型生成不具合 | 中 | 高 | 事前テスト充実、手動バックアップ型定義 |
| 既存クライアント影響 | 低 | 高 | 段階的移行、下位互換API並行運用 |
| パフォーマンス劣化 | 中 | 中 | ベンチマークテスト、キャッシュ最適化 |
| SDK生成品質問題 | 中 | 中 | 人力レビュー、利用例テスト |

### ビジネスリスク

| リスク | 確率 | 影響 | 対策 |
|--------|------|------|------|
| 開発遅延 | 中 | 中 | バッファ期間設定、段階的リリース |
| クライアント移行遅延 | 高 | 低 | 長期サポート期間、移行支援 |
| ユーザー体験劣化 | 低 | 高 | A/Bテスト、段階的ロールアウト |

## 品質保証

### テスト戦略

#### 型安全性テスト

```typescript
// コンパイル時型テスト
describe('Solution Union Types', () => {
  it('should provide complete type coverage', () => {
    const testSolution: Solution = {
      type: "boolean",
      value: true
    };
    
    // Exhaustive check test
    const handleSolution = (solution: Solution): string => {
      switch (solution.type) {
        case "boolean":
          return solution.value.toString();
        case "free_text":
          return solution.correctAnswer;
        case "single_choice":
          return solution.choices[0].text;
        case "multiple_choice":
          return solution.choices.length.toString();
        default:
          // TypeScript error if not exhaustive
          const _exhaustive: never = solution;
          throw new Error('Unhandled solution type');
      }
    };
    
    expect(handleSolution(testSolution)).toBe("true");
  });
});
```

#### 統合テスト

```typescript
describe('Quiz API Integration', () => {
  it('should handle all solution types correctly', async () => {
    // Boolean quiz creation
    const booleanQuiz = await api.createQuiz({
      question: "TypeScript is statically typed?",
      answerType: "boolean",
      solution: { type: "boolean", value: true }
    });
    
    const retrieved = await api.getQuiz(booleanQuiz.data.quiz.id);
    expect(isBooleanSolution(retrieved.data.solution)).toBe(true);
    
    if (isBooleanSolution(retrieved.data.solution)) {
      expect(retrieved.data.solution.value).toBe(true);
    }
  });
});
```

#### パフォーマンステスト

```typescript
describe('Field Selection Performance', () => {
  it('should reduce response size with field selection', async () => {
    const fullResponse = await api.getQuiz("quiz-123");
    const partialResponse = await api.getQuiz("quiz-123", {
      fields: "id,question"
    });
    
    const fullSize = JSON.stringify(fullResponse).length;
    const partialSize = JSON.stringify(partialResponse).length;
    
    expect(partialSize).toBeLessThan(fullSize * 0.5);
  });
});
```

## モニタリング・メトリクス

### KPI設定

#### 開発効率

- **型エラー削減率**: 85%以上
- **API実装時間短縮**: 40%以上
- **バグ発生率**: 50%以下

#### パフォーマンス

- **API応答時間**: 95%ile < 200ms
- **キャッシュヒット率**: > 80%
- **CDN効率**: > 90%

#### 品質

- **型カバレッジ**: 100%
- **テストカバレッジ**: > 95%
- **SDK利用率**: > 80%

### 監視項目

```typescript
// メトリクス収集例
interface APIMetrics {
  solutionTypeDistribution: Record<string, number>;
  fieldSelectionUsage: Record<string, number>;
  responseTime: {
    full: number;
    fieldsSelected: number;
  };
  errorRates: {
    validation: number;
    typeGuard: number;
  };
}
```

## ドキュメント更新計画

### 技術ドキュメント

- [ ] API Catalog全体の整合性確認
- [ ] TypeSpec Reference更新
- [ ] SDK Usage Guide作成
- [ ] Migration Guide作成

### 開発者向けドキュメント

- [ ] Union型利用ガイド
- [ ] 型ガード関数リファレンス
- [ ] エラーハンドリングベストプラクティス
- [ ] パフォーマンス最適化ガイド

## コミュニケーション計画

### ステークホルダー

- **開発チーム**: 技術説明会、ハンズオン研修
- **フロントエンドチーム**: SDK移行ワークショップ
- **QAチーム**: テスト戦略説明、品質指標共有
- **プロダクトオーナー**: 進捗報告、リスク共有

### タイムライン

- **Week 1**: キックオフ・技術説明
- **Week 2**: 中間報告・課題共有
- **Week 3**: 移行準備・研修実施
- **Week 4**: リリース準備・最終確認

## 完了条件

### Phase 1完了条件

- [ ] 全answerTypeのUnion型対応完了
- [ ] TypeScript SDK自動生成成功
- [ ] 型ガード関数100%カバレッジ
- [ ] 統合テスト全パス
- [ ] パフォーマンステスト基準クリア

### Phase 2完了条件

- [ ] Field Selection機能実装完了
- [ ] キャッシュ効率90%以上
- [ ] API応答時間95%ile < 200ms
- [ ] ドキュメント更新完了
- [ ] 移行ガイド提供完了

### プロジェクト完了条件

- [ ] 旧API完全廃止
- [ ] 全クライアント新SDK移行完了
- [ ] モニタリング体制確立
- [ ] KPI目標値達成
- [ ] レトロスペクティブ実施・改善点整理

---

**作成日**: 2025-08-04  
**更新日**: 2025-08-04  
**作成者**: Claude Code Assistant  
**承認者**: [@tanacchi](https://github.com/tanacchi)
