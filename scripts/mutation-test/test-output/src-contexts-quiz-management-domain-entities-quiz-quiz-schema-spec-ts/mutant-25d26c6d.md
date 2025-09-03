# Mutant 25d26c6d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3074
**Stable ID**: 25d26c6d
**Location**: L239:10–L239:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3074
@@ -235,9 +235,9 @@
         ["SQLite string", "2023-12-01 10:00:00", true],
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
-        ["null", null, false],
+        ["", null, false],
       ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
         const data = { ...validQuizData, createdAt };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
