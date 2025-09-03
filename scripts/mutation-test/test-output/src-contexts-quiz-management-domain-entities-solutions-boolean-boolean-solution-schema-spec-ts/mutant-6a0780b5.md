# Mutant 6a0780b5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5860
**Stable ID**: 6a0780b5
**Location**: L109:23–L109:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5860
@@ -105,9 +105,9 @@
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validBooleanSolutionData,
-          extraField: "not allowed",
+          extraField: "",
         };
         const result = BooleanSolutionSchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
