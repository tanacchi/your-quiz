# Mutant dd458925 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1353
**Stable ID**: dd458925
**Location**: L593:36–L593:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1353
@@ -589,9 +589,9 @@
         });
 
         it("should handle partially filled draft", () => {
           const draft = new Quiz.Draft();
-          draft.update("question", "Partial question?");
+          draft.update("question", "");
           draft.update("answerType", "boolean");
           // Missing other required fields
 
           const result = Quiz.fromDraft(draft);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
