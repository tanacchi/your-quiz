# Mutant c41a5d93 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2911
**Stable ID**: c41a5d93
**Location**: L106:56–L117:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2911
@@ -102,20 +102,9 @@
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
 
-      it("should trim whitespace from question", () => {
-        const dataWithWhitespace = {
-          ...validQuizData,
-          question: "  Valid question  ",
-        };
-        const result = QuizSchema.safeParse(dataWithWhitespace);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.question).toBe("Valid question");
-        }
-      });
+      it("should trim whitespace from question", () => {});
     });
 
     describe("AnswerType Field", () => {
       it("should only accept 'boolean' as answerType", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
