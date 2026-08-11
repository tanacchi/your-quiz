# Mutant ee4a9ae7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ConditionalExpression
**Original ID**: 56
**Stable ID**: ee4a9ae7
**Location**: L80:9–L80:26

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #56
@@ -76,9 +76,9 @@
       }
       results.push(mappingResult.value);
     }
 
-    if (errors.length > 0) {
+    if (false) {
       return err(
         new InternalServerError(
           "Internal server error",
           `Failed to map ${errors.length}/${rows.length} rows: ${errors.map((e) => e.message).join("; ")}`,
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。