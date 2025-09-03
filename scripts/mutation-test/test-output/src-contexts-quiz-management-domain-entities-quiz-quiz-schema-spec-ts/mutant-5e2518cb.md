# Mutant 5e2518cb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2877
**Stable ID**: 5e2518cb
**Location**: L92:10–L92:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2877
@@ -88,9 +88,9 @@
 
     describe("Question Field", () => {
       it.each([
         ["valid question", "Is TypeScript compiled?", true],
-        ["single character after trim", " A ", true],
+        ["", " A ", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["question with newlines", "What is\nTypeScript?", true],
         ["exactly 500 chars", "A".repeat(500), true],
         ["empty string", "", false],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
