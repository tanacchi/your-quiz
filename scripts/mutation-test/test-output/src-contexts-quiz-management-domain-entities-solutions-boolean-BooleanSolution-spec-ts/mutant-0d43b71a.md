# Mutant 0d43b71a Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5462
**Stable ID**: 0d43b71a
**Location**: L18:10–L18:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5462
@@ -14,9 +14,9 @@
         ["valid with numbers", "solution123", true],
         ["valid with underscore", "solution_test", true],
         ["valid with dash", "solution-test", true],
         ["valid single char", "s", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = SolutionId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
