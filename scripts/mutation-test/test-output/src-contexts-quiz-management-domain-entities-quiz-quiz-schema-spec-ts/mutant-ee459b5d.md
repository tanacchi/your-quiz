# Mutant ee459b5d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2893
**Stable ID**: ee459b5d
**Location**: L96:10–L96:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2893
@@ -92,9 +92,9 @@
         ["single character after trim", " A ", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["question with newlines", "What is\nTypeScript?", true],
         ["exactly 500 chars", "A".repeat(500), true],
-        ["empty string", "", false],
+        ["", "", false],
         ["only whitespace", "   ", false],
         ["501 chars", "A".repeat(501), false],
         ["null value", null, false],
       ])("should validate question: %s -> %s", (_desc, question, isValid) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
