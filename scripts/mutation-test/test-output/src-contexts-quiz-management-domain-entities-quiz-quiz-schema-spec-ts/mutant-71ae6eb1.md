# Mutant 71ae6eb1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3071
**Stable ID**: 71ae6eb1
**Location**: L238:26–L238:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3071
@@ -234,9 +234,9 @@
       it.each([
         ["SQLite string", "2023-12-01 10:00:00", true],
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
+        ["empty string", "Stryker was here!", false],
         ["null", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizData, createdAt };
         const result = QuizSchema.safeParse(data);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
