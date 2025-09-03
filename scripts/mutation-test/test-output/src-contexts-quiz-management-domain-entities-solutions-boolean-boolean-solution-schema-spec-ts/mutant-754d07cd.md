# Mutant 754d07cd Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5746
**Stable ID**: 754d07cd
**Location**: L44:10–L44:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5746
@@ -40,9 +40,9 @@
       });
 
       it.each([
         ["id", { ...validBooleanSolutionData, id: undefined }],
-        ["value", { ...validBooleanSolutionData, value: undefined }],
+        ["", { ...validBooleanSolutionData, value: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = BooleanSolutionSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
