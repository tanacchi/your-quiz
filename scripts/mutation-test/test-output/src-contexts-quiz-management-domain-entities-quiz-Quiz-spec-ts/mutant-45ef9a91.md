# Mutant 45ef9a91 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1025
**Stable ID**: 45ef9a91
**Location**: L151:39–L153:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1025
@@ -147,11 +147,9 @@
           ._unsafeUnwrap()
           .approve("2023-12-03 10:00:00");
         expect(reApprovalResult.isErr()).toBe(true);
 
-        if (reApprovalResult.isErr()) {
-          expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
-        }
+        if (reApprovalResult.isErr()) {}
       });
 
       it("should reject quiz correctly", () => {
         const rejectedResult = quiz.reject("Quality issues");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
