# Mutant 89f61e5b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5733
**Stable ID**: 89f61e5b
**Location**: L29:73–L40:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5733
@@ -25,21 +25,10 @@
           expect(data.value).toBe(true);
         }
       });
 
-      it("should accept valid boolean solution with false value", () => {
-        const falseValueData = {
-          ...validBooleanSolutionData,
-          value: false,
-        };
-        const result = BooleanSolutionSchema.safeParse(falseValueData);
-        expect(result.success).toBe(true);
+      it("should accept valid boolean solution with false value", () => {});
 
-        if (result.success) {
-          expect(result.data.value).toBe(false);
-        }
-      });
-
       it.each([
         ["id", { ...validBooleanSolutionData, id: undefined }],
         ["value", { ...validBooleanSolutionData, value: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
