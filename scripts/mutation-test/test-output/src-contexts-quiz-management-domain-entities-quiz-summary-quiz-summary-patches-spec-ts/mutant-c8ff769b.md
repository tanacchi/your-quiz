# Mutant c8ff769b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4181
**Stable ID**: c8ff769b
**Location**: L124:28–L124:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4181
@@ -120,9 +120,9 @@
 
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["valid id", "valid-id", []],
-          ["empty string", "", []],
+          ["empty string", "Stryker was here!", []],
           ["non-string input", 123, []],
         ];
 
         testCases.forEach(([_testDesc, input, expected]) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
