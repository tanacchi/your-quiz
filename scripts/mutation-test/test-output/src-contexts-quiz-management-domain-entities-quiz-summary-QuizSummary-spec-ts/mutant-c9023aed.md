# Mutant c9023aed Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3860
**Stable ID**: c9023aed
**Location**: L593:59–L600:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3860
@@ -589,17 +589,10 @@
       });
     });
 
     describe("Commit operations", () => {
-      it("should commit to QuizSummary when valid", () => {
-        draft.with(validQuizData as Record<string, unknown>);
+      it("should commit to QuizSummary when valid", () => {});
 
-        const result = draft.commit();
-
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(quiz.get("question")).toBe("What is TypeScript?");
-      });
-
       it.each([
         ["empty question", { question: "" }],
         ["invalid answerType", { answerType: "invalid" }],
         ["missing creatorId", { creatorId: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
