# Mutant 009a3fca Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5866
**Stable ID**: 009a3fca
**Location**: L119:20–L119:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5866
@@ -115,9 +115,9 @@
       it("should reject data with nested extra fields", () => {
         const dataWithNestedExtra = {
           ...validBooleanSolutionData,
           metadata: {
-            extra: "field",
+            extra: "",
           },
         };
         const result = BooleanSolutionSchema.safeParse(dataWithNestedExtra);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
