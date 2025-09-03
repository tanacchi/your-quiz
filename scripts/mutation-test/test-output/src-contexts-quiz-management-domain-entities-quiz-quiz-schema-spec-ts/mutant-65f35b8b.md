# Mutant 65f35b8b Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3076
**Stable ID**: 65f35b8b
**Location**: L240:10–L240:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3076
@@ -236,9 +236,9 @@
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
+      ])("", (_desc, createdAt, isValid) => {
         const data = { ...validQuizData, createdAt };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(isValid);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
