# Mutant 29f1ebd4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5436
**Stable ID**: 29f1ebd4
**Location**: L10:12–L10:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5436
@@ -6,9 +6,9 @@
     id: SolutionId.parse("solution-1"),
     value: true,
   } as const;
 
-  describe("Brand Types", () => {
+  describe("", () => {
     describe("SolutionId validation", () => {
       it.each([
         ["valid alphanumeric", "solution-1", true],
         ["valid with numbers", "solution123", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
