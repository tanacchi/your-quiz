# Mutant f8e47e05 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5747
**Stable ID**: f8e47e05
**Location**: L44:19–L44:68

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5747
@@ -40,9 +40,9 @@
       });
 
       it.each([
         ["id", { ...validBooleanSolutionData, id: undefined }],
-        ["value", { ...validBooleanSolutionData, value: undefined }],
+        ["value", {}],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = BooleanSolutionSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
