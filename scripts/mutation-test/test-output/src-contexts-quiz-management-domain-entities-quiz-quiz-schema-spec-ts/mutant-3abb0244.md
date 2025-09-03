# Mutant 3abb0244 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3128
**Stable ID**: 3abb0244
**Location**: L326:69–L342:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3128
@@ -322,26 +322,10 @@
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
       });
 
-      it("should reject boolean answerType without solution", () => {
-        const dataWithoutSolution = {
-          ...validQuizData,
-          solution: undefined,
-        };
-        const result = QuizSchema.safeParse(dataWithoutSolution);
-        expect(result.success).toBe(false);
+      it("should reject boolean answerType without solution", () => {});
 
-        if (!result.success) {
-          const error = result.error as ZodError;
-          const solutionError = error.issues.find((issue) =>
-            issue.path.includes("solution"),
-          );
-          expect(solutionError).toBeDefined();
-          expect(solutionError?.message).toContain("expected object");
-        }
-      });
-
       it("should reject boolean answerType with null solution", () => {
         const dataWithNullSolution = {
           ...validQuizData,
           solution: null,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
