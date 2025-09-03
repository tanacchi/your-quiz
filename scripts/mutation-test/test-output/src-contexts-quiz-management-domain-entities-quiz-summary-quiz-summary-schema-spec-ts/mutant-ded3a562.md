# Mutant ded3a562 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5325
**Stable ID**: ded3a562
**Location**: L358:10–L358:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5325
@@ -354,9 +354,9 @@
       it.each([
         ["special characters", "What is <script>alert('xss')</script>?"],
         ["emoji", "What is TypeScript? 🤔"],
         ["multiline", "Line 1\nLine 2\nLine 3"],
-        ["unicode", "TypeScriptとは何ですか？"],
+        ["", "TypeScriptとは何ですか？"],
         ["html entities", "&lt;html&gt; tags"],
       ])("should accept question with %s", (_desc, question) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
