# Mutant 9bbd323b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1152
**Stable ID**: 9bbd323b
**Location**: L327:15–L327:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1152
@@ -323,9 +323,9 @@
 
           const result = Quiz.fromDraft(draft);
           expect(result.isOk()).toBe(true);
 
-          if (result.isOk()) {
+          if (true) {
             const quiz = result.value;
             expect(quiz.get("id")).toBe("quiz-from-draft");
             expect(quiz.get("question")).toBe(
               "Is Rust a systems programming language?",
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
