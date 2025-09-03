# Mutant 4bbb73ec Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3818
**Stable ID**: 4bbb73ec
**Location**: L560:49–L590:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3818
@@ -556,40 +556,10 @@
       expect(draft.get("answerType")).toBe("single_choice");
       expect(draft.get("explanation")).toBe("Draft explanation");
     });
 
-    describe("Validation error handling", () => {
-      it.each([
-        ["empty question", { question: "" }, "question"],
-        ["invalid answerType", { answerType: "invalid" }, "answerType"],
-        ["empty creatorId", { creatorId: "" }, "creatorId"],
-        ["empty solutionId", { solutionId: "" }, "solutionId"],
-        ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
-      ])(
-        "should validate and store errors for %s",
-        (_desc, invalidData, errorField) => {
-          Object.entries(invalidData).forEach(([key, value]) => {
-            draft.update(key as keyof typeof validQuizData, value);
-          });
+    describe("Validation error handling", () => {});
 
-          expect(draft.hasErrors()).toBe(true);
-          const fieldErrors = draft.getErrors(errorField);
-          expect(fieldErrors.length).toBeGreaterThan(0);
-        },
-      );
-
-      it("should clear errors when data becomes valid", () => {
-        // First set invalid data
-        draft.update("question", "");
-        expect(draft.hasErrors()).toBe(true);
-
-        // Then fix the data
-        draft.update("question", "Valid question");
-        draft.with(validQuizData as Record<string, unknown>);
-        expect(draft.hasErrors()).toBe(false);
-      });
-    });
-
     describe("Commit operations", () => {
       it("should commit to QuizSummary when valid", () => {
         draft.with(validQuizData as Record<string, unknown>);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
