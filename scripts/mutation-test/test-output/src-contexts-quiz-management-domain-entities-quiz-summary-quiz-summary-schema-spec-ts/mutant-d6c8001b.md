# Mutant d6c8001b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5212
**Stable ID**: d6c8001b
**Location**: L195:10–L195:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5212
@@ -191,9 +191,9 @@
       });
     });
 
     describe("Optional Fields", () => {
-      it("should accept data without explanation", () => {
+      it("", () => {
         const { explanation: _explanation, ...dataWithoutExplanation } =
           validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
