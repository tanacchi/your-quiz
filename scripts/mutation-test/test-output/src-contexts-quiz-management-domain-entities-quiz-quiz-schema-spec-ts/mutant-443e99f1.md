# Mutant 443e99f1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2862
**Stable ID**: 443e99f1
**Location**: L81:23–L81:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2862
@@ -77,9 +77,9 @@
         ["question", { ...validQuizData, question: undefined }],
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
-        ["creatorId", { ...validQuizData, creatorId: undefined }],
+        ["creatorId", {}],
         ["createdAt", { ...validQuizData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
