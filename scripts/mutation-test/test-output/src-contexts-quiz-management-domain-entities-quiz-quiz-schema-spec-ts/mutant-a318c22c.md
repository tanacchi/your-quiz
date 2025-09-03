# Mutant a318c22c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2858
**Stable ID**: a318c22c
**Location**: L80:10–L80:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2858
@@ -76,9 +76,9 @@
         ["id", { ...validQuizData, id: undefined }],
         ["question", { ...validQuizData, question: undefined }],
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
-        ["status", { ...validQuizData, status: undefined }],
+        ["", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
         ["createdAt", { ...validQuizData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSchema.safeParse(invalidData);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
