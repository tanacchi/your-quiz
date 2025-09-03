# Mutant c01584b5 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6059
**Stable ID**: c01584b5
**Location**: L308:13–L308:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6059
@@ -304,9 +304,9 @@
       invalidCases.forEach(({ data, expectedPath }) => {
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (true) {
           const hasExpectedError = result.error.issues.some((issue) =>
             expectedPath.every(
               (pathPart, index) => issue.path[index] === pathPart,
             ),
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
