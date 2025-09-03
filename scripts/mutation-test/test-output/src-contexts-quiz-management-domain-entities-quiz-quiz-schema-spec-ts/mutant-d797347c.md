# Mutant d797347c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2864
**Stable ID**: d797347c
**Location**: L82:10–L82:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2864
@@ -78,9 +78,9 @@
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
-        ["createdAt", { ...validQuizData, createdAt: undefined }],
+        ["", { ...validQuizData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
