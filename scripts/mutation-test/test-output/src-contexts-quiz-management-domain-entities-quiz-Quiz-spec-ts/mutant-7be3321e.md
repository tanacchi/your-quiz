# Mutant 7be3321e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1386
**Stable ID**: 7be3321e
**Location**: L644:16–L644:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1386
@@ -640,9 +640,9 @@
       });
     });
 
     describe("DraftBase Methods", () => {
-      describe("applyPatches method", () => {
+      describe("", () => {
         it("should apply single patch correctly", () => {
           const draft = new Quiz.Draft();
           draft.with({
             id: "quiz-single-patch",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
