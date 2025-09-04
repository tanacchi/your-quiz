# Mutant e599e4e2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: BlockStatement
**Original ID**: 14
**Stable ID**: e599e4e2
**Location**: L56:48–L64:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #14
@@ -52,18 +52,10 @@
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
           `Failed to map ${errors.length}/${rows.length} rows: ${errors.map((e) => e.message).join("; ")}`,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。