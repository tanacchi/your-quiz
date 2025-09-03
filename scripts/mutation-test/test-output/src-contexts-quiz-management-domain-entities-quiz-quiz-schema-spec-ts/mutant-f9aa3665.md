# Mutant f9aa3665 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3067
**Stable ID**: f9aa3665
**Location**: L237:26–L237:40

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3067
@@ -233,9 +233,9 @@
     describe("Date Fields", () => {
       it.each([
         ["SQLite string", "2023-12-01 10:00:00", true],
         ["SQLite format", "2023-12-01 10:00:00", true],
-        ["invalid date", "invalid-date", false],
+        ["invalid date", "", false],
         ["empty string", "", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizData, createdAt };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
