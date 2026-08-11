# Mutant b2eaa848 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ArrowFunction
**Original ID**: 9
**Stable ID**: b2eaa848
**Location**: L23:49–L23:90

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #9
@@ -19,9 +19,9 @@
    */
   static fromRow(row: QuizRow): Result<QuizSummary, AppError> {
     // 必須フィールドの検証（solution_idは空文字列でも有効）
     const requiredFields = ['id', 'question', 'answer_type', 'status', 'creator_id', 'created_at'];
-    const missingFields = requiredFields.filter(field => !row[field] || row[field] === '');
+    const missingFields = requiredFields.filter(() => undefined);
     
     if (missingFields.length > 0) {
       return err(
         new InternalServerError(
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。