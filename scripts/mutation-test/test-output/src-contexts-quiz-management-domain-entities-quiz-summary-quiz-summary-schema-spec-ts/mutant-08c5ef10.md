# Mutant 08c5ef10 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5146
**Stable ID**: 08c5ef10
**Location**: L153:78–L157:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5146
@@ -149,13 +149,9 @@
         ["with newlines", "What is\nTypeScript?", true],
         ["empty string", "", false],
         ["only whitespace", "   ", true],
         ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
-        const data = { ...validQuizSummaryData, question };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate question: %s -> %s", (_desc, question, isValid) => {});
     });
 
     describe("AnswerType Field", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
