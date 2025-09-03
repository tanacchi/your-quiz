# Mutant 8c51e4c7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1034
**Stable ID**: 8c51e4c7
**Location**: L160:36–L163:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1034
@@ -156,12 +156,9 @@
       it("should reject quiz correctly", () => {
         const rejectedResult = quiz.reject("Quality issues");
         expect(rejectedResult.isOk()).toBe(true);
 
-        if (rejectedResult.isOk()) {
-          const rejectedQuiz = rejectedResult.value;
-          expect(rejectedQuiz.get("status")).toBe("rejected");
-        }
+        if (rejectedResult.isOk()) {}
       });
 
       it("should prevent rejection of non-pending quiz", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
