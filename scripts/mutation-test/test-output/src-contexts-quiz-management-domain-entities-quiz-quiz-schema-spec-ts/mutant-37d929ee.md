# Mutant 37d929ee Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3160
**Stable ID**: 37d929ee
**Location**: L362:10–L362:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3160
@@ -358,9 +358,9 @@
         ["special characters", "Is <script>alert('xss')</script> valid?"],
         ["emoji", "Does TypeScript support emoji? 🚀"],
         ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
         ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
-      ])("should accept question with %s", (_desc, question) => {
+      ])("", (_desc, question) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
