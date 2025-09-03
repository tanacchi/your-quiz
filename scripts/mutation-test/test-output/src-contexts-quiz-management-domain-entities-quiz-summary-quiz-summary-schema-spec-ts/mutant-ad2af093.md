# Mutant ad2af093 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5156
**Stable ID**: ad2af093
**Location**: L163:10–L163:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5156
@@ -159,9 +159,9 @@
 
     describe("AnswerType Field", () => {
       it.each([
         ["boolean", "boolean", true],
-        ["free_text", "free_text", true],
+        ["", "free_text", true],
         ["single_choice", "single_choice", true],
         ["multiple_choice", "multiple_choice", true],
         ["invalid type", "invalid_type", false],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
