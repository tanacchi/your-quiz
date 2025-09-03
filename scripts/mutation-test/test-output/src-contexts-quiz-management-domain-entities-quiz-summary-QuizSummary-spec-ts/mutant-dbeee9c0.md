# Mutant dbeee9c0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3352
**Stable ID**: dbeee9c0
**Location**: L53:10–L53:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3352
@@ -49,9 +49,9 @@
         ["valid with underscore", "tag_test", true],
         ["valid with dash", "tag-test", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
-        ["only spaces", "   ", true], // min(1) では空でなければ有効
+        ["", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
