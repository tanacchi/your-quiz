# Mutant 2d2ee014 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3125
**Stable ID**: 2d2ee014
**Location**: L321:73–L324:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3125
@@ -317,12 +317,9 @@
       });
     });
 
     describe("AnswerType and Solution Consistency", () => {
-      it("should accept boolean answerType with BooleanSolution", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
-      });
+      it("should accept boolean answerType with BooleanSolution", () => {});
 
       it("should reject boolean answerType without solution", () => {
         const dataWithoutSolution = {
           ...validQuizData,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
