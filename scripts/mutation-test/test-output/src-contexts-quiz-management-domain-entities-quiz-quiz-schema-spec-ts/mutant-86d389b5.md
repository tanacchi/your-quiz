# Mutant 86d389b5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2922
**Stable ID**: 86d389b5
**Location**: L121:62–L128:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2922
@@ -117,17 +117,10 @@
       });
     });
 
     describe("AnswerType Field", () => {
-      it("should only accept 'boolean' as answerType", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
+      it("should only accept 'boolean' as answerType", () => {});
 
-        if (result.success) {
-          expect(result.data.answerType).toBe("boolean");
-        }
-      });
-
       it.each([
         ["single_choice", "single_choice"],
         ["multiple_choice", "multiple_choice"],
         ["free_text", "free_text"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
