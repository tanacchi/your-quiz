# Mutant 529cca15 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 6058
**Stable ID**: 529cca15
**Location**: L308:13–L308:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6058
@@ -304,9 +304,9 @@
       invalidCases.forEach(({ data, expectedPath }) => {
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (result.success) {
           const hasExpectedError = result.error.issues.some((issue) =>
             expectedPath.every(
               (pathPart, index) => issue.path[index] === pathPart,
             ),
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
