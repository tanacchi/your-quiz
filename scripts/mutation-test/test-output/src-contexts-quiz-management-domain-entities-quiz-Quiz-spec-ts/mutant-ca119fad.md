# Mutant ca119fad Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1120
**Stable ID**: ca119fad
**Location**: L283:8–L283:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1120
@@ -279,9 +279,9 @@
         expect(quizEntity.getSolution().get("value")).toBe(false);
       }
     });
 
-    it("should handle validation errors in draft", () => {
+    it("", () => {
       const draft = new Quiz.Draft();
       draft.update("question", ""); // Invalid
       draft.update("answerType", "boolean");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
