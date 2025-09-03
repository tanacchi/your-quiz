# Mutant 90ea58aa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2870
**Stable ID**: 90ea58aa
**Location**: L89:38–L118:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2870
@@ -85,39 +85,10 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Question Field", () => {
-      it.each([
-        ["valid question", "Is TypeScript compiled?", true],
-        ["single character after trim", " A ", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["question with newlines", "What is\nTypeScript?", true],
-        ["exactly 500 chars", "A".repeat(500), true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", false],
-        ["501 chars", "A".repeat(501), false],
-        ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
-        const data = { ...validQuizData, question };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
+    describe("Question Field", () => {});
 
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
-    });
-
     describe("AnswerType Field", () => {
       it("should only accept 'boolean' as answerType", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
