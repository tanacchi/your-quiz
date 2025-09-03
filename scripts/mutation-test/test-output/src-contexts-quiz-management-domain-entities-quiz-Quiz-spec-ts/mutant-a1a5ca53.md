# Mutant a1a5ca53 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1350
**Stable ID**: a1a5ca53
**Location**: L591:12–L591:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1350
@@ -587,9 +587,9 @@
             expect(result.error.patches.length).toBeGreaterThan(0);
           }
         });
 
-        it("should handle partially filled draft", () => {
+        it("", () => {
           const draft = new Quiz.Draft();
           draft.update("question", "Partial question?");
           draft.update("answerType", "boolean");
           // Missing other required fields
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
