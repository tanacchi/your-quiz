# Mutant eae693ca Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5890
**Stable ID**: eae693ca
**Location**: L136:10–L136:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5890
@@ -132,9 +132,9 @@
         ["unicode characters", "solution-プログラミング"],
         ["emoji", "solution-🚀"],
         ["very long id", `solution-${"a".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
-        ["numbers only", "123456789"],
+        ["", "123456789"],
         ["dots and dashes", "solution.test-case.123"],
       ])("should handle id with %s", (_desc, id) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
