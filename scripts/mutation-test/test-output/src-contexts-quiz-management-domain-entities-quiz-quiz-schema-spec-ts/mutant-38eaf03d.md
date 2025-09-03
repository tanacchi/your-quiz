# Mutant 38eaf03d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3146
**Stable ID**: 38eaf03d
**Location**: L356:52–L367:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3146
@@ -352,20 +352,9 @@
     });
   });
 
   describe("Edge Cases and Boundary Values", () => {
-    describe("Special Characters in Fields", () => {
-      it.each([
-        ["special characters", "Is <script>alert('xss')</script> valid?"],
-        ["emoji", "Does TypeScript support emoji? 🚀"],
-        ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
-        ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
-      ])("should accept question with %s", (_desc, question) => {
-        const data = { ...validQuizData, question };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-    });
+    describe("Special Characters in Fields", () => {});
 
     describe("Boundary Value Testing", () => {
       it("should handle minimum valid question length", () => {
         const minimalData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
