# Mutant c0fa0232 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5862
**Stable ID**: c0fa0232
**Location**: L115:10–L115:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5862
@@ -111,9 +111,9 @@
         const result = BooleanSolutionSchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
 
-      it("should reject data with nested extra fields", () => {
+      it("", () => {
         const dataWithNestedExtra = {
           ...validBooleanSolutionData,
           metadata: {
             extra: "field",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
