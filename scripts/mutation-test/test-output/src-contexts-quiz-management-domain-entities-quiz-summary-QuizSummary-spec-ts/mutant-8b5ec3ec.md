# Mutant 8b5ec3ec Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3483
**Stable ID**: 8b5ec3ec
**Location**: L193:59–L199:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3483
@@ -189,16 +189,10 @@
     });
   });
 
   describe("Factory Methods", () => {
-    it("should create QuizSummary from valid data", () => {
-      const result = QuizSummary.from(validQuizData);
+    it("should create QuizSummary from valid data", () => {});
 
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(quiz.get("question")).toBe("What is TypeScript?");
-      expect(quiz.get("tagIds")).toEqual(validTagIds);
-    });
-
     it("should create from draft", () => {
       const draft = new QuizSummary.Draft();
       draft.with(validQuizData as Record<string, unknown>);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
