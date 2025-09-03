# Mutant 59c4346b Report

**File**: src/shared/fixtures/loaders/quiz-fixture-loader.ts
**Mutator**: ConditionalExpression
**Original ID**: 115
**Stable ID**: 59c4346b
**Location**: L32:11–L32:26

## Diff

```diff
Index: src/shared/fixtures/loaders/quiz-fixture-loader.ts
===================================================================
--- src/shared/fixtures/loaders/quiz-fixture-loader.ts	original
+++ src/shared/fixtures/loaders/quiz-fixture-loader.ts	mutated #115
@@ -28,9 +28,9 @@
     const jsonData = quizRowsData;
 
     // D1と同じ型検証フロー
     const validatedRows = jsonData.map((row: unknown, index: number) => {
-      if (!isQuizRow(row)) {
+      if (false) {
         throw new Error(
           `Invalid quiz fixture at index ${index}: ${JSON.stringify(row)}`,
         );
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。