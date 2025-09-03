# Mutant d5dd7ca3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3921
**Stable ID**: d5dd7ca3
**Location**: L652:59–L652:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3921
@@ -648,9 +648,9 @@
 
   describe("Type Safety", () => {
     it("should enforce return type constraints", () => {
       const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+      const quiz = result._unsafeUnwrap({ withStackTrace: false });
 
       // These should compile with correct types
       const question: string = quiz.get("question");
       const status: "pending_approval" | "approved" | "rejected" =
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
