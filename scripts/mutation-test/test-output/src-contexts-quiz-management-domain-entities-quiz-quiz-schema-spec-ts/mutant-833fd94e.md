# Mutant 833fd94e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2873
**Stable ID**: 833fd94e
**Location**: L91:10–L91:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2873
@@ -87,9 +87,9 @@
     });
 
     describe("Question Field", () => {
       it.each([
-        ["valid question", "Is TypeScript compiled?", true],
+        ["", "Is TypeScript compiled?", true],
         ["single character after trim", " A ", true],
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["question with newlines", "What is\nTypeScript?", true],
         ["exactly 500 chars", "A".repeat(500), true],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
