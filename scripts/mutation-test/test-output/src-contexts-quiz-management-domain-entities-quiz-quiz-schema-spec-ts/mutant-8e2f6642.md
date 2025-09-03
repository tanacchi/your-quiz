# Mutant 8e2f6642 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2989
**Stable ID**: 8e2f6642
**Location**: L172:69–L179:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2989
@@ -168,16 +168,9 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(false);
       });
 
-      it("should validate solution as BooleanSolution union", () => {
-        const solutionValidation =
-          BooleanSolutionSchema.safeParse(validBooleanSolution);
-        expect(solutionValidation.success).toBe(true);
-
-        const quizValidation = QuizSchema.safeParse(validQuizData);
-        expect(quizValidation.success).toBe(true);
-      });
+      it("should validate solution as BooleanSolution union", () => {});
     });
 
     describe("Explanation Field", () => {
       it("should accept valid explanation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
