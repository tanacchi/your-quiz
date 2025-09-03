# Mutant dcc8e343 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3490
**Stable ID**: dcc8e343
**Location**: L201:42–L208:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3490
@@ -197,16 +197,9 @@
       expect(quiz.get("question")).toBe("What is TypeScript?");
       expect(quiz.get("tagIds")).toEqual(validTagIds);
     });
 
-    it("should create from draft", () => {
-      const draft = new QuizSummary.Draft();
-      draft.with(validQuizData as Record<string, unknown>);
-
-      const result = QuizSummary.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
-      expect(entity).toBeDefined();
-    });
+    it("should create from draft", () => {});
   });
 
   describe("Immutability", () => {
     it("should freeze the quiz instance", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
