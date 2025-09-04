# Mutant c5f0e443 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
**Mutator**: ConditionalExpression
**Original ID**: 20
**Stable ID**: c5f0e443
**Location**: L66:9–L66:26

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper.ts	mutated #20
@@ -62,9 +62,9 @@
       }
       results.push(mappingResult.value);
     }
 
-    if (errors.length > 0) {
+    if (false) {
       return err(
         new InternalServerError(
           `Failed to map ${errors.length}/${rows.length} rows: ${errors.map((e) => e.message).join("; ")}`,
         ),
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。