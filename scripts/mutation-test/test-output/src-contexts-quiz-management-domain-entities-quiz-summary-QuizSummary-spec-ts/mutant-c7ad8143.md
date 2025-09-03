# Mutant c7ad8143 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3361
**Stable ID**: c7ad8143
**Location**: L56:10–L56:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3361
@@ -52,9 +52,9 @@
         ["empty string", "", false],
         ["only spaces", "   ", true], // min(1) では空でなければ有効
         ["null value", null, false],
         ["undefined value", undefined, false],
-      ])("should handle %s: %s", (_desc, input, isValid) => {
+      ])("", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
 
         expect(result.success).toBe(isValid);
         if (isValid && result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
