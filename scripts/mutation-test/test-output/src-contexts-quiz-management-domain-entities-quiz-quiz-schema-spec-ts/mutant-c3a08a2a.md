# Mutant c3a08a2a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3147
**Stable ID**: c3a08a2a
**Location**: L357:15–L362:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3147
@@ -353,14 +353,9 @@
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Special Characters in Fields", () => {
-      it.each([
-        ["special characters", "Is <script>alert('xss')</script> valid?"],
-        ["emoji", "Does TypeScript support emoji? 🚀"],
-        ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
-        ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
-      ])("should accept question with %s", (_desc, question) => {
+      it.each([])("should accept question with %s", (_desc, question) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
