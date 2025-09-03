# Mutant ff107174 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5127
**Stable ID**: ff107174
**Location**: L148:10–L148:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5127
@@ -144,9 +144,9 @@
     describe("Question Field", () => {
       it.each([
         ["valid question", "What is TypeScript?", true],
         ["single character", "A", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
+        ["", "TypeScriptとは何ですか？", true],
         ["with newlines", "What is\nTypeScript?", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
