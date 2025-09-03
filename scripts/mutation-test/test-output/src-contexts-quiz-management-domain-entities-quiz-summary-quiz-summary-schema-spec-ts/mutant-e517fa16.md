# Mutant e517fa16 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5082
**Stable ID**: e517fa16
**Location**: L112:14–L112:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5082
@@ -108,9 +108,9 @@
     });
   });
 
   describe("QuizSummarySchema Validation", () => {
-    describe("Required Fields", () => {
+    describe("", () => {
       it("should accept valid complete data", () => {
         const result = QuizSummarySchema.safeParse(validQuizSummaryData);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
