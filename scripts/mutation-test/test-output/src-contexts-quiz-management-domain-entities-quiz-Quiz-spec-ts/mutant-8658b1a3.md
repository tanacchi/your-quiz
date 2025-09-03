# Mutant 8658b1a3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1053
**Stable ID**: 8658b1a3
**Location**: L190:10–L190:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1053
@@ -186,9 +186,9 @@
         const approvedQuiz = approvedResult._unsafeUnwrap();
         expect(approvedQuiz.canBeUpdated()).toBe(false);
       });
 
-      it("should allow deletion for non-approved quiz", () => {
+      it("", () => {
         expect(quiz.canBeDeleted()).toBe(true);
 
         const rejectedResult = quiz.reject();
         expect(rejectedResult.isOk()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
