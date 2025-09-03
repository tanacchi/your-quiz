# Mutant c96d5d7b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1214
**Stable ID**: c96d5d7b
**Location**: L395:17–L395:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1214
@@ -391,9 +391,9 @@
             // Test approval workflow
             const approvedResult = quiz.approve("2023-12-02 10:00:00");
             expect(approvedResult.isOk()).toBe(true);
 
-            if (approvedResult.isOk()) {
+            if (true) {
               const approvedQuiz = approvedResult.value;
               expect(approvedQuiz.get("status")).toBe("approved");
               expect(approvedQuiz.canBeUpdated()).toBe(false);
             }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
