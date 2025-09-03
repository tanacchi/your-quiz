# Mutant 3a4ec3d0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5303
**Stable ID**: 3a4ec3d0
**Location**: L338:52–L343:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5303
@@ -334,14 +334,9 @@
   });
 
   describe("Edge Cases and Boundary Values", () => {
     describe("Long Strings", () => {
-      it("should accept very long question", () => {
-        const longQuestion = "A".repeat(1000);
-        const data = { ...validQuizSummaryData, question: longQuestion };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
+      it("should accept very long question", () => {});
 
       it("should accept very long explanation", () => {
         const longExplanation = "A".repeat(5000);
         const data = { ...validQuizSummaryData, explanation: longExplanation };
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
