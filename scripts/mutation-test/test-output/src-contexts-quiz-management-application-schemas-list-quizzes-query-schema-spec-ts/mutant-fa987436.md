# Mutant fa987436 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 219
**Stable ID**: fa987436
**Location**: L113:29–L113:39

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #219
@@ -109,9 +109,9 @@
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
         ["mixed valid and empty", ["quiz-1", ""], false],
         ["empty array", [], true],
-        ["non-array value", "quiz-123", false],
+        ["non-array value", "", false],
         ["null value", null, false],
         ["undefined value", undefined, true],
       ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
         const input = quizId === undefined ? {} : { quizId };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
