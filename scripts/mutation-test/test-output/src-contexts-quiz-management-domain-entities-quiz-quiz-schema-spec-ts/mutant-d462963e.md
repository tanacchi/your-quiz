# Mutant d462963e Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3155
**Stable ID**: d462963e
**Location**: L360:10–L360:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3155
@@ -356,9 +356,9 @@
     describe("Special Characters in Fields", () => {
       it.each([
         ["special characters", "Is <script>alert('xss')</script> valid?"],
         ["emoji", "Does TypeScript support emoji? 🚀"],
-        ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
+        ["", "TypeScriptはJavaScriptのスーパーセットですか？"],
         ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
       ])("should accept question with %s", (_desc, question) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
