# Mutant c32e5cc6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 528
**Stable ID**: c32e5cc6
**Location**: L364:14–L364:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #528
@@ -360,9 +360,9 @@
     });
   });
 
   describe("Boundary Values and Edge Cases", () => {
-    describe("Limit Boundary Testing", () => {
+    describe("", () => {
       it.each([
         ["minimum boundary - 1", 1, true],
         ["just below minimum", 0, false],
         ["maximum boundary - 100", 100, true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
