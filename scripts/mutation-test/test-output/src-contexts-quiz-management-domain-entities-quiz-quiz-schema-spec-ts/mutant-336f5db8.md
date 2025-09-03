# Mutant 336f5db8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2885
**Stable ID**: 336f5db8
**Location**: L94:10–L94:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2885
@@ -90,9 +90,9 @@
       it.each([
         ["valid question", "Is TypeScript compiled?", true],
         ["single character after trim", " A ", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["question with newlines", "What is\nTypeScript?", true],
+        ["", "What is\nTypeScript?", true],
         ["exactly 500 chars", "A".repeat(500), true],
         ["empty string", "", false],
         ["only whitespace", "   ", false],
         ["501 chars", "A".repeat(501), false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
