# Mutant ea8d0dd6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1653
**Stable ID**: ea8d0dd6
**Location**: L35:12–L35:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1653
@@ -31,9 +31,9 @@
     creatorId: "creator-789",
     createdAt: "2023-12-01T10:00:00.000Z",
   };
 
-  describe("Individual Patch Suggesters", () => {
+  describe("", () => {
     describe("suggestQuestionPatches", () => {
       it.each([
         [
           "untrimmed question",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
