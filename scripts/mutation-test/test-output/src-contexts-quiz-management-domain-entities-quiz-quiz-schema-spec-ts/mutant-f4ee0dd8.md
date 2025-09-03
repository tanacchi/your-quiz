# Mutant f4ee0dd8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3152
**Stable ID**: f4ee0dd8
**Location**: L359:10–L359:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3152
@@ -355,9 +355,9 @@
   describe("Edge Cases and Boundary Values", () => {
     describe("Special Characters in Fields", () => {
       it.each([
         ["special characters", "Is <script>alert('xss')</script> valid?"],
-        ["emoji", "Does TypeScript support emoji? 🚀"],
+        ["", "Does TypeScript support emoji? 🚀"],
         ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
         ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
       ])("should accept question with %s", (_desc, question) => {
         const data = { ...validQuizData, question };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
