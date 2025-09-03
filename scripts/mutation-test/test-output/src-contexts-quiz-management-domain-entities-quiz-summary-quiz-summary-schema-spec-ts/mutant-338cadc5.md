# Mutant 338cadc5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5302
**Stable ID**: 338cadc5
**Location**: L338:10–L338:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5302
@@ -334,9 +334,9 @@
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Long Strings", () => {
-      it("should accept very long question", () => {
+      it("", () => {
         const longQuestion = "A".repeat(1000);
         const data = { ...validQuizSummaryData, question: longQuestion };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
