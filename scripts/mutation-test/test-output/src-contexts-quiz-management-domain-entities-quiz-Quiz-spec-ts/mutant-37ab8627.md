# Mutant 37ab8627 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: OptionalChaining
**Original ID**: 1026
**Stable ID**: 37ab8627
**Location**: L152:18–L152:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1026
@@ -148,9 +148,9 @@
           .approve("2023-12-03 10:00:00");
         expect(reApprovalResult.isErr()).toBe(true);
 
         if (reApprovalResult.isErr()) {
-          expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
+          expect(reApprovalResult.error.issues[0].path[0]).toBe("status");
         }
       });
 
       it("should reject quiz correctly", () => {
```

## Hint

ミューテータ "OptionalChaining" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
