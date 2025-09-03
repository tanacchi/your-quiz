# Mutant 6e8aba41 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3494
**Stable ID**: 6e8aba41
**Location**: L211:34–L218:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3494
@@ -207,17 +207,10 @@
       expect(entity).toBeDefined();
     });
   });
 
-  describe("Immutability", () => {
-    it("should freeze the quiz instance", () => {
-      const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+  describe("Immutability", () => {});
 
-      expect(Object.isFrozen(quiz)).toBe(true);
-    });
-  });
-
   describe("Generic Getter/Setter", () => {
     it("should get values with type safety", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
