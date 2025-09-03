# Mutant 4e7a3233 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1208
**Stable ID**: 4e7a3233
**Location**: L386:15–L386:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1208
@@ -382,9 +382,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isOk()).toBe(true);
 
-          if (result.isOk()) {
+          if (false) {
             const quiz = result.value;
             expect(quiz.canBeUpdated()).toBe(true);
             expect(quiz.canBeDeleted()).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
