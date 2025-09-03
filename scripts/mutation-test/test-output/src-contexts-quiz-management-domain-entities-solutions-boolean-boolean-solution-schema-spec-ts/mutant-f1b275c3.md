# Mutant f1b275c3 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5743
**Stable ID**: f1b275c3
**Location**: L43:10–L43:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5743
@@ -39,9 +39,9 @@
         }
       });
 
       it.each([
-        ["id", { ...validBooleanSolutionData, id: undefined }],
+        ["", { ...validBooleanSolutionData, id: undefined }],
         ["value", { ...validBooleanSolutionData, value: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = BooleanSolutionSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
