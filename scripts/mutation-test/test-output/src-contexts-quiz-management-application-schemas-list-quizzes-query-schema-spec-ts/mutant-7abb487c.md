# Mutant 7abb487c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 541
**Stable ID**: 7abb487c
**Location**: L369:10–L369:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #541
@@ -365,9 +365,9 @@
       it.each([
         ["minimum boundary - 1", 1, true],
         ["just below minimum", 0, false],
         ["maximum boundary - 100", 100, true],
-        ["just above maximum", 101, false],
+        ["", 101, false],
         ["large number", 1000, false],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
       ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
         const input = { limit };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
