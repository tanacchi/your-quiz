# Mutant 002a4c20 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5169
**Stable ID**: 002a4c20
**Location**: L166:26–L166:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5169
@@ -162,9 +162,9 @@
         ["boolean", "boolean", true],
         ["free_text", "free_text", true],
         ["single_choice", "single_choice", true],
         ["multiple_choice", "multiple_choice", true],
-        ["invalid type", "invalid_type", false],
+        ["invalid type", "", false],
         ["empty string", "", false],
         ["null value", null, false],
       ])(
         "should validate answerType: %s -> %s",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
