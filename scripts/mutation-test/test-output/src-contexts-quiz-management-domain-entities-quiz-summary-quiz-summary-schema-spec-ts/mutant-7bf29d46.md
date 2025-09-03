# Mutant 7bf29d46 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5218
**Stable ID**: 7bf29d46
**Location**: L209:10–L209:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5218
@@ -205,9 +205,9 @@
         const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
         expect(result.success).toBe(true);
       });
 
-      it("should accept data without tagIds", () => {
+      it("", () => {
         const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
