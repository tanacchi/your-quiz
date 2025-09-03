# Mutant 81f2db0c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1018
**Stable ID**: 81f2db0c
**Location**: L142:63–L154:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1018
@@ -138,22 +138,10 @@
           expect(approvedQuiz.get("approvedAt")).toBe("2023-12-02 10:00:00");
         }
       });
 
-      it("should prevent approval of non-pending quiz", () => {
-        const approvedResult = quiz.approve("2023-12-02 10:00:00");
-        expect(approvedResult.isOk()).toBe(true);
+      it("should prevent approval of non-pending quiz", () => {});
 
-        const reApprovalResult = approvedResult
-          ._unsafeUnwrap()
-          .approve("2023-12-03 10:00:00");
-        expect(reApprovalResult.isErr()).toBe(true);
-
-        if (reApprovalResult.isErr()) {
-          expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
-        }
-      });
-
       it("should reject quiz correctly", () => {
         const rejectedResult = quiz.reject("Quality issues");
         expect(rejectedResult.isOk()).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
