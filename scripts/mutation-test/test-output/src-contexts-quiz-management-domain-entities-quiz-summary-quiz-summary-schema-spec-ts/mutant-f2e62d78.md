# Mutant f2e62d78 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5350
**Stable ID**: f2e62d78
**Location**: L372:10–L372:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5350
@@ -368,9 +368,9 @@
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
         ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
+        ["", "", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizSummaryData, createdAt };
         const result = QuizSummarySchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
