# Mutant 56a2f53c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5230
**Stable ID**: 56a2f53c
**Location**: L224:23–L224:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5230
@@ -220,9 +220,9 @@
     describe("Strict Mode", () => {
       it("should reject data with extra fields", () => {
         const dataWithExtraField = {
           ...validQuizSummaryData,
-          extraField: "not allowed",
+          extraField: "",
         };
         const result = QuizSummarySchema.safeParse(dataWithExtraField);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
