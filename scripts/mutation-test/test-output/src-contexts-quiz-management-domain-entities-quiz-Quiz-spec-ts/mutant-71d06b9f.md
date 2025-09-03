# Mutant 71d06b9f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1023
**Stable ID**: 71d06b9f
**Location**: L151:13–L151:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1023
@@ -147,9 +147,9 @@
           ._unsafeUnwrap()
           .approve("2023-12-03 10:00:00");
         expect(reApprovalResult.isErr()).toBe(true);
 
-        if (reApprovalResult.isErr()) {
+        if (true) {
           expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
