# Mutant e599e4e2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: BlockStatement
**Original ID**: 50
**Stable ID**: e599e4e2
**Location**: L70:48–L78:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #50
@@ -66,18 +66,10 @@
   static fromRows(rows: QuizRow[]): Result<QuizSummary[], AppError> {
     const results: QuizSummary[] = [];
     const errors: Error[] = [];
 
-    for (const [index, row] of rows.entries()) {
-      const mappingResult = D1QuizSummaryMapper.fromRow(row);
+    for (const [index, row] of rows.entries()) {}
 
-      if (mappingResult.isErr()) {
-        errors.push(new Error(`Row ${index}: ${mappingResult.error.message}`));
-        continue;
-      }
-      results.push(mappingResult.value);
-    }
-
     if (errors.length > 0) {
       return err(
         new InternalServerError(
           "Internal server error",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。