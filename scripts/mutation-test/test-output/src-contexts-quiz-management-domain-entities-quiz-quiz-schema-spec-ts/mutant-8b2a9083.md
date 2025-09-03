# Mutant 8b2a9083 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2871
**Stable ID**: 8b2a9083
**Location**: L90:15–L100:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2871
@@ -86,19 +86,9 @@
       });
     });
 
     describe("Question Field", () => {
-      it.each([
-        ["valid question", "Is TypeScript compiled?", true],
-        ["single character after trim", " A ", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["question with newlines", "What is\nTypeScript?", true],
-        ["exactly 500 chars", "A".repeat(500), true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", false],
-        ["501 chars", "A".repeat(501), false],
-        ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
+      it.each([])("should validate question: %s -> %s", (_desc, question, isValid) => {
         const data = { ...validQuizData, question };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
