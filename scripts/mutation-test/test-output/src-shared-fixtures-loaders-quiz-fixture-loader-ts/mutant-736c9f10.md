# Mutant 736c9f10 Report

**File**: src/shared/fixtures/loaders/quiz-fixture-loader.ts
**Mutator**: BlockStatement
**Original ID**: 9679
**Stable ID**: 736c9f10
**Location**: L22:27–L24:4

## Diff

```diff
Index: src/shared/fixtures/loaders/quiz-fixture-loader.ts
===================================================================
--- src/shared/fixtures/loaders/quiz-fixture-loader.ts	original
+++ src/shared/fixtures/loaders/quiz-fixture-loader.ts	mutated #9679
@@ -18,11 +18,9 @@
  * 基本的なクイズフィクスチャーを読み込み
  * MockQuizRepository用のデータ
  */
 export function loadQuizFixtures(): QuizSummary[] {
-  if (quizCache !== null) {
-    return quizCache;
-  }
+  if (quizCache !== null) {}
 
   try {
     // 静的インポートに変更（Node.js依存排除）
     const jsonData = quizRowsData;
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
