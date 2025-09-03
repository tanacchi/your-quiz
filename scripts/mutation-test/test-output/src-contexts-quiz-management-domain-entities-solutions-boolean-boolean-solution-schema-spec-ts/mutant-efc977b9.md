# Mutant efc977b9 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5724
**Stable ID**: efc977b9
**Location**: L15:39–L49:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5724
@@ -11,44 +11,10 @@
     value: true,
   };
 
   describe("BooleanSolutionSchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid boolean solution with true value", () => {
-        const result = BooleanSolutionSchema.safeParse(
-          validBooleanSolutionData,
-        );
-        expect(result.success).toBe(true);
+    describe("Required Fields", () => {});
 
-        if (result.success) {
-          const data = result.data as BooleanSolutionData;
-          expect(data.id).toBe(validBooleanSolutionData.id);
-          expect(data.value).toBe(true);
-        }
-      });
-
-      it("should accept valid boolean solution with false value", () => {
-        const falseValueData = {
-          ...validBooleanSolutionData,
-          value: false,
-        };
-        const result = BooleanSolutionSchema.safeParse(falseValueData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.value).toBe(false);
-        }
-      });
-
-      it.each([
-        ["id", { ...validBooleanSolutionData, id: undefined }],
-        ["value", { ...validBooleanSolutionData, value: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = BooleanSolutionSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
-    });
-
     describe("ID Field Validation", () => {
       it.each([
         ["valid alphanumeric", "solution-123", true],
         ["valid with underscore", "solution_test", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
