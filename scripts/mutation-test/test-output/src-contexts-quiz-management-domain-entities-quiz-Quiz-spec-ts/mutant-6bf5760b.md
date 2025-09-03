# Mutant 6bf5760b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1058
**Stable ID**: 6bf5760b
**Location**: L200:10–L200:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1058
@@ -196,9 +196,9 @@
         const rejectedQuiz = rejectedResult._unsafeUnwrap();
         expect(rejectedQuiz.canBeDeleted()).toBe(true);
       });
 
-      it("should prevent deletion for approved quiz", () => {
+      it("", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
 
         const approvedQuiz = approvedResult._unsafeUnwrap();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
