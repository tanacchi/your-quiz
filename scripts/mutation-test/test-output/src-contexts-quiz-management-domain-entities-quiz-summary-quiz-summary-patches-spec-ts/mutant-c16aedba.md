# Mutant c16aedba Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4170
**Stable ID**: c16aedba
**Location**: L122:12–L122:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4170
@@ -118,9 +118,9 @@
           fieldName as keyof QuizSummaryInput,
         );
 
         const testCases = [
-          ["untrimmed id", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
+          ["", "  valid-id  ", [{ [fieldName]: "valid-id" }]],
           ["valid id", "valid-id", []],
           ["empty string", "", []],
           ["non-string input", 123, []],
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
