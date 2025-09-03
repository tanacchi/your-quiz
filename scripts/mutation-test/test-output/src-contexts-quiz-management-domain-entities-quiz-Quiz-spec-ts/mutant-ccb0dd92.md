# Mutant ccb0dd92 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1021
**Stable ID**: ccb0dd92
**Location**: L148:20–L148:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1021
@@ -144,9 +144,9 @@
         expect(approvedResult.isOk()).toBe(true);
 
         const reApprovalResult = approvedResult
           ._unsafeUnwrap()
-          .approve("2023-12-03 10:00:00");
+          .approve("");
         expect(reApprovalResult.isErr()).toBe(true);
 
         if (reApprovalResult.isErr()) {
           expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
