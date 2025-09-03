# Mutant d4a33796 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 2865
**Stable ID**: d4a33796
**Location**: L82:23–L82:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2865
@@ -78,9 +78,9 @@
         ["answerType", { ...validQuizData, answerType: undefined }],
         ["solution", { ...validQuizData, solution: undefined }],
         ["status", { ...validQuizData, status: undefined }],
         ["creatorId", { ...validQuizData, creatorId: undefined }],
-        ["createdAt", { ...validQuizData, createdAt: undefined }],
+        ["createdAt", {}],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSchema.safeParse(invalidData);
         expect(result.success).toBe(false);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
