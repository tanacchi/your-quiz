# Mutant 6e8d1ae9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3149
**Stable ID**: 6e8d1ae9
**Location**: L358:10–L358:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3149
@@ -354,9 +354,9 @@
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Special Characters in Fields", () => {
       it.each([
-        ["special characters", "Is <script>alert('xss')</script> valid?"],
+        ["", "Is <script>alert('xss')</script> valid?"],
         ["emoji", "Does TypeScript support emoji? 🚀"],
         ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
         ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
       ])("should accept question with %s", (_desc, question) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
