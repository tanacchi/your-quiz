# Mutant 825747bc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5131
**Stable ID**: 825747bc
**Location**: L149:10–L149:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5131
@@ -145,9 +145,9 @@
       it.each([
         ["valid question", "What is TypeScript?", true],
         ["single character", "A", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["with newlines", "What is\nTypeScript?", true],
+        ["", "What is\nTypeScript?", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
       ])("should validate question: %s -> %s", (_desc, question, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
