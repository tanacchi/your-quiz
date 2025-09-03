# Mutant 20dc06b1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3496
**Stable ID**: 20dc06b1
**Location**: L212:49–L217:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3496
@@ -208,14 +208,9 @@
     });
   });
 
   describe("Immutability", () => {
-    it("should freeze the quiz instance", () => {
-      const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
-
-      expect(Object.isFrozen(quiz)).toBe(true);
-    });
+    it("should freeze the quiz instance", () => {});
   });
 
   describe("Generic Getter/Setter", () => {
     it("should get values with type safety", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
