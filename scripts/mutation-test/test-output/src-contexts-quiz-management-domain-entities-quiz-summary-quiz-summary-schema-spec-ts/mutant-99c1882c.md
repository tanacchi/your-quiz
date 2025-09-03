# Mutant 99c1882c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5143
**Stable ID**: 99c1882c
**Location**: L152:10–L152:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5143
@@ -148,9 +148,9 @@
         ["unicode characters", "TypeScriptとは何ですか？", true],
         ["with newlines", "What is\nTypeScript?", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
-        ["null value", null, false],
+        ["", null, false],
       ])("should validate question: %s -> %s", (_desc, question, isValid) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
