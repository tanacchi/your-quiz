# Mutant aacaa729 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1029
**Stable ID**: aacaa729
**Location**: L156:48–L164:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1029
@@ -152,18 +152,10 @@
           expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
         }
       });
 
-      it("should reject quiz correctly", () => {
-        const rejectedResult = quiz.reject("Quality issues");
-        expect(rejectedResult.isOk()).toBe(true);
+      it("should reject quiz correctly", () => {});
 
-        if (rejectedResult.isOk()) {
-          const rejectedQuiz = rejectedResult.value;
-          expect(rejectedQuiz.get("status")).toBe("rejected");
-        }
-      });
-
       it("should prevent rejection of non-pending quiz", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
