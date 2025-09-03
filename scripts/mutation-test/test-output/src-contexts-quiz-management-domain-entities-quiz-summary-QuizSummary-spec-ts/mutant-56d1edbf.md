# Mutant 56d1edbf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3356
**Stable ID**: 56d1edbf
**Location**: L54:10–L54:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3356
@@ -50,9 +50,9 @@
         ["valid with dash", "tag-test", true],
         ["valid single char", "t", true],
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
-        ["null value", null, false],
+        ["", null, false],
         ["undefined value", undefined, false],
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
