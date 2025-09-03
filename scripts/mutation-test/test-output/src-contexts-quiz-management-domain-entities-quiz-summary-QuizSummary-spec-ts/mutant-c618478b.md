# Mutant c618478b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3481
**Stable ID**: c618478b
**Location**: L192:37–L209:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3481
@@ -188,27 +188,10 @@
       );
     });
   });
 
-  describe("Factory Methods", () => {
-    it("should create QuizSummary from valid data", () => {
-      const result = QuizSummary.from(validQuizData);
+  describe("Factory Methods", () => {});
 
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(quiz.get("question")).toBe("What is TypeScript?");
-      expect(quiz.get("tagIds")).toEqual(validTagIds);
-    });
-
-    it("should create from draft", () => {
-      const draft = new QuizSummary.Draft();
-      draft.with(validQuizData as Record<string, unknown>);
-
-      const result = QuizSummary.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
-  });
-
   describe("Immutability", () => {
     it("should freeze the quiz instance", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
