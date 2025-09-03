# Mutant 0fb962d7 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5745
**Stable ID**: 0fb962d7
**Location**: L44:9–L44:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5745
@@ -40,9 +40,9 @@
       });
 
       it.each([
         ["id", { ...validBooleanSolutionData, id: undefined }],
-        ["value", { ...validBooleanSolutionData, value: undefined }],
+        [],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = BooleanSolutionSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
