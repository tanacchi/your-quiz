# Mutant 7a79c471 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1355
**Stable ID**: 7a79c471
**Location**: L594:38–L594:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1355
@@ -590,9 +590,9 @@
 
         it("should handle partially filled draft", () => {
           const draft = new Quiz.Draft();
           draft.update("question", "Partial question?");
-          draft.update("answerType", "boolean");
+          draft.update("answerType", "");
           // Missing other required fields
 
           const result = Quiz.fromDraft(draft);
           expect(result.isErr()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
