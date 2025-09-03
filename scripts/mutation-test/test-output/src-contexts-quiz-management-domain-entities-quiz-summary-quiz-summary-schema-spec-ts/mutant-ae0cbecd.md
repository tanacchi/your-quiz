# Mutant ae0cbecd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5173
**Stable ID**: ae0cbecd
**Location**: L167:26–L167:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5173
@@ -163,9 +163,9 @@
         ["free_text", "free_text", true],
         ["single_choice", "single_choice", true],
         ["multiple_choice", "multiple_choice", true],
         ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["null value", null, false],
       ])(
         "should validate answerType: %s -> %s",
         (_desc, answerType, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
