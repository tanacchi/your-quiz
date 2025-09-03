# Mutant 190d1e70 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2902
**Stable ID**: 190d1e70
**Location**: L98:23–L98:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2902
@@ -94,9 +94,9 @@
         ["question with newlines", "What is\nTypeScript?", true],
         ["exactly 500 chars", "A".repeat(500), true],
         ["empty string", "", false],
         ["only whitespace", "   ", false],
-        ["501 chars", "A".repeat(501), false],
+        ["501 chars", "".repeat(501), false],
         ["null value", null, false],
       ])("should validate question: %s -> %s", (_desc, question, isValid) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
