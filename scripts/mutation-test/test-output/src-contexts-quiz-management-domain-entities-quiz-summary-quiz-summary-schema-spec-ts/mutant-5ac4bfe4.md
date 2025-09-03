# Mutant 5ac4bfe4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5347
**Stable ID**: 5ac4bfe4
**Location**: L371:26–L371:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5347
@@ -367,9 +367,9 @@
     describe("Date Validation", () => {
       it.each([
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["SQLite date only", "2023-12-01", false],
-        ["invalid date", "invalid-date", false],
+        ["invalid date", "", false],
         ["empty string", "", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizSummaryData, createdAt };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
