# Mutant 0497e78c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4119
**Stable ID**: 0497e78c
**Location**: L80:11–L80:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4119
@@ -76,9 +76,9 @@
 
     describe("suggestExplanationPatches", () => {
       it.each([
         [
-          "untrimmed explanation",
+          "",
           "  Valid explanation  ",
           [{ explanation: "Valid explanation" }],
         ],
         ["valid explanation", "Valid explanation", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
