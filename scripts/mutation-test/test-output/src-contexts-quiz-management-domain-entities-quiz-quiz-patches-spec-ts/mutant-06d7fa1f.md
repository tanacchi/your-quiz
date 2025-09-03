# Mutant 06d7fa1f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1797
**Stable ID**: 06d7fa1f
**Location**: L137:12–L137:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1797
@@ -133,9 +133,9 @@
         const testCases = [
           ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["empty after trim", "   ", []],
           ["valid id", "valid-id", []],
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
