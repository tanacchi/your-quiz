# Mutant b613c50c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5135
**Stable ID**: b613c50c
**Location**: L150:10–L150:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5135
@@ -146,9 +146,9 @@
         ["valid question", "What is TypeScript?", true],
         ["single character", "A", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["with newlines", "What is\nTypeScript?", true],
-        ["empty string", "", false],
+        ["", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
       ])("should validate question: %s -> %s", (_desc, question, isValid) => {
         const data = { ...validQuizSummaryData, question };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
