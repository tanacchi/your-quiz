# Mutant 325ca114 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: LogicalOperator
**Original ID**: 12
**Stable ID**: 325ca114
**Location**: L23:58–L23:90

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #12
@@ -19,9 +19,9 @@
    */
   static fromRow(row: QuizRow): Result<QuizSummary, AppError> {
     // 必須フィールドの検証（solution_idは空文字列でも有効）
     const requiredFields = ['id', 'question', 'answer_type', 'status', 'creator_id', 'created_at'];
-    const missingFields = requiredFields.filter(field => !row[field] || row[field] === '');
+    const missingFields = requiredFields.filter(field => !row[field] && row[field] === '');
     
     if (missingFields.length > 0) {
       return err(
         new InternalServerError(
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。