# Mutant 541fe6dd Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5749
**Stable ID**: 541fe6dd
**Location**: L45:79–L48:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5749
@@ -41,12 +41,9 @@
 
       it.each([
         ["id", { ...validBooleanSolutionData, id: undefined }],
         ["value", { ...validBooleanSolutionData, value: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = BooleanSolutionSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
+      ])("should reject missing required field: %s", (_field, invalidData) => {});
     });
 
     describe("ID Field Validation", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
