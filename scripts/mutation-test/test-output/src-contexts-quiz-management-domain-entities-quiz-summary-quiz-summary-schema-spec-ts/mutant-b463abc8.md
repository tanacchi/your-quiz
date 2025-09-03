# Mutant b463abc8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5314
**Stable ID**: b463abc8
**Location**: L354:15–L360:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5314
@@ -350,15 +350,9 @@
       });
     });
 
     describe("Special Characters", () => {
-      it.each([
-        ["special characters", "What is <script>alert('xss')</script>?"],
-        ["emoji", "What is TypeScript? 🤔"],
-        ["multiline", "Line 1\nLine 2\nLine 3"],
-        ["unicode", "TypeScriptとは何ですか？"],
-        ["html entities", "&lt;html&gt; tags"],
-      ])("should accept question with %s", (_desc, question) => {
+      it.each([])("should accept question with %s", (_desc, question) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
