# Mutant 8d9eeeda Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5328
**Stable ID**: 8d9eeeda
**Location**: L359:10–L359:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5328
@@ -355,9 +355,9 @@
         ["special characters", "What is <script>alert('xss')</script>?"],
         ["emoji", "What is TypeScript? 🤔"],
         ["multiline", "Line 1\nLine 2\nLine 3"],
         ["unicode", "TypeScriptとは何ですか？"],
-        ["html entities", "&lt;html&gt; tags"],
+        ["", "&lt;html&gt; tags"],
       ])("should accept question with %s", (_desc, question) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
