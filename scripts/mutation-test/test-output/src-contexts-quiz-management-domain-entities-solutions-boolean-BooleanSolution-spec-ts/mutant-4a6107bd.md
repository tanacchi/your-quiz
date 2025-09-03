# Mutant 4a6107bd Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5446
**Stable ID**: 4a6107bd
**Location**: L14:10–L14:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5446
@@ -10,9 +10,9 @@
   describe("Brand Types", () => {
     describe("SolutionId validation", () => {
       it.each([
         ["valid alphanumeric", "solution-1", true],
-        ["valid with numbers", "solution123", true],
+        ["", "solution123", true],
         ["valid with underscore", "solution_test", true],
         ["valid with dash", "solution-test", true],
         ["valid single char", "s", true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
