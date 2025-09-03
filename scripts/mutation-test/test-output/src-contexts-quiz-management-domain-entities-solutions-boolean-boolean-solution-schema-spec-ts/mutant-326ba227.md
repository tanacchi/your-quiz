# Mutant 326ba227 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5887
**Stable ID**: 326ba227
**Location**: L135:10–L135:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5887
@@ -131,9 +131,9 @@
         ["special characters", "solution-!@#$%^&*()"],
         ["unicode characters", "solution-プログラミング"],
         ["emoji", "solution-🚀"],
         ["very long id", `solution-${"a".repeat(100)}`],
-        ["mixed case", "Solution-MixedCase-123"],
+        ["", "Solution-MixedCase-123"],
         ["numbers only", "123456789"],
         ["dots and dashes", "solution.test-case.123"],
       ])("should handle id with %s", (_desc, id) => {
         const data = { ...validBooleanSolutionData, id };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
