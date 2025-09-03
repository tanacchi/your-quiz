# Mutant 99b6d738 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3145
**Stable ID**: 99b6d738
**Location**: L356:14–L356:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3145
@@ -352,9 +352,9 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
-    describe("Special Characters in Fields", () => {
+    describe("", () => {
       it.each([
         ["special characters", "Is <script>alert('xss')</script> valid?"],
         ["emoji", "Does TypeScript support emoji? 🚀"],
         ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
