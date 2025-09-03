# Mutant 7e9ef961 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5893
**Stable ID**: 7e9ef961
**Location**: L137:10–L137:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5893
@@ -133,9 +133,9 @@
         ["emoji", "solution-🚀"],
         ["very long id", `solution-${"a".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
         ["numbers only", "123456789"],
-        ["dots and dashes", "solution.test-case.123"],
+        ["", "solution.test-case.123"],
       ])("should handle id with %s", (_desc, id) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
