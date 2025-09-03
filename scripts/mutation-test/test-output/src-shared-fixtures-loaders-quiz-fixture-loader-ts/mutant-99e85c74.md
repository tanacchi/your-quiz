# Mutant 99e85c74 Report

**File**: src/shared/fixtures/loaders/quiz-fixture-loader.ts
**Mutator**: ConditionalExpression
**Original ID**: 9688
**Stable ID**: 99e85c74
**Location**: L42:9–L42:23

## Diff

```diff
Index: src/shared/fixtures/loaders/quiz-fixture-loader.ts
===================================================================
--- src/shared/fixtures/loaders/quiz-fixture-loader.ts	original
+++ src/shared/fixtures/loaders/quiz-fixture-loader.ts	mutated #9688
@@ -38,9 +38,9 @@
     });
 
     // D1と同じマッパー使用
     const result = D1QuizSummaryMapper.fromRows(validatedRows);
-    if (result.isErr()) {
+    if (false) {
       throw new Error(
         `Quiz fixture validation failed: ${result.error.message}`,
       );
     }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
