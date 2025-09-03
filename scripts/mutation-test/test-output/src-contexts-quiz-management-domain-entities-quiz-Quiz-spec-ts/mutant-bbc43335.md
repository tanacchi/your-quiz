# Mutant bbc43335 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1033
**Stable ID**: bbc43335
**Location**: L160:13–L160:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1033
@@ -156,9 +156,9 @@
       it("should reject quiz correctly", () => {
         const rejectedResult = quiz.reject("Quality issues");
         expect(rejectedResult.isOk()).toBe(true);
 
-        if (rejectedResult.isOk()) {
+        if (false) {
           const rejectedQuiz = rejectedResult.value;
           expect(rejectedQuiz.get("status")).toBe("rejected");
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
