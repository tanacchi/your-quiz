# Mutant 7a94d172 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5726
**Stable ID**: 7a94d172
**Location**: L16:72–L27:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5726
@@ -12,21 +12,10 @@
   };
 
   describe("BooleanSolutionSchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid boolean solution with true value", () => {
-        const result = BooleanSolutionSchema.safeParse(
-          validBooleanSolutionData,
-        );
-        expect(result.success).toBe(true);
+      it("should accept valid boolean solution with true value", () => {});
 
-        if (result.success) {
-          const data = result.data as BooleanSolutionData;
-          expect(data.id).toBe(validBooleanSolutionData.id);
-          expect(data.value).toBe(true);
-        }
-      });
-
       it("should accept valid boolean solution with false value", () => {
         const falseValueData = {
           ...validBooleanSolutionData,
           value: false,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
