# Mutant d2191a32 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5123
**Stable ID**: d2191a32
**Location**: L147:10–L147:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5123
@@ -143,9 +143,9 @@
 
     describe("Question Field", () => {
       it.each([
         ["valid question", "What is TypeScript?", true],
-        ["single character", "A", true],
+        ["", "A", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["with newlines", "What is\nTypeScript?", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
