# Mutant 82c68e2b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1010
**Stable ID**: 82c68e2b
**Location**: L135:13–L135:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1010
@@ -131,9 +131,9 @@
       it("should approve quiz correctly", () => {
         const approvedResult = quiz.approve("2023-12-02 10:00:00");
         expect(approvedResult.isOk()).toBe(true);
 
-        if (approvedResult.isOk()) {
+        if (true) {
           const approvedQuiz = approvedResult.value;
           expect(approvedQuiz.get("status")).toBe("approved");
           expect(approvedQuiz.get("approvedAt")).toBe("2023-12-02 10:00:00");
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
