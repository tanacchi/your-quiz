# Mutant 85e363f0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 532
**Stable ID**: 85e363f0
**Location**: L366:10–L366:32

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #532
@@ -362,9 +362,9 @@
 
   describe("Boundary Values and Edge Cases", () => {
     describe("Limit Boundary Testing", () => {
       it.each([
-        ["minimum boundary - 1", 1, true],
+        ["", 1, true],
         ["just below minimum", 0, false],
         ["maximum boundary - 100", 100, true],
         ["just above maximum", 101, false],
         ["large number", 1000, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
