# Mutant 0dcbde38 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ConditionalExpression
**Original ID**: 18
**Stable ID**: 0dcbde38
**Location**: L25:9–L25:33

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #18
@@ -21,9 +21,9 @@
     // 必須フィールドの検証（solution_idは空文字列でも有効）
     const requiredFields = ['id', 'question', 'answer_type', 'status', 'creator_id', 'created_at'];
     const missingFields = requiredFields.filter(field => !row[field] || row[field] === '');
     
-    if (missingFields.length > 0) {
+    if (false) {
       return err(
         new InternalServerError(
           "Internal server error",
           `Missing required fields: ${missingFields.join(', ')}`
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。