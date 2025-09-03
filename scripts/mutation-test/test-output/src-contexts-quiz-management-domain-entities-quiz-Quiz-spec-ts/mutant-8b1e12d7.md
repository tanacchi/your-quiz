# Mutant 8b1e12d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1279
**Stable ID**: 8b1e12d7
**Location**: L475:16–L475:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1279
@@ -471,9 +471,9 @@
           }
         });
       });
 
-      describe("Patch System Integration", () => {
+      describe("", () => {
         it("should work with patch application using applyPatches", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-patches",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
