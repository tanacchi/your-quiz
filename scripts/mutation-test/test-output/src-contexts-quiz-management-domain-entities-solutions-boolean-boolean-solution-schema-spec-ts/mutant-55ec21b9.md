# Mutant 55ec21b9 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5872
**Stable ID**: 55ec21b9
**Location**: L130:15–L138:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5872
@@ -126,17 +126,9 @@
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("ID Special Cases", () => {
-      it.each([
-        ["special characters", "solution-!@#$%^&*()"],
-        ["unicode characters", "solution-プログラミング"],
-        ["emoji", "solution-🚀"],
-        ["very long id", `solution-${"a".repeat(100)}`],
-        ["mixed case", "Solution-MixedCase-123"],
-        ["numbers only", "123456789"],
-        ["dots and dashes", "solution.test-case.123"],
-      ])("should handle id with %s", (_desc, id) => {
+      it.each([])("should handle id with %s", (_desc, id) => {
         const data = { ...validBooleanSolutionData, id };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
