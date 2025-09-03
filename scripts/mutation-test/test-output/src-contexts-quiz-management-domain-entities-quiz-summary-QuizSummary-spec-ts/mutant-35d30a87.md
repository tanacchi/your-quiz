# Mutant 35d30a87 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3372
**Stable ID**: 35d30a87
**Location**: L72:59–L72:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3372
@@ -68,9 +68,9 @@
   describe("Schema Validation", () => {
     it("should validate valid quiz data", () => {
       const quiz = QuizSummary.from(validQuizData);
 
-      const entity = quiz._unsafeUnwrap({ withStackTrace: true });
+      const entity = quiz._unsafeUnwrap({ withStackTrace: false });
       expect(entity.get("question")).toBe("What is TypeScript?");
       expect(entity.get("answerType")).toBe("single_choice");
       expect(entity.get("status")).toBe("pending_approval");
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
