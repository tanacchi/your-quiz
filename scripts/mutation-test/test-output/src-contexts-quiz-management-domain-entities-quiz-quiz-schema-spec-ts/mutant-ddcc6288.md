# Mutant ddcc6288 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3077
**Stable ID**: ddcc6288
**Location**: L240:80–L244:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3077
@@ -236,13 +236,9 @@
         ["SQLite format", "2023-12-01 10:00:00", true],
         ["invalid date", "invalid-date", false],
         ["empty string", "", false],
         ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validQuizData, createdAt };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
+      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {});
 
       it("should accept quiz without approvedAt", () => {
         const result = QuizSchema.safeParse(validQuizData);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
