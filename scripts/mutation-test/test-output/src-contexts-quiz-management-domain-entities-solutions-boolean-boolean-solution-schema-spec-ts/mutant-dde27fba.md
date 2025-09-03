# Mutant dde27fba Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5967
**Stable ID**: dde27fba
**Location**: L216:29–L223:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5967
@@ -212,16 +212,9 @@
   });
 
   describe("Integration Scenarios", () => {
     it("should handle typical quiz solution scenarios", () => {
-      const quizSolutions = [
-        { id: "solution-correct-answer", value: true },
-        { id: "solution-incorrect-answer", value: false },
-        { id: "solution-yes-no-yes", value: true },
-        { id: "solution-yes-no-no", value: false },
-        { id: "solution-true-false-true", value: true },
-        { id: "solution-true-false-false", value: false },
-      ];
+      const quizSolutions = [];
 
       quizSolutions.forEach((solution, _index) => {
         const result = BooleanSolutionSchema.safeParse(solution);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
