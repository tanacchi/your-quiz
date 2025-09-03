# Mutant d2fb7ca5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6029
**Stable ID**: d2fb7ca5
**Location**: L295:70–L317:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6029
@@ -291,32 +291,10 @@
     });
   });
 
   describe("Error Handling", () => {
-    it("should provide clear error messages for invalid data", () => {
-      const invalidCases = [
-        { data: { id: "", value: true }, expectedPath: ["id"] },
-        { data: { id: "valid", value: "true" }, expectedPath: ["value"] },
-        { data: { id: "valid" }, expectedPath: ["value"] },
-        { data: { value: true }, expectedPath: ["id"] },
-        { data: {}, expectedPath: ["id"] },
-      ];
+    it("should provide clear error messages for invalid data", () => {});
 
-      invalidCases.forEach(({ data, expectedPath }) => {
-        const result = BooleanSolutionSchema.safeParse(data);
-        expect(result.success).toBe(false);
-
-        if (!result.success) {
-          const hasExpectedError = result.error.issues.some((issue) =>
-            expectedPath.every(
-              (pathPart, index) => issue.path[index] === pathPart,
-            ),
-          );
-          expect(hasExpectedError).toBe(true);
-        }
-      });
-    });
-
     it("should handle completely invalid input types", () => {
       const invalidInputs = [
         null,
         undefined,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
