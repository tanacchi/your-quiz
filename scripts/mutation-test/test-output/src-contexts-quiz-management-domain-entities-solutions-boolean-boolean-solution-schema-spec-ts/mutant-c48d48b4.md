# Mutant c48d48b4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5989
**Stable ID**: c48d48b4
**Location**: L229:13–L229:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5989
@@ -225,9 +225,9 @@
       quizSolutions.forEach((solution, _index) => {
         const result = BooleanSolutionSchema.safeParse(solution);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.id).toBe(solution.id);
           expect(result.data.value).toBe(solution.value);
           expect(typeof result.data.value).toBe("boolean");
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
