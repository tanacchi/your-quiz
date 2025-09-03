# Mutant 7b2c011d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5150
**Stable ID**: 7b2c011d
**Location**: L161:15–L169:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5150
@@ -157,17 +157,9 @@
       });
     });
 
     describe("AnswerType Field", () => {
-      it.each([
-        ["boolean", "boolean", true],
-        ["free_text", "free_text", true],
-        ["single_choice", "single_choice", true],
-        ["multiple_choice", "multiple_choice", true],
-        ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])(
+      it.each([])(
         "should validate answerType: %s -> %s",
         (_desc, answerType, isValid) => {
           const data = { ...validQuizSummaryData, answerType };
           const result = QuizSummarySchema.safeParse(data);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
