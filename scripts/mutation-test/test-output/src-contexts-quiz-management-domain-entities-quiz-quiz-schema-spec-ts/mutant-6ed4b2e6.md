# Mutant 6ed4b2e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2881
**Stable ID**: 6ed4b2e6
**Location**: L93:10–L93:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2881
@@ -89,9 +89,9 @@
     describe("Question Field", () => {
       it.each([
         ["valid question", "Is TypeScript compiled?", true],
         ["single character after trim", " A ", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
+        ["", "TypeScriptとは何ですか？", true],
         ["question with newlines", "What is\nTypeScript?", true],
         ["exactly 500 chars", "A".repeat(500), true],
         ["empty string", "", false],
         ["only whitespace", "   ", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
