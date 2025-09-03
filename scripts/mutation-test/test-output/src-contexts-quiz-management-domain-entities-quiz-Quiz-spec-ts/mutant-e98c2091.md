# Mutant e98c2091 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1059
**Stable ID**: e98c2091
**Location**: L200:61–L206:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1059
@@ -196,15 +196,9 @@
         const rejectedQuiz = rejectedResult._unsafeUnwrap();
         expect(rejectedQuiz.canBeDeleted()).toBe(true);
       });
 
-      it("should prevent deletion for approved quiz", () => {
-        const approvedResult = quiz.approve("2023-12-02 10:00:00");
-        expect(approvedResult.isOk()).toBe(true);
-
-        const approvedQuiz = approvedResult._unsafeUnwrap();
-        expect(approvedQuiz.canBeDeleted()).toBe(false);
-      });
+      it("should prevent deletion for approved quiz", () => {});
     });
 
     describe("Solution Integration", () => {
       it("should provide access to integrated solution", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
