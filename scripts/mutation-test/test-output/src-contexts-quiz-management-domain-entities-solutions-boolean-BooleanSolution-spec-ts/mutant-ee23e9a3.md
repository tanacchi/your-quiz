# Mutant ee23e9a3 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5438
**Stable ID**: ee23e9a3
**Location**: L11:14–L11:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5438
@@ -7,9 +7,9 @@
     value: true,
   } as const;
 
   describe("Brand Types", () => {
-    describe("SolutionId validation", () => {
+    describe("", () => {
       it.each([
         ["valid alphanumeric", "solution-1", true],
         ["valid with numbers", "solution123", true],
         ["valid with underscore", "solution_test", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
