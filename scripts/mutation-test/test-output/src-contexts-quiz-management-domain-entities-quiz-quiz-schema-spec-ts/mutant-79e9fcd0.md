# Mutant 79e9fcd0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2889
**Stable ID**: 79e9fcd0
**Location**: L95:10–L95:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2889
@@ -91,9 +91,9 @@
         ["valid question", "Is TypeScript compiled?", true],
         ["single character after trim", " A ", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["question with newlines", "What is\nTypeScript?", true],
-        ["exactly 500 chars", "A".repeat(500), true],
+        ["", "A".repeat(500), true],
         ["empty string", "", false],
         ["only whitespace", "   ", false],
         ["501 chars", "A".repeat(501), false],
         ["null value", null, false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
