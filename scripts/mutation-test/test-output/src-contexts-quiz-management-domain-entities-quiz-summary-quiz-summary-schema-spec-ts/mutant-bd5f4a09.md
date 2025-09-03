# Mutant bd5f4a09 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5330
**Stable ID**: bd5f4a09
**Location**: L360:10–L360:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5330
@@ -356,9 +356,9 @@
         ["emoji", "What is TypeScript? 🤔"],
         ["multiline", "Line 1\nLine 2\nLine 3"],
         ["unicode", "TypeScriptとは何ですか？"],
         ["html entities", "&lt;html&gt; tags"],
-      ])("should accept question with %s", (_desc, question) => {
+      ])("", (_desc, question) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
