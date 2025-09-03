# Mutant 422f415b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1731
**Stable ID**: 422f415b
**Location**: L95:11–L95:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1731
@@ -91,9 +91,9 @@
 
     describe("suggestExplanationPatches", () => {
       it.each([
         [
-          "untrimmed explanation",
+          "",
           "  Valid explanation  ",
           [{ explanation: "Valid explanation" }],
         ],
         ["exactly 1000 chars", "A".repeat(1000), []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
