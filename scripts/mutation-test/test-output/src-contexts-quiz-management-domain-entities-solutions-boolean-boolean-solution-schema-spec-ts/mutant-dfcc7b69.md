# Mutant dfcc7b69 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5986
**Stable ID**: dfcc7b69
**Location**: L225:51–L234:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5986
@@ -221,18 +221,9 @@
         { id: "solution-true-false-true", value: true },
         { id: "solution-true-false-false", value: false },
       ];
 
-      quizSolutions.forEach((solution, _index) => {
-        const result = BooleanSolutionSchema.safeParse(solution);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.id).toBe(solution.id);
-          expect(result.data.value).toBe(solution.value);
-          expect(typeof result.data.value).toBe("boolean");
-        }
-      });
+      quizSolutions.forEach((solution, _index) => {});
     });
 
     it("should handle solutions with complex IDs", () => {
       const complexSolutions = [
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
