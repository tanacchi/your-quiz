# Mutant 9200a1f7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1032
**Stable ID**: 9200a1f7
**Location**: L160:13–L160:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1032
@@ -156,9 +156,9 @@
       it("should reject quiz correctly", () => {
         const rejectedResult = quiz.reject("Quality issues");
         expect(rejectedResult.isOk()).toBe(true);
 
-        if (rejectedResult.isOk()) {
+        if (true) {
           const rejectedQuiz = rejectedResult.value;
           expect(rejectedQuiz.get("status")).toBe("rejected");
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
