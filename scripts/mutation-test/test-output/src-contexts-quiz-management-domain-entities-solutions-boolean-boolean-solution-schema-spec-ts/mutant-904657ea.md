# Mutant 904657ea Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 6061
**Stable ID**: 904657ea
**Location**: L308:30–L315:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6061
@@ -304,16 +304,9 @@
       invalidCases.forEach(({ data, expectedPath }) => {
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
-          const hasExpectedError = result.error.issues.some((issue) =>
-            expectedPath.every(
-              (pathPart, index) => issue.path[index] === pathPart,
-            ),
-          );
-          expect(hasExpectedError).toBe(true);
-        }
+        if (!result.success) {}
       });
     });
 
     it("should handle completely invalid input types", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
