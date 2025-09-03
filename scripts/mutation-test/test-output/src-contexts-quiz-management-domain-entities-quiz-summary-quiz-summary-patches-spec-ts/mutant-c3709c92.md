# Mutant c3709c92 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4059
**Stable ID**: c3709c92
**Location**: L34:14–L34:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4059
@@ -30,9 +30,9 @@
     createdAt: "2023-12-01T10:00:00.000Z",
   };
 
   describe("Individual Patch Suggesters", () => {
-    describe("suggestQuestionPatches", () => {
+    describe("", () => {
       it.each([
         [
           "untrimmed question",
           "  Valid question  ",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
