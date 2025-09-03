# Mutant 9f021f1b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1794
**Stable ID**: 9f021f1b
**Location**: L136:24–L136:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1794
@@ -132,9 +132,9 @@
 
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["empty after trim", "   ", []],
-          ["valid id", "valid-id", []],
+          ["valid id", "", []],
           ["non-string input", 123, []],
         ];
 
         testCases.forEach(([_testDesc, input, expected]) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
