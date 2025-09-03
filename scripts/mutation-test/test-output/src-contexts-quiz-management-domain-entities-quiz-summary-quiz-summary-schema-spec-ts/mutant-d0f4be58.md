# Mutant d0f4be58 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5299
**Stable ID**: d0f4be58
**Location**: L336:52–L380:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5299
@@ -332,54 +332,10 @@
       });
     });
   });
 
-  describe("Edge Cases and Boundary Values", () => {
-    describe("Long Strings", () => {
-      it("should accept very long question", () => {
-        const longQuestion = "A".repeat(1000);
-        const data = { ...validQuizSummaryData, question: longQuestion };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+  describe("Edge Cases and Boundary Values", () => {});
 
-      it("should accept very long explanation", () => {
-        const longExplanation = "A".repeat(5000);
-        const data = { ...validQuizSummaryData, explanation: longExplanation };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-    });
-
-    describe("Special Characters", () => {
-      it.each([
-        ["special characters", "What is <script>alert('xss')</script>?"],
-        ["emoji", "What is TypeScript? 🤔"],
-        ["multiline", "Line 1\nLine 2\nLine 3"],
-        ["unicode", "TypeScriptとは何ですか？"],
-        ["html entities", "&lt;html&gt; tags"],
-      ])("should accept question with %s", (_desc, question) => {
-        const data = { ...validQuizSummaryData, question };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-    });
-
-    describe("Date Validation", () => {
-      it.each([
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validQuizSummaryData, createdAt };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
-  });
-
   describe("Complex Integration Scenarios", () => {
     it("should handle approved quiz with all fields", () => {
       const fullApprovedQuiz = {
         id: "quiz-complex-123",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
