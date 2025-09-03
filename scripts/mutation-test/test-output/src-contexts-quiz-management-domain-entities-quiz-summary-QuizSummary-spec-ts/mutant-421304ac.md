# Mutant 421304ac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3810
**Stable ID**: 421304ac
**Location**: L546:52–L558:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3810
@@ -542,22 +542,10 @@
         expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
       });
     });
 
-    it("should set multiple values at once", () => {
-      const updates = {
-        question: "Draft question",
-        answerType: "single_choice",
-        explanation: "Draft explanation",
-      } as const;
+    it("should set multiple values at once", () => {});
 
-      draft.with(updates);
-
-      expect(draft.get("question")).toBe("Draft question");
-      expect(draft.get("answerType")).toBe("single_choice");
-      expect(draft.get("explanation")).toBe("Draft explanation");
-    });
-
     describe("Validation error handling", () => {
       it.each([
         ["empty question", { question: "" }, "question"],
         ["invalid answerType", { answerType: "invalid" }, "answerType"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
