# Mutant 27dd3ca0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5149
**Stable ID**: 27dd3ca0
**Location**: L160:40–L177:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5149
@@ -156,26 +156,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("AnswerType Field", () => {
-      it.each([
-        ["boolean", "boolean", true],
-        ["free_text", "free_text", true],
-        ["single_choice", "single_choice", true],
-        ["multiple_choice", "multiple_choice", true],
-        ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])(
-        "should validate answerType: %s -> %s",
-        (_desc, answerType, isValid) => {
-          const data = { ...validQuizSummaryData, answerType };
-          const result = QuizSummarySchema.safeParse(data);
-          expect(result.success).toBe(isValid);
-        },
-      );
-    });
+    describe("AnswerType Field", () => {});
 
     describe("Status Field", () => {
       it.each([
         ["pending_approval", "pending_approval", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
