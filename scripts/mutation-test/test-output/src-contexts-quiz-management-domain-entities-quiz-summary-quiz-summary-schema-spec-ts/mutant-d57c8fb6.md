# Mutant d57c8fb6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5084
**Stable ID**: d57c8fb6
**Location**: L113:10–L113:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5084
@@ -109,9 +109,9 @@
   });
 
   describe("QuizSummarySchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid complete data", () => {
+      it("", () => {
         const result = QuizSummarySchema.safeParse(validQuizSummaryData);
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
