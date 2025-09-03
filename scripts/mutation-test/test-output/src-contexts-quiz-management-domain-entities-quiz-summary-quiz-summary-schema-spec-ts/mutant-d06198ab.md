# Mutant d06198ab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5117
**Stable ID**: d06198ab
**Location**: L145:15–L153:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5117
@@ -141,17 +141,9 @@
       });
     });
 
     describe("Question Field", () => {
-      it.each([
-        ["valid question", "What is TypeScript?", true],
-        ["single character", "A", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["with newlines", "What is\nTypeScript?", true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
+      it.each([])("should validate question: %s -> %s", (_desc, question, isValid) => {
         const data = { ...validQuizSummaryData, question };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
