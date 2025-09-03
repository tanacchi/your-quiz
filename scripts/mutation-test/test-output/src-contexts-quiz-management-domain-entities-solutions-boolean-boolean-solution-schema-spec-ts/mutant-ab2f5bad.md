# Mutant ab2f5bad Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5725
**Stable ID**: ab2f5bad
**Location**: L16:10–L16:64

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5725
@@ -12,9 +12,9 @@
   };
 
   describe("BooleanSolutionSchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid boolean solution with true value", () => {
+      it("", () => {
         const result = BooleanSolutionSchema.safeParse(
           validBooleanSolutionData,
         );
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
