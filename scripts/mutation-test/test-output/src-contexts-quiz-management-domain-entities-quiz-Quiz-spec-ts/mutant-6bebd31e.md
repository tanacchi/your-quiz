# Mutant 6bebd31e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1038
**Stable ID**: 6bebd31e
**Location**: L166:64–L174:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1038
@@ -162,17 +162,9 @@
           expect(rejectedQuiz.get("status")).toBe("rejected");
         }
       });
 
-      it("should prevent rejection of non-pending quiz", () => {
-        const approvedResult = quiz.approve("2023-12-02 10:00:00");
-        expect(approvedResult.isOk()).toBe(true);
-
-        const rejectionResult = approvedResult
-          ._unsafeUnwrap()
-          .reject("Too late");
-        expect(rejectionResult.isErr()).toBe(true);
-      });
+      it("should prevent rejection of non-pending quiz", () => {});
     });
 
     describe("Permission Checks", () => {
       it("should allow updates for pending approval quiz", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
