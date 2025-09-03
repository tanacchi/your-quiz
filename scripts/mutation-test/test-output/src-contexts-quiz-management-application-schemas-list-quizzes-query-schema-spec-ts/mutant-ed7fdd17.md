# Mutant ed7fdd17 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 535
**Stable ID**: ed7fdd17
**Location**: L367:10–L367:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #535
@@ -363,9 +363,9 @@
   describe("Boundary Values and Edge Cases", () => {
     describe("Limit Boundary Testing", () => {
       it.each([
         ["minimum boundary - 1", 1, true],
-        ["just below minimum", 0, false],
+        ["", 0, false],
         ["maximum boundary - 100", 100, true],
         ["just above maximum", 101, false],
         ["large number", 1000, false],
         ["Number.MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
