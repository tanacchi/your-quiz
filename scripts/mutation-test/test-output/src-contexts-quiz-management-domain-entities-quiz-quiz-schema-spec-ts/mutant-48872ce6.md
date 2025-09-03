# Mutant 48872ce6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2920
**Stable ID**: 48872ce6
**Location**: L120:40–L142:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2920
@@ -116,32 +116,10 @@
         }
       });
     });
 
-    describe("AnswerType Field", () => {
-      it("should only accept 'boolean' as answerType", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
+    describe("AnswerType Field", () => {});
 
-        if (result.success) {
-          expect(result.data.answerType).toBe("boolean");
-        }
-      });
-
-      it.each([
-        ["single_choice", "single_choice"],
-        ["multiple_choice", "multiple_choice"],
-        ["free_text", "free_text"],
-        ["invalid_type", "invalid_type"],
-        ["", ""],
-        [null, null],
-      ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
-        const data = { ...validQuizData, answerType };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
-    });
-
     describe("Solution Field", () => {
       it("should accept valid BooleanSolution", () => {
         const validSolution = {
           id: "solution-456",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
