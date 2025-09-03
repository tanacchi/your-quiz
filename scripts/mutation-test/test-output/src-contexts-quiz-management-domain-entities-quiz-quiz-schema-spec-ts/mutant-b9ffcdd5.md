# Mutant b9ffcdd5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2861
**Stable ID**: b9ffcdd5
**Location**: L81:10–L81:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2861
@@ -77,9 +77,9 @@
         ["question", { ...validQuizData, question: undefined }],
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
-        ["creatorId", { ...validQuizData, creatorId: undefined }],
+        ["", { ...validQuizData, creatorId: undefined }],
         ["createdAt", { ...validQuizData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
