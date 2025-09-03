# Mutant b03fbe7a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5356
**Stable ID**: b03fbe7a
**Location**: L374:10–L374:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5356
@@ -370,9 +370,9 @@
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
+      ])("", (_desc, createdAt, isValid) => {
         const data = { ...validQuizSummaryData, createdAt };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
