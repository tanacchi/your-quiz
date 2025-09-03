# Mutant c19041bc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5112
**Stable ID**: c19041bc
**Location**: L138:10–L138:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5112
@@ -134,9 +134,9 @@
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
         ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
         ["createdAt", { ...validQuizSummaryData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
+      ])("", (_field, invalidData) => {
         const result = QuizSummarySchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
