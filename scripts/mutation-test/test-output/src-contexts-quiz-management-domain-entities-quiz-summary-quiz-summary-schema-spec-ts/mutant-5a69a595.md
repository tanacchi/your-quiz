# Mutant 5a69a595 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5210
**Stable ID**: 5a69a595
**Location**: L194:14–L194:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5210
@@ -190,9 +190,9 @@
         expect(result.success).toBe(isValid);
       });
     });
 
-    describe("Optional Fields", () => {
+    describe("", () => {
       it("should accept data without explanation", () => {
         const { explanation: _explanation, ...dataWithoutExplanation } =
           validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
