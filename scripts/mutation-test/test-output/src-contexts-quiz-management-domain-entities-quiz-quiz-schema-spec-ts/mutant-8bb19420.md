# Mutant 8bb19420 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3161
**Stable ID**: 8bb19420
**Location**: L362:65–L366:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3161
@@ -358,13 +358,9 @@
         ["special characters", "Is <script>alert('xss')</script> valid?"],
         ["emoji", "Does TypeScript support emoji? 🚀"],
         ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
         ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
-      ])("should accept question with %s", (_desc, question) => {
-        const data = { ...validQuizData, question };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+      ])("should accept question with %s", (_desc, question) => {});
     });
 
     describe("Boundary Value Testing", () => {
       it("should handle minimum valid question length", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
