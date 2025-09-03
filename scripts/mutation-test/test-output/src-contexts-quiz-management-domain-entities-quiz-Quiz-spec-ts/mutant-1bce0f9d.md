# Mutant 1bce0f9d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1294
**Stable ID**: 1bce0f9d
**Location**: L500:15–L500:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1294
@@ -496,9 +496,9 @@
           // After applying patches, errors should be reduced or fixed
           const postPatchResult = Quiz.fromDraft(draft);
 
           // The patches should improve the validation state
-          if (postPatchResult.isErr()) {
+          if (false) {
             // If still errors, they should be fewer than before
             expect(postPatchResult.error.issues.length).toBeLessThan(3);
           } else {
             // Or completely fixed
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
