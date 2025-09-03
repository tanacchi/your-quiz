# Mutant 132afe59 Report

**File**: src/shared/fixtures/loaders/quiz-fixture-loader.ts
**Mutator**: ConditionalExpression
**Original ID**: 108
**Stable ID**: 132afe59
**Location**: L22:7–L22:25

## Diff

```diff
Index: src/shared/fixtures/loaders/quiz-fixture-loader.ts
===================================================================
--- src/shared/fixtures/loaders/quiz-fixture-loader.ts	original
+++ src/shared/fixtures/loaders/quiz-fixture-loader.ts	mutated #108
@@ -18,9 +18,9 @@
  * 基本的なクイズフィクスチャーを読み込み
  * MockQuizRepository用のデータ
  */
 export function loadQuizFixtures(): QuizSummary[] {
-  if (quizCache !== null) {
+  if (false) {
     return quizCache;
   }
 
   try {
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。