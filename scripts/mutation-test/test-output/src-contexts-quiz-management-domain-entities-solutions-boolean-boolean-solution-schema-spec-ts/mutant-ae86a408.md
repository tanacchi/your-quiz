# Mutant ae86a408 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6056
**Stable ID**: ae86a408
**Location**: L304:56–L316:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6056
@@ -300,21 +300,9 @@
         { data: { value: true }, expectedPath: ["id"] },
         { data: {}, expectedPath: ["id"] },
       ];
 
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
+      invalidCases.forEach(({ data, expectedPath }) => {});
     });
 
     it("should handle completely invalid input types", () => {
       const invalidInputs = [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
