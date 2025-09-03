# Mutant add1de1e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5116
**Stable ID**: add1de1e
**Location**: L144:38–L158:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5116
@@ -140,23 +140,9 @@
         expect(result.success).toBe(false);
       });
     });
 
-    describe("Question Field", () => {
-      it.each([
-        ["valid question", "What is TypeScript?", true],
-        ["single character", "A", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["with newlines", "What is\nTypeScript?", true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
-        const data = { ...validQuizSummaryData, question };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
+    describe("Question Field", () => {});
 
     describe("AnswerType Field", () => {
       it.each([
         ["boolean", "boolean", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
