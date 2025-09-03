# Mutant 1ae941f3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3371
**Stable ID**: 1ae941f3
**Location**: L72:41–L72:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3371
@@ -68,9 +68,9 @@
   describe("Schema Validation", () => {
     it("should validate valid quiz data", () => {
       const quiz = QuizSummary.from(validQuizData);
 
-      const entity = quiz._unsafeUnwrap({ withStackTrace: true });
+      const entity = quiz._unsafeUnwrap({});
       expect(entity.get("question")).toBe("What is TypeScript?");
       expect(entity.get("answerType")).toBe("single_choice");
       expect(entity.get("status")).toBe("pending_approval");
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
