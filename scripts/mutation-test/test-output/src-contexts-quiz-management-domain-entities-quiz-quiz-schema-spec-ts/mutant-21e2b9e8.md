# Mutant 21e2b9e8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3124
**Stable ID**: 21e2b9e8
**Location**: L321:10–L321:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3124
@@ -317,9 +317,9 @@
       });
     });
 
     describe("AnswerType and Solution Consistency", () => {
-      it("should accept boolean answerType with BooleanSolution", () => {
+      it("", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
