# Mutant 321f4e74 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4184
**Stable ID**: 321f4e74
**Location**: L125:12–L125:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4184
@@ -121,9 +121,9 @@
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["valid id", "valid-id", []],
           ["empty string", "", []],
-          ["non-string input", 123, []],
+          ["", 123, []],
         ];
 
         testCases.forEach(([_testDesc, input, expected]) => {
           const result = suggester(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
