# Mutant 9c33b350 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5164
**Stable ID**: 9c33b350
**Location**: L165:10–L165:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5164
@@ -161,9 +161,9 @@
       it.each([
         ["boolean", "boolean", true],
         ["free_text", "free_text", true],
         ["single_choice", "single_choice", true],
-        ["multiple_choice", "multiple_choice", true],
+        ["", "multiple_choice", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
         ["null value", null, false],
       ])(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
