# Mutant 56624b9d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1017
**Stable ID**: 56624b9d
**Location**: L142:10–L142:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1017
@@ -138,9 +138,9 @@
           expect(approvedQuiz.get("approvedAt")).toBe("2023-12-02 10:00:00");
         }
       });
 
-      it("should prevent approval of non-pending quiz", () => {
+      it("", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
 
         const reApprovalResult = approvedResult
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
