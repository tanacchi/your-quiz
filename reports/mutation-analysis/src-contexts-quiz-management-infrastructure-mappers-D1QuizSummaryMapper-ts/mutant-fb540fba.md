# Mutant fb540fba Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrayDeclaration
**Original ID**: 1
**Stable ID**: fb540fba
**Location**: L22:28–L22:99

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #1
@@ -18,9 +18,9 @@
    * @returns QuizSummaryエンティティ、またはマッピングエラー
    */
   static fromRow(row: QuizRow): Result<QuizSummary, AppError> {
     // 必須フィールドの検証（solution_idは空文字列でも有効）
-    const requiredFields = ['id', 'question', 'answer_type', 'status', 'creator_id', 'created_at'];
+    const requiredFields = [];
     const missingFields = requiredFields.filter(field => !row[field] || row[field] === '');
     
     if (missingFields.length > 0) {
       return err(
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。