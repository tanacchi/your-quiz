# Mutant 71d911c0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1044
**Stable ID**: 71d911c0
**Location**: L177:41–L207:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1044
@@ -173,40 +173,10 @@
         expect(rejectionResult.isErr()).toBe(true);
       });
     });
 
-    describe("Permission Checks", () => {
-      it("should allow updates for pending approval quiz", () => {
-        expect(quiz.canBeUpdated()).toBe(true);
-      });
+    describe("Permission Checks", () => {});
 
-      it("should prevent updates for approved quiz", () => {
-        const approvedResult = quiz.approve("2023-12-02 10:00:00");
-        expect(approvedResult.isOk()).toBe(true);
-
-        const approvedQuiz = approvedResult._unsafeUnwrap();
-        expect(approvedQuiz.canBeUpdated()).toBe(false);
-      });
-
-      it("should allow deletion for non-approved quiz", () => {
-        expect(quiz.canBeDeleted()).toBe(true);
-
-        const rejectedResult = quiz.reject();
-        expect(rejectedResult.isOk()).toBe(true);
-
-        const rejectedQuiz = rejectedResult._unsafeUnwrap();
-        expect(rejectedQuiz.canBeDeleted()).toBe(true);
-      });
-
-      it("should prevent deletion for approved quiz", () => {
-        const approvedResult = quiz.approve("2023-12-02 10:00:00");
-        expect(approvedResult.isOk()).toBe(true);
-
-        const approvedQuiz = approvedResult._unsafeUnwrap();
-        expect(approvedQuiz.canBeDeleted()).toBe(false);
-      });
-    });
-
     describe("Solution Integration", () => {
       it("should provide access to integrated solution", () => {
         const solution = quiz.getSolution();
         expect(solution.get("id")).toBe("solution-1");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
