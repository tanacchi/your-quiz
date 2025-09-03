# Mutant 4c6e36fe Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5929
**Stable ID**: 4c6e36fe
**Location**: L180:63–L192:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5929
@@ -176,22 +176,10 @@
       });
     });
 
     describe("Type Safety", () => {
-      it("should ensure value is exactly boolean type", () => {
-        const result = BooleanSolutionSchema.safeParse(
-          validBooleanSolutionData,
-        );
-        expect(result.success).toBe(true);
+      it("should ensure value is exactly boolean type", () => {});
 
-        if (result.success) {
-          expect(typeof result.data.value).toBe("boolean");
-          expect(
-            result.data.value === true || result.data.value === false,
-          ).toBe(true);
-        }
-      });
-
       it("should preserve boolean type across multiple validations", () => {
         const trueData = { id: "test-true", value: true };
         const falseData = { id: "test-false", value: false };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
