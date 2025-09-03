# Mutant 0d0ee0b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4180
**Stable ID**: 0d0ee0b6
**Location**: L124:12–L124:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4180
@@ -120,9 +120,9 @@
 
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["valid id", "valid-id", []],
-          ["empty string", "", []],
+          ["", "", []],
           ["non-string input", 123, []],
         ];
 
         testCases.forEach(([_testDesc, input, expected]) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
