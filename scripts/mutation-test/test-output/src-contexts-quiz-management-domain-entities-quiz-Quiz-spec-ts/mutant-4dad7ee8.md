# Mutant 4dad7ee8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: BlockStatement
**Original ID**: 1012
**Stable ID**: 4dad7ee8
**Location**: L135:36–L139:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1012
@@ -131,13 +131,9 @@
       it("should approve quiz correctly", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
 
-        if (approvedResult.isOk()) {
-          const approvedQuiz = approvedResult.value;
-          expect(approvedQuiz.get("status")).toBe("approved");
-          expect(approvedQuiz.get("approvedAt")).toBe("2023-12-02 10:00:00");
-        }
+        if (approvedResult.isOk()) {}
       });
 
       it("should prevent approval of non-pending quiz", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
