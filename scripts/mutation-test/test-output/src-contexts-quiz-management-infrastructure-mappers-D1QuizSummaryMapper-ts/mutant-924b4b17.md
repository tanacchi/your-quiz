# Mutant 924b4b17 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7465
**Stable ID**: 924b4b17
**Location**: L53:36–L53:38

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #7465
@@ -49,9 +49,9 @@
    * @param rows - D1データベースから取得したクイズ行データの配列
    * @returns QuizSummaryエンティティ配列、またはマッピングエラー
    */
   static fromRows(rows: QuizRow[]): Result<QuizSummary[], AppError> {
-    const results: QuizSummary[] = [];
+    const results: QuizSummary[] = ["Stryker was here"];
     const errors: Error[] = [];
 
     for (const [index, row] of rows.entries()) {
       const mappingResult = D1QuizSummaryMapper.fromRow(row);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
