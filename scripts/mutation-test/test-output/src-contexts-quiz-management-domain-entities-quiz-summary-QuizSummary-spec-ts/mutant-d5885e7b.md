# Mutant d5885e7b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3858
**Stable ID**: d5885e7b
**Location**: L592:41–L619:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3858
@@ -588,37 +588,10 @@
         expect(draft.hasErrors()).toBe(false);
       });
     });
 
-    describe("Commit operations", () => {
-      it("should commit to QuizSummary when valid", () => {
-        draft.with(validQuizData as Record<string, unknown>);
+    describe("Commit operations", () => {});
 
-        const result = draft.commit();
-
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(quiz.get("question")).toBe("What is TypeScript?");
-      });
-
-      it.each([
-        ["empty question", { question: "" }],
-        ["invalid answerType", { answerType: "invalid" }],
-        ["missing creatorId", { creatorId: undefined }],
-        ["missing solutionId", { solutionId: undefined }],
-      ])("should fail to commit with %s", (_desc, invalidData) => {
-        draft.with({
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidData,
-        } as Parameters<typeof draft.with>[0]);
-
-        const result = draft.commit();
-
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(error).toBeDefined();
-        expect(error.issues.length).toBeGreaterThan(0);
-      });
-    });
-
     describe("Error management", () => {
       it("should clear errors manually", () => {
         draft.update("question", ""); // creates error
         expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
