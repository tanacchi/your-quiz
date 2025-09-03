# Mutant 36df863e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1037
**Stable ID**: 36df863e
**Location**: L166:10–L166:56

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1037
@@ -162,9 +162,9 @@
           expect(rejectedQuiz.get("status")).toBe("rejected");
         }
       });
 
-      it("should prevent rejection of non-pending quiz", () => {
+      it("", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
 
         const rejectionResult = approvedResult
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
