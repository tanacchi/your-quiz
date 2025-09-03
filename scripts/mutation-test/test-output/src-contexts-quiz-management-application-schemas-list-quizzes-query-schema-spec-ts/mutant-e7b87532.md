# Mutant e7b87532 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 538
**Stable ID**: e7b87532
**Location**: L368:10–L368:34

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #538
@@ -364,9 +364,9 @@
     describe("Limit Boundary Testing", () => {
       it.each([
         ["minimum boundary - 1", 1, true],
         ["just below minimum", 0, false],
-        ["maximum boundary - 100", 100, true],
+        ["", 100, true],
         ["just above maximum", 101, false],
         ["large number", 1000, false],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
       ])("should handle limit boundary: %s", (_desc, limit, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
