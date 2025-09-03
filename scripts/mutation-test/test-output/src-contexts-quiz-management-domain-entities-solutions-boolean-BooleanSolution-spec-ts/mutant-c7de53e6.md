# Mutant c7de53e6 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5458
**Stable ID**: c7de53e6
**Location**: L17:10–L17:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5458
@@ -13,9 +13,9 @@
         ["valid alphanumeric", "solution-1", true],
         ["valid with numbers", "solution123", true],
         ["valid with underscore", "solution_test", true],
         ["valid with dash", "solution-test", true],
-        ["valid single char", "s", true],
+        ["", "s", true],
         ["empty string", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
