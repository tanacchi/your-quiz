# Mutant 0571bcb9 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5859
**Stable ID**: 0571bcb9
**Location**: L107:36–L110:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5859
@@ -103,12 +103,9 @@
     });
 
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validBooleanSolutionData,
-          extraField: "not allowed",
-        };
+        const dataWithExtraField = {};
         const result = BooleanSolutionSchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
