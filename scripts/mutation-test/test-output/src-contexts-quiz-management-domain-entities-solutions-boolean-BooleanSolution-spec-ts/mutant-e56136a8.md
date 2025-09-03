# Mutant e56136a8 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5450
**Stable ID**: e56136a8
**Location**: L15:10–L15:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5450
@@ -11,9 +11,9 @@
     describe("SolutionId validation", () => {
       it.each([
         ["valid alphanumeric", "solution-1", true],
         ["valid with numbers", "solution123", true],
-        ["valid with underscore", "solution_test", true],
+        ["", "solution_test", true],
         ["valid with dash", "solution-test", true],
         ["valid single char", "s", true],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
