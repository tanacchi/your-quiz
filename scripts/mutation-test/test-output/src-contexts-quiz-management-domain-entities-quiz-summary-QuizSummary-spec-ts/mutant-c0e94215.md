# Mutant c0e94215 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3931
**Stable ID**: c0e94215
**Location**: L667:40–L675:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3931
@@ -663,18 +663,10 @@
     });
   });
 
   describe("Data Transfer", () => {
-    it("should convert to Data", () => {
-      const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+    it("should convert to Data", () => {});
 
-      const dto = quiz.toData();
-
-      expect(dto.question).toBe("What is TypeScript?");
-      expect(dto.tagIds).toEqual(validTagIds);
-    });
-
     it("should deep clone in toData", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
