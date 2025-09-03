# Mutant b717fe2a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5160
**Stable ID**: b717fe2a
**Location**: L164:10–L164:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5160
@@ -160,9 +160,9 @@
     describe("AnswerType Field", () => {
       it.each([
         ["boolean", "boolean", true],
         ["free_text", "free_text", true],
-        ["single_choice", "single_choice", true],
+        ["", "single_choice", true],
         ["multiple_choice", "multiple_choice", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
