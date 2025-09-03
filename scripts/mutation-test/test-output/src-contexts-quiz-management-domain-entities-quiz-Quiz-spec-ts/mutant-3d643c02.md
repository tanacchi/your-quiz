# Mutant 3d643c02 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1048
**Stable ID**: 3d643c02
**Location**: L182:10–L182:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1048
@@ -178,9 +178,9 @@
       it("should allow updates for pending approval quiz", () => {
         expect(quiz.canBeUpdated()).toBe(true);
       });
 
-      it("should prevent updates for approved quiz", () => {
+      it("", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
 
         const approvedQuiz = approvedResult._unsafeUnwrap();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
