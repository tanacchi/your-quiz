# Mutant f1d20bdc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1028
**Stable ID**: f1d20bdc
**Location**: L156:10–L156:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1028
@@ -152,9 +152,9 @@
           expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
         }
       });
 
-      it("should reject quiz correctly", () => {
+      it("", () => {
         const rejectedResult = quiz.reject("Quality issues");
         expect(rejectedResult.isOk()).toBe(true);
 
         if (rejectedResult.isOk()) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
