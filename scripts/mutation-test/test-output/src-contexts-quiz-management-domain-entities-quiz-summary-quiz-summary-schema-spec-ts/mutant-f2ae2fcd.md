# Mutant f2ae2fcd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5145
**Stable ID**: f2ae2fcd
**Location**: L153:10–L153:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5145
@@ -149,9 +149,9 @@
         ["with newlines", "What is\nTypeScript?", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
+      ])("", (_desc, question, isValid) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
