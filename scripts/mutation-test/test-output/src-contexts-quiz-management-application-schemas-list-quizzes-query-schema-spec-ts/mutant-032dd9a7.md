# Mutant 032dd9a7 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 214
**Stable ID**: 032dd9a7
**Location**: L112:10–L112:23

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #214
@@ -108,9 +108,9 @@
         ["valid alphanumeric", ["q1"], true],
         ["empty string in array", [""], false],
         ["whitespace only", ["   "], true], // whitespace-only strings have length > 0
         ["mixed valid and empty", ["quiz-1", ""], false],
-        ["empty array", [], true],
+        ["", [], true],
         ["non-array value", "quiz-123", false],
         ["null value", null, false],
         ["undefined value", undefined, true],
       ])("should validate quizId: %s -> %s", (_desc, quizId, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
