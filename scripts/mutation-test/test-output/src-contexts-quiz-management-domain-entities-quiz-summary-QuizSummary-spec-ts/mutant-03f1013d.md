# Mutant 03f1013d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3884
**Stable ID**: 03f1013d
**Location**: L621:14–L621:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3884
@@ -617,9 +617,9 @@
         expect(error.issues.length).toBeGreaterThan(0);
       });
     });
 
-    describe("Error management", () => {
+    describe("", () => {
       it("should clear errors manually", () => {
         draft.update("question", ""); // creates error
         expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
