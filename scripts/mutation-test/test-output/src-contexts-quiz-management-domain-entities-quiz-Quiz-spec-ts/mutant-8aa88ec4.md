# Mutant 8aa88ec4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1384
**Stable ID**: 8aa88ec4
**Location**: L643:14–L643:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1384
@@ -639,9 +639,9 @@
         });
       });
     });
 
-    describe("DraftBase Methods", () => {
+    describe("", () => {
       describe("applyPatches method", () => {
         it("should apply single patch correctly", () => {
           const draft = new Quiz.Draft();
           draft.with({
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
