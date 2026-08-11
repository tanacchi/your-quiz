# Mutant e84dfed5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: StringLiteral
**Original ID**: 16
**Stable ID**: e84dfed5
**Location**: L23:88–L23:90

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #16
@@ -19,9 +19,9 @@
    */
   static fromRow(row: QuizRow): Result<QuizSummary, AppError> {
     // 必須フィールドの検証（solution_idは空文字列でも有効）
     const requiredFields = ['id', 'question', 'answer_type', 'status', 'creator_id', 'created_at'];
-    const missingFields = requiredFields.filter(field => !row[field] || row[field] === '');
+    const missingFields = requiredFields.filter(field => !row[field] || row[field] === "Stryker was here!");
     
     if (missingFields.length > 0) {
       return err(
         new InternalServerError(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。