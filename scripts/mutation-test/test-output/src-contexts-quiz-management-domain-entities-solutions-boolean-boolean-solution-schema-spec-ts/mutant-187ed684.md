# Mutant 187ed684 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5744
**Stable ID**: 187ed684
**Location**: L43:16–L43:62

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5744
@@ -39,9 +39,9 @@
         }
       });
 
       it.each([
-        ["id", { ...validBooleanSolutionData, id: undefined }],
+        ["id", {}],
         ["value", { ...validBooleanSolutionData, value: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = BooleanSolutionSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
