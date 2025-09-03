# Mutant ced2ea6d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5895
**Stable ID**: ced2ea6d
**Location**: L138:10–L138:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5895
@@ -134,9 +134,9 @@
         ["very long id", `solution-${"a".repeat(100)}`],
         ["mixed case", "Solution-MixedCase-123"],
         ["numbers only", "123456789"],
         ["dots and dashes", "solution.test-case.123"],
-      ])("should handle id with %s", (_desc, id) => {
+      ])("", (_desc, id) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
