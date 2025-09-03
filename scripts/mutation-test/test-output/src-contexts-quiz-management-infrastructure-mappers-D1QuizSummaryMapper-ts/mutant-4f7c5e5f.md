# Mutant 4f7c5e5f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ConditionalExpression
**Original ID**: 7469
**Stable ID**: 4f7c5e5f
**Location**: L59:11–L59:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #7469
@@ -55,9 +55,9 @@
 
     for (const [index, row] of rows.entries()) {
       const mappingResult = D1QuizSummaryMapper.fromRow(row);
 
-      if (mappingResult.isErr()) {
+      if (false) {
         errors.push(new Error(`Row ${index}: ${mappingResult.error.message}`));
         continue;
       }
       results.push(mappingResult.value);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
