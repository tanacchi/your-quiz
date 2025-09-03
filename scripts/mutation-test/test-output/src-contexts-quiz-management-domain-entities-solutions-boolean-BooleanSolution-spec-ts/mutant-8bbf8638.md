# Mutant 8bbf8638 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5442
**Stable ID**: 8bbf8638
**Location**: L13:10–L13:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5442
@@ -9,9 +9,9 @@
 
   describe("Brand Types", () => {
     describe("SolutionId validation", () => {
       it.each([
-        ["valid alphanumeric", "solution-1", true],
+        ["", "solution-1", true],
         ["valid with numbers", "solution123", true],
         ["valid with underscore", "solution_test", true],
         ["valid with dash", "solution-test", true],
         ["valid single char", "s", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
