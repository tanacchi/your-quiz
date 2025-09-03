# Mutant 46bb0e73 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3122
**Stable ID**: 46bb0e73
**Location**: L320:14–L320:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3122
@@ -316,9 +316,9 @@
         expect(result.success).toBe(true);
       });
     });
 
-    describe("AnswerType and Solution Consistency", () => {
+    describe("", () => {
       it("should accept boolean answerType with BooleanSolution", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
