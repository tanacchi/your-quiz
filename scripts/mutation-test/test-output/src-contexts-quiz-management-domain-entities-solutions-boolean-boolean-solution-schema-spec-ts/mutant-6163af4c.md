# Mutant 6163af4c Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5858
**Stable ID**: 6163af4c
**Location**: L106:56–L113:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5858
@@ -102,16 +102,9 @@
       });
     });
 
     describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validBooleanSolutionData,
-          extraField: "not allowed",
-        };
-        const result = BooleanSolutionSchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
+      it("should reject data with extra fields", () => {});
 
       it("should reject data with nested extra fields", () => {
         const dataWithNestedExtra = {
           ...validBooleanSolutionData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
