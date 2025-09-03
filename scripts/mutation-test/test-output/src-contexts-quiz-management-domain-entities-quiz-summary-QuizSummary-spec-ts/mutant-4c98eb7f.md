# Mutant 4c98eb7f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3549
**Stable ID**: 4c98eb7f
**Location**: L277:61–L285:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3549
@@ -273,17 +273,9 @@
         "Mutator updated explanation",
       );
     });
 
-    it("should validate when setting invalid values", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-      const result = quiz.update("question", ""); // empty string should fail
-
-      const error = result._unsafeUnwrapErr({ withStackTrace: true });
-      expect(error).toBeDefined();
-    });
+    it("should validate when setting invalid values", () => {});
   });
 
   describe("Fluent API", () => {
     it("should chain setter methods", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
